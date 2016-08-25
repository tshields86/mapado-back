import { Router } from 'express';
import db from '../db.js';
import { ObjectID } from 'mongodb';

export default function(){
  const api = Router();
  const collection = db.get().collection('taco');

  // since we are in the api folder it the REAL route is localhost:3000/api
  api.get('/tacos', (req, res) => {
    //we finally hit the database!
    collection.find().toArray((err, docs) => {
      res.json({ tacos : docs });
    });
  });

  api.get('/taco', (req, res) => {
    collection.findOne({"_id": ObjectID(req.body._id)},(err, collection) => {
      res.json(collection)
    });
  });

  api.post('/taco', (req, res) => {
    // create a new taco
    collection.insert(req.body, (err, result) => {
      res.json(result);
    });
  });

  api.put('/taco', (req, res) => {
    // edit a taco
    collection.update({"_id": ObjectID(req.body._id)}, {"name": req.body.name, "toppings": req.body.toppings}, {w:1} , (err, result) => {
      res.json(result);
    });

  });

  api.delete('/taco', (req, res) => {
    // delete a whole damn taco
    collection.remove({"_id": ObjectID(req.body._id)},(err, result) => {
      res.json(result);
    });
  });

  return api;
}
