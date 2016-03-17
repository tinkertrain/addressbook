import React, { Component } from 'react';
import './App.scss';

export class App extends Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}
