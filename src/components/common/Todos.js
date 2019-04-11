import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodosByListId } from '../../redux/actions/todosActions';

class Todos extends Component {
  componentWillMount() {
    this.props.getTodosByListId(this.props.match.params.id);
  }

  render() {
    console.log(this.props.todos);
    return (
      <div style={{ textAlign: 'center' }}>
        {this.props.match.params.id} {this.props.todos.length}
      </div>
    );
  }
}
const mapStateToProps = ({ todos }) => ({ todos });
const mapDispatchToProps = {
  getTodosByListId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
