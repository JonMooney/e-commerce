const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Find all categories
router.get('/', async (req, res) => {
  // find all categories
  try{
    const categoryData = await Category.findAll({
      include: {
        model: Product,
        // Fields to include from Product Model
        attributes: ['product_name', 'price', 'stock']
      }
    });
    res.status(200).json(categoryData);
  } catch{
    res.status(500).json(err);
  }
});

// Find category by ID
router.get('/:id', async (req, res) => {
  try{
    // Find category by Primary Key
    const categoryData = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        // Fields to include from Product Model
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    })
    res.status(200).json(categoryData);
  } catch{
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
  try{
    const updatedCategory = await Category.update(
      {category_name: req.body.category_name},
      {where: {id: req.params.id}}
    )
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category was found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
