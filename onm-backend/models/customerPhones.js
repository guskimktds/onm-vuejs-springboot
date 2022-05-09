const mongoose = require('mongoose');

// Define Schemes
const customerPhoneSchema = new mongoose.Schema({
  // customerPhoneid: { type: Number, required: true, unique: true },
  usrId: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  numberType: { type: String, required: true },
  usrName: { type: String, required: true },
  subId: { type: String, required: true },
  alarmAuth: { type: String, default: false },
  approve: { type: String, default: false },
  approveDate: { type: String, default: false },
  statusCode: { type: String, default: false },
  mgtCode: { type: String, default: false },
  etc: { type: String, default: false }
});

// Create new todo document
customerPhoneSchema.statics.create = function (payload) {
  // this === Model
  const customerPhone = new this(payload);
  // return Promise
  return customerPhone.save();
};

// Find All
customerPhoneSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

// Find One by CustomerPhoneid
customerPhoneSchema.statics.findOneByCustomerPhoneid = function (customerPhoneid) {
  return this.findOne({ customerPhoneid });
};

// Find One by CustomerPhonesUserid
// customerPhoneSchema.statics.findOneByCustomerPhonesUserid = function (customerPhonesUserid) {
//   return this.find({ usrId: new RegExp(customerPhonesUserid, 'i') });
// };

customerPhoneSchema.statics.findByUsrId = function(usrId) {
  return this.find({ usrId: new RegExp(usrId, 'i') });
};

customerPhoneSchema.statics.findByUsrName = function(usrId, usrName) {
  return this.find({ $and: [
    {usrId: new RegExp(usrId, 'i')} ,
    {usrName: new RegExp(usrName, 'i')}
  ] });
};

// customerPhoneSchema.statics.findByQuery = function(usrId, usrName, phoneNumber, startDate, endDate ) {
//   return this.find({ 
//     $and: [
//       {usrId: new RegExp(usrId, 'i')} ,
//       {usrName: new RegExp(usrName, 'i')} ,
//       {phoneNumber: new RegExp(phoneNumber, 'i')}
//       // {approveDate:  { $in: [ startDate, endDate ] }}
//     ]    
//   });
// };

customerPhoneSchema.statics.findByQuery = function(usrId, usrName, phoneNumber, startDate, endDate ) {
  return this.find({ 
    usrId: new RegExp(usrId, 'i'),
    usrName: new RegExp(usrName, 'i'),
    phoneNumber: new RegExp(phoneNumber, 'i'),
    // approveDate:  { $in: [ startDate, endDate ] }
  });
};

// Find One by CustomerPhonesUsername
// customerPhoneSchema.statics.findOneByCustomerPhonesUsername = function (customerPhonesUsername) {
//   return this.find({ usrId: new RegExp(customerPhonesUsername, 'i') });
// };

// Update by CustomerPhoneid
customerPhoneSchema.statics.updateByCustomerPhoneid = function (customerPhoneid, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ customerPhoneid }, payload, { new: true });
};

// Delete by phoneNumber
customerPhoneSchema.statics.deleteByPhoneNumber = function (phoneNumber) {
  return this.remove({ phoneNumber });
};


// Create Model & Export
module.exports = mongoose.model('CustomerPhone', customerPhoneSchema);