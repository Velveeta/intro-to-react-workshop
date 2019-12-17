import React from 'react';

/**
 * Use this module to practice writing compound components, components that can receive
 * a list of children and apply some kind of special behavior or style or anything else
 * to them in a managed fashion, without having to know anything about it. Some examples
 * might include a managed RadioGroup of components that are not actually using radio
 * form elements under the hood, or a Magnifier component that applies a :hover style
 * to all of its children to scale them up as the user mouses over them.
 *
 * You'll find some example components below. Use them to brainstorm ideas on how to
 * solve the problem at the bottom of this file.
 *
 * const RadioButton = ({ checked, children, onClick, value }) => (
 *   <div className="radio-button" onClick={() => onClick(value)}>
 *     <span className="icon" /> {children}
 *   </div>
 * );
 *
 * const RadioGroup = class extends React.Component {
 *   _onClick = value => {
 *     if (value !== this.props.value) {
 *       this.props.onChange(value);
 *     }
 *   };
 *
 *   render() {
 *     const { children, value } = this.props;
 *
 *     return (
 *       <div className="radio-group">
 *         {React.Children.map(children, child => React.cloneElement(child, {
 *           ...child.props,
 *           onClick: this._onClick,
 *           selected: child.props.value === value,
 *         }))}
 *       </div>
 *     );
 *   }
 * };
 *
 * const AgeRangeRadioGroup = ({ value }) => {
 *   <RadioGroup value={value}>
 *     <RadioButton value="13-17">13 - 17 years old</RadioButton>
 *     <RadioButton value="18-24">18 - 24 years old</RadioButton>
 *     <RadioButton value="25-39">25 - 39 years old</RadioButton>
 *     <RadioButton value="40-59">40 - 59 years old</RadioButton>
 *     <RadioButton value="60+">60 years or older</RadioButton>
 *   </RadioGroup>
 * };
 *
 * See if you can figure out how to make this JobPipeline component work properly. It should
 * take a list of child components that each perform some kind of asynchronous task (the task
 * itself is unimportant for this project, and will be supplied by a service function in this
 * scenario. The goal is to have the JobPipeline component only mount 1 child component at a
 * time, and wait for that component to signal back that its job has been completed before it
 * mounts the next component in the pipeline. The Job component is already written for you,
 * and simply waits for its timeToComplete to expire through the CountdownService, at which
 * time, it should alert the JobPipeline component that it's completed, passing its jobId.
 **/

const CountdownService = {
  async tick(seconds, onTick) {
    if (seconds <= 0) {
      return;
    }

    return new Promise(resolve => {
      setTimeout(() => {
        const timeRemaining = seconds - 1;
        onTick(timeRemaining);

        resolve(this.tick(timeRemaining, onTick));
      }, 1000);
    })
  },
};

const Job = class extends React.Component {
  state = {
    timeRemaining: this.props.timeToComplete,
  };

  _isMounted = false;

  async componentDidMount() {
    this._isMounted = true;

    await CountdownService.tick(this.state.timeRemaining, this._onTick);

    this._onComplete();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _onComplete = () => {
    const { jobId, onComplete } = this.props;

    if (this._isMounted && onComplete) {
      onComplete(jobId);
    }
  };

  _onTick = (timeRemaining) => {
    if (this._isMounted) {
      this.setState({ timeRemaining });
    }
  };

  render() {
    const { jobId } = this.props;
    const { timeRemaining } = this.state;

    return <div>Job ID {jobId}: {timeRemaining <= 0 ? 'Done!' : `${timeRemaining}s...`}</div>;
  }
};

/**
 * This component needs some TLC! Refactor it so that its children don't
 * mount (and thus, start processing) until each previous child in the list
 * has signaled that it's completed. This is going to involve combining a
 * few different aspects of React development, including React.Children.map
 * or React.Children.toArray, React.cloneElement, and some way of tracking
 * how many items have finished processing, so that you know which components
 * to mount and activate.
 **/
const JobPipeline = class extends React.Component {
  render() {
    return this.props.children;
  }
};

const Exercise = () => (
  <JobPipeline>
    <Job jobId='123' timeToComplete={5} />
    <Job jobId='234' timeToComplete={4} />
    <Job jobId='345' timeToComplete={3} />
    <Job jobId='456' timeToComplete={4} />
    <Job jobId='567' timeToComplete={7} />
  </JobPipeline>
);

export default Exercise;

/*********************************************************************
 *         Don't look below here unless you want the answer!         *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/






























/**
 * const JobPipeline = class extends React.Component {
 *   state = {
 *     completed: [],
 *   };
 *
 *   _onComplete = (jobId) => {
 *     this.setState({
 *       completed: this.state.completed.concat(jobId),
 *     });
 *   };
 *
 *   render() {
 *     const { children } = this.props;
 *     const { completed } = this.state;
 *     // Convert our children to an array so we can filter them
 *     const childrenArray = React.Children.toArray(children);
 *     // Filter to find any children that have a jobId contained in our 'completed' array
 *     const completedChildren = childrenArray.filter((child) => completed.includes(child.props.jobId));
 *
 *     // If our completed children length matches our input children length, we're done!
 *     if (completedChildren.length === childrenArray.length) {
 *       return <span>All jobs completed!</span>
 *     }
 *
 *     // If not, get the next child in the array, it's the next job to be processed
 *     const nextChild = childrenArray[completedChildren.length];
 *
 *     // Flatten our completed children and our next child into an array, and map over it,
 *     // cloning each one and passing our onComplete callback to, to report back when it's done.
 *     return [...completedChildren, nextChild].map(child => React.cloneElement(child, {
 *       ...child.props,
 *       key: child.props.jobId,
 *       onComplete: this._onComplete,
 *     }));
 *   }
 * };
 **/
