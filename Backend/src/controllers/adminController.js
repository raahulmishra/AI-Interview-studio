const User = require('../models/user');
const InterviewReportModel = require('../models/interview.model');

const formatUser = (user, reportCountMap) => {
  const id = user._id.toString();

  return {
    id,
    name: user.name,
    email: user.email,
    joinedAt: user._id.getTimestamp(),
    totalReports: reportCountMap.get(id) || 0
  };
};

exports.getAdminOverview = async (req, res) => {
  try {
    const [users, reports, reportCounts] = await Promise.all([
      User.find().select('-password').sort({ _id: -1 }).lean(),
      InterviewReportModel.find()
        .sort({ createdAt: -1 })
        .limit(12)
        .select('title matchScore user createdAt')
        .lean(),
      InterviewReportModel.aggregate([
        {
          $group: {
            _id: '$user',
            totalReports: { $sum: 1 }
          }
        }
      ])
    ]);

    const userMap = new Map(users.map((user) => [user._id.toString(), user]));
    const reportCountMap = new Map(
      reportCounts
        .filter((item) => item._id)
        .map((item) => [item._id.toString(), item.totalReports])
    );

    const totalReports = reportCounts.reduce((sum, item) => sum + item.totalReports, 0);
    const averageMatchScore =
      reports.length > 0
        ? Math.round(
            reports.reduce((sum, report) => sum + (report.matchScore || 0), 0) / reports.length
          )
        : 0;

    const activities = reports.map((report) => {
      const user = report.user ? userMap.get(report.user.toString()) : null;

      return {
        id: report._id,
        title: report.title,
        matchScore: report.matchScore || 0,
        createdAt: report.createdAt,
        user: user
          ? {
              id: user._id,
              name: user.name,
              email: user.email
            }
          : null
      };
    });

    return res.status(200).json({
      stats: {
        totalUsers: users.length,
        totalReports,
        averageMatchScore,
        activeSessions: reports.length
      },
      users: users.map((user) => formatUser(user, reportCountMap)),
      activities
    });
  } catch (error) {
    console.error('Admin overview error:', error);
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};
