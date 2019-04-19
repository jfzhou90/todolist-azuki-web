import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTasks } from '../../redux/actions/taskActions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import isEqual from 'react-fast-compare';

class TaskDraggableContainer extends Component {
  componentDidMount() {
    this.props.getTasks(this.props.listId);
  }
  shouldComponentUpdate(nextProps) {
    return (
      !isEqual(nextProps.tasks.keyHash, this.props.tasks.keyHash) ||
      this.props.visibility !== nextProps.visibility ||
      nextProps.listId !== this.props.listId
    );
  }

  componentDidUpdate() {
    this.props.getTasks(this.props.listId);
  }

  updateTasksOrder = () => {};

  visibleTasks = () => {
    return this.props.visibility === 'active'
      ? this.props.tasks.activeTasks
      : this.props.tasks.completedTasks;
  };

  render() {
    console.log('TaskDraggable rerendered');
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
                {this.visibleTasks().map((key, index) => (
                  //sort here
                  <Draggable key={key} index={index} draggableId={key}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div>{this.props.tasks.keyHash[key].name}</div>
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

const mapStateToProps = ({ visibility, tasks }) => ({
  visibility,
  tasks,
});

const mapDispatchToProps = {
  getTasks,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDraggableContainer);
