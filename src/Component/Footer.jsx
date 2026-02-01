export function Footer() {
  return (
    <div className="w-full h-auto lg:h-[368.44158935546875px] bg-[#1A1A1A] border-t border-[#F5F5F5] py-8 px-4 sm:px-6 lg:py-15 lg:px-30">

      {/* STACK on mobile, ROW on large screens */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-22">

        {/* LEFT SECTION */}
        <div className="flex flex-col gap-2 sm:gap-3 w-full lg:basis-1/2">

          <p className="text-[14px] sm:text-[16px] font-bold text-white">
            YOUR STORE LOGO
          </p>

          <p className="text-[12px] sm:text-[14px] lg:text-[16px] font-normal text-white leading-snug">
            Pre-access, product drops, exclusive offers,<br />
            events, inspiration and more.
          </p>

          <div className="flex gap-2 lg:gap-3 mt-2 sm:mt-3">
            <img src="/my-e-commerce-website/Group 34948.svg" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
            <img src="/my-e-commerce-website/Group 34948.svg" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
            <img src="/my-e-commerce-website/Group 34948.svg" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col gap-2 sm:gap-3 w-full lg:basis-1/2">

          <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-bold text-white">
            CONTACT US
          </p>

          <div className="flex gap-2 items-center">
            <img src="/my-e-commerce-website/Envelope.svg" className="w-4 h-4" />
            <p className="text-[12px] sm:text-[14px] lg:text-[16px] text-white leading-snug break-all">
              Storebytabara@gmail.com
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <img src="/my-e-commerce-website/Phone.svg" className="w-4 h-4" />
            <p className="text-[12px] sm:text-[14px] lg:text-[16px] text-white leading-snug">
              +234903726378912
            </p>
          </div>
        </div>

      </div>

      <div className="flex flex-row justify-center items-center gap-2 mt-6 lg:mt-10">
        <p className="text-[#E8E8E8] text-[10px] sm:text-[12px] font-bold">
          Powered by
        </p>
        <img src="/my-e-commerce-website/mockdata\shop.jpg" className="transform scale-[1.5] h-4 sm:h-5" />
      </div>

    </div>



  )
}