const catchAsync = require('./../utils/catchAsync');
const ApiFeature = require('./../utils/apiFeature');

//=>
// get all the data
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.userId) filter = { user: req.params.userId };

    const features = new ApiFeature(req.query, Model.find(filter))
      .filter()
      .selectFields()
      .sort()
      .paginate();

    const docs = await features.query;

    res.status(200).json({
      status: 'success',
      data: {
        docs,
      },
    });
  });

//=>
// get a specific one data
exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

//=>NOTE
//   get user specific data --Pending
exports.getUserSpecific = (Model) => {
  catchAsync(async (req, res, next) => {
    const user = req.params.user;
  });
};

//=>
// create data
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

//=>
// Update data
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

// =>
//  Delete data
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
    });
  });
