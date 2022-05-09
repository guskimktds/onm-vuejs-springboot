const mongoose = require('mongoose');

// Define Schemes
const codeSchema = new mongoose.Schema({
  // codeid: { type: Number, required: true, unique: true },
  codeClass: { type: String, required: true },
  code: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  desc: { type: String, required: true },
  orderby: { type: String, default: false },
  useYn: { type: String, default: false },
  createDate: { type: String, default: false }
});

// Create new todo document
codeSchema.statics.create = function (payload) {
  // this === Model
  const code = new this(payload);
  // return Promise
  return code.save();
};

// Find All
codeSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

// Find One by code
codeSchema.statics.findOneByCode = function (code) {
  return this.findOne({ code });
};

// Update by code
codeSchema.statics.updateByCode = function (code, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ code }, payload, { new: true });
};

// Delete by code
codeSchema.statics.deleteByCode = function (code) {
  return this.remove({ code });
};

// query to condition
codeSchema.statics.findByQuery = function(codeClass, code, name, type) {
  return this.find({ 
    codeClass: new RegExp(codeClass, 'i'),
    code: new RegExp(code, 'i'),
    name: new RegExp(name, 'i'),
    type: new RegExp(type, 'i')
    // approveDate:  { $in: [ startDate, endDate ] }
  });
};

// Create Model & Export
module.exports = mongoose.model('Code', codeSchema);