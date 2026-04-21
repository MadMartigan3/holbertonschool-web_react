import PropTypes from 'prop-types';

const BodySection = ({ title, children }) => {
  return (
    <div className="bodySection">
      <h2 className="text-xl font-semibold mb-0">{title}</h2>
      {children}
    </div>
  );
};

BodySection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default BodySection;