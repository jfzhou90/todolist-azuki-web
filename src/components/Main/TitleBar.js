import React from 'react';

export default props => (
  <div className="titlebar--div-container">
    <span className="titlebar--div-listname">{props.name}</span>
    <div className="titlebar--div-buttongroup">
      <button
        type="button"
        className={props.visibility === 'active' ? 'titlebar--button-selected' : 'titlebar--button'}
        onClick={() => props.onUpdate('active')}
      >
        Active
      </button>
      <button
        type="button"
        className={
          props.visibility === 'completed' ? 'titlebar--button-selected' : 'titlebar--button'
        }
        onClick={() => props.onUpdate('completed')}
      >
        Completed
      </button>
      <button
        type="button"
        className={props.visibility === 'all' ? 'titlebar--button-selected' : 'titlebar--button'}
        onClick={() => props.onUpdate('all')}
      >
        All
      </button>
    </div>
  </div>
);
