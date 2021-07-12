'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    'name': {
      type: String,
      required: true
    },
    'description': {
      type: String
    },
    'is_deleted': {
      type: Boolean,
      default: false
    }
  },
  {
    collection: 'Category',
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
  }
);

module.exports = mongoose.model('Category', CategorySchema);