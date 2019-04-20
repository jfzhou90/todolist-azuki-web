import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';
import AddListContainer from './AddListContainer';
import DraggableListContainer from './DraggableListContainer';
import { openModal } from '../../redux/actions/modalActions';

class Sidebar extends Component {
  toggleAddModal = () => {
    this.props.openModal('addModal');
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.sidebar.isOpen !== this.props.sidebar.isOpen;
  }

  render() {
    console.log('Sidebar Rendered');
    return (
      <div>
        <Menu
          noOverlay={true}
          isOpen={this.props.sidebar.isOpen}
          width={'300px'}
          disableAutoFocus
          customCrossIcon={false}
          customBurgerIcon={false}
        >
          <AddListContainer toggleModal={this.toggleAddModal} />
          <DraggableListContainer />
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = ({ sidebar }) => ({ sidebar });
const mapDispatchToProps = { openModal };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
