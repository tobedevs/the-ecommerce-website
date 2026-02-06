import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useProducts } from "../AppContext/ProductContext";

const Box = [
  {
    id: 1,
    text: "All",
    bgcolor: "#D1D1D1",
    color: "#767676",
    category: "All",
  },
  {
    id: 2,
    text: "Shoes",
    bgcolor: "#D1D1D1",
    color: "#767676",
    category: "Shoes",
  },
  {
    id: 3,
    text: "Bags",
    bgcolor: "#D1D1D1",
    color: "#767676",
    category: "Bags",
  },
];

export function Main() {
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const { setSelectedProduct } = useProducts();

  const filterResult = (category) => {
    setActiveCategory(category);

    if (category === "All") {
      setItems(allItems);
    } else {
      setItems(allItems.filter((item) => item.category === category));
    }
  };

  const handleClick = (items) => {
    setSelectedProduct(items);
  };

  useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setAllItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <>
      {/* Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-4 ml-4 sm:ml-35 mt-4 sm:mt-6">
        {Box.map((box) => {
          const isActive = activeCategory === box.category;

          return (
            <button
              key={box.id}
              onClick={() => filterResult(box.category)}
              className="rounded-[99px] px-3 sm:px-4.5 py-2 text-[14px] sm:text-[16px] cursor-pointer transition-all duration-200"
              style={{
                backgroundColor: isActive ? "#080808" : box.bgcolor,
                color: isActive ? "#FFFFFF" : box.color,
              }}
            >
              {box.text}
            </button>
          );
        })}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-10 mx-4 sm:mx-35">
        {items.map((items) => (
          <Link key={items.id} to={`/product/${items.id}`} onClick={() => handleClick(items)} className="flex flex-col">
            <div>
              <img
                src={items.images[0]}
                alt={items.name}
                className="border border-[#F8F8F8] rounded-[20px] w-full h-52 sm:h-66 object-cover cursor-pointer"
              />
            </div>
            <p className="text-[12px] sm:text-lg font-semibold text-[#767676]">
              {items.name?.length > 32 ? `${items.name.slice(0, 32)}...` : items.name}
            </p>
            <p className="text-[12px] sm:text-md text-[#767676]">
              {items.description?.length > 27 ? `${items.description.slice(0, 27)}...` : items.description}
            </p>
            <div className="flex gap-2 text-[#101010]">
              <p className="text-[13px] sm:text-lg font-bold">{items.currency}</p>
              <p className="text-[13px] sm:text-lg font-bold">{items.price}</p>
            </div>
          </Link>
        ))}
      </div>

    </>
  )
}