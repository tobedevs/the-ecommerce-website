import React from 'react'
import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebase'
import toast from 'react-hot-toast'
import { useFetchedProducts } from './AppContext/FetchProductContext'

export default function Admin() {
  const { products } = useFetchedProducts()
  const [isSubmitting, setIssubmitting] = useState(false)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [colors, setColor] = useState("");
  const [sizes, setSizes] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [images, setImages] = useState("");

  const addProduct = async () => {
    if (!name || !description || !category || !colors || !sizes || !price || !currency || !images) {
      toast.error("Fill in all field")
      return;
    }
    try {
      setIssubmitting(true);
      await addDoc(collection(db, "products"),
      {
        name,
        description,
        category,
        colors: colors.split(","),
        sizes: sizes.split(","),
        price,
        currency,
        images: images.split(","),
      });

      toast.success("Product added successfully")
      setIssubmitting(false);
      setName("");
      setDescription("");
      setCategory("");
      setColor("");
      setSizes("");
      setPrice("");
      setCurrency("");
      setImages("");
    } catch (error) {
      setIssubmitting(false)
      toast.error("Error found due to:", error)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-[30px] font-bold md:fixed text-center top-20 z-100 bg-white md:h-15 md:w-full'>Admin Dashboard</h1>

      <div className="flex max-sm:flex-col">
        <div className='flex flex-col w-94 ml-2.5 md:mr-44 md:fixed left-0 top-40'>
          <h2 className='text-[25px] font-bold'>Create products:</h2>
          <input
            type="text"
            placeholder="NAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-b border-[#CCCCCC] py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type="number"
            placeholder="PRICE"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='border-b border-[#CCCCCC] py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type="text"
            placeholder="DESCRIPTION"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-b border-[#CCCCCC] py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type="text"
            placeholder="CATEGORY"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='border-b border-[#CCCCCC] py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type="text"
            placeholder="COLORS"
            value={colors}
            onChange={(e) => setColor(e.target.value)}
            className='border-b border-[#CCCCCC] py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type="text"
            placeholder="SIZES"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            className='border-b border-[#CCCCCC] py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type="text"
            placeholder="CURRENCY"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className='border-b border-[#CCCCCC] py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />

          <input
            type="text"
            placeholder="Image URL"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            className='border-b border-[#CCCCCC] py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />

          <button 
            onClick={addProduct}
            className={`cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-5 ${isSubmitting ? 'opacity-50 cursor-not-allowed bg-gray-500' : ''}`}
          >
          {isSubmitting ? "Processing..." : "Add product"}
          </button>
      </div>

      {/* PRODUCT LIST */}
      <div className='relative text-center mt-7 md:ml-64 grid-cols-1 md:grid-cols-2'>
        <h2 className='text-[25px] absolute top-15 left-0 font-bold'>Products:</h2>

        <div className="mt-27">
          {products.map((products) => (
          <div key={products.id} className='grid-cols-3 gap-4 mt-2 border-b border-gray-300 pb-4'>
            <img
              src={products.images[0]}
              alt={products.name}
              width="100"
            />
            <p>Product ID: {products.firebaseId}</p>
            <p>Category: {products.category}</p>
            <p>Sizes: {products.sizes}</p>
            <p>Colors: {products.colors}</p>
            <h3>{products.name}</h3>
            <p>${products.price}</p>
          </div>
        ))}
        </div> 
      </div>
      </div>
    </div>
  );
};

