import { Component } from 'react';

function WithLogging(WrappedComponent) {
  const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  class WithLoggingHOC extends Component {
    componentDidMount() {
      console.log(`Component ${name} is mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${name} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithLoggingHOC.displayName = `WithLogging(${name})`;
  return WithLoggingHOC;
}

export default WithLogging;
