import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  images: [{ type: String, required: true }],
  category: { type: String, required: true },
  material: { type: String },
  stock: { type: Number, default: 0 },
  sku: { type: String, unique: true },
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  tags: [String],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
