import React, { useContext, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import { database } from "../../firebase";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
// import Typography from '@material-ui/core/Typography';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@material-ui/icons/Close";
import { StateContext } from "../../context/StateContext";
import ReuseItem from "./ReuseItem";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    paddingLeft: "5em",
    paddingRight: "5em",
    paddingTop: "2em",
    paddingBottom: "10em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "1em",
      paddingRight: "1em",
      paddingTop: "1em",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "0.5em",
      paddingRight: "0.5em",
      paddingTop: "0.5em",
    },
  },
  root: {
    width: "15rem",
    height: "25rem",
  },
  media: {
    height: "19rem",
    width: "15rem",
    position: "absolute",
    // paddingTop: '56.25%', // 16:9
  },
  rootV: {
    width: "15em",
    boxShadow: theme.shadows[10],
    borderRadius: 10,
  },
  mediaV: {
    height: "19em",
    width: "15em",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
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
}));

export default function Wishlist(props) {
  //material ui components
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  //hooks

  const { wish, cart, userdata } = useContext(StateContext);
  const [dataCart] = cart;
  const [dataWishlist] = wish;
  const [user] = userdata;
  const ide = user;

  // use Effect
  useEffect(() => {
    window.scroll(0, 0);
  });

  //deletion fuction
  const deleteItem = async (id, e) => {
    await database
      .collection("users")
      .doc(ide)
      .collection("wish")
      .doc(id)
      .delete()
      .then(() => {
        toast("Product Deleted", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  //Total WishList
  //Add to Cart Function
  const addtoCart = (doc) => {
    let q = dataCart.filter((a) => a.productName === doc.productName);
    if (ide) {
      if (q.length === 0) {
        database
          .collection("users")
          .doc(ide)
          .collection("cart")
          .add({
            productName: doc.productName,
            image: doc.image,
            price: doc.price,
            oldPrice: doc.oldPrice,
          })
          .then(() => {
            toast("Item Added to Cart", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        database
          .collection("users")
          .doc(ide)
          .collection("wish")
          .doc(doc.key)
          .delete();
      } else {
        toast("Already in Cart", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.warn("Please Login First");
    }
  };

  const OriginalPrice = styled.span`
    text-decoration: line-through;
    font-size: 15px;
    font-weight: 100;
    color: #7e818c;
    padding: 0 0.2rem;
  `;

  //rendering

  if (dataWishlist.length === 0)
    return (
      <div style={{ alignItems: "center" }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item style={{ marginTop: matchesMD ? "2em" : "inherit" }}>
            <img
              src={`https://images.bewakoof.com/web/group-3x-1509961969.png`}
              alt="Logo"
              style={{ width: 150, alignContent: "center" }}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              style={{
                color: "#000000CC",
                fontFamily: "18px sans-serif",
                marginBottom: "1em",
                textAlign: "center",
              }}
            >
              Your Wishlist is Empty !
            </Typography>
          </Grid>
          <ReuseItem />
        </Grid>
      </div>
    );
  else
    return (
      <Grid
        Container
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={classes.rowContainer}
      >
        <Grid item>
          <Typography variant="h4">WISHLIST</Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          className={classes.rowContainer}
        >
          {dataWishlist.map((doc) => (
            <Grid
              item
              style={{
                maxWidth: "40em",
                marginLeft: matchesXS ? 0 : matchesSM ? "1em" : "4em",
              }}
            >
              <Card className={classes.rootV} style={{ marginTop: "4em" }}>
                <CardMedia
                  className={classes.mediaV}
                  image={doc.image}
                  title={doc.productName}
                >
                  <IconButton>
                    <CloseIcon onClick={() => deleteItem(doc.key)} />
                  </IconButton>
                </CardMedia>
                <CardContent>
                  <ToastContainer />
                  <Typography
                    variant="h6"
                    style={{ color: "2D2D2D", fontFamily: "12px sans-serif" }}
                    component="p"
                  >
                    {doc.productName}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ color: "black" }}
                    component="p"
                  >
                    ₹{doc.price}{" "}
                    <OriginalPrice id="price">{doc.oldPrice}</OriginalPrice>
                  </Typography>
                </CardContent>
                <Button
                  onClick={() => {
                    addtoCart(doc);
                  }}
                  variant="outlined"
                  style={{ color: "grey", width: "17.2em", padding: "0.4em" }}
                >
                  <Typography variant="h6" style={{ color: "#333333" }}>
                    MOVE TO BAG
                  </Typography>
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
}
