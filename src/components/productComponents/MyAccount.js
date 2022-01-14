import React, { useContext, } from "react";
import {
  Grid,
  useTheme,
  useMediaQuery,
  Typography,
  makeStyles,
  Button,
  Divider,
  Hidden,
} from "@material-ui/core";
import { StateContext } from "../../context/StateContext";
import { auth } from "../../firebase";
import { useHistory } from "react-router";
const useStyles = makeStyles((theme) => ({
  rowContainer: {
    paddingLeft: "5em",
    paddingRight: "5em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "1.5em",
      paddingRight: "1.5em",
    },
  },
  avatar: {
    height: "10em",
    width: "10em",
    marginTop: "3em",
    [theme.breakpoints.down("sm")]: {
      height: "10em",
      width: "10em",
      maxHeight: 300,
      maxWidth: 300,
    },
  },
  divider: {
    // Theme Color, or use css color in quote
    background: "black",
    marginTop: "2em",
    marginBottom: "2em",
  },
  dividerU: {
    // Theme Color, or use css color in quote
    background: "#FDD835",
    marginTop: "0.2em",
    opacity: "100%",
  },
}));

export default function MyAccount(props) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const {
    ototal,
    osave,
    cartsave,
    carttotal,
    addr,
    wishsave,
    wishtotal,
  } = useContext(StateContext);
  const [cartSave] = cartsave;
  const [cartTotal] = carttotal;
  const [wishSave] = wishsave;
  const [wishTotal] = wishtotal;

  const [orderTotal] = ototal;
  const [orderSave] = osave;

  //  const [orderTotal] = ototal;
  //  const [orderSave] = osave;
  const [add] = addr;
 

  return (
    <Grid container direction="column" className={classes.rowContainer}>
      <Grid
        item
        style={{ marginTop: matchesMD ? "1em" : "2em", marginBottom: "3em" }}
      >
        <Typography
          // align={matchesMD ? "center" : undefined}
          variant={matchesXS ? "h3" : "h2"}
          style={{
            paddingLeft: matchesXS ? 0 : matchesSM ? "5em" : "6em",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          My Account
          <Divider
            style={{
              width: matchesXS
                ? "15%"
                : matchesSM
                ? "20%"
                : matchesMD
                ? "15%"
                : "6%",
              height: "0.2rem",
            }}
            classes={{ root: classes.dividerU }}
          />
        </Typography>
      </Grid>
      <Grid item style={{ marginLeft: matchesSM ? 0 : "8em" }}>
        <Typography
          variant={matchesXS ? "h5" : "h4"}
          style={{ fontFamily: "sans-serif" }}
        >
          Hello! {props.user.displayName}
        </Typography>
      </Grid>
      <Grid item style={{ marginLeft: matchesSM ? 0 : "8em" }}>
        <Typography
          variant={matchesXS ? "h5" : "h4"}
          style={{ fontFamily: "sans-serif" }}
        >
          Your Email : {props.user.email}
        </Typography>
      </Grid>

      {add[0] !== undefined ? (
        <>
          <Grid item style={{ marginLeft: matchesSM ? 0 : "8em" }}>
            <Typography
              variant={matchesXS ? "h5" : "h4"}
              style={{ fontFamily: "sans-serif" }}
            >
              Phone No :{add[0].phone}
            </Typography>
          </Grid>
          <Grid item style={{ marginLeft: matchesSM ? 0 : "8em" }}>
            <Typography
              variant={matchesXS ? "h5" : "h4"}
              style={{ fontFamily: "sans-serif" }}
            >
              Address : {add[0].address} , {add[0].city} , {add[0].pincode}
            </Typography>
          </Grid>
        </>
      ) : (
        <></>
      )}
      <Grid item>
        <Divider
          style={{ width: "100%" }}
          classes={{ root: classes.divider }}
        />
      </Grid>

      <Grid
        item
        container
        direction={matchesSM ? "column" : "row"}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          container
          direction="column"
          style={{ maxWidth: matchesMD ? "15em" : "20em" }}
        >
          <Grid item>
            <Typography
              variant="h4"
              style={{ fontWeight: "bold", marginBottom: "1em" }}
            >
              Cart Details
            </Typography>
          </Grid>
          <Grid item style={{ marginLeft: matchesMD ? 0 : "4em" }}>
            <Typography variant="h5" style={{ fontFamily: "sans-serif" }}>
              Cart Total :{cartTotal}
            </Typography>
          </Grid>
          <Grid item style={{ marginLeft: matchesMD ? 0 : "4em" }}>
            <Typography variant="h5" style={{ fontFamily: "sans-serif" }}>
              Saved In Cart :{cartSave}
            </Typography>
          </Grid>
        </Grid>
        <Hidden mdUp>
          <Divider
            style={{ width: "60%" }}
            classes={{ root: classes.divider }}
          />
        </Hidden>
        <Hidden smDown>
          <Grid item xs={1} style={{ maxWidth: "2em" }}>
            <Divider
              orientation="vertical"
              flexItem
              style={{ height: "10em" }}
              classes={{ root: classes.divider }}
            />
          </Grid>
        </Hidden>

        <Grid
          item
          container
          direction="column"
          style={{ maxWidth: matchesMD ? "15em" : "20em" }}
        >
          <Grid item>
            <Typography
              variant="h4"
              style={{ fontWeight: "bold", marginBottom: "1em" }}
            >
              Wishlist Details
            </Typography>
          </Grid>
          <Grid item style={{ marginLeft: matchesMD ? 0 : "4em" }}>
            <Typography variant="h5" style={{ fontFamily: "sans-serif" }}>
              Wishlist Total :{wishTotal}
            </Typography>
          </Grid>
          <Grid item style={{ marginLeft: matchesMD ? 0 : "4em" }}>
            <Typography variant="h5" style={{ fontFamily: "sans-serif" }}>
              Saved In Wishlist :{wishSave}
            </Typography>
          </Grid>
        </Grid>
        <Hidden mdUp>
          <Divider
            style={{ width: "60%" }}
            classes={{ root: classes.divider }}
          />
        </Hidden>

        <Hidden smDown>
          <Grid item xs={1} style={{ maxWidth: "2em" }}>
            <Divider
              orientation="vertical"
              flexItem
              style={{ height: "10em" }}
              classes={{ root: classes.divider }}
            />
          </Grid>
        </Hidden>

        <Grid
          item
          container
          direction="column"
          style={{ maxWidth: matchesMD ? "15em" : "20em" }}
        >
          <Grid item>
            <Typography
              variant="h4"
              style={{ fontWeight: "bold", marginBottom: "1em" }}
            >
              Orders Details
            </Typography>
          </Grid>
          <Grid item style={{ marginLeft: matchesMD ? 0 : "4em" }}>
            <Typography variant="h5" style={{ fontFamily: "sans-serif" }}>
              Orders Total :{orderTotal}
            </Typography>
          </Grid>
          <Grid item style={{ marginLeft: matchesMD ? 0 : "4em" }}>
            <Typography variant="h5" style={{ fontFamily: "sans-serif" }}>
              Saved In Order :{orderSave}{" "}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        justifyContent="center"
        style={{ marginTop: "3em", marginBottom: "3em" }}
      >
        <Grid item>
          <Button
            onClick={() => {
              auth.signOut();
              history.push("/");
            }}
            variant="contained"
            style={{ backgroundColor: "red" }}
          >
            <Typography
              style={{ color: "white", textTransform: "none" }}
              variant="h5"
            >
              Logout
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
