const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    member_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Member', 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    scores: {
        score_tp: { type: Number, default: 0 },     //1. TP
        score_lxr: { type: Number, default: 0 },    //2. Ace Laxaro
        score_tdm1l: { type: Number, default: 0 },  //3. TĐM BT 1L
        score4_tdm4l: { type: Number, default: 0 }, //4. TĐM BT 4L
        score_cn: { type: Number, default: 0 },     //5. CN
        score_pb70cd: { type: Number, default: 0 }, //6. PB 70 CĐ
        score_pbpr: { type: Number, default: 0 },   //7. PB Preaching
        score_ds: { type: Number, default: 0 },     //8. Đọc sách
        score_dst: { type: Number, default: 0 },    //9. Đọc sách + thi
        score_edu: { type: Number, default: 0 },    //10. Edu
        score_nh: { type: Number, default: 0 },     //11. Nhóm
        score_dt0: { type: Number, default: 0 },    //12. ĐT không đáp
        score_dt1: { type: Number, default: 0 },    //13. ĐT có đáp
        score_hh: { type: Number, default: 0 },     //14. HH
        score_kt: { type: Number, default: 0 }      //15. KT
    },
    total: { 
        type: Number, 
        default: 0 
    }
});

module.exports = mongoose.model('Score', scoreSchema);
