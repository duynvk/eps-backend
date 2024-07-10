const mongoose = require('mongoose');

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

// Method to update total score
memberSchema.methods.updateTotalScore = async function() {
    const Score = mongoose.model('Score');
    const scores = await Score.find({ member_id: this._id });
    
    if (scores.length > 0) {
      this.total_score = scores.reduce((sum, score) => sum + (score.total || 0), 0);
    } else {
      this.total_score = 0;
    }
    
    await this.save();
  };


const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
