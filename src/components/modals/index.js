import React, { Component } from 'react';
import AddListModal from './AddList';
import DeleteItemModal from './DeleteItem';
import { connect } from 'react-redux';
import { closeModal } from '../../redux/actions/modalActions';
import { deleteList } from '../../redux/actions/listActions';

class Modals extends Component {
  shouldComponentUpdate(nextProps) {
    return Object.keys(nextProps.modals).length !== Object.keys(this.props.modals).length;
  }

  closeModal = () => {
    this.props.closeModal();
  };

  render() {
    console.log('Modals Rendered');
    if (this.props.modals.addModal) {
      return <AddListModal isOpen={true} closeModal={this.closeModal} />;
    } else if (this.props.modals.deleteListModal) {
      return (
        <DeleteItemModal
          isOpen={true}
          closeModal={this.closeModal}
          data={this.props.modals.data.name}
          onDelete={() => this.props.deleteList(this.props.modals.data.id)}
        />
      );
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = ({ modals, lists }) => ({ modals, lists });
const mapDispatchToProps = { closeModal, deleteList };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modals);
