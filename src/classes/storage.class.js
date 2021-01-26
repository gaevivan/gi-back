import filter from '../functions/filter.function.js';
import getUuidV4 from '../functions/get-uuid-v4.function.js';
import isUuidV4 from '../functions/is-uuid-v4.function.js';

export default class Storage {
  constructor(
    database
  ) {
    this.database = database;
  }

  async entity(
    entity
  ) {
    const collection = this.database.collection(entity);
    return collection.find({entity}).toArray()
      .then(result => {
        return result;
      });
  }

  async create(
    entity, data
  ) {
    const dataWithIds = data.map((dataItem) => {
      const withoutValidUuid = !dataItem.id || !isUuidV4(dataItem.id);
      if (withoutValidUuid) {
        dataItem.id = getUuidV4();
      }
      return dataItem;
    });
    const collection = this.database.collection(entity);
    return collection.insertMany(dataWithIds)
      .then(_result => {
        return dataWithIds;
      });
  }

  async select(
    entity, filterItem
  ) {
    const collection = this.database.collection(entity);
    return collection.find().toArray()
      .then(result => {
        return filter(result, filterItem);
      });
  }

  // async update(
  //   entity, filter, data
  // ) {
  //   const collection = this.database.collection(entity);
  //   return collection.updateMany().toArray()
  //     .then(result => {
  //       return filter(result, filterItem);
  //     });
  // }

  // async delete(
  //   entity, filter
  // ) {
  //   return 'delete';
  // }
}
