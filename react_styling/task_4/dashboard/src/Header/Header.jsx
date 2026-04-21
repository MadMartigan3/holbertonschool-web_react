import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header flex flex-col wide:flex-row items-center wide:items-center gap-3 wide:gap-5 p-5 bg-white border-b-4 border-[var(--main-color)]">
      <img src={holbertonLogo} alt="holberton logo" className="h-32 wide:h-[60px]" />
      <h1 className="text-[var(--main-color)] text-3xl mobile:text-[2rem] wide:text-[2rem] m-0 text-center wide:text-left">School dashboard</h1>
    </div>
  );
}

export default Header;
