const express = require('express');
const Member = require("../models/memberModel");
const Score = require("../models/scoreModel");
const router = express.Router();

router.get('/members/:teamId', async (req, res) => {
    const { teamId } = req.params;
    try {
      const members = await Member.find({ team_id: teamId });
      if (!members) {
        return res.status(404).json({ message: 'Không tìm thấy thành viên nào trong tổ này' });
      }
      res.status(200).json(members);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.get('/member-exists', async (req, res) => {
  const { memberId } = req.body;
    try {
      const member = await Member.findById(memberId);
      
      if (member) {
          res.status(200).send({ exists: true, member });
      } else {
          res.status(404).send({ exists: false, message: 'Member not found' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Server error' });
  }
});

// API để lấy danh sách 20 thành viên có điểm total cao nhất
router.get('/top-20-members', async (req, res) => {
  try {
    const topMembers = await Member.find()
      .sort({ total_score: -1 }) // Sắp xếp theo điểm total giảm dần
      .limit(20); // Giới hạn số lượng thành viên trả về

    res.status(200).json(topMembers);
  } catch (error) {
    console.error('Error fetching top members:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;