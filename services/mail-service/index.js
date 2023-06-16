const mailClient = require('../../lib/mail-client');
const { DEFAULT_EMAIL } = require('../../config');

const FORGOT_PASSWORD_SUBJECT = 'Forgot password - Change request email';
const FORGOT_PASSWORD_TITLE = 'It seems you forgot your password.';
const FORGOT_PASSWORD_TEXT = 'To set up new one please click on the link below.';


const sendForgetPasswordEmail = async (email, redirect_url) => {
  try {
    await mailClient.sendMail({
      from: DEFAULT_EMAIL,
      to: email,
      subject: FORGOT_PASSWORD_SUBJECT,
      html: `<h1>${FORGOT_PASSWORD_TITLE}</h1>
      <p>${FORGOT_PASSWORD_TEXT}</p>
      <a href=${redirect_url}>Reset password link</a>`,
      text: `${FORGOT_PASSWORD_TITLE}\n\n
      ${FORGOT_PASSWORD_TEXT}\n\n
      ${redirect_url}`,
    })
  }
  catch (err) {
    console.error(err);
  }
};

module.exports = {
  sendForgetPasswordEmail,
};
