'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    'name': {
      type: String
    },
    'email': {
      type: String,
      required: true
    },
    'password': {
      type: String,
      required: true
    },
    'profile_img': {
      type: String
    },
    'contact_number': {
      type: String
    },
    'address_id': {
      type: mongoose.Schema.Types.ObjectId
    },
    'role': {
      type: String,
      enum: ['ADMIN', 'USER', 'SUPER_ADMIN'],
      default: 'USER'
    },
    'last_login_at': {
      type: Date
    },
    'is_email_verified': {
      type: Boolean,
      default: false
    },
    'is_deleted': {
      type: Boolean,
      default: false
    }
  },
  {
    collection: 'User',
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
  }
);

module.exports = mongoose.model('User', UserSchema);

