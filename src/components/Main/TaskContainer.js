import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { action as toggleMenu } from 'redux-burger-menu';
import { updateVisibility } from '../../redux/actions/visibilityActions';
import TitleBar from './TitleBar';
import TaskDraggableContainer from '../Task/TaskDraggableContainer';

class TaskContainer extends Component {
  componentDidMount() {
    this.props.toggleMenu(false);
  }
  shouldComponentUpdate(nextProps) {
    return (
      !nextProps.lists.keyHash[nextProps.match.params.id] ||
      nextProps.match.params.id !== this.props.match.params.id ||
      nextProps.visibility !== this.props.visibility
    );
  }

  componentDidUpdate() {
    this.props.toggleMenu(false);
  }

  render() {
    if (!this.props.lists.keyHash[this.props.match.params.id]) {
      return <Redirect to="/NotFound" />;
    }
    return (
      <div className="task--div-full-container">
        <TitleBar
          name={this.props.lists.keyHash[this.props.match.params.id].name}
          visibility={this.props.visibility}
          onUpdate={visibility => this.props.updateVisibility(visibility)}
        />
        <TaskDraggableContainer listId={this.props.match.params.id} />
      </div>
    );
  }
}

const mapStateToProps = ({ visibility, lists }) => ({
  visibility,
  lists,
});

const mapDispatchToProps = {
  updateVisibility,
  toggleMenu,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskContainer);
