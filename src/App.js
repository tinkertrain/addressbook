import React, { Component } from 'react';

export class App extends Component {

  render() {
    return (
      <div>
        <section className="main">
          {this.props.children}
        </section>
      </div>
    );
  }

}
