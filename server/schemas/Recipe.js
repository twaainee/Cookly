import mongoose from 'mongoose'

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 140,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 600,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    ingredients: {
      type: [String],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: 'At least one ingredient is required',
      },
    },
    steps: {
      type: [String],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: 'At least one step is required',
      },
    },
    prepTime: {
      type: Number,
      required: true,
      min: 0,
    },
    cookTime: {
      type: Number,
      required: true,
      min: 0,
    },
    servings: {
      type: Number,
      required: true,
      min: 1,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Easy',
    },
    cuisine: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
)

recipeSchema.index({
  title: 'text',
  description: 'text',
  ingredients: 'text',
  cuisine: 'text',
  tags: 'text',
})

export const Recipe = mongoose.model('Recipe', recipeSchema)
