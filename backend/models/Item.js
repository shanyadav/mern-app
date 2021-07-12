'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const SubCategorySchema = new Schema(
  {
    'category_id': {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
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
    collection: 'SubCategory',
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
  }
);

module.exports = mongoose.model('SubCategory', SubCategorySchema);