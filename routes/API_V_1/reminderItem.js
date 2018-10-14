var express = require('express');
var router = express.Router();

let { reminder, reminderListItem, S } = require('../../models')

router.get('/:listId', async (req, res) => {
    let { listId } = req.params

    if ( !listId ) {
        return res.status(404).json({msg: `parameter가 충분하지 않습니다.(listId)`})
    }

    try {
        let reminderListItems = await reminder.findOne({
            where: {
                id: listId
            },
            include: [
                {
                    model: reminderListItem,
                    where: {
                        $not: {
                            status: "deleted"
                        }
                    }
                }
            ]
        })

        if(!reminderListItems) {
            return res.status(404).json({msg: `${listId}에 등록된 item이 없습니다.`})
        }

        return res.status(200).json(reminderListItems)
    } catch (err) {
        return res.status(500).json(err)
    }
})

router.post('/:listId', async (req, res) => {
    let { listId } = req.params
    let { name, status } = req.body
    
    if ( !listId ) {
        return res.status(404).json({msg: `parameter가 충분하지 않습니다.(listId)`})
    }

    if ( !name || !status) {
        return res.status(404).json({msg: `parameter가 충분하지 않습니다.(name, status)`})
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


router.put('/:listId/:itemId', async (req, res) => {
    let { listId, itemId } = req.params
    let { name, status } = req.body

    if ( !listId ||  !itemId) {
        return res.status(404).json({msg: `parameter가 충분하지 않습니다.(listId, itemId)`})
    }

    try {
        let updatedCnt = await reminderListItem.update({
            name: name,
            status: status
        }, {
            where: {
                $and: [
                    {
                        reminderId: listId,
                    },{
                        id: itemId
                    }
                ]
            }
        })
        
        if (!updatedCnt[0]) {
            return res.status(404).json({msg: `${listId}의 ${itemId}는 존재하지 않습니다.`})
        }

        let findedReminderListItem = await reminderListItem.findOne({
            where: {
                $and: [
                    {
                        reminderId: listId,
                    },{
                        id: itemId
                    }
                ]
            }
        })

        return res.status(201).json(findedReminderListItem)
    } catch (err) {
        return res.status(500).json(err)
    }
})

router.delete('/:listId/:itemId', async (req, res) => {
    let { listId, itemId } = req.params

    if ( !listId ||  !itemId) {
        return res.status(404).json({msg: `parameter가 충분하지 않습니다.(listId, itemId)`})
    }

    try {
        // 조회를 먼저하는 이유는 update가 아니라 삭제를 하면 조회가 안 되기 때문.
        let findedReminderListItem = await reminderListItem.findOne({
            where: {
                $and: [
                    {
                        reminderId: listId,
                    },{
                        id: itemId
                    }
                ]
            }
        })

        let updatedCnt = await reminderListItem.update({
            status: "deleted"
        }, {
            where: {
                $and: [
                    {
                        reminderId: listId,
                    },{
                        id: itemId
                    },
                    {
                        $not: {
                            status: 'deleted'
                        }
                    }
                ]
            }
        })
        
        if (!updatedCnt[0]) {
            return res.status(404).json({msg: `${listId}의 ${itemId}는 존재하지 않습니다.`})
        }
        findedReminderListItem['status'] = "deleted"
        return res.status(201).json(findedReminderListItem)
    } catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router;