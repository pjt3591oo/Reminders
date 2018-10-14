var express = require('express');
var router = express.Router();

let { reminder, reminderListItem, S } = require('../../models')

router.post('/:listId', async (req, res) => {
    let { listId } = req.params
    let { name, status } = req.body
    
    if ( !listId ) {
        return res.status(404).json({msg: `parameter가 충분하지 않습니다.(listId)`})
    }

    try {
        let findedReminder = await reminder.findOne({
            where: {id: listId}
        })
        if (!findedReminder) {
            return res.status(404).json({msg: `${listId}에 대한 데이터가 없습니다`})
        }

        let createdReminderListItem = await reminderListItem.create({
            name: name,
            status: status,
            reminderId: listId
        })
        
        return res.status(201).json(createdReminderListItem)

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

module.exports = router;