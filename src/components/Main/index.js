import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class Main extends Component {
  render() {
    console.log('Main Rendered');
    return <div>TEST</div>;
  }
}

const mapStateToProps = ({ sidebar }) => ({ sidebar });
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
