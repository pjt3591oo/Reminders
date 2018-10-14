var express = require('express');
var router = express.Router();

let { reminder, reminderListItem, S } = require('../../models')

router.get('/', async (req, res) => {
    try {
        let reminders = await reminder.findAll({
            order: [['createdAt', 'DESC']]
        })

        return res.status(200).json({lists: reminders})
    } catch (err) {
        return res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    let { name } = req.body;
    
    if ( !name ) {
        return res.status(404).json({msg: `parameter가 충분하지 않습니다.(name)`})
    }

    try{
        let createdReminder = await reminder.create({
            name: name
        })

        return res.status(201).json(createdReminder)
    } catch (err) {
        return res.status(500).json(err)
    }
})

router.put("/:listId", async (req, res) => {
    let { listId } = req.params;
    let { name } = req.body;
    
    if (!listId || !name ) {
        return res.status(404).json({msg: `parameter가 충분하지 않습니다.(listId, name)`})
    }

    try {
        let updatedCnt = await reminder.update({
            name: name
        },{
            where: {id: listId}
        })

        // updatedCnt가 0이면 404 반환
        if (!updatedCnt) {
            return res.status(404).json({msg: `${listId}는 존재하지 않습니다.`})
        }

        // update 처리가 됬다면 조회 후 반환
        let findedReminder = await reminder.findOne({
            id: listId
        })

        return res.status(201).json({id: findedReminder['id'], createdAt:findedReminder['createdAt']})
    } catch (err) {
        return res.status(500).json(err)
    }
})

router.delete("/:listId", async (req, res) => {
    let { listId } = req.params;

    if ( !listId ) {
        return res.status(404).json({msg: `parameter가 충분하지 않습니다.(name)`})
    }

    try {
        let deletedCnt = await reminder.destroy({
            where: {id: listId}
        })

        if (!deletedCnt){
            return res.status(404).json({msg: "삭제 대상없음"})
        }
        return res.status(201).json({msg: "성공적으로 삭제되었습니다."})
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }

})

module.exports = router;
