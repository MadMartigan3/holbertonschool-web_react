import { Component } from 'react';

class BodySection extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <div className="bodySection px-10">
        <h2 className="border-b-4 border-[var(--main-color)] pb-2 mb-4">{title}</h2>
        {children}
      </div>
    );
  }
}

export default BodySection;
