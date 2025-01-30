import mongoose, { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minLength: [3, 'Title must be at least 3 characters long']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['uncategorized', 'javascript', 'reactjs', 'nextjs']
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export const Post = mongoose.models.Post || model('Post', postSchema);