import {
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import MapContainer from "../maps/Directionmap";
import { Order } from "../../interface/activeorders";

const OrderDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [orderstatus, setOrderStatus] = useState(false);

  const [category, setCategory] = useState("details");
  const handleCategoryChange = (
    event: React.MouseEvent<HTMLElement>,
    newCategory: string
  ) => {
    setCategory(newCategory);
  };

  const [orderdetails, setOrderDetails] = useState<Order>(
    useSelector((state: any) => state.manager.order)
  );

  useEffect(() => {
    if (orderdetails) {
      setOrderStatus(true);
    } else {
      // The orderdetails variable is null
      // Perform alternative actions or logic here
    }
  }, []);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="flex justify-between w-full h-20 bg-zinc-200">
        <div className="flex w-full items-center">
          <div className="flex self-center imagelogo"></div>
          <div className="flex pl-2 font-semibold font-poppins text-darkgreen self-center pt-5 text-lg">
            THE ROAMING KITCHEN
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="flex w-full h-full justify-center items-center">
          <CircularProgress sx={{ color: "#5CAC0E" }} />
        </div>
      )}
      {!isLoading && response && (
        <div className="flex flex-col w-full h-full justify-center items-center">
          <div className="flex pb-3">
            <VerifiedOutlinedIcon
              style={{ fontSize: "75px", width: "75px", height: "75px" }}
              color="secondary"
            ></VerifiedOutlinedIcon>
          </div>
          <div className="flex text-3xl font-poppins font-semibold text-darkgreen">
            Order Delivered successfully
          </div>
        </div>
      )}
      {!isLoading && !response && orderstatus && (
        <div className="flex flex-col w-full h-full pt-3">
          <div className="flex w-full justify-center">
            <ToggleButtonGroup
              color="primary"
              value={category}
              exclusive
              onChange={handleCategoryChange}
              aria-label="Platform"
            >
              <ToggleButton
                value="details"
                style={
                  category === "details"
                    ? { backgroundColor: "#5CAC0E", color: "white" }
                    : {}
                }
              >
                DETAILS
              </ToggleButton>
              <ToggleButton
                value="address"
                style={
                  category === "address"
                    ? { backgroundColor: "#5CAC0E", color: "white" }
                    : {}
                }
              >
                ADDRESS
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          {category === "address" && (
            <div className="flex pl-5 pr-5 pt-5 w-full h-full overflow-hidden">
              <MapContainer
                storeLatitude={37.7749}
                storeLongitude={-122.4194}
                customerLatitude={parseFloat(orderdetails.metadata.latitude)}
                customerLongitude={parseFloat(orderdetails.metadata.longitude)}
              />
              <div className="flex flex-col p-10 w-full h-full justify-start overflow-hidden">
                <div className="flex text-2xl font-poppins text-darkgreen font-semibold">
                  {
                    orderdetails.fulfillments[0].delivery_details.recipient
                      .display_name
                  }
                </div>
                <hr className="w-60 mt-5 border border-gray-300" />
                <div className="flex pt-5 text-xl font-poppin text-limegreen font-bold">
                  Contact
                </div>
                <div className="grid grid-rows-2 gap-2 pt-2">
                  <div className="flex text-sm text-emerald-700 font-semibold w-52">
                    {
                      orderdetails.fulfillments[0].delivery_details.recipient
                        .phone_number
                    }
                  </div>

                  <div className="flex text-sm text-emerald-700 font-semibold w-52 ">
                    {
                      orderdetails.fulfillments[0].delivery_details.recipient
                        .email_address
                    }
                  </div>
                </div>
                <hr className="w-60 mt-5 border border-gray-300" />
                <div className="flex pt-5 text-xl font-poppins text-limegreen font-bold">
                  Address
                </div>
                <div className="flex pt-3 text-sm text-emerald-700 font-semibold w-52">
                  {
                    orderdetails.fulfillments[0].delivery_details.recipient
                      .address.address_line_1
                  }
                </div>
                <div className="flex pt-7">
                  <button className="w-36 h-10 bg-darkgreen text-white font-poppins font-bold text-xs rounded">
                    Complete Delivery
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
