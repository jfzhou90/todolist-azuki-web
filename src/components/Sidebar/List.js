import React from 'react';

export default props => (
  <div className="list--div-container">
    <span className="list--span-name">{props.item.name}</span>
    <div className="list--div-buttonContainer">
      <button className="fas fa-edit" onClick={() => props.onEdit()} />
      <button className="fas fa-trash" onClick={() => props.onDelete()} />
    </div>
  </div>
);
