const { createError } = require("../utils/createError.js");
const Order = require("../models/order.model.js");
const Gig = require("../models/gig.model.js");
const Stripe = require("stripe");

exports.intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_KEY);
  const gig = await Gig.findById(req.params.id);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  });
  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
  try {
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
exports.confirm = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );
    if (order.isCompleted === true) {
      await Gig.findByIdAndUpdate(
        { _id: order.gigId },
        {
          $inc: { sales: 1 },
        }
      );
    }
    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};
