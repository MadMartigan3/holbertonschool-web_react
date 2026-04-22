import holbertonLogo from '../assets/holberton-logo.jpg';

export default function Header() {
  return (
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
  );
}