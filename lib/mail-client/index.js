const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const { MAILGUN_API_KEY, MAILGUN_URI } = require('../../config');

class MailClient {
  client;

  constructor(client) {
    this.client = client;
  }

  sendMail({ to, from, subject, html, text }) {
    return this.client.messages.create(MAILGUN_URI, {
      from,
      to,
      subject,
      text,
      html,
    })
  }
}

module.exports = new MailClient(
  mailgun.client({
    username: 'api',
    key: MAILGUN_API_KEY
  })
);
