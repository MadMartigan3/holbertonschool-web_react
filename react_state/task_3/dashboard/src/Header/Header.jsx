import { Component } from 'react';
import newContext from '../Context/context';
import holbertonLogo from '../assets/holberton-logo.jpg';

class Header extends Component {
  static contextType = newContext;

  render() {
    const { user, logOut } = this.context;

    return (
      <>
        <header className="App-header flex items-center p-[10px]">
          <img
            className="App-logo h-[200px] mr-5"
            src={holbertonLogo}
            alt="Holberton logo"
          />
          <h1 className="text-[var(--main-color)] text-4xl font-bold">
            School Dashboard
          </h1>
        </header>
        {user.isLoggedIn && (
          <section id="logoutSection">
            Welcome {user.email} (
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); logOut(); }}
            >
              logout
            </a>
            )
          </section>
        )}
      </>
    );
  }
}

export default Header;
