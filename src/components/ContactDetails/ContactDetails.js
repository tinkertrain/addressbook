import React, { Component } from 'react';
import { Gravatar } from '../Gravatar/Gravatar';
import { contacts } from '../../data/contacts';
import { ContactForm } from '../ContactForm/ContactForm';

export class ContactDetails extends Component {
  state = {
    data: null,
    editing: false
  };

  render() {
    let { firstname, lastname, email, country } = this.state.data;
    let { backButtonHandler } = this.props;

    return (
      <div>
        { this.state.editing ? (
          <ContactForm data={this.state.data} handleCancelClick={this.handleCancelClick.bind(this)} />
        ) : (
        <div className="ContactDetails">
          <header>
            <button onClick={backButtonHandler}>Back</button>
            <div className="ContactDetails__Gravatar">
              <Gravatar email={email} />
            </div>
            <h1 className="ContactDetails__FullName">
              <span className="FullName__First">{ firstname }</span>
              <span className="FullName__Last">{ lastname }</span>
            </h1>
          </header>
          <section className="ContactDetails__Body">
            <div className="ContactDetails__Email">{ email }</div>
            <div className="ContactDetails__Country">{ country }</div>
          </section>
          <footer>
            <button onClick={this.handleEditClick.bind(this)}>Edit</button>
            <button>Delete</button>
          </footer>
        </div>
        )}
      </div>
    );
  }

  componentWillMount() {
    let { id } = this.props;
    let contact = contacts.filter((contact) => id === contact.id);

    this.setState({
      data: contact.length > 0 ? contact[0] : null
    });
  }

  componentWillReceiveProps(nextProps) {
    let { id } = nextProps;
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
}
