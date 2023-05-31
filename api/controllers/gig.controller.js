const { createError } = require('../utils/createError.js');
const Gig = require('../models/gig.model.js');
exports.createGig = async (req, res, next) => {
  if (!req.isSeller) {
    next(createError(403, 'Only Sellers can create a gig'));
  }

  try {
    const newGig = await Gig.create({
      userId: req.userId,
      ...req.body,
    });
    const saveGig = await newGig.save();
    res.status(201).send(saveGig);
  } catch (err) {
    res.status(400).json({ error: 'Validation error occurred' });
  }
};
exports.deleteGig = async (req, res, next) => {
  try {
    const gigModel = await Gig.findById(req.params.id);
    if (gigModel.userId !== req.userId) {
      next(createError(403, 'You can only delete your gig'));
    }
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send('Gig has been deleted');
  } catch (err) {
    next(err);
  }
};
exports.getGig = async (req, res, next) => {
  try {
    const gigModel = await Gig.findById(req.params.id);

    if (!gigModel) {
      return next(createError(403, 'Gig not found'));
    }
    res.status(200).send(gigModel);
  } catch (err) {
    console.log('error', err);
    next(err);
  }
};
exports.getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
    }),
    ...(q.search && { title: { $regex: q.search, $options: 'i' } }),
  };
  try {
    const gigModel = await Gig.find(filters).sort({ [q.sort]: -1 });

    if (gigModel.length < 1) {
      return next(createError(403, 'No gigs found'));
    }
    res.status(200).send(gigModel);
  } catch (err) {
    next(err);
  }
};
