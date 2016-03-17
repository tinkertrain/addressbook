import React, { Component } from 'react';
import countries from 'country-list/data.json';
import { Gravatar } from '../Gravatar/Gravatar';
import { ContactForm } from '../ContactForm/ContactForm';

import './ContactDetails.scss';

export class ContactDetails extends Component {
  state = {
    data: null,
    editing: false
  };

  render() {
    let { firstname, lastname, email, country } = this.state.data;
    let { backButtonHandler, updateUser } = this.props;
    let countryName = countries.filter((c) => c.code === country)[0].name;

    return (
      <div>
        { this.state.editing ? (
          <ContactForm
            mode="Editing"
            data={this.state.data}
            updateUser={updateUser}
            handleCancelClick={this.handleCancelClick.bind(this)} />
        ) : (
        <div className="ContactDetails">
          <header className="ContentHeader">
            <div className="ContentHeader__Back">
              <button className="BackButton" onClick={backButtonHandler}>
                <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{fillRule: 'evenodd', clipRule:'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '1.41421'}}>
                  <g transform="matrix(-1,0,-0,1,24,0)">
                    <path d="M12,2C17.514,2 22,6.486 22,12C22,17.514 17.514,22 12,22C6.486,22 2,17.514 2,12C2,6.486 6.486,2 12,2ZM12,0C5.373,0 0,5.373 0,12C0,18.627 5.373,24 12,24C18.627,24 24,18.627 24,12C24,5.373 18.627,0 12,0ZM14,12L9.5,16.5L11.027,18L17,12L11.027,6L9.5,7.5L14,12Z" id="backArrow" />
                  </g>
                </svg>
              </button>
            </div>
            <div className="ContentHeader__Actions">
              <button className="button button--action" onClick={this.handleEditClick.bind(this)}>Edit</button>
              <button className="button button--warning" onClick={this.handleDeleteClick.bind(this)}>Delete</button>
            </div>
          </header>
          <section className="ContactDetails__Body">
            <div className="ContactDetails__Gravatar">
              <Gravatar email={email} />
            </div>
            <h1 className="ContactDetails__FullName">
              <span className="FullName__First">{ firstname }</span>{' '}<span className="FullName__Last">{ lastname }</span>
            </h1>
            <div className="ContactDetails__Email">{ email }</div>
            <div className="ContactDetails__Country">{ countryName }</div>
          </section>
        </div>
        )}
      </div>
    );
  }

  componentWillMount() {
    let { id, contacts } = this.props;
    let contact = contacts.filter((contact) => id === contact.id);

    this.setState({
      data: contact.length > 0 ? contact[0] : null
    });
  }

  componentWillReceiveProps(nextProps) {
    let { id, contacts } = nextProps;
    let prevId = this.props.id;

    if (prevId !== id) {
      let contact = contacts.filter((contact) => id === contact.id);

      this.setState({
        data: contact.length > 0 ? contact[0] : null
      });
    }
  }

  handleCancelClick() {
    this.setState({ editing: false });
  }

  handleEditClick() {
    this.setState({ editing: true });
  }

  handleDeleteClick() {
    let { id, deleteUser } = this.props;

    deleteUser(id);
  }
}
