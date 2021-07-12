'use strict';

const _ = require('lodash');
const config = require('config');
const request= require('request');
const nodemailer = require('nodemailer');
const {RuntimeError, ValidationError} = require('../helpers/bts-error-utils');

const transport = nodemailer.createTransport({
  // host: "smtp.mailtrap.io",
  // port: 2525,
  // auth: {
  //   user: "e85fa32c198d61",
  //   pass: "52ef153964abbc"
  // }
  service: 'gmail',
  auth: {
    user: 'kiran.tophat@gmail.com',
    pass: 'Tophat@1234'
  }
});

module.exports = {
  sendMail: (options, callback) => {
    let data = _.extend(
      options,
      {
        from: 'kiran.tophat@gmail.com'
      }
    );
    transport.sendMail(data, (err, info) => {
        if (err) {
          let runtimeError = new RuntimeError(
            'There was an error while sending mail',
            err
          );
          return callback(runtimeError);
        }
        return callback();
    });
  }
};
