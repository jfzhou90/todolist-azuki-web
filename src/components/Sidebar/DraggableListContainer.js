import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import List from './List';
import { openModal } from '../../redux/actions/modalActions';
import { reorderList } from '../../redux/actions/listActions';
import * as ListApi from '../../api/listApi';
import { reorder } from '../../utils/draggable';
import debounce from 'lodash.debounce';

class DraggableListContainer extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.lists !== this.props.lists;
  }

  updateListsOrder = result => {
    if (!result.destination) return;
    const lists = reorder(this.props.lists.keyOrder, result.source.index, result.destination.index);
    this.props.reorderList(lists);
    this._reorderList(lists);
  };

  _reorderList = debounce(lists => {
    ListApi.reorderLists(lists);
  }, 2000);

  deleteList = id => {
    this.props.openModal('deleteListModal', id);
  };

  editList = item => {
    console.log('edit list ' + item.id);
  };

  render() {
    return (
      <div>
        <DragDropContext onDragEnd={this.updateListsOrder}>
          <Droppable droppableId="droppableList">
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="Droppable--div-listContainer"
              >
                {this.props.lists.keyOrder.map((key, index) => (
                  <Draggable key={key} index={index} draggableId={key}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <List
                          item={this.props.lists.keyHash[key]}
                          onDelete={() => this.deleteList(this.props.lists.keyHash[key])}
                          onEdit={() => this.editList(this.props.lists.keyHash[key])}
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

const mapStateToProps = ({ lists }) => ({
  lists,
});

const mapDispatchToProps = {
  openModal,
  reorderList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraggableListContainer);
