import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  rating: number;
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error(`Error Fetching Product : ${error}`);
        });
    }
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition-transform transform hover:scale-105 mb-6"
      >
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex justify-center items-center">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />
        </div>

        <div className="md:col-span-2 flex flex-col justify-start">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {product.title}
          </h1>
          <p className="text-gray-700 text-lg mb-6">{product.description}</p>
          <div className="flex flex-col md:flex-row items-start gap-4 mb-6">
            <p className="text-2xl font-semibold text-gray-900 mb-2 md:mb-0">
              Price: <span className="text-green-600">${product.price}</span>
            </p>
            <p className="text-gray-600">
              Rating:{" "}
              <span className="font-semibold">{product.rating} / 5</span>
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              Add to Cart
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
            >
              Add Review
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section Inline */}
      <section className="mt-10">
        <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Placeholder for reviews */}
          <p className="text-gray-600">
            No reviews yet. Be the first to review this product!
          </p>
          {/* Add review form */}
          <form className="mt-6">
            <label htmlFor="review" className="block text-gray-700 mb-2">
              Your Review:
            </label>
            <textarea
              id="review"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your review here..."
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Submit Review
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
