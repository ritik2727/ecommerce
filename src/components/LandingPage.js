import { Grid, makeStyles, useTheme } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";
import { Typography } from "@material-ui/core";
import ItemCards from "./productComponents/ItemCards";
import { Fullscreen } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  heading: {
    maxWidth: "40em",
  },
  arrowContainer: {
    marginTop: "0.5em",
  },
  rowContainer: {
    paddingLeft: "4em",
    paddingRight: "4em",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "1.5em",
      paddingRight: "1.5em",
    },

    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "1.2em",
      paddingRight: "1.2em",
    },
  },
}));

export const LandingPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Grid container direction="column" className={classes.rowContainer}>
      <Grid
        item
        container
        direction={matchesSM ? "column" : "row"}
        Fullscreen={matchesSM}
        style={{ marginBottom: "4em" }}
        justifyContent="center"
      >
        <Grid item style={{ marginRight: matchesMD ? "1em" : "2em" }}>
          <img
            src="https://images.bewakoof.com/uploads/grid/app/bewakoof-winter-store-online-fashion-shopping-720-banner-1609849948.jpg"
            alt="image1"
            style={{
              width: matchesSM ? "100%" : matchesMD ? "18em" : "22em",
              height: matchesSM ? "20em" : "inherit",
            }}
          />
        </Grid>
        <Grid
          item
          style={{
            marginRight: matchesXS
              ? "0.5em"
              : matchesSM
              ? "0.3em"
              : matchesMD
              ? 0
              : "2em",
          }}
        >
          <img
            src="https://images.bewakoof.com/uploads/grid/app/bewakoof-cover-parade-mobile-cover-online-fashion-shopping-720-banner-1609849946.jpg"
            alt="image1"
            style={{
              width: matchesXS
                ? "10em"
                : matchesSM
                ? "11.5em"
                : matchesMD
                ? "18em"
                : "22em",
            }}
          />
        </Grid>
        <Grid item>
          <img
            src="https://images.bewakoof.com/uploads/grid/app/18th-Dec-Homepage-DOTD-1608282108.jpg"
            alt="image1"
            style={{
              width: matchesXS
                ? "10em"
                : matchesSM
                ? "11.5em"
                : matchesMD
                ? " 18em"
                : "22em",
            }}
          />
        </Grid>
      </Grid>
      <ItemCards />
    </Grid>
  );
};
