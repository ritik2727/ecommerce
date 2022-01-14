import React, { useContext } from "react";

import {
  Grid,
  useMediaQuery,
  useTheme,
  makeStyles,
  Typography,
  Breadcrumbs,
} from "@material-ui/core";
import ItemCards from "./ItemCards";
import { StateContext } from "../../context/StateContext";
import { Link } from "react-router-dom";

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
}));

export default function Mens(props) {
  const theme = useTheme();
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const { mens, userdata } = useContext(StateContext);
  const [dataMens] = mens;
  const [user] = userdata;
  // const { docs } = GetData("mens");
 

  console.log(user);
  return (
    <Grid
      Container
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.rowContainer}
    >
      <Grid item>
        <Breadcrumbs aria-label="breadcrumb" style={{ color: "black" }}>
          <Link
            to="/"
            onClick={() => props.setValue(9)}
            style={{ color: "white" }}
          >
            <Typography variant="h4">Home</Typography>
          </Link>
          <Link to="/men" style={{ color: "white" }}>
            <Typography variant="h4">Men's Clothing</Typography>
          </Link>
        </Breadcrumbs>
      </Grid>
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        className={classes.rowContainer}
      >
        {dataMens &&
          dataMens.map((doc) => (
            <Grid
              item
              style={{
                maxWidth: "40em",
                marginLeft: matchesXS
                  ? '1em'
                  : matchesSM
                  ? "1em"
                  : matchesMD
                  ? "2em"
                  : "2em",
              }}
            >
              <ItemCards
                key={doc.id}
                id={doc.id}
                productName={doc.productName}
                image={doc.image}
                price={doc.price}
                oldPrice={doc.oldPrice}
                user={props.user}
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}
