import PropTypes from 'prop-types';
import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer({ user = { email: '', password: '', isLoggedIn: false } }) {

  return (
    <div className="App-footer mt-auto p-3 wide:p-5 border-t-4 border-[var(--main-color)] text-center text-xs wide:text-sm text-[#333] bg-white">
      <p>Copyright {getCurrentYear()} - {getFooterCopy(false)}</p>
      {user.isLoggedIn && (
        <p><a href="#">Contact us</a></p>
      )}
    </div>
  );
}

Footer.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }),
};

export default Footer;
