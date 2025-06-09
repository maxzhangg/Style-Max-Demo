import React from 'react';

const wardrobe = [
  { id: 1, category: "上衣", name: "白衬衫" },
  { id: 2, category: "下装", name: "牛仔裤" },
  { id: 3, category: "鞋子", name: "运动鞋" },
  { id: 4, category: "外套", name: "深蓝风衣" },
];

export default function WardrobePage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">我的电子衣橱</h2>
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
