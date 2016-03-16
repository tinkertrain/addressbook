import React, { Component } from 'react';
import { Link } from 'react-router';
import { contacts } from '../../data/contacts';
import { Contact } from '../Contact/Contact';
import { ContactDetails } from '../ContactDetails/ContactDetails';
import { ContactForm } from '../ContactForm/ContactForm';

export class Home extends Component {
  state = {
    currentContact: null,
    showForm: false
  };

  render() {
    return (
      <div>
        <section className="Container__Left">
          <button onClick={this.handleAddNewClick.bind(this)}>Add New Contact</button>
          <div className="ContactList">
            <ul>
              { contacts.map((contact) => (
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
        <div className="Container__Right">
          { this.state.currentContact !== null ? (
            <ContactDetails
              id={this.state.currentContact}
              backButtonHandler={this.handleBackClick.bind(this)}
            />
          ) : null }
          { this.state.showForm ? (
            <ContactForm
              data={{}}
              handleCancelClick={this.handleCancelClick.bind(this)}
              saveUser={this.saveUser.bind(this)}/>
          ) : null }
        </div>
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
    console.log(user);
  }
}
