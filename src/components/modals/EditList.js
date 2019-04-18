import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { closeModal } from '../../redux/actions/modalActions';
import { toast } from 'react-toastify';

const customStyles = {
  overlay: { zIndex: '2000' },
  content: { top: '43%', bottom: '40%', left: '30%', right: '30%', borderRadius: '20px' },
};

const phoneStyle = { top: '10%', bottom: 'auto', left: '10%', right: '10%', borderRadius: '20px' };

class EditListModal extends PureComponent {
  onSubmit = async e => {
    e.preventDefault();
    const name = this.refs.editListInput.value;
    if (this.props.data === name) {
      return this.props.closeModal();
    }
    if (name === undefined || name === null || name.length === 0 || name.length > 16) {
      return toast.error('Must be 1-16 character long.');
    }
    await this.props.onEdit(name);
    toast.success(`${this.props.data} has been renamed to ${name}.`);
    this.props.closeModal();
  };

  render() {
    console.log('EditListModal rendered');
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        shouldCloseOnOverlayClick={true}
        style={window.screen.width > 500 ? customStyles : { ...customStyles, content: phoneStyle }}
      >
        <form className="AddListModal--div-container" onSubmit={e => this.onSubmit(e)}>
          <h1>
            Rename <strong>{this.props.data}</strong> to?
          </h1>
          <input type="text" ref="editListInput" autoFocus defaultValue={this.props.data} />
          <div className="AddListModal--div-buttonContainer">
            <button type="submit">Save</button>
            <button type="button" onClick={() => this.props.closeModal()}>
              Cancel
            </button>
          </div>
        </form>
      </ReactModal>
    );
  }
}

const mapDispatchToProps = { closeModal };

export default connect(
  null,
  mapDispatchToProps
)(EditListModal);
