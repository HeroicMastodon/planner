const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const users = require("./users.js");
const User = users.model;

const eventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    name: String,
    description: String,
    date: String,
    weekDay: String,
    time: String,
})

const Event = mongoose.model('Event', eventSchema);

// Add event
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
    // check parameters
    const event = new Event({
      user: req.user,
      name: req.body.name,
      description: req.body.description,
      weekDay: req.body.weekDay,
      date: req.body.date,
      time: req.body.time,
    });
    try {
      await event.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  // get my events
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
    // return events

    try {
      let events = await Event.find({
        user: req.user
      }).sort({
        created: -1
      });
      return res.send(events);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  router.get("/one", async (req, res) => {
    try {
      let event = await Event.findOne({
        _id: req.query.ID
      })
      return res.send(event);
    } catch (error) {
      return error;
    }
  })

  router.put('/:id', async (req, res) => {
    console.log("I made it!")
    try{
      console.log(req.params.id)
      let event = await Event.findOne({
        _id: req.params.id
      });
      event.name = req.body.name;
      event.date = req.body.date;
      event.time = req.body.time;
      event.description = req.body.description;
      event.weekDay = req.body.weekDay;
      event.save();
      res.sendStatus(200);
    }
    catch (error){
      console.log(error)
      res.sendStatus(500)
    }
  });

  router.delete('/:id', async (req, res) => {
    try{
        await Event.deleteOne({
          _id: req.params.id
        });
        res.sendStatus(200);
      }
      catch (error) {
        console.log(error)
        res.sendStatus(500)
      }
  })

  module.exports = {
    model: Event,
    routes: router,
  }

 