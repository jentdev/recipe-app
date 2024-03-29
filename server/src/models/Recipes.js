import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: [{ // ing would be an array of strings
        type: String,
        required: true,
    }],
    instructions: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    cookingTime: {
        type: Number,
        required: true,
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
});

export const RecipeModel = mongoose.model('recipes', RecipeSchema);