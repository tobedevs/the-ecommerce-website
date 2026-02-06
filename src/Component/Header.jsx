export function Header() {
  return (
    <div className="flex flex-col lg:flex-row items-center bg-[url('./navbar.jpg')] bg-cover bg-center bg-no-repeat bg-blend-multiply bg-[#00000080] w-full max-w-250 h-auto lg:h-80 border rounded-3xl mx-auto mt-7.5">

      <div className="flex flex-col justify-center items-center text-center w-full lg:w-158.75 h-auto lg:h-40 gap-3 lg:gap-4 mx-auto px-4 lg:px-0 py-6 lg:py-0">

        <p className="text-[#F5F5F5] text-[18px] sm:text-[24px]">Welcome to madebytabara</p>

        <h2 className="text-[#FFFFFF] text-[28px] sm:text-[36px] lg:text-[48px] font-bold w-full lg:w-175">
          What are you shopping today?
        </h2>

        <div className="flex relative w-full max-w-md mt-4">
          <input
            type="text"
            className="w-full h-11.25 rounded-[99px] border border-[#E8E8E8] py-3 px-4 pl-10 bg-[#F8F8F8] text-[12px] sm:text-[14px]"
            placeholder="Find products"
          />
          <img
            src="./MagnifyingGlass.svg"
            alt=""
            className="cursor-pointer w-4 h-4 sm:w-5 sm:h-5 absolute top-1/2 transform -translate-y-1/2 left-2.5"
          />
        </div>

      </div>
    </div>

  )
}