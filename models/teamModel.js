const mongoose = require('mongoose');
const Member = require('./memberModel');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
      },
    group_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Group', 
        required: true 
    },
    total_score: { type: Number, default: 0 },
    avg_score: { type: Number, default: 0 },
    member_count: { type: Number, default: 0 }
});

// Method to update member count
teamSchema.methods.updateMemberCount = async function() {
    const team = this;
    const memberCount = await Member.countDocuments({ team_id: team._id });
    team.member_count = memberCount;
    await team.save();
};

// Method to update total score for team
teamSchema.methods.updateTotalScore = async function () {
    const members = await Member.find({ team_id: this._id });

    if (members.length > 0) {
        this.total_score = members.reduce((sum, member) => sum + (member.total_score || 0), 0);
        this.avg_score = this.total_score / this.member_count;
    } else {
        this.total_score = 0;
        this.avg_score = 0;
    }

    await this.save();
};


module.exports = mongoose.model('Team', teamSchema);
