import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../login.scss';
import { useAuth } from '../hooks/useAuth.js';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await handleRegister({ name, email, password, role });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <div className="login__card">
        <h2 className="login__title">AI Resume Builder</h2>
        <p className="login__subtitle">Create your account</p>

        <form className="login__form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="login__input"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="login__input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="login__input"
            required
          />

          <select
            name="role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="login__input"
          >
            <option value="user">Register as user</option>
            <option value="admin">Register as admin</option>
          </select>

          {error ? <p className="login__footer">{error}</p> : null}

          <button type="submit" className="login__button" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="login__footer">
          Already have an account?{' '}
          <span>
            <Link to="/login" className="register-link">
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
