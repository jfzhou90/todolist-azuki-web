import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { closeModal } from '../../redux/actions/modalActions';
import { toast } from 'react-toastify';

const customStyles = {
  overlay: { zIndex: '2000' },
  content: {
    top: '43%',
    bottom: 'auto',
    left: '30%',
    right: '30%',
    borderRadius: '20px',
  },
};

const phoneStyle = {
  content: {
    border: '0',
    borderRadius: '4px',
    bottom: 'auto',
    minHeight: '10rem',
    left: '50%',
    padding: '2rem',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    minWidth: '20rem',
    width: '80%',
    maxWidth: '60rem',
  },
};

class DeleteItemModal extends PureComponent {
  onDelete = name => {
    toast.info(`${name} has been deleted`);
    this.props.onDelete();
    this.props.closeModal();
  };
  render() {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        shouldCloseOnOverlayClick={true}
        style={window.screen.width > 700 ? customStyles : { ...customStyles, content: phoneStyle }}
      >
        <div className="deleteItem--div-container">
          <h1>Are you sure you want to delete</h1>
          <strong>{this.props.data}?</strong>
          <div className="deleteItem--div-button-container">
            <button onClick={() => this.onDelete(this.props.data)}>Delete</button>
            <button onClick={this.props.closeModal}>Cancel</button>
          </div>
        </div>
      </ReactModal>
    );
  }
}

const mapDispatchToProps = { closeModal };

export default connect(
  null,
  mapDispatchToProps
)(DeleteItemModal);
