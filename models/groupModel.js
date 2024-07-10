const mongoose = require('mongoose');
const Member = require('./memberModel');
const Team = require('./teamModel');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  total_score: { type: Number, default: 0 },
  avg_score: { type: Number, default: 0 },
  member_count: { type: Number, default: 0 }
});

// Method to update member count
groupSchema.methods.updateMemberCount = async function() {
  const group = this;
  const memberCount = await Member.countDocuments({ group_id: group._id });
  group.member_count = memberCount;
  await group.save();
};

// Method to update total score for group
groupSchema.methods.updateTotalScore = async function () {
  const teams = await Team.find({ group_id: this._id });

  if (teams.length > 0) {
      this.total_score = teams.reduce((sum, team) => sum + (team.total_score || 0), 0);
      this.avg_score = this.total_score / this.member_count;
  } else {
      this.total_score = 0;
      this.avg_score = 0;
  }

  await this.save();
};


module.exports = mongoose.model('Group', groupSchema);
