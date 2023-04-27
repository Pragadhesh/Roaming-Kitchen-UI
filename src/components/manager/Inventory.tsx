import "./Inventory.css";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Card,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

const additemmodalstyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #5CAC0E",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const Inventory = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [addItemModal, setAddItemModal] = useState(true);
  const [addItemIsLoading, setAddItemIsLoading] = useState(false);
  const [addItemResponse, setAddItemResponse] = useState(false);
  const handleaddItemOpen = () => setAddItemModal(true);
  const handleaddItemClose = () => {
    setAddItemIsLoading(false);
    setAddItemResponse(false);
    setAddItemModal(false);
  };

  const [addItemUnit, setAddItemUnit] = React.useState("");

  const handleAddItemUnitChange = (event: SelectChangeEvent) => {
    setAddItemUnit(event.target.value as string);
  };

  return (
    <>
      {isLoading && (
        <div className="flex w-full h-full justify-center items-center">
          <CircularProgress sx={{ color: "#5CAC0E" }} />
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col w-full h-full">
          <Modal open={addItemModal} onClose={handleaddItemClose}>
            <Box sx={additemmodalstyle}>
              <div className="flex flex-col w-full h-full">
                {addItemIsLoading && !addItemResponse && (
                  <div className="flex w-full h-full">
                    <div className="flex flex-col w-full h-full justify-center items-center">
                      <div className="flex pb-5">
                        Please wait while the item is being added to the
                        inventory
                      </div>
                      <CircularProgress sx={{ color: "#5CAC0E" }} />
                    </div>
                  </div>
                )}
                {!addItemIsLoading && addItemResponse && (
                  <div className="flex w-full h-full">
                    <div className="flex w-full h-full text-xl font-semibold font-poppins justify-center items-center">
                      Item Added Successfully
                    </div>
                  </div>
                )}
                {!addItemIsLoading && !addItemResponse && (
                  <>
                    <div className="grid grid-rows-3 grid-flow-col items-center gap-7 w-full pt-5 justify-start">
                      <div className="grid w-full h-full grid-cols-2">
                        <div className="flex font-poppins text-xl font-normal h-7 self-center">
                          Item Name
                        </div>
                        <TextField
                          id="outlined-basic"
                          label="Name"
                          variant="outlined"
                          className="flex pl-5"
                        />
                      </div>
                      <div className="grid w-full h-full grid-cols-2">
                        <div className="flex font-poppins text-xl font-normal h-7 self-center">
                          Unit
                        </div>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Unit
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addItemUnit}
                            label="Unit"
                            onChange={handleAddItemUnitChange}
                          >
                            <MenuItem value={"PIECE"}>PIECE</MenuItem>
                            <MenuItem value={"GRAM"}>GRAM</MenuItem>
                            <MenuItem value={"TEASPOON"}>TEASPOON</MenuItem>
                            <MenuItem value={"TABLESPPON"}>TABLESPPON</MenuItem>
                            <MenuItem value={"CUP"}>CUP</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="grid w-full h-full grid-cols-2">
                        <div className="flex font-poppins text-xl font-normal h-7 self-center">
                          Amount
                        </div>
                        <TextField
                          id="outlined-basic"
                          label="Amount"
                          variant="outlined"
                          type="number"
                          className="flex pl-5"
                        />
                      </div>
                    </div>
                    <div className="flex w-full justify-end pt-7">
                      <button className="w-48 h-12 bg-darkgreen text-white font-poppins font-bold text-sm rounded">
                        Add Item to Inventory
                      </button>
                    </div>
                  </>
                )}
              </div>
            </Box>
          </Modal>

          <div className="flex pt-10 pr-10 pl-10 justify-between">
            <div className="flex pl-3 w-56 h-10 rounded border-2 border-neutral-200 items-center">
              <SearchIcon></SearchIcon>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Inventory"
              />
            </div>
            <button
              className="w-36 h-12 bg-darkgreen text-white font-poppins font-bold text-sm rounded-3xl"
              onClick={handleaddItemOpen}
            >
              Add Item
            </button>
          </div>
          <div className="flex pt-5 pl-10 font-poppins font-normal text-base">
            Inventory List
          </div>
          <div className="grid p-10 grid-flow-row grid-cols-4 gap-x-5 gap-y-8">
            <Card className="grid grid-rows-6 w-48 h-60 border-2 border-red-500 ">
              <div
                className="flex row-span-5 w-full h-full menuitem"
                /*style={{
                  backgroundImage: `url(${upbgimage})`,
                }}*/
              ></div>
              <div className="flex row-span-1 w-full h-full justify-center font-poppins font-semibold items-center">
                Mutton
              </div>
            </Card>
            <Card className="grid grid-rows-6 w-48 h-60 border-2 border-red-500 ">
              <div
                className="flex row-span-5 w-full h-full menuitem"
                /*style={{
                  backgroundImage: `url(${upbgimage})`,
                }}*/
              ></div>
              <div className="flex row-span-1 w-full h-full justify-center font-poppins font-semibold items-center">
                Mutton
              </div>
            </Card>
            <Card className="grid grid-rows-6 w-48 h-60 border-2 border-red-500 ">
              <div
                className="flex row-span-5 w-full h-full menuitem"
                /*style={{
                  backgroundImage: `url(${upbgimage})`,
                }}*/
              ></div>
              <div className="flex row-span-1 w-full h-full justify-center font-poppins font-semibold items-center">
                Mutton
              </div>
            </Card>
            <Card className="grid grid-rows-6 w-48 h-60 border-2 border-red-500 ">
              <div
                className="flex row-span-5 w-full h-full menuitem"
                /*style={{
                  backgroundImage: `url(${upbgimage})`,
                }}*/
              ></div>
              <div className="flex row-span-1 w-full h-full justify-center font-poppins font-semibold items-center">
                Mutton
              </div>
            </Card>
            <Card className="grid grid-rows-6 w-48 h-60 border-2 border-red-500 ">
              <div
                className="flex row-span-5 w-full h-full menuitem"
                /*style={{
                  backgroundImage: `url(${upbgimage})`,
                }}*/
              ></div>
              <div className="flex row-span-1 w-full h-full justify-center font-poppins font-semibold items-center">
                Mutton
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Inventory;
