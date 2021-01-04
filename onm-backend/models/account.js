const mongoose = require('mongoose');

// Define Schemes
const accountSchema = new mongoose.Schema({
  // accountid: { type: Number, required: true, unique: true },
  id: { type: String, required: true },
  name: { type: String, required: true },
  ip: { type: String, required: true },
  auth: { type: String, required: true },
  createDate: { type: String, required: true },
  updateDate: { type: String, default: false },
  editUser: { type: String, default: false }
});

// Create new todo document
accountSchema.statics.create = function (payload) {
  // this === Model
  const account = new this(payload);
  // return Promise
  return account.save();
};

// Find All
accountSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

// Find One by acountid
accountSchema.statics.findOneByAcountid = function (acountid) {
  return this.findOne({ acountid });
};

// Update by acountid
accountSchema.statics.updateByAcountid = function (acountid, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ acountid }, payload, { new: true });
};

// Delete by acountid
accountSchema.statics.deleteByAcountid = function (acountid) {
  return this.remove({ acountid });
};


// Create Model & Export
module.exports = mongoose.model('Account', accountSchema);