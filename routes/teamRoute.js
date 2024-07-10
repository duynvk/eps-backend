const express = require('express');
const Team = require("../models/teamModel");
const Member = require('../models/memberModel');
const router = express.Router();

router.get('/teams/:groupId', async (req, res) => {
    const { groupId } = req.params;
    try {
      const teams = await Team.find({ group_id: groupId });
      if (!teams) {
        return res.status(404).json({ message: 'Không tìm thấy tổ nào trong nhóm này' });
      }
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// API cập nhật số thành viên cho tất cả các đội
router.put('/teams/update-member-count', async (req, res) => {
  try {
      // Lấy danh sách tất cả các đội
      const teams = await Team.find();

      // Duyệt qua từng đội để tính toán và cập nhật số thành viên
      for (let team of teams) {
          await team.updateMemberCount();
          console.log(`Updated member count for team ${team._id}: ${team.member_count}`);
      }

      res.status(200).send({ message: 'Updated member count for all teams' });
  } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send({ error: 'Server error' });
  }
});

// API để lấy danh sách 20 team có điểm total cao nhất
router.get('/top-20-teams', async (req, res) => {
  try {
    const topTeams = await Team.find()
      .sort({ avg_score: -1 }) // Sắp xếp theo điểm avg giảm dần
      .limit(20); // Giới hạn số lượng team trả về

    res.status(200).json(topTeams);
  } catch (error) {
    console.error('Error fetching top teams:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
