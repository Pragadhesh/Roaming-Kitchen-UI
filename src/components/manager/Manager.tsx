import React, { useEffect, useState } from "react";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { useDispatch, useSelector } from "react-redux";
import managerSlice, {
  updateActiveCategory,
} from "../../redux/slices/managerSlice";
import Inventory from "./Inventory";

const Manager = () => {
  const dispatch = useDispatch();
  const [category, setActiveCategory] = useState(
    useSelector((state: any) => state.activeCategory)
  );

  const handleCategoryChange = (newCategory: any) => {
    dispatch(updateActiveCategory(newCategory));
    setActiveCategory(newCategory);
  };
  useEffect(() => {
    dispatch(updateActiveCategory("inventory"));
    setActiveCategory("inventory");
  }, [dispatch]);
  return (
    <div className="flex w-full h-full">
      <div className="grid h-full w-60 fixed bg-zinc-200 menu">
        <div className="flex flex-col w-full h-full">
          <div className="flex  pt-5 w-full">
            <div className="flex logo"></div>
            <div className="flex pl-2 font-medium font-poppins self-end text-sm">
              THE ROAMING KITCHEN
            </div>
          </div>
          <div className="grid grid-flow-row gap-6 pt-16 pl-4 pr-4">
            <button
              className={`flex rounded h-11 items-center pl-3 ${
                category === "inventory" ? "border-2 border-darkgreen" : ""
              }`}
              onClick={() => handleCategoryChange("inventory")}
            >
              <InventoryOutlinedIcon></InventoryOutlinedIcon>
              <div className="flex pl-3 text-xs font-poppins font-semibold text-black items-center">
                INVENTORY
              </div>
            </button>
            <button
              className={`flex rounded h-11 items-center pl-3  ${
                category === "menu" ? "border-2 border-darkgreen" : ""
              }`}
              onClick={() => handleCategoryChange("menu")}
            >
              <MenuBookOutlinedIcon></MenuBookOutlinedIcon>
              <div className="flex pl-3 text-xs font-poppins font-semibold text-black items-center">
                MENU
              </div>
            </button>
            <button
              className={`flex rounded h-11 items-center pl-3  ${
                category === "products" ? "border-2 border-darkgreen" : ""
              }`}
              onClick={() => handleCategoryChange("products")}
            >
              <RestaurantMenuOutlinedIcon></RestaurantMenuOutlinedIcon>
              <div className="flex pl-3 text-xs font-poppins font-semibold text-black items-center">
                PRODUCTS
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex pl-60 w-full h-full">
        {category === "inventory" && <Inventory></Inventory>}
      </div>
    </div>
  );
};

export default Manager;
