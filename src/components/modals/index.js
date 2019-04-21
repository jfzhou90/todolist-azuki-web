import React, { Component } from 'react';
import AddListModal from './AddList';
import DeleteItemModal from './DeleteItem';
import EditListModal from './EditList';
import { connect } from 'react-redux';
import { closeModal } from '../../redux/actions/modalActions';
import { deleteList, updateList } from '../../redux/actions/listActions';

class Modals extends Component {
  shouldComponentUpdate(nextProps) {
    return Object.keys(nextProps.modals).length !== Object.keys(this.props.modals).length;
  }

  closeModal = () => {
    this.props.closeModal();
  };

  render() {
    if (this.props.modals.addModal) {
      return <AddListModal isOpen={true} closeModal={this.closeModal} />;
    } else if (this.props.modals.deleteListModal) {
      return (
        <DeleteItemModal
          isOpen={true}
          closeModal={this.closeModal}
          data={this.props.modals.data.name}
          onDelete={() => this.props.deleteList(this.props.modals.data.id, this.props.socket)}
        />
      );
    } else if (this.props.modals.editListModal) {
      return (
        <EditListModal
          isOpen={true}
          closeModal={this.closeModal}
          data={this.props.modals.data.name}
          onEdit={newName =>
            this.props.updateList(this.props.modals.data.id, newName, this.props.socket)
          }
        />
      );
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = ({ modals, lists, socket }) => ({ modals, lists, socket });
const mapDispatchToProps = { closeModal, deleteList, updateList };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modals);
