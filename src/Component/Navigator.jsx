export function Navigator() {
    return (
        <div className="w-full h-16 sm:h-16 bg-white shadow-md flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-4 px-2 sm:px-0">

            <p className="mx-1 sm:mx-4 text-[12px] sm:text-[#A3A3A3] cursor-pointer">Previous</p>

            <p className="border-0 bg-[#080808] cursor-pointer text-white w-6 h-6 sm:w-7 sm:h-7 text-[12px] sm:text-[14px] rounded-full flex items-center justify-center">1</p>

            <p className="mx-1 sm:mx-4 text-[12px] sm:text-[#767676] cursor-pointer">2</p>

            <p className="mx-1 sm:mx-4 text-[12px] sm:text-[#767676] cursor-pointer">3</p>

            <p className="text-[12px] sm:text-[#767676] cursor-pointer">...</p>

            <p className="mx-1 sm:mx-4 text-[12px] sm:text-[#767676] cursor-pointer">10</p>

            <p className="mx-1 sm:mx-0 text-[12px] sm:text-[#A3A3A3] cursor-pointer">Next</p>

        </div>

    )
}