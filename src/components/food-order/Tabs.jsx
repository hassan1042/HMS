import React from 'react'

function Tabs({categories, handleCategoryChange, selectedCategory,}) {
  return (
    <div className="mb-4">
    {categories.map(category => (
      <button
        key={category}
        onClick={() => handleCategoryChange(category)}
        className={`px-4 py-2 my-2 mr-2 rounded-xl shadow-lg ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        {category}
      </button>
    ))}
  </div>
  )
}

export default Tabs
