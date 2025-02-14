const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');

const Request = require('./../models/requestModel');

//get all requests
exports.getRequests = factory.getAll(Request);

//get single request details
exports.getRequest = factory.getOne(Request);

//create Request
exports.createRequest = factory.createOne(Request);

//update Request data/details
exports.updateRequest = factory.updateOne(Request);

//delete the entire request
exports.deleteRequest = factory.deleteOne(Request);

//resolve the request
exports.resolve = catchAsync(async (req, res, next) => {
  const resolvedRequest = await Request.findByIdAndUpdate(req.params.id, {
    resolved: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: resolvedRequest,
    },
  });
});
