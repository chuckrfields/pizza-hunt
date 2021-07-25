const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema({
    pizzaName: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      default: 'Large'
    },
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
  },
  {
      toJSON: {
          virtuals: true,
          getters: true
      },
      id: false
   }
  );

  // Virtuals allow you to add virtual properties to a document that aren't stored in the database.
  // get total comment & replies count on retrieval
  PizzaSchema.virtual('commentCount').get(function() {
    // Here we're using the .reduce() method to tally up the total of every comment with its replies
    // In its basic form, .reduce() takes two parameters, an accumulator and a currentValue. Here, the accumulator is total, and the currentValue is comment
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
  })

  // create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;