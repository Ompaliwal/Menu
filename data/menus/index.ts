// data/menus/index.ts
export type Item = {
    id: string;
    categoryId: string;
    name: string;
    description: string;
    price: number;
    weightGrams?: number;
    calories?: number;
    images?: string[];
    veg?: boolean;
    allergens?: string[];
  };
  
  export type Category = { id: string; name: string; icon?: string };
  
  export type Menu = {
    slug: string;
    name: string;
    currency: string;
    address?: string;
    phone?: string;
    tables?: string[];
    categories: Category[];
    items: Item[];
  };
  
  // Vegetarian Indian restaurant menu
  export const menus: Record<string, Menu> = {
    'indian-restaurant': {
      slug: 'indian-restaurant',
      name: 'Swaad Indian Kitchen (Veg)',
      currency: 'INR',
      address: 'MG Road, Pune',
      phone: '+91-9876543210',
      categories: [
        { id: 'c1', name: 'Breakfast', icon: '🍳' },
        { id: 'c2', name: 'Starters & Snacks', icon: '🥟' },
        { id: 'c3', name: 'Main Course', icon: '🍛' },
        { id: 'c4', name: 'Paneer Specials', icon: '🧀' },
        { id: 'c5', name: 'Breads', icon: '🫓' },
        { id: 'c6', name: 'Rice & Pulao', icon: '🍚' },
        { id: 'c7', name: 'Sides & Salads', icon: '🥗' },
        { id: 'c8', name: 'Desserts', icon: '🍨' },
        { id: 'c9', name: 'Drinks', icon: '🥤' }
      ],
      items: [
        // Breakfast
        { id: 'i1', categoryId: 'c1', name: 'Plain Paratha', description: 'Flaky whole-wheat flatbread', price: 25, weightGrams: 120, calories: 260, images: ['/images/plain-paratha.jpg'], veg: true, allergens: ['gluten'] },
        { id: 'i2', categoryId: 'c1', name: 'Lachha Paratha', description: 'Layered crispy paratha', price: 30, weightGrams: 140, calories: 300, images: ['/images/lachha-paratha.jpg'], veg: true, allergens: ['gluten'] },
        { id: 'i3', categoryId: 'c1', name: 'Aloo Paratha', description: 'Stuffed potato paratha served with curd/pickle', price: 40, weightGrams: 200, calories: 420, images: ['/images/aloo-paratha.jpg'], veg: true, allergens: ['gluten'] },
        { id: 'i4', categoryId: 'c1', name: 'Onion Paratha', description: 'Paratha stuffed with spiced onions', price: 35, weightGrams: 180, calories: 380, images: ['/images/onion-paratha.jpeg'], veg: true, allergens: ['gluten'] },
        { id: 'i5', categoryId: 'c1', name: 'Paneer Paratha', description: 'Paratha stuffed with spiced cottage cheese', price: 50, weightGrams: 200, calories: 450, images: ['/images/paneer-paratha.jpg'], veg: true, allergens: ['dairy','gluten'] },
        { id: 'i6', categoryId: 'c1', name: 'Bread Butter Toast', description: 'Buttered toasted slices', price: 20, weightGrams: 80, calories: 220, images: ['/images/bread-butter.jpg'], veg: true, allergens: ['gluten','dairy'] },
  
        // Starters & Snacks
        { id: 'i7', categoryId: 'c2', name: 'Samosa (2 pcs)', description: 'Crispy pastry filled with spiced potatoes', price: 45, weightGrams: 150, calories: 360, images: ['/images/samosa.jpeg'], veg: true, allergens: ['gluten'] },
        { id: 'i8', categoryId: 'c2', name: 'Pani Puri (6 pcs)', description: 'Crisp hollow puris with spicy tamarind water', price: 70, weightGrams: 120, calories: 200, images: ['/images/pani-puri.jpeg'], veg: true, allergens: [] },
        { id: 'i9', categoryId: 'c2', name: 'Dahi Puri (6 pcs)', description: 'Puri topped with yogurt and chutneys', price: 80, weightGrams: 140, calories: 240, images: ['/images/dahi-puri.jpg'], veg: true, allergens: ['dairy'] },
        { id: 'i10', categoryId: 'c2', name: 'Hara Bhara Kebab', description: 'Spinach & peas cutlets', price: 110, weightGrams: 140, calories: 310, images: ['/images/hara-bhara.jpg'], veg: true, allergens: [] },
        { id: 'i11', categoryId: 'c2', name: 'Paneer Tikka', description: 'Smoky grilled paneer marinated in spices', price: 170, weightGrams: 200, calories: 420, images: ['/images/paneer-tikka.jpg'], veg: true, allergens: ['dairy'] },
  
        // Main Course
        { id: 'i12', categoryId: 'c3', name: 'Yellow Dal Tadka', description: 'Moong/tur dal tempered with spices', price: 120, weightGrams: 250, calories: 320, images: ['/images/yellow-dal-tadka.jpg'], veg: true, allergens: [] },
        { id: 'i13', categoryId: 'c3', name: 'Dal Makhani', description: 'Slow-cooked black lentils in butter & cream', price: 160, weightGrams: 280, calories: 480, images: ['/images/dal-makhani.webp'], veg: true, allergens: ['dairy'] },
        { id: 'i14', categoryId: 'c3', name: 'Chana Masala', description: 'Spicy chickpea curry', price: 140, weightGrams: 260, calories: 350, images: ['/images/chana-masala.jpg'], veg: true, allergens: [] },
        { id: 'i15', categoryId: 'c3', name: 'Aloo Jeera', description: 'Potato cubes tempered with cumin', price: 120, weightGrams: 220, calories: 300, images: ['/images/aloo-jeera.jpg'], veg: true, allergens: [] },
        { id: 'i16', categoryId: 'c3', name: 'Aloo Gobi', description: 'Potato & cauliflower curry', price: 130, weightGrams: 250, calories: 340, images: ['/images/aloo-gobi.jpg'], veg: true, allergens: [] },
        { id: 'i17', categoryId: 'c3', name: 'Aloo Matar', description: 'Potato & green peas curry', price: 130, weightGrams: 250, calories: 360, images: ['/images/aloo-matar.jpg'], veg: true, allergens: [] },
        { id: 'i18', categoryId: 'c3', name: 'Rajma Masala', description: 'Red kidney beans curry', price: 150, weightGrams: 280, calories: 420, images: ['/images/rajma.jpg'], veg: true, allergens: [] },
        { id: 'i19', categoryId: 'c3', name: 'Mixed Veg', description: 'Seasonal mixed vegetables cooked with spices', price: 150, weightGrams: 300, calories: 360, images: ['/images/mixed-veg.jpg'], veg: true, allergens: [] },
        { id: 'i20', categoryId: 'c3', name: 'Matar Mushroom', description: 'Mushroom & green peas in gravy', price: 170, weightGrams: 260, calories: 380, images: ['/images/matar-mushroom.jpg'], veg: true, allergens: [] },
  
        // Paneer Specials
        { id: 'i21', categoryId: 'c4', name: 'Mushroom Masala', description: 'Mushroom cooked in spiced tomato gravy', price: 180, weightGrams: 240, calories: 360, images: ['/images/mushroom-masala.jpg'], veg: true, allergens: [] },
        { id: 'i22', categoryId: 'c4', name: 'Palak Paneer', description: 'Paneer cooked in pureed spinach gravy', price: 210, weightGrams: 300, calories: 420, images: ['/images/palak-paneer.webp'], veg: true, allergens: ['dairy'] },
        { id: 'i23', categoryId: 'c4', name: 'Matar Paneer', description: 'Paneer and peas in tomato gravy', price: 200, weightGrams: 300, calories: 430, images: ['/images/matar-paneer.jpg'], veg: true, allergens: ['dairy'] },
        { id: 'i24', categoryId: 'c4', name: 'Shahi Paneer', description: 'Rich creamy paneer curry with nuts', price: 230, weightGrams: 320, calories: 520, images: ['/images/shahi-paneer.jpg'], veg: true, allergens: ['dairy','nuts'] },
        { id: 'i25', categoryId: 'c4', name: 'Paneer Do Pyaza', description: 'Paneer with double onions', price: 210, weightGrams: 300, calories: 460, images: ['/images/paneer-do-pyaza.jpg'], veg: true, allergens: ['dairy'] },
        { id: 'i26', categoryId: 'c4', name: 'Paneer Butter Masala', description: 'Creamy tomato-based paneer curry', price: 220, weightGrams: 320, calories: 540, images: ['/images/paneer-butter-masala.webp'], veg: true, allergens: ['dairy'] },
        { id: 'i27', categoryId: 'c4', name: 'Kadhai Paneer', description: 'Paneer tossed with capsicum & spices', price: 210, weightGrams: 300, calories: 480, images: ['/images/kadhai-paneer.jpg'], veg: true, allergens: ['dairy'] },
        { id: 'i28', categoryId: 'c4', name: 'Paneer Lababdar', description: 'Paneer in rich onion-tomato gravy', price: 220, weightGrams: 320, calories: 500, images: ['/images/paneer-lababdar.jpg'], veg: true, allergens: ['dairy'] },
        { id: 'i29', categoryId: 'c4', name: 'Paneer Bhurji', description: 'Scrambled paneer with spices', price: 180, weightGrams: 250, calories: 420, images: ['/images/paneer-bhurji.webp'], veg: true, allergens: ['dairy'] },
  
        // Breads
        { id: 'i30', categoryId: 'c5', name: 'Plain Tawa Roti', description: 'Soft whole wheat roti', price: 8, weightGrams: 60, calories: 120, images: ['/images/plain-roti.jpg'], veg: true, allergens: ['gluten'] },
        { id: 'i31', categoryId: 'c5', name: 'Butter Tawa Roti', description: 'Roti brushed with butter', price: 12, weightGrams: 70, calories: 160, images: ['/images/butter-roti.webp'], veg: true, allergens: ['gluten','dairy'] },
        { id: 'i32', categoryId: 'c5', name: 'Garlic Naan', description: 'Naan topped with garlic', price: 55, weightGrams: 85, calories: 230, images: ['/images/garlic-naan.jpg'], veg: true, allergens: ['gluten'] },
  
        // Rice & Pulao
        { id: 'i33', categoryId: 'c6', name: 'Plain Rice', description: 'Steamed basmati rice', price: 60, weightGrams: 200, calories: 250, images: ['/images/plain-rice.jpg'], veg: true, allergens: [] },
        { id: 'i34', categoryId: 'c6', name: 'Jeera Rice', description: 'Fragrant rice with cumin', price: 70, weightGrams: 200, calories: 270, images: ['/images/jeera-rice.jpg'], veg: true, allergens: [] },
        { id: 'i35', categoryId: 'c6', name: 'Veg Pulao', description: 'Basmati rice cooked with vegetables & spices', price: 120, weightGrams: 320, calories: 420, images: ['/images/veg-pulao.jpg'], veg: true, allergens: [] },
        { id: 'i36', categoryId: 'c6', name: 'Masala Khichdi with Curd', description: 'Comfort khichdi served with curd', price: 110, weightGrams: 300, calories: 360, images: ['/images/khichdi.jpg'], veg: true, allergens: ['dairy'] },
  
        // Sides & Salads
        { id: 'i37', categoryId: 'c7', name: 'Green Salad', description: 'Fresh seasonal salad', price: 60, weightGrams: 120, calories: 60, images: ['/images/green-salad.jpg'], veg: true, allergens: [] },
        { id: 'i38', categoryId: 'c7', name: 'Papad Roasted/Fry', description: 'Roasted or fried papad', price: 15, weightGrams: 20, calories: 40, images: ['/images/papad.jpeg'], veg: true, allergens: [] },
        { id: 'i39', categoryId: 'c7', name: 'Raita (Boondi/Mix)', description: 'Cooling yogurt raita', price: 45, weightGrams: 100, calories: 90, images: ['/images/raita.webp'], veg: true, allergens: ['dairy'] },
  
        // Desserts
        { id: 'i40', categoryId: 'c8', name: 'Gulab Jamun (2 pcs)', description: 'Soft milk dumplings in sugar syrup', price: 90, weightGrams: 120, calories: 420, images: ['/images/gulab-jamun.webp'], veg: true, allergens: ['dairy'] },
        { id: 'i41', categoryId: 'c8', name: 'Rasmalai', description: 'Soft cheese patties in sweetened milk', price: 120, weightGrams: 130, calories: 300, images: ['/images/rasmalai.webp'], veg: true, allergens: ['dairy'] },
        { id: 'i42', categoryId: 'c8', name: 'Kulfi', description: 'Traditional Indian ice cream', price: 100, weightGrams: 100, calories: 280, images: ['/images/kulfi.jpg'], veg: true, allergens: ['dairy'] },
  
        // Drinks
        { id: 'i43', categoryId: 'c9', name: 'Masala Chai', description: 'Indian spiced tea', price: 30, weightGrams: 200, calories: 120, images: ['/images/masala-chai.jpg'], veg: true, allergens: ['dairy'] },
        { id: 'i44', categoryId: 'c9', name: 'Fresh Lime Soda', description: 'Sweet or salted lime soda', price: 50, weightGrams: 300, calories: 90, images: ['/images/lime-soda.jpg'], veg: true, allergens: [] },
        { id: 'i45', categoryId: 'c9', name: 'Sweet Lassi', description: 'Traditional yogurt-based drink', price: 90, weightGrams: 300, calories: 260, images: ['/images/lassi.webp'], veg: true, allergens: ['dairy'] }
      ]
    }
  };
  