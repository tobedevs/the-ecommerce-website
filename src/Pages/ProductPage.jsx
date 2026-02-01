import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useProducts } from '../AppContext/ProductContext';
import { useCart } from '../AppContext/CartContext';

export default function ProductPage() {
  const { selectedProduct } = useProducts();
  const [imageIndex, setImageIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(-1);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizes, setShowSizes] = useState(false);
  const { add } = useCart();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-select first size when product loads/changes
  useEffect(() => {
    if (selectedProduct?.sizes?.length > 0 && selectedSize === null) {
      setSelectedSize(selectedProduct.sizes[0]);
    }
  }, [selectedProduct]);

  if (!selectedProduct) {
    return <p className="my-9">Error Loading Product...</p>;
  }

  const largeImage = selectedProduct.images?.[imageIndex] || selectedProduct.images?.[0];
  const availableSizes = selectedProduct.sizes || [];

  const handleImageClick = (index) => {
    setImageIndex(index);
  };

  const handleColorClick = (index) => {
    setColorIndex(index);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    if (!isMobile) {
      setShowSizes(false);
    }
  };

  return (
    <div className="flex flex-col w-[85%] m-auto lg:flex-row gap-8 lg:gap-20">
      <div className="w-full lg:w-125 h-auto lg:h-145 gap-6 flex flex-col">
        <img
          src={largeImage}
          alt={selectedProduct.name || "Product image"}
          className="w-full lg:w-125 rounded-[20px] h-87.5 lg:h-125 object-cover"
        />
        <div className="flex flex-wrap justify-start gap-2 lg:justify-center">
          {selectedProduct.images?.slice(0, 3).map((img, idx) => (
            <button
              key={idx}
              onClick={() => handleImageClick(idx)}
              className={`cursor-pointer w-14 h-14 rounded-[7px] overflow-hidden border-2 ${imageIndex === idx ? 'border-[#080808]' : 'border-transparent'
                }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:gap-8">
        <h2 className="text-2xl lg:text-[32px] font-bold">{selectedProduct.name}</h2>
        <p className="text-[14px] lg:text-[18px] font-bold">
          ${selectedProduct.price} {selectedProduct.currency}
        </p>

        <div className="flex flex-col gap-3">
          <p className="text-[#484848] text-[16px]">Quantity</p>
          <div className="flex rounded-xl w-35 h-11 border-0">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="cursor-pointer p-3 bg-[#FFFFFF] rounded-tl-lg rounded-bl-lg border-t-[0.75px] border-b-[0.75px] border-l-[0.75px] border-[#E8E8E8] text-[#101010]"
            >
              <p>-</p>
            </button>
            <p className="border-[0.75px] py-3 px-4 border-[#E8E8E8] text-[#101010] font-bold text-[16px] flex items-center justify-center min-w-[3rem]">
              {quantity}
            </p>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="cursor-pointer p-3 bg-[#FFFFFF] rounded-tr-lg rounded-br-lg border-t-[0.75px] border-b-[0.75px] border-r-[0.75px] border-[#E8E8E8] text-[#101010]"
            >
              <p>+</p>
            </button>
          </div>
        </div>

        {/* Color selector */}
        <div className="flex flex-col gap-2">
          <p className="text-[#1A1A1A] text-[16px]">Color</p>
          <select
            value={colorIndex}
            onChange={(e) => handleColorClick(Number(e.target.value))}
            className="w-40.75 sm:w-40.75 h-13.25 border-2 rounded-lg p-4 gap-3 border-[#E8E8E8] text-[#1A1A1A] text-[14px] bg-white"
          >
            <option value={-1} disabled>
              Select a colour
            </option>
            {selectedProduct.colors?.map((color, idx) => (
              <option key={idx} value={idx}>
                {color}
              </option>
            ))}
          </select>
        </div>

        {/* Size */}
        <div className="flex flex-col">
          <p className="text-[16px] text-[#484848]">Size</p>
          <button
            onClick={() => {
              if (!isMobile) {
                setShowSizes(!showSizes);
              }
            }}
            className="cursor-pointer w-full sm:w-[99.19999694824219px] h-12.25 rounded-lg p-3 border-[#E8E8E8] border text-left"
          >
            {selectedSize || 'Select Size'}
          </button>

          {(isMobile || showSizes) && availableSizes.length > 0 && (
            <div className={`mt-2 ${isMobile ? 'grid grid-cols-4 gap-2' : 'absolute z-10 w-full bg-white border border-[#E8E8E8] rounded-lg shadow-md'}`}>
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`
                    ${isMobile
                      ? `py-2 px-3 text-center border rounded-md transition-colors
                         ${selectedSize === size
                        ? 'border-[#080808] border-2 bg-gray-50 font-medium'
                        : 'border-gray-300 hover:border-gray-500'}`
                      : 'w-full py-2.5 px-4 text-left hover:bg-gray-50'}
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => {
            let selectedColor = selectedProduct.colors[colorIndex];
            let selectedImage = selectedProduct.images[imageIndex];
            toast.success("Added to cart!");
            if (colorIndex === -1) {
              alert("Please select a color");
              return;
            }
            if (!selectedSize) {
              alert("Please select a size");
              return;
            }
            if (quantity <= 0) {
              alert("Please select quantity");
              return;
            }

            add(selectedProduct.id, selectedColor, quantity, selectedImage, selectedProduct.name, selectedSize, selectedProduct.price);
          }}
          className="cursor-pointer mt-8 w-full sm:w-140 h-16 border-0 border-[#0000000D] rounded-2xl py-5 px-8 bg-[#080808] font-bold text-[16px] text-[#FFFFFF]"
        >
          <p>Add to cart</p>
        </button>

        {/* Description */}
        <div className="flex flex-col gap-4">
          <div className="flex w-full sm:w-140 h-8.75 border-b gap-8">
            <p className="p-2 border-b-[#000000] text-[16px] text-[#1A1A1A]">Product description</p>
            <p className="p-2 border-b-[#484848] text-[16px] text-[#1A1A1A]">Reviews</p>
          </div>
          <p className="w-full sm:w-140 font-normal text-[14px] text-[#A3A3A3]">
            {selectedProduct.description}
          </p>
        </div>
      </div>
    </div>
  );
}