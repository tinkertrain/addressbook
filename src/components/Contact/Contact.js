import React, { Component } from 'react';
import { Gravatar } from '../Gravatar/Gravatar';
import './Contact.scss';

export class Contact extends Component {
  render() {
    let { firstname, lastname, email, clickHandler } = this.props;

    return (
      <li className="ContactItem" onClick={clickHandler}>
        <button className="ContactItem__ActionWrapper">
          <div className="ContactItem__Gravatar">
            <Gravatar email={email} />
          </div>
          <div className="ContactItem__FullName">
            <span className="FullName__First">{ firstname }</span>{' '}<span className="FullName__Last">{ lastname }</span>
          </div>
        </button>
      </li>
    );
  }
}
