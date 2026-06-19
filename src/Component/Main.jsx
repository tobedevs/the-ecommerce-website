import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useProducts } from "../AppContext/ProductContext";
import { useFetchedProducts } from "../AppContext/FetchProductContext";
import toast from "react-hot-toast";

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
    text: "Wears",
    bgcolor: "#D1D1D1",
    color: "#767676",
    category: "Wears",
  },
  {
    id: 3,
    text: "Electronics",
    bgcolor: "#D1D1D1",
    color: "#767676",
    category: "Electronics",
  },
];

export function Main() {
  const { handleClick } = useProducts();
  const { products } = useFetchedProducts();
  const [items, setItems] = useState([]);
 // const [allItems, setAllItems] = useState([]);
  //const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // Keep items updated automatically when products arrive or category shifts
  useEffect(() => {
    if (products) {
      if (activeCategory === "All") {
        setItems(products);
      } else {
        setItems(products.filter((item) => item.category === activeCategory));
      }
    }
  }, [products, activeCategory]);

  const filterResult = (category) => {
    setActiveCategory(category);

    if (category === "All") {
      setItems(products);
    } else {
    setItems(products.filter((item) => item.category === category));
    }
  };

  /*useEffect(() => {
    fetch('/my-e-commerce-website/products.json')
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
  }, []);*/

  //if (loading) return <div className="text-center">Loading...</div>;

  return (
    <>
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
        {items?.map((product) => (
          <Link key={product.firebaseId} to={`/products/${product.firebaseId}`} onClick={() => handleClick(product)} className="flex flex-col">
            <div>
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="border border-[#F8F8F8] rounded-[20px] w-full h-52 sm:h-66 object-cover cursor-pointer"
              />
            </div>
            <p className="text-[12px] sm:text-lg font-semibold text-[#767676]">
              {product.name?.length > 32 ? `${product.name.slice(0, 32)}...` : product.name}
            </p>
            <p className="text-[12px] sm:text-md text-[#767676]">
              {product.description?.length > 27 ? `${product.description.slice(0, 27)}...` : product.description}
            </p>
            <div className="flex gap-2 text-[#101010]">
              <p className="text-[13px] sm:text-lg font-bold">{product.currency}</p>
              <p className="text-[13px] sm:text-lg font-bold">{product.prices}</p>
            </div>
          </Link>
        ))}
      </div>

    </>
  )
}