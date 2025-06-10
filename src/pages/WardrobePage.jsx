import React from 'react';

const wardrobe = [
  { id: 1, category: "Top", name: "White Shirt" },
  { id: 2, category: "Bottom", name: "Jeans" },
  { id: 3, category: "Shoes", name: "Sneakers" },
  { id: 4, category: "Outerwear", name: "Navy Jacket" },
];

export default function WardrobePage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">My Digital Wardrobe</h2>
      <ul className="space-y-2">
        {wardrobe.map((item) => (
          <li key={item.id} className="border p-3 rounded flex justify-between items-center bg-white shadow-sm">
            <span>{item.name}</span>
            <span className="text-gray-500">{item.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
