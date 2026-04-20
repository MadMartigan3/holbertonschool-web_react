import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header flex items-center gap-5 p-5 bg-white border-b-4 border-[var(--main-color)]">
      <img src={holbertonLogo} alt="holberton logo" className="h-[60px]" />
      <h1 className="text-[var(--main-color)] text-[2rem] m-0">School dashboard</h1>
    </div>
  );
}

export default Header;
