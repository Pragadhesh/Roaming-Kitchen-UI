import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Theme, useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Item, ItemVariation } from "../../interface/orderitem";

import {
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const addItemModalstyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #5CAC0E",
  boxShadow: 24,
  borderRadius: 2,
  outline: "none",
  p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, itemType: string | undefined, theme: Theme) {
  return {
    fontWeight:
      itemType === name
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

const OrderMenu = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState<Item[]>([]);

  const [addItemModal, setAddItemModal] = useState(true);

  const [addItemName, setAddItemName] = useState("");
  const [addItemImageUrl, setAddItemImageUrl] = useState("");
  const [addItemVariations, setAddItemVariations] = useState<ItemVariation[]>(
    []
  );

  const handleaddItemClose = () => {
    setitemType("");
    setAddItemName("");
    setAddItemImageUrl("");
    setAddItemVariations([]);
    setAddItemModal(false);
  };

  const handleaddItemOpen = (
    name: any,
    image: any,
    variations: ItemVariation[]
  ) => {
    setAddItemName(name);
    setAddItemImageUrl(image);
    setAddItemVariations(variations);
    setitemType(variations[0].item_variation_data.name);
    setAddItemModal(true);
  };

  const imageUrl =
    "https://square-catalog-sandbox.s3.amazonaws.com/files/c419890039984c733872ff90bc5f710cab1dbcc3/original.jpeg";

  const [itemType, setitemType] = React.useState<string>();
  const handleChange = (event: SelectChangeEvent<typeof itemType>) => {
    const {
      target: { value },
    } = event;
    setitemType(value);
  };

  const [quantity, setQuantity] = useState(0);
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const result = [
      {
        id: "KFW3VDQAMVVC27IVN5UVD5OL",
        name: "Vanilla ice cream",
        description: "Ice cream",
        availability: false,
        imageUrl:
          "https://square-catalog-sandbox.s3.amazonaws.com/files/c419890039984c733872ff90bc5f710cab1dbcc3/original.jpeg",
        variations: [
          {
            type: "ITEM_VARIATION",
            id: "IX3O5UGTJ3NS23MF6GHQLCF3",
            updated_at: "2023-05-07T06:28:21.683Z",
            version: 1683440901683,
            is_deleted: false,
            custom_attribute_values: null,
            catalog_v1_ids: null,
            present_at_all_locations: true,
            present_at_location_ids: null,
            absent_at_location_ids: null,
            item_variation_data: {
              item_id: "KFW3VDQAMVVC27IVN5UVD5OL",
              name: "Regular",
              sku: null,
              upc: null,
              ordinal: 0,
              pricing_type: "FIXED_PRICING",
              price_money: {
                amount: 5000,
                currency: "USD",
              },
              location_overrides: null,
              track_inventory: null,
              inventory_alert_threshold: null,
              user_data: null,
              service_duration: null,
              available_for_booking: null,
              item_option_values: null,
              measurement_unit_id: null,
              sellable: true,
              stockable: true,
              image_ids: null,
              team_member_ids: null,
              item_variation_vendor_info_ids: null,
            },
          },
          {
            type: "ITEM_VARIATION",
            id: "P3HBQNJ3E6BSMDDRP5IZ3RYM",
            updated_at: "2023-05-07T06:28:21.683Z",
            version: 1683440901683,
            is_deleted: false,
            custom_attribute_values: null,
            catalog_v1_ids: null,
            present_at_all_locations: true,
            present_at_location_ids: null,
            absent_at_location_ids: null,
            item_variation_data: {
              item_id: "KFW3VDQAMVVC27IVN5UVD5OL",
              name: "Medium",
              sku: null,
              upc: null,
              ordinal: 1,
              pricing_type: "FIXED_PRICING",
              price_money: {
                amount: 10000,
                currency: "USD",
              },
              location_overrides: null,
              track_inventory: null,
              inventory_alert_threshold: null,
              user_data: null,
              service_duration: null,
              available_for_booking: null,
              item_option_values: null,
              measurement_unit_id: null,
              sellable: true,
              stockable: true,
              image_ids: null,
              team_member_ids: null,
              item_variation_vendor_info_ids: null,
            },
          },
        ],
      },
      {
        id: "BJKCWLIQVJ7XNUHMJ3HSCRID",
        name: "Orange juice",
        description: "Juice",
        availability: false,
        imageUrl:
          "https://square-catalog-sandbox.s3.amazonaws.com/files/232b73a9aa53a607acc5cb9fe94ddc76ebec2886/original.jpeg",
        variations: [
          {
            type: "ITEM_VARIATION",
            id: "PXGCN2FBSYIPP7KVE75YVSNW",
            updated_at: "2023-05-10T14:49:24.254Z",
            version: 1683730164254,
            is_deleted: false,
            custom_attribute_values: null,
            catalog_v1_ids: null,
            present_at_all_locations: true,
            present_at_location_ids: null,
            absent_at_location_ids: null,
            item_variation_data: {
              item_id: "BJKCWLIQVJ7XNUHMJ3HSCRID",
              name: "Medium",
              sku: null,
              upc: null,
              ordinal: 0,
              pricing_type: "FIXED_PRICING",
              price_money: {
                amount: 5000,
                currency: "USD",
              },
              location_overrides: null,
              track_inventory: null,
              inventory_alert_threshold: null,
              user_data: null,
              service_duration: null,
              available_for_booking: null,
              item_option_values: null,
              measurement_unit_id: null,
              sellable: true,
              stockable: true,
              image_ids: null,
              team_member_ids: null,
              item_variation_vendor_info_ids: null,
            },
          },
        ],
      },
      {
        id: "DEUMS6XC2CVOHUH7JSAKWGUD",
        name: "Watermelon juice",
        description: "Juice",
        availability: false,
        imageUrl:
          "https://square-catalog-sandbox.s3.amazonaws.com/files/48044db73303c8e88722aec8dd4e97d932242461/original.jpeg",
        variations: [
          {
            type: "ITEM_VARIATION",
            id: "PTK7WEKRY7QHKNR75NY2EB46",
            updated_at: "2023-05-11T05:31:49.589Z",
            version: 1683783109589,
            is_deleted: false,
            custom_attribute_values: null,
            catalog_v1_ids: null,
            present_at_all_locations: true,
            present_at_location_ids: null,
            absent_at_location_ids: null,
            item_variation_data: {
              item_id: "DEUMS6XC2CVOHUH7JSAKWGUD",
              name: "Regular",
              sku: null,
              upc: null,
              ordinal: 0,
              pricing_type: "FIXED_PRICING",
              price_money: {
                amount: 2000,
                currency: "USD",
              },
              location_overrides: null,
              track_inventory: null,
              inventory_alert_threshold: null,
              user_data: null,
              service_duration: null,
              available_for_booking: null,
              item_option_values: null,
              measurement_unit_id: null,
              sellable: true,
              stockable: true,
              image_ids: null,
              team_member_ids: null,
              item_variation_vendor_info_ids: null,
            },
          },
          {
            type: "ITEM_VARIATION",
            id: "ZFRZXFI53B4XOSFYA33WBLTQ",
            updated_at: "2023-05-11T05:31:49.589Z",
            version: 1683783109589,
            is_deleted: false,
            custom_attribute_values: null,
            catalog_v1_ids: null,
            present_at_all_locations: true,
            present_at_location_ids: null,
            absent_at_location_ids: null,
            item_variation_data: {
              item_id: "DEUMS6XC2CVOHUH7JSAKWGUD",
              name: "Medium",
              sku: null,
              upc: null,
              ordinal: 1,
              pricing_type: "FIXED_PRICING",
              price_money: {
                amount: 5000,
                currency: "USD",
              },
              location_overrides: null,
              track_inventory: null,
              inventory_alert_threshold: null,
              user_data: null,
              service_duration: null,
              available_for_booking: null,
              item_option_values: null,
              measurement_unit_id: null,
              sellable: true,
              stockable: true,
              image_ids: null,
              team_member_ids: null,
              item_variation_vendor_info_ids: null,
            },
          },
        ],
      },
    ];
    setItems(result);
  }, []);

  return (
    <div className="flex flex-col w-full h-screen overflow-y-scroll overflow-x-hidden">
      <div className="flex justify-between w-full h-20 bg-zinc-200">
        <div className="flex w-full items-center">
          <div className="flex self-center imagelogo"></div>
          <div className="flex pl-2 font-semibold font-poppins text-darkgreen self-center pt-5 text-lg">
            THE ROAMING KITCHEN
          </div>
        </div>
        <div className="flex pr-5 pt-3">
          <Link to="/customer">
            <button className="w-36 h-12 bg-darkgreen text-white font-poppins font-bold text-sm rounded-3xl">
              Back
            </button>
          </Link>
        </div>
      </div>
      {!isLoading && (
        <div>
          <div className="flex w-full justify-end">
            <Modal open={addItemModal} onClose={handleaddItemClose}>
              <Box sx={addItemModalstyle}>
                <div className="grid grid-cols-2 w-full h-full">
                  <div
                    className="flex w-full h-full menuitem rounded"
                    style={{
                      backgroundImage: `url(${addItemImageUrl})`,
                    }}
                  ></div>
                  <div className="flex flex-col w-full h-full p-3 justify-center">
                    <div className="flex pb-5 w-full font-poppins text-xl text-darkgreen font-semibold">
                      {addItemName}
                    </div>
                    <FormControl sx={{ m: 1, width: 250 }} color="secondary">
                      <InputLabel id="demo-multiple-name-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={itemType}
                        onChange={handleChange}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                      >
                        {addItemVariations.map((variation) => (
                          <MenuItem
                            key={variation.id}
                            value={variation.item_variation_data.name}
                            style={getStyles(
                              variation.item_variation_data.name,
                              itemType,
                              theme
                            )}
                          >
                            {variation.item_variation_data.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div className="flex pt-5 pr-5 justify-between">
                      <div className="flex w-full font-poppins text-xl text-darkgreen font-semibold  pr-5 pl-3">
                        Quantity
                      </div>
                      <div className="flex flex-row">
                        <button
                          className="flex items-center"
                          onClick={handleDecrement}
                        >
                          <RemoveIcon color="secondary" fontSize="medium" />
                        </button>
                        <span className="flex pl-1 pr-1 text-2xl text-darkgreen ">
                          {quantity}
                        </span>
                        <button
                          onClick={handleIncrement}
                          className="flex items-center"
                        >
                          <AddIcon color="secondary" fontSize="medium" />
                        </button>
                      </div>
                    </div>
                    <div className="flex pt-5 pr-5 justify-between">
                      <div className="flex w-full font-poppins text-xl text-darkgreen font-semibold  pr-5 pl-3">
                        Price
                      </div>
                      <div className="flex text-xl font-semibold text-darkgreen">
                        120
                      </div>
                    </div>
                    <div className="flex w-full justify-end pt-7">
                      <button className="w-28 h-12 bg-darkgreen text-white font-poppins font-bold text-sm rounded">
                        Add Item
                      </button>
                    </div>
                  </div>
                </div>
              </Box>
            </Modal>
            <div className="flex pr-10 pt-4">
              <div className="relative">
                <div
                  className="absolute bg-darkgreen rounded-full w-5 h-5 flex items-center justify-center"
                  style={{ zIndex: 1, top: "-10px", right: "-12px" }}
                >
                  <div className="text-white font-semibold text-sm justify-center items-center">
                    4
                  </div>
                </div>
                <LocalMallIcon fontSize="large" color="secondary" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-y-5 justify-center pl-48 pr-48">
            {items.map((recipe) => (
              <div className="flex justify-center" key={recipe.id}>
                <div
                  className="grid grid-rows-6 w-48 h-72 rounded border-2 border-darkgreen"
                  onClick={() =>
                    handleaddItemOpen(
                      recipe.name,
                      recipe.imageUrl,
                      recipe.variations
                    )
                  }
                >
                  <div
                    className="flex row-span-4 w-full h-full menuitem"
                    style={{
                      backgroundImage: `url(${recipe.imageUrl})`,
                    }}
                  ></div>
                  <div className="flex row-span-1 w-full h-full justify-center font-poppins font-semibold items-center text-darkgreen">
                    {recipe.name}
                  </div>
                  <div className="flex row-span-1 w-full h-full justify-center font-poppins font-semibold items-center bg-limegreen text-white">
                    ADD
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderMenu;
