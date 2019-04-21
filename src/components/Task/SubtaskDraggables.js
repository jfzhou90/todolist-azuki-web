import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import * as SubtaskApi from '../../api/subtaskApi';
import { toggleSubtask } from '../../redux/actions/subtaskActions';

class SubtaskDraggables extends PureComponent {
  state = {
    classname: '',
  };
  toggleSubtask = () => {
    this._toggleSubtask();
    this.props.toggleSubtask(
      this.props.taskId,
      this.props.item.id,
      this.refs[this.props.item.id].checked
    );

    if (this.refs[this.props.item.id].checked) {
      this.setState({ className: 'subtask--crossed' });
    } else {
      this.setState({ className: '' });
    }
  };

  _toggleSubtask = debounce(() => {
    SubtaskApi.toggleSubTask(
      this.props.item.id,
      this.refs[this.props.item.id].checked,
      this.props.socket
    );
  }, 300);

  render() {
    return (
      <div className="subtask--div-draggable-container">
        <input
          type="checkbox"
          defaultChecked={this.props.item.isCompleted}
          onChange={() => this.toggleSubtask()}
          ref={this.props.item.id}
        />
        <span className={this.props.item.isCompleted ? 'subtask--crossed' : ''}>
          {this.props.item.name}
        </span>
      </div>
    );
  }
}

const mapStateToProps = ({ socket }) => ({ socket });
const mapDispatchToProps = {
  toggleSubtask,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubtaskDraggables);
