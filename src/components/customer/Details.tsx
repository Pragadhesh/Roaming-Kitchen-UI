import { CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useSelector } from "react-redux";

const Details = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [response, setResponse] = useState(false);

  const [customerlatitude, setCustomerLatitude] = useState(
    useSelector((state: any) => state.customer.customerlatitude)
  );
  const [customerlongitude, setCustomerLongitude] = useState(
    useSelector((state: any) => state.customer.customerlongitude)
  );
  const [cartitems, setCartItems] = useState(
    useSelector((state: any) => state.customer.cartitems)
  );

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  const placeOrder = async () => {
    let isValid = true;
    let errorMsg = "";

    if (firstname.trim() === "") {
      isValid = false;
      errorMsg = "First name is required";
    } else if (lastname.trim() === "") {
      isValid = false;
      errorMsg = "Last name is required";
    } else if (address.trim() === "") {
      isValid = false;
      errorMsg = "Address is required";
    } else if (phoneNumber.trim() === "") {
      isValid = false;
      errorMsg = "Phone number is required";
    } else if (!/^\+?\d{9,16}$/.test(phoneNumber)) {
      isValid = false;
      errorMsg = "Phone number is invalid";
    } else if (email.trim() === "") {
      isValid = false;
      errorMsg = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      errorMsg = "Email is invalid";
    }

    if (isValid) {
      setError(false);
      setIsLoading(true);
      console.log("Order placed successfully");
    } else {
      setError(true);
      setErrormsg(errorMsg);
    }
  };

  useEffect(() => {
    console.log(customerlatitude);
    console.log(customerlongitude);
    console.log(cartitems);
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
          <Link to="/home">
            <button className="w-36 h-12 bg-darkgreen text-white font-poppins font-bold text-sm rounded-3xl">
              Back to home
            </button>
          </Link>
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
            Order placed successfully
          </div>
        </div>
      )}
      {!isLoading && !response && (
        <div className="flex flex-col w-full h-full items-center justify-center">
          <div className="flex w-2/5 justify-items-start text-2xl font-semibold font-poppins text-darkgreen">
            Customer Details
          </div>
          <div className="grid grid-cols-2 w-2/5 pt-3 gap-3">
            <div className="flex flex-col">
              <div className="flex  text-gray-500 font-poppins font-semibold">
                Firstname
              </div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="secondary"
                value={firstname}
                onChange={(event) => setfirstname(event.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex  text-gray-500 font-poppins font-semibold">
                Lastname
              </div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="secondary"
                value={lastname}
                onChange={(event) => setlastname(event.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 w-2/5 pt-3 gap-3">
            <div className="flex flex-col">
              <div className="flex  text-gray-500 font-poppins font-semibold">
                Phone
              </div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="secondary"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex  text-gray-500 font-poppins font-semibold">
                Email
              </div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="secondary"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="flex w-2/5 pt-3">
            <div className="flex w-4/5  flex-col ">
              <div className="flex  text-gray-500 font-poppins font-semibold">
                Address
              </div>
              <TextField
                id="outlined-textarea"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                maxRows={2}
                color="secondary"
                multiline
              />
            </div>
          </div>
          {error && (
            <div className="flex pt-3 text-xl text-red-500 font-semibold font-poppins justify-start w-2/5">
              {errormsg}
            </div>
          )}
          <div className="flex justify-end w-2/5 pt-3">
            <button
              className="w-28 h-10 bg-darkgreen text-white font-poppins font-semibold  text-sm rounded"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
