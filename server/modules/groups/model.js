import mongoose, { Schema } from 'mongoose';

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Name must be 5 characters long'],
  },
  description: {
    type: String,
    required: true,
    minlength: [10, 'Description must be 5 characters long'],
  },
  eventDate: {
    type: Date,
  },
  category: {
    type: String,
  },
  meetups: [{
    type: Schema.Types.ObjectId,
    ref: 'Meetup',
  }],
}, { timestamps: true });

/**
 * Create a meetup and add it to the meetups array in the group
 */

GroupSchema.statics.addMeetup = async function (id, args) {
  // add the group id to the meetup group element
  // finally this is the author of the meetup
  const Meetup = mongoose.model('Meetup');
  const meetup = await new Meetup({ ...args, group: id });
  // Found the group with the id provide in the url
  // And push the meetup id in the meetups element
  const group = await this.findByIdAndUpdate(id, { $push: { meetups: meetup.id } });

  return {
    meetup: await meetup.save(),
    group
  };
};

export default mongoose.model('Group', GroupSchema);
