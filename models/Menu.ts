// models/Menu.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export type ItemDoc = {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  weightGrams?: number;
  calories?: number;
  images?: string[];
  veg?: boolean;
  allergens?: string[];
};

export interface MenuDoc extends Document {
  slug: string;
  name: string;
  currency: string;
  address?: string;
  phone?: string;
  tables?: string[];
  categories: { id: string; name: string; icon?: string }[];
  items: ItemDoc[];
}

const ItemSchema = new Schema<ItemDoc>({
  id: { type: String, required: true, index: true },
  categoryId: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  weightGrams: Number,
  calories: Number,
  images: [String],
  veg: Boolean,
  allergens: [String],
}, { _id: false });

const MenuSchema = new Schema<MenuDoc>({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  currency: { type: String, required: true, default: 'INR' },
  address: String,
  phone: String,
  tables: [String],
  categories: [{ id: String, name: String, icon: String }],
  items: [ItemSchema],
}, { timestamps: true });

export const Menu: Model<MenuDoc> = mongoose.models.Menu || mongoose.model<MenuDoc>('Menu', MenuSchema);
