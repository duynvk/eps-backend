const Team = require("../models/teamModel");

// Fetch teams based on group ID
const getTeamsByGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const teams = await Team.find({ groupId });
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams' });
  }
};

module.exports = {
  getTeamsByGroup,
};
