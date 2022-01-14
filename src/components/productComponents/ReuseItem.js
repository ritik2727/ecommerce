import React from "react";
import {
  Grid,
  useMediaQuery,
  useTheme,
  makeStyles,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  divider: {
    // Theme Color, or use css color in quote
    background: "black",
    marginTop: "2em",
    marginBottom: "2em",
  },
}));
export default function ReuseItem(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  // const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Button
          variant="outlined"
          component={Link}
          to="/"
          style={{
            color: "#51CCCC",
            borderColor: "#51CCCC",
            height: matchesSM ? "2.5em" : "3.5em",
          }}
        >
          <Typography
            variant="h5"
            style={{ fontFamily: "18px sans-serif", textTransform: "none" }}
          >
            Continue Shopping
          </Typography>
        </Button>
      </Grid>
      <Divider style={{ width: "35%" }} classes={{ root: classes.divider }} />
      <Grid item>
        <Typography
          variant="body1"
          style={{
            color: "#000000CC",
            textAlign: "center",
            fontFamily: "sans-serif",
          }}
        >
          You could try one of these categories:
        </Typography>
      </Grid>

      {/* probelm */}
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ maxWidth: matchesXS ? "18em" : "30em" }}
      >
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={matchesXS ? 1 : 8}
          style={{ marginTop: "1em", marginBottom: "0.5em" }}
        >
          <Grid item>
            <Typography
              variant="h6"
              style={{ color: "black", fontFamily: "14px sans-serif" }}
            >
              Men
            </Typography>
          </Grid>
          <Grid item component={Link} to="/men" style={{ color: "#51CCCC" }}>
            <Typography style={{ color: "#51CCCC", fontFamily: "sans-serif" }}>
              Topwear
            </Typography>
          </Grid>
          <Grid item component={Link} to="/men" style={{ color: "#51CCCC" }}>
            <Typography style={{ color: "#51CCCC", fontFamily: "sans-serif" }}>
              Bottomwear
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={matchesXS ? 1 : 8}
          style={{ marginBottom: "1em" }}
        >
          <Grid item>
            <Typography
              variant="h6"
              style={{ color: "black", fontFamily: "14px sans-serif" }}
            >
              Women
            </Typography>
          </Grid>
          <Grid item component={Link} to="/women" style={{ color: "#51CCCC" }}>
            <Typography style={{ color: "#51CCCC", fontFamily: "sans-serif" }}>
              Topwear
            </Typography>
          </Grid>
          <Grid
            item
            component={Link}
            to="/women"
            style={{ color: "#51CCCC", fontFamily: "sans-serif" }}
          >
            <Typography style={{ color: "#51CCCC", fontFamily: "sans-serif" }}>
              Bottomwear
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={matchesXS ? 1 : 8}
          style={{ marginBottom: "1em" }}
        >
          <Grid item>
            <Typography
              variant="h6"
              style={{ color: "black", fontFamily: "14px sans-serif" }}
            >
              Mobile Covers
            </Typography>
          </Grid>
          <Grid item component={Link} to="/cover" style={{ color: "#51CCCC" }}>
            <Typography style={{ color: "#51CCCC", fontFamily: "sans-serif" }}>
              All Mobile Covers
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
