import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import styled from "styled-components";
import { auth, database } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalMall } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
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
}));

export default function ItemCards(
  { id, productName, image, price, oldPrice },
  props
) {
  const classes = useStyles();
  const [user, setUser] = useState("");
  // const theme = useTheme();
  // const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  // const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  // const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const [docs, setDocs] = useState([]);
  const [wishData, setWishData] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log(user.uid);
        database
          .collection("users")
          .doc(user.uid)
          .collection("cart")
          .onSnapshot((a) => {
            const fdata = [];
            a.forEach((item) => {
              fdata.push({ ...item.data(), key: item.id });
            });
            setDocs(fdata);
          });
        database
          .collection("users")
          .doc(user.uid)
          .collection("wish")
          .onSnapshot((a) => {
            const wdata = [];
            a.forEach((item) => {
              wdata.push({ ...item.data(), key: item.id });
            });
            setWishData(wdata);
          });
      } else setUser(null);
    });
  }, []);

  const Msg = () => (
    <>
      <div style={{ display: "flex" }}>
        <LocalMall fontSize="small" />
        <h6>&nbsp; Product added to Bag</h6>
      </div>
    </>
  );

  const addToCart = () => {
    let q = docs.filter((a) => a.productName === productName);
    console.log(q);
    if (user) {
      if (q.length === 0) {
        database
          .collection("users")
          .doc(user.uid)
          .collection("cart")
          .add({
            productName: productName,
            image: image,
            price: price,
            oldPrice: oldPrice,
          })
          .then(() => {
            toast(Msg, {
              position: "bottom-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          });
      } else {
        toast("Item already in cart", {
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
  const addToWish = () => {
    let q = wishData.filter((a) => a.productName === productName);
    if (user) {
      if (q.length === 0) {
        database
          .collection("users")
          .doc(user.uid)
          .collection("wish")
          .add({
            productName: productName,
            image: image,
            price: price,
            oldPrice: oldPrice,
          })
          .then(() => {
            toast("Item Added to Wishlist", {
              position: "bottom-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      } else {
        toast.warn("Item already in WishList", {
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
  return (
    <div>
      <Card className={classes.rootV} style={{ marginTop: "4em" }}>
        <CardMedia className={classes.mediaV} image={image} title={productName}>
          <IconButton>
            <FavoriteIcon
              onClick={() => {
                addToWish();
              }}
            />
          </IconButton>
        </CardMedia>
        <CardContent>
          {/* <Typography gutterBottom variant="h5" component="h2">
        Bewakoof
        </Typography> */}
          <ToastContainer />
          <Typography
            variant="h6"
            style={{ color: "2D2D2D", fontFamily: "12px sans-serif" }}
            component="p"
          >
            {productName}
          </Typography>
          <Typography variant="body1" style={{ color: "black" }} component="p">
            ₹{price} <OriginalPrice id="price">{oldPrice}</OriginalPrice>
          </Typography>
        </CardContent>
        <Button
          onClick={() => {
            addToCart();
          }}
          variant="outlined"
          style={{ color: "grey", width: "17.2em", padding: "0.4em" }}
        >
          <Typography variant="h6" style={{ color: "#333333" }}>
            ADD TO BAG
          </Typography>
        </Button>
      </Card>
    </div>
  );
}
