const connection = require('../../lib/mongo');
const mongoose = require('mongoose');
const crypto = require('crypto');

const options = {
  collection: 'password-recovery',
  toJSON: {
    transform: function (_doc, ret) {
      delete ret.__v
    }
  }
};

const PasswordRecoverySchema = new mongoose.Schema({
  email: {
    type: String
  },
  created_at: {
    type: Date, expires: '15m', default: Date.now
  },
  code: {
    type: String
  },
}, options);

PasswordRecoverySchema.pre('save', function(next) {
  this.code = crypto.randomBytes(64).toString('hex');
  next();
});

module.exports = connection.model('PasswordRecovery', PasswordRecoverySchema);