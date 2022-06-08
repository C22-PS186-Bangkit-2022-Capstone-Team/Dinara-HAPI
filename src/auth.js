const snapClientHandler = async (request, h) => {
  try {
    const monumentList = 'await'; // dataSchema.findById('6298c29c5817e187d11f28df');
    const response = h.response({
      status: 'success',
      data: {
        monuments: monumentList.monuments,
      },
    });
    return response;
  } catch (error) {
    const response = h.response({
      status: 'error',
      message: error.message || 'Data not found',
    });
    response.code(404);
    return response;
  }
};

module.exports = { snapClientHandler };
