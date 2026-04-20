import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div className="App-body mt-20 p-10 flex-1 flex flex-col gap-4 border-t-4 border-[var(--main-color)]">
      <p className="text-lg italic">Login to access the full dashboard</p>
      <form className="flex items-center gap-2.5">
        <label className="font-bold" htmlFor="email">Email: </label>
        <input
          className="px-2.5 py-1.5 border border-[#ccc] rounded text-base"
          type="email"
          id="email"
          name="email"
        />
        <label className="font-bold" htmlFor="password">Password: </label>
        <input
          className="px-2.5 py-1.5 border border-[#ccc] rounded text-base"
          type="password"
          id="password"
          name="password"
        />
        <button
          className="px-4 py-1.5 bg-[var(--main-color)] text-white border-none rounded cursor-pointer text-base"
          type="submit"
        >OK</button>
      </form>
    </div>
  );
}

export default WithLogging(Login);
