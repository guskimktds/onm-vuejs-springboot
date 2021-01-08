const mongoose = require('mongoose');

// Define Schemes
const localCodeSchema = new mongoose.Schema({
  // codeid: { type: Number, required: true, unique: true },
  localgwid: { type: String, required: true },
  name: { type: String, required: true },
  serverurl: { type: String, required: true },
  socketurl: { type: String, required: true },
  pattern: { type: String, required: true },
  ecurl: { type: String, required: true },
  ldms: { type: String, default: false },
  stmcnt: { type: Number, default: false },
  vacnt: { type: Number, required: true },
  intcode: { type: String, required: true },
  mqurl: { type: String, default: false },
  editor: { type: String, default: false },
  editDate: { type: String, default: false }
});

// Create new todo document
localCodeSchema.statics.create = function (payload) {
  // this === Model
  const localcode = new this(payload);
  // return Promise
  return localcode.save();
};

// Find All
localCodeSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

// Find One by code
localCodeSchema.statics.findOneByCode = function (localcode) {
  return this.findOne({ localcode });
};

// Update by code
localCodeSchema.statics.updateByCode = function (filter, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  console.log('findOneAndUpdate : ',filter)
  console.log('findOneAndUpdate : ',payload)
  
  return this.findOneAndUpdate( filter, payload, { returnNewDocument: true });
};

// Delete by code
localCodeSchema.statics.deleteByCode = function (localcode) {
  return this.remove({ localcode });
};

// query to condition
localCodeSchema.statics.findByQuery = function(url, name, websocket) {
  return this.find({ 
    codeClass: new RegExp(url, 'i'),
    code: new RegExp(name, 'i'),
    name: new RegExp(websocket, 'i')
    // approveDate:  { $in: [ startDate, endDate ] }
  });
};

// Create Model & Export
module.exports = mongoose.model('LocalCode', localCodeSchema);