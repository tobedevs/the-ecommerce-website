import React, { useState, useEffect } from "react";
import { useCart } from "../AppContext/CartContext";
import { useProducts } from "../AppContext/ProductContext";
import toast from "react-hot-toast";

export function SideBar({ onClose, isOpen }) {
  const { selectedProduct } = useProducts()
  const { cart, totalUniqueItems, remove, updateQuantity } = useCart();
  const [isItemAdded, setIsItemAdded] = useState(cart.length > 0);
  const totalPrice = cart.reduce((total, item) => {
    return total + (Number(selectedProduct.price) * Number(item.quantity || 1));
  }, 0);


  const overlayClose = () => {
    onClose();
  };

  const childClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    // This runs every time cart changes
    setIsItemAdded(cart.length > 0);
  }, [cart]);


  return (
    <div onClick={overlayClose} className={`fixed top-0 left-0 z-50 w-full h-dvh bg-[#00000080] transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>

      <div onClick={childClick} className={`fixed top-0 h-screen bg-white z-100 w-full sm:w-[70%] lg:w-115 right-0 sm:left-[35%] lg:left-[64%] transform transition-transform duration-1000 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

        <div className="flex justify-between border-b border-[#E8E8E8] py-5 px-8 w-full">
          <div className="flex gap-1">
            <p className="text-black text-[16px] font-bold">MY CART</p>
            {cart?.length > 0 &&
              <p className="text-[#767676]">
                ({totalUniqueItems})
              </p>
            }
          </div>

          <button onClick={onClose} className="cursor-pointer">
            <img
              src="./X (1).svg"
              className="w-4 h-4 bg-[#BABABA]/50 border-0 rounded-full"
            />
          </button>
        </div>

        {/* ---------- EMPTY STATE ---------- */}
        {!isItemAdded && (
          <div className="py-13 px-5 h-screen flex flex-col justify-center items-center">

            <svg width="108.75072479248047" height="97.50001525878906" viewBox="0 0 15 13" fill="#BABABA" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12C6 12.1978 5.94135 12.3911 5.83147 12.5556C5.72159 12.72 5.56541 12.8482 5.38268 12.9239C5.19996 12.9996 4.99889 13.0194 4.80491 12.9808C4.61093 12.9422 4.43275 12.847 4.29289 12.7071C4.15304 12.5673 4.0578 12.3891 4.01921 12.1951C3.98063 12.0011 4.00043 11.8 4.07612 11.6173C4.15181 11.4346 4.27998 11.2784 4.44443 11.1685C4.60888 11.0587 4.80222 11 5 11C5.26522 11 5.51957 11.1054 5.70711 11.2929C5.89464 11.4804 6 11.7348 6 12ZM11.5 11C11.3022 11 11.1089 11.0587 10.9444 11.1685C10.78 11.2784 10.6518 11.4346 10.5761 11.6173C10.5004 11.8 10.4806 12.0011 10.5192 12.1951C10.5578 12.3891 10.653 12.5673 10.7929 12.7071C10.9327 12.847 11.1109 12.9422 11.3049 12.9808C11.4989 13.0194 11.7 12.9996 11.8827 12.9239C12.0654 12.8482 12.2216 12.72 12.3315 12.5556C12.4414 12.3911 12.5 12.1978 12.5 12C12.5 11.7348 12.3946 11.4804 12.2071 11.2929C12.0196 11.1054 11.7652 11 11.5 11ZM14.4819 3.13375L12.8794 8.90125C12.7913 9.21631 12.6028 9.49404 12.3426 9.69232C12.0824 9.89061 11.7646 9.99863 11.4375 10H5.26C4.93189 9.99985 4.61284 9.8924 4.3515 9.69402C4.09016 9.49564 3.90087 9.21723 3.8125 8.90125L1.62 1H0.5C0.367392 1 0.240215 0.947322 0.146447 0.853553C0.0526784 0.759785 0 0.632608 0 0.5C0 0.367392 0.0526784 0.240215 0.146447 0.146447C0.240215 0.0526784 0.367392 9.23526e-09 0.5 9.23526e-09H2C2.10931 -2.09937e-05 2.21562 0.0357823 2.30265 0.101929C2.38968 0.168075 2.45263 0.26092 2.48187 0.36625L3.07437 2.5H14C14.0771 2.49999 14.1531 2.51779 14.2222 2.55203C14.2912 2.58627 14.3515 2.63601 14.3981 2.69737C14.4448 2.75873 14.4766 2.83004 14.4911 2.90574C14.5057 2.98144 14.5025 3.05948 14.4819 3.13375ZM13.3419 3.5H3.3525L4.77812 8.63375C4.80737 8.73908 4.87032 8.83193 4.95735 8.89807C5.04438 8.96422 5.15069 9.00002 5.26 9H11.4375C11.5468 9.00002 11.6531 8.96422 11.7402 8.89807C11.8272 8.83193 11.8901 8.73908 11.9194 8.63375L13.3419 3.5Z" fill="black" />
            </svg>

            <p className="font-bold text-[18px] sm:text-[20px] text-[#1A1A1A]">
              Your cart is empty
            </p>

            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="
                  absolute top-[82%] sm:top-[85%]
                  w-[85%] sm:w-90 h-14 sm:h-16
                  border rounded-2xl
                  py-4 sm:py-5 px-8
                  bg-[#080808] text-white font-bold text-[15px] sm:text-[16px]
                "
              >
                Keep shopping
              </button>
            </div>
          </div>
        )}

        {/* ---------- CART ITEMS STATE ---------- */}
        {isItemAdded && (
          <div className="px-8 py-6 space-y-6 relative h-140.5 overflow-auto sm:h-94.5 overflow-x-clip ">
            {cart.map((item) => {

              return (
                <>
                  <div key={item.id} className="flex items-center border-b pb-3 w-full sm:w-114  gap-5 relative ">
                    <img src={item.image || "default-image-url"} className="w-25 h-25" alt="" />
                    <div className="flex flex-col">
                      <div className="flex flex-col mb-5.5">
                        <div className="flex justify-between items-center sm:w-70">
                          <p className="font-bold text-[16px] text-[#1A1A1A]">{item.name?.length > 15 ? `${item.name.slice(0, 15)}...` : item.name}</p>
                          <p className="ml-2 text-[#1A1A1A] text-[16px]">${Number(selectedProduct.price).toFixed(2)}</p>
                        </div>
                        <div className="flex gap-2 w-46">
                          <p className="text-[#767676] text-[14px]">Color: {item.color}</p>
                          <p className="text-[#767676] text-[14px]">Size: {item.sizes || "N/A"}</p>
                        </div>
                      </div>
                      <div className="flex rounded-xl w-35 h-11 border-0">
                        <button onClick={() => updateQuantity(
                          item.id, item.color, item.sizes, item.quantity - 1
                        )}
                          className="cursor-pointer p-3 bg-[#FFFFFF] rounded-tl-lg rounded-bl-lg border-t-[0.75px] border-b-[0.75px] border-l-[0.75px] border-[#E8E8E8] text-[#101010]" >
                          <p>-</p>
                        </button>
                        <p className="border-[0.75px] py-3 px-4 border-[#E8E8E8] text-[#101010] font-bold text-[16px]">
                          {item.quantity}
                        </p>
                        <button onClick={() => updateQuantity(
                          item.id, item.color, item.sizes, item.quantity + 1, selectedProduct.price
                        )} className="cursor-pointer p-3 bg-[#FFFFFF] rounded-tr-lg rounded-br-lg border-t-[0.75px] border-b-[0.75px] border-r-[0.75px] border-[#E8E8E8] text-[#101010]">
                          <p>+</p>
                        </button>
                      </div>
                    </div>
                    <button onClick={() => {
                      toast.success("Item removed from cart");
                      remove(item.id, item.color, item.sizes)
                    }}
                      className="cursor-pointer absolute sm:right-[10%] right-0 bottom-3 p-2 text-gray-500 hover:text-red-600 transition-colors">
                      <img src="./Vector (1).svg" alt="" className="w-5 h-5" />
                    </button>

                  </div>

                  <div className="fixed bottom-0 left-0 right-0 bg-white py-6 border-t border-[#E8E8E8] sm:left-0 sm:right-5 lg:w-109 md:w-130">
                    <div className="px-6 sm:px-8 flex flex-col gap-5">
                      <div className="flex justify-between items-center">
                        <p className="text-[#1A1A1A] text-[16px]">Estimated total</p>
                        <p className="text-[#1A1A1A] text-[16px]">${totalPrice}</p>
                      </div>

                      <p className="text-[#767676] text-[14px] text-center">
                        Taxes and shipping calculated at checkout
                      </p>
                    </div>

                    <div className="mt-6 px-6 sm:px-8">
                      <button
                        className="w-full  max-w-dvh mx-auto py-4 sm:py-5 px-8 bg-[#080808] text-white font-bold text-[15px] sm:text-[16px] rounded-2xl block"
                      >
                        Proceed to checkout
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        )}


      </div>
    </div>
  );
}