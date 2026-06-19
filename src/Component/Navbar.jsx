import { SideBar } from "./SideBar"
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react"
import { useCart } from "../AppContext/CartContext";
import { useAuth } from "../AppContext/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const openSidebar = () => setShowSidebar(true);
  const scrollPositionRef = useRef(0);
  const { cart, totalUniqueItems } = useCart();
  const { logout, username } = useAuth()
  const navigate = useNavigate();
  

    async function HandleButtonClicked(e) {
    e.preventDefault();
    const confirmLogout = window.confirm("Are you sure you want to log out of this account?");
    if (!confirmLogout) {
      return;
    }else {
      try {
      await logout()
      toast.success("You have successfully logged out of your account")
      setTimeout(() => {
        navigate('/')
      }, 500);
    } catch (error) {
      toast.error("Unable to logout due to:" + error)
    }
    }

    
  }

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
        <div className="flex flex-col">
          <Link to="/homepage"><img src="/my-e-commerce-website\shop.jpg" alt="" className="w-22.5 sm:w-35 h-9.5 sm:h-14" /></Link>
          <p className="text-bold mb-4">Welcome, {username ? username.toUpperCase() : "Guest"}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-[0.05px] rounded-full bg-[#D1D1D1]">
            <img src="/my-e-commerce-website/person.svg" alt="" />
          </div>

          <div className="flex gap-1 sm:gap-[6.5px] text-[10px] cursor-pointer items-center">
            <img src="/my-e-commerce-website/Nigeria.svg" className="w-4 sm:w-5 h-4 sm:h-5" />
            <p className="w-6 sm:w-7.75 h-4 sm:h-5.75">NGN</p>
          </div>

          <div className="w-0.5 h-5 border text-[#D1D1D1] hidden sm:block"></div>

          <button onClick={openSidebar} className="relative">
            <img src="/my-e-commerce-website/Vector.svg" alt="" className="w-6 h-6 p-1 cursor-pointer bg-[#F8F8F8] rounded-[102.19px] px-0.1" />
            {cart?.length > 0 &&
              <p className="absolute top-[-5.14px] left-[21.71px] w-4 h-4 py-[3.43px] px-[2.29px] bg-[#080808] text-white rounded-lg flex items-center justify-center">
                {totalUniqueItems}
              </p>
            }
          </button>

        </div>
        <button onClick={HandleButtonClicked} className="absolute right-5 sm:top-6.25 top-10 flex cursor-pointer">
          <img src="/my-e-commerce-website/Logout.svg" alt="" />
          <p className="text-[#BB271A]">Log Out</p>
        </button>

      </nav>

      <SideBar isOpen={showSidebar} onClose={() => setShowSidebar(false)}/>

    </>
  )
}


