import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div className="App-body p-[10px]">
      <div className="border-t-[3px] border-[var(--main-color)] pt-2">
        <p className="text-sm mb-2">Login to access the full dashboard</p>

        <form className="App-login inline-flex items-center gap-2 flex-wrap">
          <label htmlFor="email" className="ml-4 mr-2">Email</label>
          <input id="email" type="email" className="border border-gray-300 px-2 py-1 mr-2 rounded" />

          <label htmlFor="password" className="ml-4 mr-2">Password</label>
          <input id="password" type="password" className="border border-gray-300 px-2 py-1 mr-2 rounded" />

          <button className="px-3 py-1 border rounded text-xs">OK</button>
        </form>
      </div>
    </div>
  );
}
export default WithLogging(Login);