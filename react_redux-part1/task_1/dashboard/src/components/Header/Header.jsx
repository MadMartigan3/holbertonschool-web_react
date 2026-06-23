import PropTypes from 'prop-types';
import holbertonLogo from '../../assets/holberton-logo.jpg';

function Header({
  user = { email: '', password: '', isLoggedIn: false },
  logOut = () => {},
}) {

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

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }),
  logOut: PropTypes.func,
};

export default Header;
