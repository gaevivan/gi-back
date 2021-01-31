import filter from '../functions/filter.function.js';
import getUuidV4 from '../functions/get-uuid-v4.function.js';
import isNil from '../functions/is-nil.function.js';
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
    if (!Array.isArray(data)) {
      data = [data];
    }
    const dataWithIds = data.map((dataItem) => {
      const withoutValidUuid = !dataItem.id || !isUuidV4(dataItem.id);
      if (withoutValidUuid) {
        dataItem.id = getUuidV4();
      }
      dataItem._id = dataItem.id;
      return dataItem;
    });
    const collection = this.database.collection(entity);
    return collection.insertMany(dataWithIds)
      .then(_result => {
        const dataWithoutOid = dataWithIds.map((dataItem) => {
          delete dataItem._id;
          return dataItem;
        })
        return dataWithoutOid;
      });
  }

  async select(
    entity, filterItem, offset = null, limit = null
  ) {
    const collection = this.database.collection(entity);
    return collection.find({}, {projection: {"_id": 0}}).toArray()
      .then(result => {
        const filtered = filter(result, filterItem);
        const offseted = isNil(offset) ? filtered : filtered.slice(offset);
        const limited = isNil(limit) ? offseted : offseted.slice(0, limit);
        return limited;
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
