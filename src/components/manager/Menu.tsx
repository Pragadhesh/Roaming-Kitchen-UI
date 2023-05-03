import React, { useState } from "react";
import "./Menu.css";
import {
  Box,
  Card,
  CircularProgress,
  Divider,
  InputBase,
  LinearProgress,
  Modal,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Ingredient } from "../../interface/ingredient";
import axios from "axios";
import { BACKEND_URL } from "../../constants/backendurl";
import { MenuItems } from "../../interface/menuitem";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const updateitemmodalstyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 850,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #5CAC0E",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const addinventoryitemmodalstyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 550,
  bgcolor: "background.paper",
  border: "2px solid #5CAC0E",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const Menu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addRecipe, setIsAddRecipe] = useState(false);

  const [errorResponse, setErrorResponse] = useState(true);

  const [recipename, setRecipeName] = useState("");
  const [recipedescription, setRecipeDescription] = useState("");
  const [stepnumber, setStepNumber] = useState(0);
  const [ingredientGenerationStatus, setIngredientGenerationStatus] =
    useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientIsLoading, setIngredientIsLoading] = useState(false);

  const [updateItemModal, setUpdateItemModal] = useState(false);
  const [updateItemIsLoading, setUpdateItemIsLoading] = useState(false);
  const [updateItemResponse, setUpdateItemResponse] = useState(false);
  const [upResponse, setUpResponse] = useState("");
  const [upid, setupid] = useState(0);
  const [upitemName, setupItemName] = useState("");
  const [upitemunit, setupitemunit] = useState("");
  const [upitemAmount, setupItemAmount] = useState("");
  const [upimageurl, setupimageurl] = useState("");

  const [isaddItemFromInventory, setIsAddItemFromInventory] = useState(false);
  const [isInvSearch, setIsInvSearch] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
  const [searchString, setSearchString] = useState("");

  const [updateInventoryItemResponse, setUpdateInventoryItemResponse] =
    useState(false);
  const [upInventoryResponse, setUpInventoryResponse] = useState("");
  const [upInventoryid, setupInventoryid] = useState(0);
  const [upInventoryitemName, setupInventoryItemName] = useState("");
  const [upInventoryitemunit, setupInventoryitemunit] = useState("");
  const [upInventoryitemAmount, setupInventoryItemAmount] = useState("");
  const [upInventoryimageurl, setupInventoryimageurl] = useState("");

  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [imageDescription, setImageDescription] = useState("");
  const [catalogImageUrl, setCatalogImageUrl] = useState("");

  const handleAddQuantity = (
    id: any,
    name: any,
    unit: any,
    amount: any,
    imageurl: any
  ) => {
    let inamount = "10";
    setupInventoryid(id);
    setupInventoryItemName(name);
    setupInventoryitemunit(unit);
    setupInventoryItemAmount(inamount);
    setupInventoryimageurl(imageurl);
    setIsInvSearch(false);
  };

  const BackToInvSearch = () => {
    setIsInvSearch(true);
  };

  const handleaddItemFromInventoryOpen = () => {
    setIsAddItemFromInventory(true);
    setIsInvSearch(true);
  };
  const handleaddItemFromInventoryClose = () => {
    setIsAddItemFromInventory(false);
    setUpInventoryResponse("");
    setUpdateInventoryItemResponse(false);
  };
  const AddItemFromInventory = () => {
    const newIngredient: Ingredient = {
      id: upInventoryid,
      itemName: upInventoryitemName,
      imageUrl: upInventoryimageurl,
      amount: upInventoryitemAmount,
      unit: upInventoryitemunit,
      status: true,
    };
    const itemExists = ingredients.some(
      (item) =>
        item.id === newIngredient.id && item.itemName === newIngredient.itemName
    );
    if (itemExists) {
      setUpInventoryResponse("Item Already Exists");
      setUpdateInventoryItemResponse(true);
    } else {
      ingredients.push(newIngredient);
      setUpInventoryResponse("Added Ingredient successfully");
      setUpdateInventoryItemResponse(true);
      console.log(ingredients);
    }
  };

  const fetchinventory = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}menuitem`);
      setMenuItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMenuItems = () => {
    if (ingredientGenerationStatus) {
      setStepNumber(2);
    } else {
      setStepNumber(2);
      setIngredientIsLoading(true);
      const fetchData = async () => {
        try {
          const response = await axios.post(`${BACKEND_URL}menu/suggestion`, {
            dishName: recipename,
          });
          if (response.status === 200) {
            console.log(response.data);
            setIngredients(response.data);
            fetchinventory();
            setIngredientGenerationStatus(true);
            setIngredientIsLoading(false);
          }
        } catch (err) {
          console.log(err);
          setErrorResponse(true);
          setIngredientIsLoading(false);
        }
      };
      fetchData();
    }
  };

  const handleupdateItemOpen = (
    id: any,
    name: any,
    unit: any,
    amount: any,
    imageurl: any
  ) => {
    setupid(id);
    setupItemName(name);
    setupitemunit(unit);
    setupItemAmount(amount);
    setupimageurl(imageurl);
    setUpdateItemModal(true);
  };
  const handleupdateItemClose = () => {
    setUpdateItemIsLoading(false);
    setUpdateItemResponse(false);
    setUpdateItemModal(false);
    setUpResponse("");
  };

  function updateMenuItem(): void {
    setUpdateItemIsLoading(true);
    const updatedIngredients = ingredients.map((ingredient) => {
      if (ingredient.id === upid) {
        return { ...ingredient, amount: upitemAmount };
      }
      return ingredient;
    });
    setIngredients(updatedIngredients);
    setUpdateItemResponse(true);
    setUpResponse("Ingredient updated successfully");
    setUpdateItemIsLoading(false);
  }

  const deleteMenuItem = () => {
    setUpdateItemIsLoading(true);
    const filteredIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== upid
    );
    setIngredients(filteredIngredients);
    setUpResponse("Ingredient removed successfully");
    setUpdateItemIsLoading(false);
  };

  const getCatalogImage = () => {
    setStepNumber(3);
    setImageIsLoading(true);
    setImageDescription(recipename);
    const fetchImage = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}menu/images`, {
          dishName: recipename,
        });
        if (response.status === 200) {
          setCatalogImageUrl(response.data);
          setImageIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setImageIsLoading(false);
      }
    };
    fetchImage();
  };

  const regenerateCatalogImage = () => {
    setImageIsLoading(true);
    const fetchImage = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}menu/images`, {
          dishName: imageDescription,
        });
        if (response.status === 200) {
          setCatalogImageUrl(response.data);
          setImageIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setImageIsLoading(false);
      }
    };
    fetchImage();
  };

  const handleaddRecipeOpen = () => {
    setErrorResponse(false);
    setStepNumber(1);
    setIsAddRecipe(true);
  };

  const handleaddRecipeClose = () => {
    setStepNumber(0);
    setIsAddRecipe(false);
    setRecipeName("");
    setCatalogImageUrl("");
    setIngredientGenerationStatus(false);
    setErrorResponse(false);
  };

  return (
    <>
      {isLoading && (
        <div className="flex w-full h-full pt-64 justify-center items-center">
          <CircularProgress sx={{ color: "#5CAC0E" }} />
        </div>
      )}
      {!isLoading && !addRecipe && (
        <div className="flex flex-col w-full h-full">
          <div className="flex pt-10 pr-10 pl-10 justify-between">
            <div className="flex pl-3 w-56 h-10 rounded border-2 border-neutral-200 items-center">
              <SearchIcon></SearchIcon>
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Recipe" />
            </div>
            <button
              className="w-36 h-12 bg-darkgreen text-white font-poppins font-bold text-sm rounded-3xl"
              onClick={handleaddRecipeOpen}
            >
              Add Recipe
            </button>
          </div>
        </div>
      )}
      {!isLoading && addRecipe && (
        <div className="flex flex-col w-full h-full">
          <Modal open={updateItemModal} onClose={handleupdateItemClose}>
            <Box sx={updateitemmodalstyle}>
              {!updateItemIsLoading && !updateItemResponse && (
                <div className="flex flex-col w-full h-full">
                  <div className="flex flex-col w-full h-full">
                    <div className="grid grid-cols-2 w-full h-full pt-5 justify-center">
                      <div
                        className="flex w-full h-full updatemenuitem rounded"
                        style={{
                          backgroundImage: `url(${upimageurl})`,
                        }}
                      ></div>
                      <div className="grid grid-rows-3 w-full p-5">
                        <div className="flex flex-col w-full h-full">
                          <div className="flex text-lg font-poppins font-normal">
                            Item Name
                          </div>
                          <div className="flex  pt-3 text-darkgreen text-2xl font-poppins font-semibold">
                            {upitemName}
                          </div>
                        </div>
                        <div className="flex flex-col w-full h-full">
                          <div className="flex text-lg font-poppins font-normal">
                            Unit
                          </div>
                          <div className="flex  pt-3 text-darkgreen text-2xl font-poppins font-semibold">
                            {upitemunit}
                          </div>
                        </div>
                        <div>
                          <div className="flex text-lg font-poppins font-normal">
                            Amount
                          </div>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            type="number"
                            value={upitemAmount}
                            className="flex pt-3"
                            color="secondary"
                            onChange={(event) =>
                              setupItemAmount(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid pt-5 grid-flow-col gap-2 w-full justify-end">
                      <button
                        className="w-32 h-12 bg-red-600 text-white font-poppins font-bold text-sm rounded"
                        onClick={deleteMenuItem}
                      >
                        Delete Item
                      </button>
                      <button
                        className="w-32 h-12 bg-darkgreen text-white font-poppins font-bold text-sm rounded"
                        onClick={updateMenuItem}
                      >
                        Update Item
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {updateItemIsLoading && (
                <div className="flex flex-col w-full h-full justify-center items-center">
                  <div className="flex pb-5 text-xl font-poppins">
                    Please wait while updating the item
                  </div>
                  <CircularProgress sx={{ color: "#5CAC0E" }} />
                </div>
              )}
              {updateItemResponse && (
                <div className="flex flex-col w-full h-full justify-center items-center">
                  <div className="flex pb-5 text-xl font-poppins">
                    {upResponse}
                  </div>
                </div>
              )}
            </Box>
          </Modal>

          <Modal
            open={isaddItemFromInventory}
            onClose={handleaddItemFromInventoryClose}
          >
            <Box sx={addinventoryitemmodalstyle}>
              {isInvSearch && !updateInventoryItemResponse && (
                <div className="flex flex-col w-full h-full">
                  <div className="flex pl-3 w-56 h-10 rounded border-2 border-neutral-200 items-center">
                    <SearchIcon></SearchIcon>
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search Inventory"
                      value={searchString}
                      onChange={(e) => setSearchString(e.target.value)}
                    />
                  </div>
                  <div className="flex pt-5 pl-10 font-poppins font-normal text-base">
                    Inventory List
                  </div>
                  <div className="grid p-10 grid-flow-row grid-cols-4 gap-x-5 gap-y-8">
                    {menuItems
                      .filter((item) =>
                        item.itemName
                          .toLowerCase()
                          .includes(searchString.toLowerCase())
                      )
                      .map((item) => (
                        <Card
                          key={item.id}
                          className={`grid grid-rows-6 w-48 h-60 border-2 ${
                            item.low ? "border-red-500" : "border-darkgreen"
                          }`}
                          onClick={() =>
                            handleAddQuantity(
                              item.id,
                              item.itemName,
                              item.unit,
                              item.amount,
                              item.imageUrl
                            )
                          }
                        >
                          <div
                            className="flex row-span-5 w-full h-full menuitem"
                            style={{
                              backgroundImage: `url(${item.imageUrl})`,
                            }}
                          ></div>
                          <div className="flex row-span-1 w-full h-full justify-center font-poppins font-semibold items-center">
                            {item.itemName}
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>
              )}
              {!isInvSearch && !updateInventoryItemResponse && (
                <div className="flex flex-col w-full h-full">
                  <div className="grid grid-cols-2 w-full h-full pt-5 justify-center">
                    <div
                      className="flex w-full h-full updatemenuitem rounded"
                      style={{
                        backgroundImage: `url(${upInventoryimageurl})`,
                      }}
                    ></div>
                    <div className="grid grid-rows-3 w-full p-5">
                      <div className="flex flex-col w-full h-full">
                        <div className="flex text-lg font-poppins font-normal">
                          Item Name
                        </div>
                        <div className="flex  pt-3 text-darkgreen text-2xl font-poppins font-semibold">
                          {upInventoryitemName}
                        </div>
                      </div>
                      <div className="flex flex-col w-full h-full">
                        <div className="flex text-lg font-poppins font-normal">
                          Unit
                        </div>
                        <div className="flex  pt-3 text-darkgreen text-2xl font-poppins font-semibold">
                          {upInventoryitemunit}
                        </div>
                      </div>
                      <div>
                        <div className="flex text-lg font-poppins font-normal">
                          Amount
                        </div>
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          type="number"
                          value={upInventoryitemAmount}
                          className="flex pt-3"
                          color="secondary"
                          onChange={(event) =>
                            setupInventoryItemAmount(event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid pt-5 grid-flow-col gap-2 w-full justify-end">
                    <button
                      className="w-32 h-12 bg-red-500 text-white font-poppins font-bold text-sm rounded"
                      onClick={BackToInvSearch}
                    >
                      Back to Search
                    </button>
                    <button
                      className="w-32 h-12 bg-darkgreen text-white font-poppins font-bold text-sm rounded"
                      onClick={AddItemFromInventory}
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              )}
              {updateInventoryItemResponse && (
                <div className="flex w-full h-full pt-40 justify-center text-xl font-semibold font-poppins">
                  {upInventoryResponse}
                </div>
              )}
            </Box>
          </Modal>

          <div className="flex pt-10 pr-10 pl-10 justify-between">
            <div className="flex pt-5 font-poppins text-xl pl-5 w-full font-bold">
              ADD RECIPE
            </div>
            <button
              className="w-36 h-12 bg-darkgreen text-white font-poppins font-bold text-sm rounded-3xl"
              onClick={handleaddRecipeClose}
            >
              Back to Recipes
            </button>
          </div>
          <div className="flex pt-5 justify-center w-full">
            <LinearProgress
              color="secondary"
              variant="determinate"
              value={stepnumber * 20}
            />
          </div>
          {errorResponse && (
            <div className="flex w-full h-full pt-40 text-xl justify-center items-center text-poppins font-semibold">
              Error in adding new item. Please try again later
            </div>
          )}
          {stepnumber == 1 && !errorResponse && (
            <div className="flex flex-col justify-start pl-60 pt-5 w-full h-full">
              <div className="flex font-poppins text-2xl pt-5 pb-5 font-semibold text-darkgreen">
                Name
              </div>
              <TextField
                id="outlined-basic"
                label="Enter Recipe Name"
                variant="outlined"
                color="secondary"
                value={recipename}
                onChange={(event) => setRecipeName(event.target.value)}
                className="flex w-2/4"
              />
              <div className="flex pt-5 pb-5 font-poppins text-2xl font-semibold text-darkgreen">
                Description
              </div>
              <TextField
                id="outlined-textarea"
                label="Enter Recipe Description"
                className="flex w-2/4"
                value={recipedescription}
                onChange={(event) => setRecipeDescription(event.target.value)}
                multiline
                maxRows={2}
              />
              <div className="flex w-full pt-5 justify-center">
                <button
                  className="w-32 h-12 bg-darkgreen text-white font-poppins font-bold text-sm rounded"
                  onClick={getMenuItems}
                >
                  Add Ingredients
                </button>
              </div>
            </div>
          )}
          {stepnumber == 2 && !errorResponse && (
            <div className="flex flex-col w-full h-full">
              {ingredientIsLoading && (
                <div className="flex flex-col w-full h-full justify-center items-center">
                  <div className="flex pt-32 text-xl font-poppins">
                    {"Please wait while we generate ingredients for " +
                      recipename}
                  </div>
                  <div className="flex pb-5 text-xl font-poppins">
                    This usually takes 2-3 minutes
                  </div>
                  <CircularProgress sx={{ color: "#5CAC0E" }} />
                </div>
              )}
              {!ingredientIsLoading && (
                <div className="flex flex-col w-full h-full pt-5">
                  <div className="flex flex-row w-full justify-between">
                    <div className="flex pt-8 pl-20 text-xl font-poppins font-semibold text-darkgreen">
                      Ingredients
                    </div>
                    <div className="flex pr-20">
                      <button
                        className="w-48 h-12 bg-darkgreen text-white font-poppins font-bold text-sm rounded"
                        onClick={handleaddItemFromInventoryOpen}
                      >
                        <AddIcon></AddIcon> Add from Inventory
                      </button>
                    </div>
                  </div>
                  <div className="grid pt-5 pb-5 pl-20 pr-20 grid-cols-4 gap-5 grid-flow-row overflow-auto">
                    {ingredients.map((item) => (
                      <Card
                        key={item.id}
                        className={`grid grid-rows-6 w-48 h-72 border-2 ${
                          item.status ? "border-darkgreen" : "border-red-500"
                        }`}
                        onClick={() =>
                          handleupdateItemOpen(
                            item.id,
                            item.itemName,
                            item.unit,
                            item.amount,
                            item.imageUrl
                          )
                        }
                      >
                        <div
                          className="flex row-span-5 w-full h-full menuitem"
                          style={{
                            backgroundImage: `url(${item.imageUrl})`,
                          }}
                        ></div>
                        <div className="flex flex-col row-span-1">
                          <div className="flex w-full h-full justify-center font-poppins font-semibold text-limegreen items-center">
                            {item.itemName}
                          </div>
                          <div className="flex w-full h-full justify-center font-poppins font-medium items-center">
                            {item.unit + "- " + item.amount}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <div className="flex w-full pt-5 justify-center">
                    <button
                      className="w-32 h-12 bg-darkgreen text-white font-poppins font-bold text-sm rounded"
                      onClick={getCatalogImage}
                    >
                      Add Image
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {stepnumber == 3 && !errorResponse && (
            <div className="flex flex-col w-full h-full">
              {imageIsLoading && (
                <div className="flex flex-col w-full h-full justify-center items-center">
                  <div className="flex pt-32 text-xl font-poppins">
                    {"Please wait while we generate image for " +
                      imageDescription}
                  </div>
                  <CircularProgress sx={{ color: "#5CAC0E" }} />
                </div>
              )}
              {!imageIsLoading && (
                <div className="flex flex-col w-full h-full pt-5">
                  <div className="flex pt-5 pl-20 w-full justify-between">
                    <TextField
                      id="outlined-basic"
                      label="Image description"
                      variant="outlined"
                      value={imageDescription}
                      className="flex w-3/6"
                      color="secondary"
                      onChange={(event) =>
                        setImageDescription(event.target.value)
                      }
                    />
                    <div className="flex pr-20">
                      <button
                        className="w-48 h-12 bg-darkgreen text-white font-poppins font-bold text-sm rounded"
                        onClick={regenerateCatalogImage}
                      >
                        <AutorenewIcon></AutorenewIcon> Regenerate Image
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center w-full h-full pt-5 pb-5 pl-20 pr-20">
                    <div
                      className="flex w-2/3 h-72 bg-darkgreen menuitem rounded"
                      style={{
                        backgroundImage: `url(${catalogImageUrl})`,
                      }}
                    ></div>
                  </div>
                  <div className="flex w-full pb-5 pr-20 justify-end">
                    <button className="w-32 h-12 bg-darkgreen text-white font-poppins font-bold text-sm rounded">
                      Add Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Menu;