import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTasks, addTask, reorderTasks } from '../../redux/actions/taskActions';
import { clearCompletedTasks } from '../../redux/actions/listActions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import isEqual from 'react-fast-compare';
import TaskAdd from './TaskAdd';
import { toast } from 'react-toastify';
import Task from './Task';
import { reorder } from '../../utils/draggable';
import debounce from 'lodash.debounce';
import * as TaskApi from '../../api/taskApi';

class TaskDraggableContainer extends Component {
  state = { listId: '' };
  componentDidMount() {
    this.props.getTasks(this.props.listId);
    if (this.props.socket) {
      this.props.socket.on('tasks', () => this.props.getTasks(this.props.listId));
    }
  }

  componentWillUnmount() {
    if (this.props.socket) {
      this.props.socket.off('tasks');
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      !isEqual(nextProps.tasks, this.props.tasks) ||
      this.props.visibility !== nextProps.visibility ||
      nextProps.listId !== this.props.listId
    );
  }

  componentDidUpdate() {
    if (this.state.listId !== this.props.listId) {
      this.props.getTasks(this.props.listId);
      this.setState({ listId: this.props.listId });
    }
  }

  updateTasksOrder = result => {
    if (!result.destination) return;
    const tasks = reorder(this.visibleTasks(), result.source.index, result.destination.index);
    this.props.reorderTasks(tasks, this.props.visibility);
    this._reorderTask(tasks);
  };

  _reorderTask = debounce(tasks => {
    TaskApi.reorderTasks(tasks, this.props.socket);
  }, 2000);

  visibleTasks = () => {
    return this.props.visibility === 'active'
      ? this.props.tasks.activeTasks
      : this.props.tasks.completedTasks;
  };

  addNewTask = e => {
    e.preventDefault();
    const newTask = this.newTask.value;
    if (
      newTask === '' ||
      newTask === undefined ||
      newTask === null ||
      !newTask.match(/[a-zA-Z0-9]/g)
    ) {
      return toast.warn('Nothing is entered. Please try again.');
    }
    if (newTask.length > 255) {
      return toast.warn("Sorry, please don't type in a paragraph. Max 255 characters.");
    }
    toast.success(`${newTask} has been added successfully.`);
    this.props.addTask(this.props.listId, newTask, this.props.socket);
    this.newTask.value = '';
  };

  clearCompletedTasks = () => {
    const confirmation = window.confirm(
      'This will permanent clear all completed task in this list, are you sure?'
    );
    if (confirmation) {
      this.props.clearCompletedTasks(this.props.listId, this.props.socket);
    }
  };

  render() {
    console.log(this.props.tasks);
    return (
      <div>
        <DragDropContext onDragEnd={this.updateTasksOrder}>
          <Droppable droppableId="droppableTasks">
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="Droppable--div-tasksContainer"
              >
                <TaskAdd
                  onClear={() => this.clearCompletedTasks()}
                  onSubmit={this.addNewTask}
                  inputRef={input => (this.newTask = input)}
                  visibility={this.props.visibility}
                />
                {this.visibleTasks().map((key, index) => (
                  <Draggable key={key} index={index} draggableId={key}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task item={this.props.tasks.keyHash[key]} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = ({ visibility, tasks, socket }) => ({
  visibility,
  tasks,
  socket,
});

const mapDispatchToProps = {
  getTasks,
  addTask,
  clearCompletedTasks,
  reorderTasks,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDraggableContainer);
