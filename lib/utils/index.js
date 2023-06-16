function isEmail(email) {
  if (!email) return false;
  if (typeof email !== 'string') return false;

  var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return !!email.match(emailFormat);
}

function areRequiredInObject(keys, obj) {
  if (typeof obj !== 'object' || obj == null) return false;
  const objectProps = Object.keys(obj);

  return keys.every(elem => objectProps.includes(elem));
}

module.exports = {
  isEmail,
  areRequiredInObject
}