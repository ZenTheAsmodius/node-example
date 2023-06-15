const connection = require('../../lib/mongo');
const mongoose = require('mongoose');
const crypto = require('crypto');

const options = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'users',
  toJSON: {
    transform: function (_doc, ret) {
      delete ret.hashed_password
      delete ret.salt
      delete ret.__v
    }
  }
};

const UserSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  salt: {
    type: String,
  },
  hashed_password: {
    type: String,
  }
}, options);

UserSchema.methods.encryptPassword = function (password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
};

UserSchema.virtual('password').set(function (password) {
  this._plain_password = password;
  this.salt = crypto.randomBytes(128).toString('hex');
  this.hashed_password = this.encryptPassword(password);
}).get(() => {
  return this._plain_password;
});

UserSchema.methods.checkPassword = function (password) {
  return this.encryptPassword(password).toString() === this.hashed_password;
};

UserSchema.methods.getClaims = function () {
  return {
    full_name: this.full_name,
    email: this.email,
    _id: this._id
  };
};


module.exports = connection.model('User', UserSchema);
