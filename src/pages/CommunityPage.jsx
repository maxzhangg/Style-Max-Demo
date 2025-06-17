import React from 'react';

import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';

const samplePosts = [
  { id: 1, img: img4, text: "Commuter outfit share: Grey suit + white T-shirt" },
  { id: 2, img: img5, text: "Weekend outing look!" },
  { id: 3, img: img6, text: "Minimalist today's outfit" },
];

export default function CommunityPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Fashion Community</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {samplePosts.map((post) => (
          <div key={post.id} className="rounded shadow overflow-hidden bg-white hover:shadow-lg transition">
            <img src={post.img} alt={post.text} className="w-full h-56 object-cover" />
            <div className="p-3">{post.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
