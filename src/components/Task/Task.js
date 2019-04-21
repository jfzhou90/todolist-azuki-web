import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleTask } from '../../redux/actions/taskActions';
import SubtaskDraggableContainer from './SubtaskDraggableContainer';

class Task extends Component {
  toggleTasks() {
    this.props.toggleTask(this.props.item.id, !this.props.item.isCompleted, this.props.socket);
  }

  render() {
    return (
      <div className="Task--div-fullcontainer">
        <div className="Task--div-container">
          <input
            type="checkbox"
            checked={this.props.item.isCompleted}
            onChange={() => this.toggleTasks()}
            ref={this.props.item.id}
          />
          <span>{this.props.item.name}</span>
          <Link
            to={`/task/edit/${this.props.item.id}`}
            className="fas fa-edit Task--div-editLink"
          />
        </div>
        <SubtaskDraggableContainer taskId={this.props.item.id} />
      </div>
    );
  }
}

const mapStatetoProps = ({ socket }) => ({ socket });
const mapDispatchToProps = {
  toggleTask,
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Task);
