import { Router } from 'express';
import db from '../db.js';
import { ObjectID } from 'mongodb';

export default function(){
  const api = Router();
  const collection = db.get().collection('tasks');

  // since we are in the api folder it the REAL route is localhost:3000/api
  api.get('/tasks', (req, res) => {
    // get all tasks
    console.log('Get all tasks');
    collection.find().toArray((err, docs) => {
      res.json({ tasks : docs });
    });
  });

  api.get('/task', (req, res) => {
    // get a single task
    console.log('Get a task');
    collection.findOne({"_id": ObjectID(req.body._id)},(err, collection) => {
      res.json(collection)
    });
  });

  api.post('/task', (req, res) => {
    // create a new task
    console.log('Post a task');
    console.log('req.body',req.body);
    collection.insert(req.body, (err, result) => {
      res.json(result);
    });
  });

  api.put('/task', (req, res) => {
    // edit a task
    console.log('Edit a task');
    collection.update({"_id": ObjectID(req.body._id)}, {"name": req.body.name, "toppings": req.body.toppings}, {w:1} , (err, result) => {
      res.json(result);
    });

  });

  api.delete('/task/:id', (req, res) => {
    // delete a task
    console.log('Delete a task');
    // console.log("req.params.id:", req.params.id);
    collection.remove({"_id": ObjectID(req.params.id)},(err, result) => {
      res.json(result);
    });
  });

  return api;
}
