const mongoose = require('mongoose');
import MONGODB_URL from './config/.env'

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    const userSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, required: true },
      group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
      team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
    });

    const User = mongoose.model('User', userSchema);
    
    const memberSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Please enter your name!"],
          },
        team_id: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Team', required: true 
        },
        group_id: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Group', 
            required: true 
        },
        total_score: {
            type: Number,
            default: 0
        }
    });

    const Mem = mongoose.model('User', userSchema);

    Promise.all([
      User.init(),
      Group.init(),
      Team.init(),
      Score.init()
    ]).then(() => {
      console.log('Collections created');
      mongoose.disconnect();
    }).catch(err => {
      console.error('Error creating collections:', err);
      mongoose.disconnect();
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
