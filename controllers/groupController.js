const Group = require("../models/groupModel"); 

const getGroups = async (req, res) => {
  try {
    const groups = await Group.find(); 
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getGroups };
