import React from 'react';

import Highlight from '../../components/highlight';

const ManagingComponentsTips = () => (
  <React.Fragment>
    <div className="m-1">
      <div className="text-justify">
        React expects its form-like components to provide either a <Highlight>value</Highlight> or a <Highlight>defaultValue</Highlight> prop. If you supply a <Highlight>defaultValue</Highlight> prop, it will only be used to initialize the value, but that value won't be tracked over the life of the component. Supplying a <Highlight>value</Highlight> prop, on the other hand, will initialize the value, and will be used from that point onward to set the value of that element in your UI.
      </div>
      <div className="mt-3 text-justify">
        This means that if you pass a <Highlight>value</Highlight> prop to your component, you also need to provide a method by which that value can be updated, in order to be reflected in the UI. This is typically by way of an <Highlight>onChange</Highlight> event handler, but doesn't necessarily need to be an 'onChange' event handler (e.g. it could be an onClick, onMouseEnter, or any other kind of handler, onChange is just the most common).
      </div>
      <div className="mt-3 text-justify">
        In the case of a custom component that's created to <strong>look</strong> look an actual form element, <Highlight>onChange</Highlight> isn't even going to be triggered as interactions occur. In this situation, you have to consider the actual interactions that are going to take place with your component, and how those interactions can be mapped to an artificial 'onChange' event by which you can alert your consumers.
      </div>
      <div className="mt-3 text-justify">
        Also take into account that your component should ideally be able to operate in either a controlled or uncontrolled fashion. If your consumer passes both <Highlight>value</Highlight> and <Highlight>onChange</Highlight> props, it should be treated as controlled, and the <Highlight>onChange</Highlight> prop should be used to signal its consumer as to when the current value has changed from the previous value. Otherwise, it should be treated as uncontrolled, and track its own state internally, so that changes can still be reflected in the UI.
      </div>
    </div>
  </React.Fragment>
);

export default ManagingComponentsTips;
