import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <div className="App-footer fixed bottom-0 left-0 right-0 p-5 border-t-4 border-[var(--main-color)] text-center text-sm text-[#333] bg-white">
      <p>Copyright {getCurrentYear()} - {getFooterCopy(false)}</p>
    </div>
  );
}

export default Footer;
