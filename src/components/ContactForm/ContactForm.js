import React, { Component } from 'react';
import countries from 'country-list/data.json';
import { validateEmail } from '../../utils/utils';

import './ContactForm.scss';

export class ContactForm extends Component {
  state = {
    errors: {}
  };

  render() {
    let { firstname, lastname, email, country } = this.props.data;
    let { mode, handleCancelClick } = this.props;

    return (
      <div>
        <form className="ContactForm" onSubmit={this.handleSubmitForm.bind(this)}>
          <header className="ContentHeader">
            <div className="ContentHeader__Back">
              <button className="BackButton" onClick={handleCancelClick}>
                <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{fillRule: 'evenodd', clipRule:'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '1.41421'}}>
                  <g transform="matrix(-1,0,-0,1,24,0)">
                    <path d="M12,2C17.514,2 22,6.486 22,12C22,17.514 17.514,22 12,22C6.486,22 2,17.514 2,12C2,6.486 6.486,2 12,2ZM12,0C5.373,0 0,5.373 0,12C0,18.627 5.373,24 12,24C18.627,24 24,18.627 24,12C24,5.373 18.627,0 12,0ZM14,12L9.5,16.5L11.027,18L17,12L11.027,6L9.5,7.5L14,12Z" id="backArrow" />
                  </g>
                </svg>
              </button>
            </div>
            <div className="ContentHeader__Mode">{ mode }</div>
            <div className="ContentHeader__Actions">
              <button className="button button--action" type="submit">Save</button>
              <button className="button button--warning" onClick={handleCancelClick}>Cancel</button>
            </div>
          </header>
          <div className="ContactForm__Body">
            <div className="ContactForm__Input">
              {this.state.errors.firstname ? (<div className="Error">Please enter a first name</div>) : null}
              <label htmlFor="firstname">First Name</label>
              <input ref={(c) => this._firstname = c} type="text" id="firstname" defaultValue={firstname}/>
            </div>
            <div className="ContactForm__Input">
              {this.state.errors.lastname ? (<div className="Error">Please enter a last name</div>) : null}
              <label htmlFor="lastname">Last Name</label>
              <input ref={(c) => this._lastname = c} type="text" id="lastname" defaultValue={lastname}/>
            </div>
            <div className="ContactForm__Input">
              {this.state.errors.email ? (<div className="Error">Please enter a valid email</div>) : null}
              <label htmlFor="email">Email</label>
              <input ref={(c) => this._email = c} type="email" id="email" defaultValue={email}/>
            </div>
            <div className="ContactForm__Input">
              <label htmlFor="country">Country</label>
              <select ref={(c) => this._country = c} id="country" defaultValue={country}>
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
          </div>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this._firstname.select();
  }

  handleSubmitForm(e) {
    e.preventDefault();

    let { saveUser, updateUser, mode } = this.props;
    let errors = {};
    let valid = true;

    let newUser = {
      firstname: this._firstname.value.trim(),
      lastname: this._lastname.value.trim(),
      country: this._country.value,
      email: this._email.value.trim()
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
      if (mode === 'Adding New Contact') {
        saveUser(newUser);
      }
      else {
        updateUser(this.props.data.id, newUser);
      }
    }
  }
}
