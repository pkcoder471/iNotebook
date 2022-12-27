import mongoose from "mongoose";
const { Schema } = mongoose;

const NotesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true
  },
  tag: {
    type: String,
    default:"Gerneral"
  },
},{
    timestamps: true,
});

module.exports = mongoose.model('notes',NotesSchema);
