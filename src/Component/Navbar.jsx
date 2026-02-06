import { SideBar } from "./SideBar"
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react"
import { useMockData } from "../AppContext/UseMockData";
import { useCart } from "../AppContext/CartContext";


export function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { mockdata } = useMockData();
  const openSidebar = () => setShowSidebar(true);
  const scrollPositionRef = useRef(0);
  const { cart, totalUniqueItems } = useCart();

  useEffect(() => {
    if (showSidebar) {
      scrollPositionRef.current = window.scrollY;
      const scrollY = scrollPositionRef.current;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflowY = 'hidden';
    } else if (scrollPositionRef.current !== 0 || window.scrollY !== 0) {
      const scrollY = scrollPositionRef.current;

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflowY = '';

      window.scrollTo({ top: scrollY, behavior: 'instant' });

      scrollPositionRef.current = 0;
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflowY = '';
    };
  }, [showSidebar]);


  return (
    <>
      <nav className="flex justify-between items-center w-full lg:w-screen h-16 sm:h-20 border border-[#F5F5F5] sticky top-0 z-10 bg-white px-4 sm:px-32">

        <Link to="/"><img src="./mockdata/shop.jpg" alt="" className="transform scale-[2] w-8 sm:w-10 h-8 sm:h-10" /></Link>

        <div className="flex items-center gap-2 sm:gap-3">

          <div className="flex gap-1 sm:gap-[6.5px] text-[10px] cursor-pointer items-center">
            <img src="./Nigeria.svg" className="w-4 sm:w-5 h-4 sm:h-5" />
            <p className="w-6 sm:w-7.75 h-4 sm:h-5.75">NGN</p>
          </div>

          <div className="w-0.5 h-5 border text-[#D1D1D1] hidden sm:block"></div>

          <button onClick={openSidebar} className="relative">
            <img src="./Vector.svg" alt="" className="w-6 h-6 p-1 cursor-pointer bg-[#F8F8F8] rounded-[102.19px] px-0.1" />
            {cart?.length > 0 &&
              <p className="absolute top-[-5.14px] left-[21.71px] w-4 h-4 py-[3.43px] px-[2.29px] bg-[#080808] text-white rounded-lg flex items-center justify-center">
                {totalUniqueItems}
              </p>
            }
          </button>

        </div>

      </nav>

      <SideBar isOpen={showSidebar} onClose={() => setShowSidebar(false)}/>

    </>
  )
}


