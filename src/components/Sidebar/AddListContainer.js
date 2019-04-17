import React from 'react';

export default props => (
  <div className="sidebar--div-addListContainer">
    <button onClick={() => props.toggleModal()}>Add New List</button>
  </div>
);
