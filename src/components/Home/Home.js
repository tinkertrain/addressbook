import React, { Component } from 'react';
import { Link } from 'react-router';
import { contacts } from '../../data/contacts';
import { Contact } from '../Contact/Contact';
import { ContactDetails } from '../ContactDetails/ContactDetails';
import { ContactForm } from '../ContactForm/ContactForm';

import './Home.scss';

export class Home extends Component {
  state = {
    currentContact: null,
    showForm: false,
    contacts
  };

  render() {
    return (
      <div>
        <section className="Container__Left">
          <header>
            <h1>AddressBook</h1>
            <button className="button button--mainAction" onClick={this.handleAddNewClick.bind(this)}>Add New Contact</button>
          </header>
          <div className="ContactList">
            <ul>
              { this.state.contacts.map((contact) => (
                <Contact
                  key={contact.id}
                  email={contact.email}
                  firstname={contact.firstname}
                  lastname={contact.lastname}
                  clickHandler={this.handleContactClick.bind(this, contact.id)}
                />
              ))}
            </ul>
          </div>
        </section>

        <section className="Container__Right">
          { this.state.currentContact !== null ? (
            <ContactDetails
              id={this.state.currentContact}
              contacts={this.state.contacts}
              backButtonHandler={this.handleBackClick.bind(this)}
            />
          ) : null }
          { this.state.showForm ? (
            <ContactForm
              data={{}}
              mode="Adding New Contact"
              handleCancelClick={this.handleCancelClick.bind(this)}
              saveUser={this.saveUser.bind(this)}/>
          ) : null }
        </section>
      </div>
    );
  }

  handleContactClick(id) {
    this.setState({ currentContact: id });
  }

  handleBackClick() {
    this.setState({ currentContact: null });
  }

  handleAddNewClick() {
    this.setState({
      currentContact: null,
      showForm: true
    });
  }

  handleCancelClick() {
    this.setState({
      currentContact: null,
      showForm: false
    });
  }

  saveUser(user) {
    user.id = this.state.contacts.length;

    this.setState({
      contacts: this.state.contacts.concat(user),
      currentContact: null,
      showForm: false
    });

  }
}
