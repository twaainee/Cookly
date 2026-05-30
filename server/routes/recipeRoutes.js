import { Router } from 'express'
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  listRecipes,
  updateRecipe,
} from '../controllers/recipeController.js'
import { requireAuth } from '../middleware/auth.js'

export const recipeRoutes = Router()

recipeRoutes.get('/', listRecipes)
recipeRoutes.get('/:id', getRecipe)
recipeRoutes.post('/', requireAuth, createRecipe)
recipeRoutes.put('/:id', requireAuth, updateRecipe)
recipeRoutes.delete('/:id', requireAuth, deleteRecipe)
