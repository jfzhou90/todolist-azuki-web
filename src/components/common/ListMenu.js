import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { reorder } from '../../utils/draggable';
import { addNewList, deleteList, updateList } from '../../redux/actions/listActions';
import * as ListApi from '../../api/listApi';

class ListMenu extends Component {
  state = {
    lists: this.props.list,
  };

  myInput = React.createRef();

  addNewList = async event => {
    event.preventDefault(event);
    if (
      this.myInput.current.value === undefined ||
      this.myInput.current.value === '' ||
      this.myInput.current.value.length >= 16 ||
      !this.myInput.current.value.match(/[a-zA-Z0-9]/g)
    ) {
      toast.error(
        'Error, unable to add new list, must be between 1 to 16 characters, please try again.'
      );
      return;
    }
    const category = this.myInput.current.value;
    await this.props.addNewList(category);
    this.myInput.current.value = '';
    this.setState({
      lists: this.props.list,
    });
    toast.success(`New category '${category}' added successfully`);
  };

  editList = async item => {
    const newName = window.prompt('What is the new name of the list?');
    if (newName === null || newName === undefined || newName === '') {
      return;
    } else if (newName.length >= 16 || !newName.match(/[a-zA-Z0-9]/g)) {
      toast.error(
        'Error, unable to edit list, must be between 1 to 16 characters, please try again.'
      );
      return;
    }
    await this.props.updateList(item.id, newName);
    this.setState({
      lists: this.props.list.map(list => {
        if (list.id === item.id) {
          list.name = newName;
          return list;
        } else {
          return list;
        }
      }),
    });
    toast.success(`List has been updated to '${newName}'.`);
  };

  deleteList = item => {
    const confirmation = window.confirm(`Are you sure to delete '${item.name}?'`);
    if (confirmation) {
      const filtered = this.state.lists.filter(list => list.id !== item.id);
      toast.info(`Deleted '${item.name}' successfully`);
      this.setState({ lists: filtered });
      this.props.deleteList(item.id);
    }
  };

  _reorderList = debounce(lists => {
    ListApi.reorderLists(lists);
  }, 2000);

  onDragEnd = async result => {
    if (!result.destination) return;
    const lists = reorder(this.state.lists, result.source.index, result.destination.index);
    await this._reorderList(lists);
    this.setState({
      lists: lists,
    });
  };

  render() {
    return (
      <Menu
        noOverlay={true}
        isOpen={this.props.listMenu.isOpen}
        disableAutoFocus
        customCrossIcon={false}
        customBurgerIcon={false}
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}
      >
        <div className="menu--div-container">
          <div className="menu--div-addList">
            <form onSubmit={event => this.addNewList(event)}>
              <input type="text" ref={this.myInput} />
              <button className="fas fa-folder-plus" />
            </form>
          </div>

          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppableList">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="menu--div-listContainer"
                >
                  {this.state.lists.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="menu--div-list"
                        >
                          <div className="menu--div-list">
                            <Link to={`/list/${item.id}`}>{item.name}</Link>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                              {/* To Do - make this into actual modal*/}
                              <button className="far fa-edit" onClick={() => this.editList(item)} />
                              <button
                                className="fas fa-trash"
                                onClick={() => this.deleteList(item)}
                              />
                            </div>
                          </div>
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
      </Menu>
    );
  }
}

// const mapStateToProps = state => state;
const mapStateToProps = ({ list, listMenu }) => ({ list, listMenu });
const mapDispatchToProps = {
  addNewList,
  deleteList,
  updateList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListMenu);
