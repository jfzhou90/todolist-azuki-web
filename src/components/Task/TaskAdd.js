import React from 'react';

export default props => {
  if (props.visibility === 'active') {
    return (
      <div className="TaskAdd--div-container">
        <form onSubmit={e => props.onSubmit(e)}>
          <input type="text" ref={props.inputRef} placeholder="Add a new task here" />
        </form>
      </div>
    );
  } else {
    return (
      <div className="TaskAdd--div-container-completed">
        <button onClick={() => props.onClear()}>Clear Completed</button>
      </div>
    );
  }
};
