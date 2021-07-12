'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const CalorieSchema = new Schema(
  {
    'name': {
      type: String,
      required: true
    },
    'is_deleted': {
      type: Boolean,
      default: false
    }
  },
  {
    collection: 'Calorie',
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
  }
);

module.exports = mongoose.model('Calorie', CalorieSchema);