const Member = require("../models/memberModel");

// Fetch members based on team ID
const getMembersByTeam = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const members = await Member.find({ teamId });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch members' });
  }
};

module.exports = {
  getMembersByTeam,
};
