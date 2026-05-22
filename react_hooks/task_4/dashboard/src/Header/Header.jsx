import { useContext } from 'react';
import newContext from '../Context/context';
import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  const { user, logOut } = useContext(newContext);

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

export default Header;
