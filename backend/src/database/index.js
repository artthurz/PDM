import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Item from '../app/models/Item';

const models = [
  Item,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }

}

export default new Database();
