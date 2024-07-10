const express = require('express');
const Score = require("../models/scoreModel");
const Member = require("../models/memberModel");
const Team = require("../models/teamModel");
const Group = require("../models/groupModel");
const router = express.Router();

// API để nhập điểm cho member
router.post('/enter-score', async (req, res) => {
  const { memberId, date, scores } = req.body;
  try {
    // Kiểm tra xem member có tồn tại không
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Tính tổng điểm
    const total = Object.values(scores).reduce((sum, score) => sum + (Number(score) || 0), 0);

    // Tạo một bản ghi điểm mới
    const newScore = new Score({
      member_id: memberId,
      date,
      scores,
      total
    });

    // Lưu bản ghi điểm
    await newScore.save();

    // Cập nhật tổng điểm của member
    await member.updateTotalScore();

    // Lấy thông tin team của member và cập nhật tổng điểm của team
    const team = await Team.findById(member.team_id);
    if (team) {
      await team.updateTotalScore();
    }

    // Lấy thông tin group của team và cập nhật tổng điểm của group
    const group = await Group.findById(member.group_id);
    if (group) {
      await group.updateTotalScore();
    }

    res.status(201).json({ 
      message: 'Score entered successfully', 
      score: newScore,
      updatedMemberTotalScore: member.total_score
    });

  } catch (error) {
    console.error('Error entering score:', error);
    res.status(500).json({ message: 'Error entering score', error: error.message });
  }
});

module.exports = router;