/*global $:true*/

import React, { Component } from 'react';

class Contact extends Component {
  constructor(props){
    super(props);
    this.state = {
      contactEmail: '',
      contactMessage: '',
      successMsg: ''
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleChangeMsg = this._handleChangeMsg.bind(this);
  }

  // Change <input> value state onUpdate (while typing) so input is updated
  _handleChange(e) {
    this.setState({
      contactEmail: e.target.value,
    });
  }
  // Change <textarea> value state onUpdate (while typing) so input is updated
  _handleChangeMsg(e) {
    this.setState({
      contactMessage: e.target.value
    });
  }

  // Handle form onSubmit
  _handleSubmit(e) {
    // Prevent form default action "load onSubmit" to be triggered
    e.preventDefault();

    // Perform an asynchronous HTTP (Ajax) request.
    $.ajax({
      // A string containing the URL to which the request is sent. If not production environment, send request to './getMail'
      url: process.env.NODE_ENV !== "production" ? '/getMail' : "http://www.fransbernhard.se/magden/php/mailer.php",
      // POST request
      type: 'POST',
      // Submit content in contactEmail and contactMessage state
      data: {
        'form_email': this.state.contactEmail,
        'form_msg': this.state.contactMessage
      },
      // If success..
      success: function(data) {
        this.setState({
          successMsg: '<h1>Kontakt skickad!</h1><p>Återkommer så fort som möjligt.</p>'
        });
        $('#formContact').slideUp();
        $('#formContact').after(this.state.successMsg);
      }.bind(this),
      // If fail/error..
      error: function(xhr, status, err) {
        console.log(xhr, status);
        console.log(err);
        this.setState({
          contactMessage: 'Sorry det blev fel. Försök gärna igen, eller mejla mig direkt på magdamargaretha@gmail.com',
        });
      }.bind(this)
    });
  }

  render() {
    return (
      <div className="contact" id="contact">
        <div className="filter">
          <form className="form" onSubmit={this._handleSubmit} id="formContact">
            <input id="formEmail" type="email" placeholder="email" name="formEmail" value={this.state.contactEmail} onChange={this._handleChange} required/>
            <textarea id="formMsg" name="formMsg" placeholder="meddelande" rows="8" cols="40" value={this.state.contactMessage} onChange={this._handleChangeMsg} required></textarea>
            <input type="submit" value="Skicka" className="btn--cta" id="btn-submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default Contact;
