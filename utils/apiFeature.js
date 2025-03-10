class ApiFeature {
  constructor(queryString, query) {
    this.queryString = queryString; //i.e. price=50
    this.query = query; //i.e Model.find()
  }

  //filter, fields(select), sortBy, pagination
  //=>
  // 1 Filter out unnecessary parts for the query
  filter() {
    //Filtering out unnecessary parameters for query
    let queryStr = { ...this.queryString };
    const excludedFields = ['page', 'limit', 'sortBy', 'fields'];
    excludedFields.forEach((el) => delete queryStr[el]);

    //doing actual filter (similar to where statement in a query)
    queryStr = JSON.stringify(queryStr);
    queryStr = JSON.parse(
      queryStr.replace(/\bgt|lt|gte|lte\b/g, (match) => `$${match}`),
    );
    this.query = this.query.find(queryStr);

    return this;
  }

  //=>
  // 2 Select the specified fields only
  selectFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }
    return this;
  }

  // =>
  //  3 Sort the data according to specified fields
  sort() {
    let sortBy;
    if (this.queryString.sortBy) {
      sortBy = this.queryString.sortBy.split(',').join(' ');
    } else sortBy = '-createdAt';
    this.query = this.query.sort(sortBy);
    return this;
  }

  //=>
  // 4 pagination
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 200;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeature;
