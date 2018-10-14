var express = require('express');
var router = express.Router();

let { reminder, reminderListItem, S } = require('../../models')

router.post('/', async (req, res) => {
    let { name } = req.body;

    try{
        let createdReminder = await reminder.create({
            name: name
        })

        return res.status(201).json(createdReminder)
    } catch (err) {
        return res.status(500).json(err)
    }
})

router.get('/', async (req, res) => {
    try{
        let reminders = await reminder.findAll({
            order: [['createdAt', 'DESC']]
        })

        return res.status(200).json({lists: reminders})
    } catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router;
