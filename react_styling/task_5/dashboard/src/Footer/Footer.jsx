import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <div className="App-footer mt-auto p-3 wide:p-5 border-t-4 border-[var(--main-color)] text-center text-xs wide:text-sm text-[#333] bg-white">
      <p>Copyright {getCurrentYear()} - {getFooterCopy(false)}</p>
    </div>
  );
}

export default Footer;
