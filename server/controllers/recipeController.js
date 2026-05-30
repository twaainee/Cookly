import mongoose from 'mongoose'
import { Recipe } from '../schemas/Recipe.js'

const cleanList = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }

  return String(value || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

const recipePayload = (body) => ({
  title: body.title,
  description: body.description,
  imageUrl: body.imageUrl,
  ingredients: cleanList(body.ingredients),
  steps: cleanList(body.steps),
  prepTime: Number(body.prepTime),
  cookTime: Number(body.cookTime),
  servings: Number(body.servings),
  difficulty: body.difficulty,
  cuisine: body.cuisine,
  tags: cleanList(body.tags),
})

const ensureObjectId = (id) => mongoose.Types.ObjectId.isValid(id)

export const listRecipes = async (req, res, next) => {
  try {
    const { q, cuisine, difficulty, tag, author } = req.query
    const page = Math.max(Number(req.query.page) || 1, 1)
    const limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 50)
    const filter = {}

    if (q) {
      filter.$text = { $search: q }
    }

    if (cuisine) {
      filter.cuisine = new RegExp(`^${String(cuisine).trim()}$`, 'i')
    }

    if (difficulty) {
      filter.difficulty = difficulty
    }

    if (tag) {
      filter.tags = new RegExp(`^${String(tag).trim()}$`, 'i')
    }

    if (author && ensureObjectId(author)) {
      filter.author = author
    }

    const [recipes, total] = await Promise.all([
      Recipe.find(filter)
        .populate('author', 'name email')
        .sort(q ? { score: { $meta: 'textScore' }, createdAt: -1 } : { createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Recipe.countDocuments(filter),
    ])

    res.json({ recipes, page, pages: Math.ceil(total / limit), total })
  } catch (error) {
    next(error)
  }
}

export const getRecipe = async (req, res, next) => {
  try {
    const recipe = ensureObjectId(req.params.id)
      ? await Recipe.findById(req.params.id).populate('author', 'name email')
      : null

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    res.json({ recipe })
  } catch (error) {
    next(error)
  }
}

export const createRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.create({
      ...recipePayload(req.body),
      author: req.user._id,
    })

    await recipe.populate('author', 'name email')
    res.status(201).json({ recipe })
  } catch (error) {
    next(error)
  }
}

export const updateRecipe = async (req, res, next) => {
  try {
    const recipe = ensureObjectId(req.params.id) ? await Recipe.findById(req.params.id) : null

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    if (!recipe.author.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only the author can edit this recipe' })
    }

    Object.assign(recipe, recipePayload(req.body))
    await recipe.save()
    await recipe.populate('author', 'name email')

    res.json({ recipe })
  } catch (error) {
    next(error)
  }
}

export const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = ensureObjectId(req.params.id) ? await Recipe.findById(req.params.id) : null

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    if (!recipe.author.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only the author can delete this recipe' })
    }

    await recipe.deleteOne()
    res.json({ message: 'Recipe deleted' })
  } catch (error) {
    next(error)
  }
}
