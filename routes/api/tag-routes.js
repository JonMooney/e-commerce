const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find all tags
router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({
      // Include associated products
      include: { model: Product }
    });
    res.status(200).json(tagData);
  } catch{
    res.status(500).json(err);
  }
});

// Single tag by ID
router.get('/:id', async (req, res) => {
  try{
    // Find category by Primary Key
    const tagData = await Tag.findByPk(req.params.id, {
      // Include associated products
      include: { model: Product }
    })
    res.status(200).json(tagData);
  } catch{
    res.status(500).json(err);
  }
});

// Create new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update tag info by ID
router.put('/:id', async (req, res) => {
  try{
    const updatedTag = await Tag.update(
      {tag_name: req.body.tag_name},
      {where: {id: req.params.id}}
    )
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete tag by ID
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag was found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
