import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { closeModal } from '../../redux/actions/modalActions';
import { addNewList } from '../../redux/actions/listActions';
import { toast } from 'react-toastify';

const customStyles = {
  overlay: { zIndex: '2000' },
  content: { top: '43%', bottom: '40%', left: '30%', right: '30%', borderRadius: '20px' },
};

const phoneStyle = { top: '10%', bottom: 'auto', left: '10%', right: '10%', borderRadius: '20px' };

class AddListModal extends PureComponent {
  onSubmit = async e => {
    e.preventDefault();
    const name = this.refs.addListInput.value;
    if (name === undefined || name === null || name.length === 0 || name.length > 16) {
      return toast.error('Must be 1-16 character long.');
    }
    await this.props.addNewList(name);
    toast.success(`${name} has been added.`);
    this.props.closeModal();
  };

  render() {
    console.log('AddModal rendered');
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        shouldCloseOnOverlayClick={true}
        style={window.screen.width > 500 ? customStyles : { ...customStyles, content: phoneStyle }}
      >
        <form className="AddListModal--div-container" onSubmit={e => this.onSubmit(e)}>
          <h1>Enter the title of the new list:</h1>
          <input type="text" ref="addListInput" autoFocus />
          <div className="AddListModal--div-buttonContainer">
            <button type="button" onClick={() => this.props.closeModal()}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </ReactModal>
    );
  }
}

const mapDispatchToProps = { closeModal, addNewList };

export default connect(
  null,
  mapDispatchToProps
)(AddListModal);
