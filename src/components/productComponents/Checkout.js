import React, { useState, useContext, useEffect } from "react";
import { database } from "../../firebase";
import moment from "moment";
import { useHistory } from "react-router";
import Loader from './../ui/Loader'
import styled from "styled-components";
import {
  Grid,
  makeStyles,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Form } from "react-bootstrap";
// import { StateContext } from '../../context/StateProvider';
import { StateContext } from "../../context/StateContext";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  rowContainer: {
    paddingLeft: "4em",
    paddingRight: "4em",
    paddingTop: "2em",
    paddingBottom: "10em",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "1.5em",
      paddingRight: "1.5em",
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "1.5em",
      paddingRight: "1.5em",
      paddingTop: "1em",
    },
  },
  root: {
    display: "flex",
    boxShadow: theme.shadows[10],
    borderRadius: 10,
    // padding:'1em'
  },
  CheckoutCard: {
    display: "flex",
    boxShadow: theme.shadows[5],
    borderRadius: 5,
    // padding:'1em'
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    paddingRight: "1em",
  },
  cover: {
    width: 151,
    marginLeft: "auto",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  esitmate: {
    ...theme.typography.estimate,
    fontSize: "1.5rem",
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 80,
    width: 205,
    marginRight: "5em",
    marginLeft: "2em",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
  },
  message: {
    border: `2px solid ${theme.palette.common.black}`,
    marginTop: "5em",
    borderRadius: 5,
  },
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 45,
    width: 245,
    fontSize: "1rem",
    backgroundColor: theme.palette.common.black,
    "&:hover": {
      backgroundColor: theme.palette.common.black.light,
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225,
    },
  },
}));
export default function Checkout() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  //Context
  const { cart, userdata, cartsave, carttotal } = useContext(StateContext);
  const [dataCart] = cart;
  const [user] = userdata;
  const [cartSave] = cartsave;
  const [cartTotal, setcartTotal] = carttotal;
  //State
  const [address, setAddress] = useState([]);
  const [value, setValue] = useState();
  const ide = user;
  const [amount, setAmount] = useState();
  const [loading,setLoading] = useState(false);
 
  // const [product] = React.useState({
  //    name: "Purchase",
  //    description: dataCart
  // });

  async function handleToken(token) {
    setLoading(true)
    const response = await axios.post(
      "https://gentle-castle-44871.herokuapp.com/checkout",
      { token, amount, address }
    );
    const { status } = response.data;
    
    console.log("Response:", response.data);
    setcartTotal(0);
    if (status === "success") {
      setLoading(false)
      history.push("/orderconfirm");
      console.log("Success! Check email for details", { type: "success" });
      addtoOrder();
      deleteCart();
    } else {
      console.log("Something went wrong", { type: "error" });
    }
  }
  const addtoOrder = () => {
    dataCart.map((item) =>
      database
        .collection("users")
        .doc(user)
        .collection("order")
        .add({
          price: item.price,
          productName: item.productName,
          desc: item.productName,
          image: item.image,
          address: address,
          oldPrice: item.oldPrice,
          date: moment()
            .valueOf()
            .toString(),
        })
    );
  };
  const deleteCart = () => {
    dataCart.map((item) =>
      database
        .collection("users")
        .doc(user)
        .collection("cart")
        .doc(item.key)
        .delete()
        .then((res) => {
          console.log(res);
        })
    );
  };
  const pod = () => {
    addtoOrder();
    deleteCart();
  };

  // Address FEtch
  useEffect(() => {
   
    const getAddress = [];
    if (ide) {
      database
        .collection("users")
        .doc(ide)
        .collection("shipping")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            getAddress.push({ ...doc.data(), key: doc.id });
          });
          setAddress(getAddress);
          setAmount(cartTotal);
        });
    }
  }, [ide, cartTotal]);

  const OriginalPrice = styled.span`
    text-decoration: line-through;
    font-size: 15px;
    font-weight: 100;
    color: #7e818c;
    padding: 0 0.2rem;
  `;

  return (
    <div>
     
      
      <Grid
        Container
        direction={matchesSM ? "column" : " row"}
        alignItems="center"
        className={classes.rowContainer}
      >
          {loading ? <Loader /> :
       
        <Grid item container direction="row" justifyContent="center">
          <Grid item lg={4}>
            {/* first Item */}
            {dataCart &&
              dataCart.map((doc) => (
                <Card
                  className={classes.root}
                  style={{
                    marginBottom: "2em",
                    maxWidth: matchesXS ? "23em" : "30em",
                    height: "13em",
                  }}
                >
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography
                        style={{ fontFamily: "sans-serif" }}
                        variant={matchesXS ? "h6" : "h5"}
                      >
                        {doc.productName}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontFamily: "16px sans-serif",
                          color: "#333333",
                          fontWeight: "bold",
                        }}
                      >
                        ₹{doc.price}
                        <OriginalPrice
                          id="price"
                          style={{ fontFamily: "sans-serif" }}
                        >
                          {doc.oldPrice}
                        </OriginalPrice>
                      </Typography>
                      <Typography
                        variant={matchesXS ? "body1" : "subtitle1"}
                        style={{
                          fontFamily: "sans-serif",
                          color: "#1D8802",
                          fontSize: matchesXS ? "0.7rem" : "1.1rem",
                        }}
                      >
                        You saved ₹{doc.oldPrice - doc.price}!
                      </Typography>
                    </CardContent>
                  </div>
                  <CardMedia
                    className={classes.cover}
                    // style={{height:matchesXS?'10em':'inherit'}}
                    image={doc.image}
                    title="Live from space album cover"
                  />
                </Card>
              ))}
          </Grid>
          <Grid
            item
            lg={5}
            md={5}
            sm={10}
            xs={12}
            style={{ marginLeft: matchesXS ? 0 : matchesMD ? "3em" : "8em" }}
            alignItems="center"
          >
            <Card
              className={classes.CheckoutCard}
              style={{ backgroundColor: "#F6F6F7" }}
            >
              <CardContent className={classes.content}>
                <Typography
                  variant="h5"
                  style={{
                    backgroundColor: "#F6F6F7",
                    color: "#000000",
                    fontFamily: "sans-serif",
                    borderBottom: "solid ",
                    fontWeight: "bold",
                  }}
                >
                  Shipping Address
                </Typography>
                <Typography
                  style={{
                    backgroundColor: "#F6F6F7",
                    color: "black",
                    fontFamily: "sans-serif",
                    marginTop: "0.5em",
                    fontSize: "1.35rem",
                    marginBottom: "0.5em",
                  }}
                >
                  {address.map((d) => (
                    <div>
                      Locality: {d.address}
                      <br />
                      City:{d.city},{d.state}
                      <br />
                      Pincode:{d.pincode}
                    </div>
                  ))}
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    backgroundColor: "#F6F6F7",
                    color: "#000000",
                    fontFamily: "sans-serif",
                    borderBottom: "solid ",
                    fontWeight: "bold",
                  }}
                >
                  Subtotal
                </Typography>
                <br />
                <Typography
                  variant="h6"
                  style={{
                    color: "black",
                    fontFamily: "sans-serif",
                    marginBottom: "0.5em",
                  }}
                >
                  The Total Price is{" "}
                  <span style={{ fontWeight: "bold" }}> ₹{cartTotal}</span>
                </Typography>
                <Typography
                  variant={matchesXS ? "subitle2" : "h6"}
                  style={{
                    color: "green",
                    fontFamily: "sans-serif",
                    marginBottom: "1em",
                  }}
                >
                  You are saving ₹{cartSave} on this order
                </Typography>
                <br />
                <Form>
                  <Form.Select
                    aria-label="Default select example"
                    value={value}
                    onChange={(e) => {
                      const s = e.target.value;
                      setValue(s);
                    }}
                  >
                    <option disabled selected>
                      Payment Method{" "}
                    </option>
                    <option value="Pay On Delivery">Pay On Delivery</option>
                    <option value="Pay With Card">Pay With Card</option>
                  </Form.Select>
                  <br />
                </Form>
                {value === "Pay With Card" ? (
                  <>
                    <StripeCheckout
                      stripeKey="pk_test_51JOzfFSGs3WteDI290yrM0bhrCjRDXsZISCi8PVHG45isfw7CN09fsOooDB99yl042wgNGVE1G9p8a6sLo5MC1ZD00PovwK3x6"
                      token={handleToken}
                      amount={cartTotal * 100}
                      name="Payment"
                    >
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#42A2A2" }}
                      >
                        <Typography variant="h6" style={{ color: "#EDEDED" }}>
                          pay with card
                        </Typography>
                      </Button>
                    </StripeCheckout>
                  </>
                ) : value === "Pay On Delivery" ? (
                  <>
                    <Button
                      style={{
                        borderColor: "black",
                        backgroundColor: "#42A2A2",
                        color: "white",
                        borderRadius: "4px",
                        padding: "0px 12px",
                        fontSize: "14px",
                        height: "30px",
                        fontWeight: "bold",
                      }}
                      onClick={() => {
                        pod();
                        history.push("/orderconfirm");
                      }}
                    >
                      <Typography
                        variant={matchesXS ? "body1" : "h5"}
                        style={{ color: "white" }}
                      >
                        Confirm Order
                      </Typography>
                    </Button>
                  </>
                ) : (
                  <Button
                    disabled
                    style={{
                      borderColor: "black",
                      backgroundColor: "#42A2A2",
                      color: "white",
                      borderRadius: "4px",
                      padding: "0px 12px",
                      fontSize: "14px",
                      height: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    <Typography
                      variant={matchesXS ? "body1" : "h5"}
                      style={{ color: "white" }}
                    >
                      Confirm Order
                    </Typography>
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
}
      </Grid>

    </div>
  );
}
