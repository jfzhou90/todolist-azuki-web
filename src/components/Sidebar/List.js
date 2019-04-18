import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
  <div className="list--div-container">
    <Link to={`/list/${props.item.id}`} onClick={() => props.onClick()}>
      <span className="list--span-name">{props.item.name}</span>
    </Link>
    <div className="list--div-buttonContainer">
      <button className="fas fa-edit" onClick={() => props.onEdit()} />
      <button className="fas fa-trash" onClick={() => props.onDelete()} />
    </div>
  </div>
);
