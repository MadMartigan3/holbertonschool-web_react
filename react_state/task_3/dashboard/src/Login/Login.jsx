import { Component } from 'react';
import PropTypes from 'prop-types';
import WithLogging from '../HOC/WithLogging';

class Login extends Component {
  static propTypes = {
    logIn: PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string,
  };

  static defaultProps = {
    logIn: () => {},
    email: '',
    password: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      password: props.password,
      enableSubmit: false,
    };
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    const { logIn } = this.props;
    const { email, password } = this.state;
    logIn(email, password);
  };

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value }, this.validateForm);
  };

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value }, this.validateForm);
  };

  validateForm = () => {
    const { email, password } = this.state;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    this.setState({ enableSubmit: emailValid && password.length >= 8 });
  };

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className="App-body p-[10px]">
        <div className="border-t-[3px] border-[var(--main-color)] pt-2">
          <p className="text-sm mb-2">Login to access the full dashboard</p>

          <form className="App-login inline-flex items-center gap-2 flex-wrap" onSubmit={this.handleLoginSubmit}>
            <label htmlFor="email" className="ml-4 mr-2">Email</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={this.handleChangeEmail}
              className="border border-gray-300 px-2 py-1 mr-2 rounded"
            />

            <label htmlFor="password" className="ml-4 mr-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={this.handleChangePassword}
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
}

export default WithLogging(Login);
