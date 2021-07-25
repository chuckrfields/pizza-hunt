const { Pizza } = require('../models');

// Main CRUD methods

const pizzaController = {
    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
        .populate({  //  chain the .populate() method onto your query to populate comments
            path: 'comments',
            select: '-__v'  // The minus sign - in front of the field indicates that we don't want it to be returned. If we didn't have it, it would mean that it would return only the __v field.
        })
        .select('-__v')
        .sort({ _id: -1 }) // sort in DESC order by the _id value
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get pizza by id
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
        .populate({  //  chain the .populate() method onto your query to populate comments
            path: 'comments',
            select: '-__v'  // The minus sign - in front of the field indicates that we don't want it to be returned. If we didn't have it, it would mean that it would return only the __v field.
        })
        .select('-__v')
        .then(dbPizzaData => {
            // if no pizza found, send 404
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create pizza
    // Note: Mongoose uses 'create' method whereas MongoDB uses 'insertOne' or 'insertMany'
    createPizza( { body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // update pizza
    updatePizza( { params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;