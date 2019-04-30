import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link, Prompt } from 'react-router-dom';
import { beginApiCall, endApiCall } from '../../redux/actions/apiStatusActions';
import { getTask, updateTaskTitle, deleteTask } from '../../redux/actions/taskActions';
import { addNewSubtask } from '../../redux/actions/subtaskActions';
import Subtask from './Subtask';
import { toast } from 'react-toastify';

class TaskEdit extends Component {
  state = { inputValue: '' };

  async componentDidMount() {
    this.props.beginApiCall();
    if (!this.props.tasks.keyHash[this.props.match.params.id]) {
      await this.props.getTask(this.props.match.params.id);
    }
    this.props.endApiCall();
  }

  updateTaskTitle = e => {
    e.preventDefault();
    const newTitleName = this.refs.taskTitle.value;
    if (
      newTitleName.length === 0 ||
      newTitleName === null ||
      newTitleName === undefined ||
      !newTitleName.match(/[a-zA-Z0-9]/g)
    ) {
      return toast.warn('Task title cannot be empty.');
    } else if (newTitleName.length > 255) {
      return toast.warn('Must be between 1-255 characters long.');
    }
    this.props.updateTaskTitle(this.props.match.params.id, newTitleName);
    toast.success(`Updated task title to ${newTitleName}`);
  };

  addNewSubtask = e => {
    e.preventDefault();
    const newSubtask = this.refs.addNewSubtask.value;
    if (
      newSubtask.length === 0 ||
      newSubtask === null ||
      newSubtask === undefined ||
      !newSubtask.match(/[a-zA-Z0-9]/g)
    ) {
      return;
    } else if (newSubtask.length > 255) {
      toast.warn('Must be between 1-255 characters long.');
    }
    this.props.addNewSubtask(this.props.match.params.id, newSubtask);
    toast.success(`${newSubtask} has been added successfully.`);
    this.refs.addNewSubtask.value = '';
  };

  deleteTask = async () => {
    const confirmation = window.confirm(
      'Deleting this task will also delete all its subtasks, are you sure?'
    );
    if (confirmation) {
      await this.props.deleteTask(this.props.match.params.id);
      this.props.history.push(
        `/list/${this.props.tasks.keyHash[this.props.match.params.id].ListId}`
      );
    }
  };

  render() {
    if (this.props.apiStatus.isLoading) {
      return <div>Loading</div>;
    }
    const task = this.props.tasks.keyHash[this.props.match.params.id];
    if (!task) {
      return <Redirect to="/NotFound" />;
    }

    return (
      <div className="Edit--div-container">
        <div className="Edit--div-top-level-edit">
          <Link to={`/list/${task.ListId}`}>
            <i className="fas fa-arrow-left" /> Back
          </Link>
          <button onClick={() => this.deleteTask()}>
            Delete <i className="fas fa-trash" />
          </button>
        </div>
        <Prompt
          when={this.state.inputValue !== ''}
          message="Are you sure? You have not add the new subtask yet."
        />
        <form onSubmit={e => this.updateTaskTitle(e)}>
          <input
            className="Edit--input-task"
            type="text"
            defaultValue={task.name}
            ref="taskTitle"
          />
        </form>
        <form onSubmit={e => this.addNewSubtask(e)}>
          <input
            className="Edit--input-subtask"
            type="text"
            placeholder="Add a subtask here"
            ref="addNewSubtask"
            onChange={e => this.setState({ inputValue: e.target.value })}
          />
        </form>
        {task.subtasks.keyOrder.map(id => (
          <Subtask key={id} item={task.subtasks.keyHash[id]} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ tasks, apiStatus }) => ({ tasks, apiStatus });
const mapDispatchToProps = {
  beginApiCall,
  getTask,
  endApiCall,
  addNewSubtask,
  updateTaskTitle,
  deleteTask,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskEdit);
