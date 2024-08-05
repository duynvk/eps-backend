const express = require("express");
const router = express.Router();
const Group = require('../models/groupModel');
const auth = require('../middlewares/authMiddleware');

// Route để lấy danh sách các nhóm
router.get('/groups', async (req, res) => {
    try {
      const groups = await Group.find();
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

//Route to get group name
router.get('/groups/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.group.name)
    console.log(req.group.name)
})

// API cập nhật số lượng thành viên cho tất cả các nhóm
router.put('/groups/update-member-count', async (req, res) => {
  try {
    // Lấy danh sách tất cả các nhóm
    const groups = await Group.find();

    // Duyệt qua từng nhóm để tính toán và cập nhật số thành viên
    for (let group of groups) {
      await group.updateMemberCount();
      console.log(`Updated member count for group ${group._id}: ${group.member_count}`);
    }

    res.status(200).send({ message: 'Updated member count for all groups' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send({ error: 'Server error' });
  }
});

// API để lấy tất cả group và xếp hạng theo tổng điểm
router.get('/ranked-groups', async (req, res) => {
  try {
    const rankedGroups = await Group.find()
      .sort({ avg_score: -1 }); // Sắp xếp theo điểm total giảm dần

    res.status(200).json(rankedGroups);
  } catch (error) {
    console.error('Error fetching ranked groups:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
