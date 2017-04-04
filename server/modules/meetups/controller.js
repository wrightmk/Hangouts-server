import Meetup from './model';

export const createMeetup = async(req, res) => {
  const {title, description} = req.body;
  const newMeetup = new Meetup({title, description})

  try {
    return res.status(200).json({meetup: await newMeetup.save()}); //await similar to using a callback comes from async
  } catch(e) {
    return res.status(e.status).json({error: true, message: 'error with Meetup'});
  }
}


export const getAllMeetups = async(req, res) => {
  try {
    return res.status(200).json({meetups: await Meetup.find({})}); //await similar to using a callback comes from async
  } catch(e) {
    return res.status(e.status).json({error: true, message: 'error with Meetup'});
  }
}
