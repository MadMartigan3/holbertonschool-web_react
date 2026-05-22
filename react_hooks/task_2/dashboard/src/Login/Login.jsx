import { useState } from 'react';
import PropTypes from 'prop-types';
import WithLogging from '../HOC/WithLogging';

function Login({ logIn = () => {} }) {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChangeEmail = (e) => {
    const { value: email } = e.target;
    const { password } = formData;
    setFormData({ ...formData, email });
    setEnableSubmit(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 8);
  };

  const handleChangePassword = (e) => {
    const { value: password } = e.target;
    const { email } = formData;
    setFormData({ ...formData, password });
    setEnableSubmit(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 8);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    logIn(formData.email, formData.password);
  };

  return (
    <div className="App-body p-[10px]">
      <div className="border-t-[3px] border-[var(--main-color)] pt-2">
        <p className="text-sm mb-2">Login to access the full dashboard</p>

        <form className="App-login inline-flex items-center gap-2 flex-wrap" onSubmit={handleLoginSubmit}>
          <label htmlFor="email" className="ml-4 mr-2">Email</label>
          <input
            id="email"
            type="text"
            value={formData.email}
            onChange={handleChangeEmail}
            className="border border-gray-300 px-2 py-1 mr-2 rounded"
          />

          <label htmlFor="password" className="ml-4 mr-2">Password</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChangePassword}
            className="border border-gray-300 px-2 py-1 mr-2 rounded"
          />

          <input
            type="submit"
            value="OK"
            disabled={!enableSubmit}
            className="px-3 py-1 border rounded text-xs"
          />
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  logIn: PropTypes.func,
};

export default WithLogging(Login);
