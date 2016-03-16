import React, { Component } from 'react';
import countries from 'country-list/data.json';
import { validateEmail } from '../../utils/utils';

export class ContactForm extends Component {
  state = {
    errors: {}
  };

  render() {
    let { firstname, lastname, email, country } = this.props.data;
    let { handleCancelClick } = this.props;

    return (
      <div>
        <form className="AddNewContact" onSubmit={this.handleSubmitForm.bind(this)}>
          <div className="AddNewContact__Input">
            {this.state.errors.firstname ? (<div className="Error">Please enter a first name</div>) : null}
            <label htmlFor="firstname">First Name</label>
            <input ref={(c) => this._firstname = c} type="text" id="firstname" value={firstname}/>
          </div>
          <div className="AddNewContact__Input">
            {this.state.errors.lastname ? (<div className="Error">Please enter a last name</div>) : null}
            <label htmlFor="lastname">Last Name</label>
            <input ref={(c) => this._lastname = c} type="text" id="lastname" value={lastname}/>
          </div>
          <div className="AddNewContact__Input">
            {this.state.errors.email ? (<div className="Error">Please enter a valid email</div>) : null}
            <label htmlFor="email">Email</label>
            <input ref={(c) => this._email = c} type="email" id="email" value={email}/>
          </div>
          <div className="AddNewContact__Input">
            <label htmlFor="country">Country</label>
            <select ref={(c) => this._country = c} id="country" value={country}>
              {
                countries.map((c) => (
                  <option
                    key={c.code}
                    value={c.code}
                  >{c.name}</option>
                ))
              }
            </select>
          </div>
          <div className="AddNewContact__Input">
            <button type="submit">Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  handleSubmitForm(e) {
    e.preventDefault();
    let { saveUser } = this.props;
    let errors = {};
    let valid = true;

    let newUser = {
      firstname: this._firstname.value,
      lastname: this._lastname.value,
      country: this._country.value,
      email: this._email.value
    };

    if (newUser.firstname === '') {
      errors.firstname = true;
      valid = false;
    }
    if (newUser.lastname === '') {
      errors.lastname = true;
      valid = false;
    }
    if (!validateEmail(newUser.email) || newUser.email === '') {
      errors.email = true;
      valid = false;
    }

    if (!valid) {
      this.setState({ errors });
    }
    else {
      saveUser(newUser);
    }

  }
}
