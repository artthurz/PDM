import Sequelize, { Model } from 'sequelize';

class Item extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
        status: Sequelize.BOOLEAN
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Item;
