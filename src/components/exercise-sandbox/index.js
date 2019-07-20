import React from 'react';

const ExerciseSandbox = class extends React.Component {
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  state = {
    hasErrored: false,
  };

  componentDidCatch(error, info) {
    this.setState({
      hasErrored: true,
    });
  }

  render() {
    if (this.state.error) {
      return null;
    }

    return (
      <React.Fragment>
        <h2 className="text-center">The Exercise!</h2>
        {this.props.children}
      </React.Fragment>
    );
  }
};

export default ExerciseSandbox;
