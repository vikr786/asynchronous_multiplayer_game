import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Invite = () => {
  const { invite } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    invite(email)
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={handleChange} />
      </label>
      <button type="submit">Invite</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Invite;
