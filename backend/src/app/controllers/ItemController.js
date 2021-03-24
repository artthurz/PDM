import * as Yup from 'yup';
import Item from '../models/Item';

class ItemController {
  async index(req, res) {
    const itens = await Item.findAll({where: {status: true}});

    return res.json(itens);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      quantity: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const itemExists = await Item.findOne({ where: { name: req.body.name } });

    if (itemExists && itemExists.status) {
      return res.status(400).json({ error: 'Item already exists.' });
    } else if (itemExists) {
      await itemExists.update({status: true, quantity: req.body.quantity});
      return res.json(itemExists);
    }

    const { id, name, quantity, status } = await Item.create({
      ...req.body,
      status: true
    });

    return res.json({
      id,
      name,
      quantity
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      quantity: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, quantity } = req.body;

    const item = await Item.findByPk(req.params.id);

    if (!item) {
      return res.status(400).json({ error: 'Item dont exists.' });
    }else if (name !== item.name) {
      const itemExists = await Item.findOne({
        where: { name },
      });

      if (itemExists) {
        return res.status(400).json({ error: 'Item already exists.' });
      }
    }

    await item.update(req.body);

    return res.json({
      id: req.itemID,
      name,
      quantity
    });
  }

  async delete(req, res) {
    const item = await Item.findByPk(req.params.id);
    
    if (!item) {
      return res.status(400).json({ error: 'Item dont exists.' });
    }

    item.status = false;

    await item.save();

    return res.json(item);
  }
}

export default new ItemController();
