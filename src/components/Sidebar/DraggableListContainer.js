import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import List from './List';
import { openModal } from '../../redux/actions/modalActions';
import { reorderList, getList } from '../../redux/actions/listActions';
import { updateVisibility } from '../../redux/actions/visibilityActions';
import * as ListApi from '../../api/listApi';
import { reorder } from '../../utils/draggable';
import debounce from 'lodash.debounce';

class DraggableListContainer extends Component {
  state = { location: null };
  componentDidMount() {
    if (this.props.socket) {
      this.props.socket.on('list', () => this.props.getList());
    }
  }

  componentWillUnmount() {
    if (this.props.socket) {
      this.props.socket.off('list');
    }
  }

  componentDidUpdate() {
    const windowRef = window.location.href.split('/').pop();
    if (this.state.location !== windowRef) {
      this.setState({ location: windowRef });
    }
  }

  updateListsOrder = result => {
    if (!result.destination) return;
    const lists = reorder(this.props.lists.keyOrder, result.source.index, result.destination.index);
    this.props.reorderList(lists);
    this._reorderList(lists);
  };

  _reorderList = debounce(lists => {
    ListApi.reorderLists(lists, this.props.socket);
  }, 2000);

  deleteList = item => {
    this.props.openModal('deleteListModal', item);
  };

  editList = item => {
    this.props.openModal('editListModal', item);
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
                          location={this.state.location}
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

const mapStateToProps = ({ lists, socket, sidebar }) => ({
  lists,
  socket,
  sidebar,
});

const mapDispatchToProps = {
  openModal,
  reorderList,
  getList,
  updateVisibility,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraggableListContainer);
