import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleTask } from '../../redux/actions/taskActions';

class Task extends Component {
  toggleTasks() {
    this.props.toggleTask(this.props.item.id, !this.props.item.isCompleted, this.props.socket);
  }

  render() {
    return (
      <div className="Task--div-container">
        <input
          type="checkbox"
          checked={this.props.item.isCompleted}
          onChange={() => this.toggleTasks()}
        />
        <span>{this.props.item.name}</span>
        <Link to="/" className="fas fa-edit Task--div-editLink" />
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
