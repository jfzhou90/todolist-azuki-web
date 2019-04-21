import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorder } from '../../utils/draggable';
import debounce from 'lodash.debounce';
import SubtaskDraggables from './SubtaskDraggables';
import { reorderSubtasks } from '../../redux/actions/subtaskActions';
import * as SubtaskApi from '../../api/subtaskApi';

class SubtaskDraggableContainer extends Component {
  updateSubtasksOrder = result => {
    if (!result.destination) return;
    const subtasks = reorder(
      this.props.tasks.keyHash[this.props.taskId].subtasks.keyOrder,
      result.source.index,
      result.destination.index
    );
    this.props.reorderSubtasks(this.props.taskId, subtasks);
    this._updateSubtasksOrder(subtasks);
  };

  _updateSubtasksOrder = debounce(subtasks => {
    SubtaskApi.reorderSubTasks(subtasks, this.props.socket);
  }, 2000);

  render() {
    return (
      <div className="subtaskDroppable--div-container">
        <DragDropContext onDragEnd={this.updateSubtasksOrder}>
          <Droppable droppableId={this.props.taskId}>
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="Droppable--div-subtasksContainer"
              >
                {this.props.tasks.keyHash[this.props.taskId].subtasks.keyOrder.map((key, index) => (
                  <Draggable key={key} index={index} draggableId={key}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <SubtaskDraggables
                          key={key}
                          index={index}
                          taskId={this.props.taskId}
                          item={this.props.tasks.keyHash[this.props.taskId].subtasks.keyHash[key]}
                        />
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

const mapStateToProps = ({ tasks, socket }) => ({
  tasks,
  socket,
});

const mapDispatchToProps = { reorderSubtasks };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubtaskDraggableContainer);
