import React, { useState, useEffect } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const SideBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState(["apple", "watch", "Fashion", "Shoes", "Shirt"]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error Fetching Products", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <div className="w-64 p-6 h-screen bg white-900 text-black">
      <h1 className="text-3xl font-bold mb-10 mt-4 text-black">eStore</h1>

      <section className="mb-8">
        <input
          type="text"
          className="border-2 border-gray-600 rounded px-4 py-2 mb-4 w-full bg-white text-black placeholder-gray-500"
          placeholder="Search Products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex justify-between mb-4">
          <input
            type="text"
            className="border-2 border-gray-600 rounded px-4 py-2 w-full mr-2 bg-white text-black placeholder-gray-500"
            placeholder="Min Price"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            type="text"
            className="border-2 border-gray-600 rounded px-4 py-2 w-full bg-white text-black placeholder-gray-500"
            placeholder="Max Price"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        {categories.map((category, index) => (
          <label key={index} className="block mb-3 flex items-center">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={() => handleRadioChangeCategories(category)}
              checked={selectedCategory === category}
              className="mr-2 w-4 h-4 text-black"
            />
            <span className="text-black">{category.toUpperCase()}</span>
          </label>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Keywords</h2>
        <div>
          {keywords.map((keyword, index) => (
            <button
              key={index}
              onClick={() => handleKeywordClick(keyword)}
              className="block mb-3 px-4 py-2 w-full text-left border border-gray-600 rounded bg-gray-800 hover:bg-gray-700 text-white"
            >
              {keyword.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          className="w-full mt-8 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          onClick={handleResetFilters}
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default SideBar;
