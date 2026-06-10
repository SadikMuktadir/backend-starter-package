import { Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query?.searchTerm;

    if (typeof searchTerm === 'string' && searchTerm.trim()) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm.trim(), $options: 'i' },
        })),
      });
    }

    return this;
  }

  filter() {
    const queryObject = { ...this.query };

    const excludeFields = [
      'searchTerm',
      'page',
      'limit',
      'sortOrder',
      'sortBy',
      'fields',
    ];

    excludeFields.forEach((key) => delete queryObject[key]);

    this.modelQuery = this.modelQuery.find(queryObject);

    return this;
  }

  pagination() {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  sort() {
    const sortBy = this.query?.sortBy as string;
    const sortOrder = this.query?.sortOrder as string;

    if (sortBy) {
      const sortTerm = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
      this.modelQuery = this.modelQuery.sort(sortTerm);
    }

    return this;
  }

  fields() {
    let fields = '-__v';

    if (this.query?.fields) {
      fields = (this.query.fields as string).split(',').join(' ');
    }

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }
}

export default QueryBuilder;
