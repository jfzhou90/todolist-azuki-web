import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
  <div
    className={
      props.location === props.item.id ? 'list--div-container-selected' : 'list--div-container'
    }
  >
    <Link to={`/list/${props.item.id}`}>
      <span className="list--span-name">{props.item.name}</span>
    </Link>
    <div className="list--div-buttonContainer">
      <button className="fas fa-edit" onClick={() => props.onEdit()} />
      <button className="fas fa-trash" onClick={() => props.onDelete()} />
    </div>
  </div>
);
