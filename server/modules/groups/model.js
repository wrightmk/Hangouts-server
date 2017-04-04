import mongoose, {Schema} from 'mongoose';

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, 'Name must be 5 characters long']
  },
  description: {
    type: String,
    required: true,
    minLength: [5, 'Description must be 10 characters long']
  },
  category: {
    type: String,
    required: String
  },
  meetups: [{
    type: Schema.Types.ObjectId,
    ref: 'Meetup'
  }]
}, {timestamps: true});

GroupSchema.statics.addMeetup = async function(id, args) {
 // const Meetup = mongoose.model('Meetup');
 // const group = await this.findById(id);
 // const meetup = await new Meetup({...args, group})
 // group.meetups.push(meetup);
 // const result = await Promise.all([meetup.save(), group.save()])
 // return result;

 // refactored =>
 // create a meetup and add it to the metups array
 const Meetup = mongoose.model('Meetup');

 // we add the group id to the meetup element
 // this is the author of the meetup
 const meetup = await new Meetup({...args, group: id})

 //we find the group with the id provided in the url and then push the meetup id into the meetups element
 // $push is a mongodb thing
 await this.findByIdAndUpdate(id, { $push: {meetups: meetup.id}});


 return {
   meetup: await meetup.save()
  };
}

export default mongoose.model('Group', GroupSchema);
