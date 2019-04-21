import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { updateSubtask, deleteSubtask } from '../../redux/actions/subtaskActions';

class Subtask extends Component {
  updateSubtask = e => {
    e.preventDefault();
    const subtaskNewName = this.refs[this.props.item.id].value;
    if (
      subtaskNewName.length === 0 ||
      subtaskNewName === null ||
      subtaskNewName === undefined ||
      !subtaskNewName.match(/[a-zA-Z0-9]/g)
    ) {
      return toast.warn('Task title cannot be empty.');
    } else if (subtaskNewName.length > 255) {
      return toast.warn('Must be between 1-255 characters long.');
    }
    this.props.updateSubtask(this.props.item.id, subtaskNewName, this.props.socket);
    toast.success(`${this.props.item.name} has been renamed to "${subtaskNewName}".`);
  };

  deleteSubtask = () => {
    const confirm = window.confirm(`Delete "${this.props.item.name}"?`);
    if (confirm) {
      this.props.deleteSubtask(this.props.item.id, this.props.item.TaskId, this.props.socket);
      toast.success(`${this.props.item.name} has been deleted.`);
    }
  };

  render() {
    return (
      <div className="Subtask--div-container">
        <form onSubmit={e => this.updateSubtask(e)}>
          <input type="text" defaultValue={this.props.item.name} ref={this.props.item.id} />
        </form>
        <button onClick={() => this.deleteSubtask()} className="fas fa-trash" />
      </div>
    );
  }
}
const mapStateToProps = ({ socket }) => ({ socket });
const mapDispatchToProps = { updateSubtask, deleteSubtask };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subtask);
