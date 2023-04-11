const { createError } = require("../utils/createError.js");
const Review = require("../models/review.model.js");
const Gig = require("../models/gig.model.js");

exports.createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Sellers cant create a review"));

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });
    if (review) return next(createError(403, "Already created review"));

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: {
        totalStars: req.body.star,
        starNumber: 1,
      },
    });

    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });

    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
exports.deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
