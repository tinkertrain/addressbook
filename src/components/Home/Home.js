import React, { Component } from 'react';
import { Link } from 'react-router';
import Lockr from 'lockr';
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

        { this.state.showForm || this.state.currentContact !== null ?
          <section className="Container__Right">
            { this.state.currentContact !== null ? (
              <ContactDetails
                id={this.state.currentContact}
                contacts={this.state.contacts}
                updateUser={this.updateUser.bind(this)}
                deleteUser={this.deleteUser.bind(this)}
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
          : null
        }
      </div>
    );
  }

  handleContactClick(id) {
    this.setState({
      currentContact: id,
      showForm: false
    });
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
    let updatedContacts = this.state.contacts.concat(user);

    this.setState({
      contacts: updatedContacts,
      currentContact: null,
      showForm: false
    });

    Lockr.set('contacts', updatedContacts);
  }

  updateUser(id, newUser) {
    let { contacts } = this.state;
    let contact = contacts.filter((contact) => id === contact.id)[0];

    let updatedContacts = contacts.map((c) => {
      if (c.id === id) {
        for (let prop in c) {
          if (c.hasOwnProperty(prop) && prop !== 'id') {
            c[prop] = newUser[prop];
          }
        }
      }
      return c;
    });

    this.setState({
      contacts: updatedContacts,
      currentContact: null,
      showForm: false
    });

    Lockr.set('contacts', updatedContacts);
  }

  deleteUser(id) {
    let { contacts } = this.state;
    let updatedContacts = contacts.filter((c) => id !== c.id);

    this.setState({
      contacts: updatedContacts,
      currentContact: null,
      showForm: false
    });

    Lockr.set('contacts', updatedContacts);
  }
}
