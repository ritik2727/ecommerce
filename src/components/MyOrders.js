import React, { useContext, } from "react";
import {
  Divider,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Hidden,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import moment from "moment";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { StateContext } from "../context/StateContext";

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
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "1em",
      paddingRight: "1em",
      paddingTop: "1em",
    },
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
  divider: {
    // Theme Color, or use css color in quote
    background: "#FDD835",
    marginTop: "0.2em",
    marginBottom: "2em",
    opacity: "100%",
  },
  root: {
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
    width: 200,
    // marginRight:'auto'
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

function MyOrders() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const { oder } = useContext(StateContext);
  const [dataOrder] = oder;


  const OriginalPrice = styled.span`
    text-decoration: line-through;
    font-size: 15px;
    font-weight: 100;
    color: #7e818c;
    padding: 0 0.2rem;
  `;

  if (dataOrder.length === 0)
    return (
      <div style={{ alignItems: "center" }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item style={{ marginTop: "7em" }}>
            <Typography
              variant="h5"
              style={{
                color: "#18181899",
                fontFamily: "sans-serif",
                marginBottom: "1em",
                fontSize: matchesXS ? "15px" : "20px",
                textAlign: "center",
              }}
            >
              Sadly, you haven't placed any orders till now.
            </Typography>
          </Grid>
          <Grid item style={{ marginTop: matchesMD ? "2em" : "inherit" }}>
            <img
              src={`https://images.bewakoof.com/sizeguide/no-orders.png`}
              alt="No order in your account"
              style={{ width: 150, alignContent: "center" }}
            />
          </Grid>
          <Grid item style={{ marginTop: "3em" }}>
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
                style={{
                  fontFamily: "18px sans-serif",
                  textTransform: "none",
                }}
              >
                Continue Shopping
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  else
    return (
      <div>
        <Grid container direction="column" className={classes.rowContainer}>
          <Grid item>
            <Typography
              variant={matchesXS ? "h5" : "h3"}
              style={{
                paddingLeft: matchesXS ? 0 : matchesSM ? "5em" : "8em",
                fontWeight: "bold",
                fontSize: "2rem",
              }}
            >
              My Orders
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
                classes={{ root: classes.divider }}
              />
            </Typography>
          </Grid>
          <Grid item container alignItems="center" justifyContent="center">
            <Grid item>
              {/* first Item */}
              {dataOrder &&
                dataOrder.map((doc) => (
                  <div>
                    <Hidden smUp>
                      <Typography
                        variant={matchesXS ? "body2" : "h6"}
                        style={{ color: "black", marginTop: "0.5em" }}
                      >
                        #Order ID:{doc.key}
                      </Typography>
                    </Hidden>
                    <Card
                      className={classes.root}
                      style={{
                        marginBottom: "2em",
                        width: matchesXS
                          ? "18em"
                          : matchesSM
                          ? "35em"
                          : matchesMD
                          ? "40em"
                          : "50em",
                        height: matchesXS ? "12em" : "17em",
                      }}
                    >
                      <CardMedia
                        className={classes.cover}
                        // style={{height:matchesXS?'10em':'inherit'}}
                        image={doc.image}
                        title="Live from space album cover"
                      />
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <Typography
                            style={{
                              fontFamily: "sans-serif",
                              fontSize: matchesXS ? "1rem" : "1.5rem",
                              fontWeight: "bold",
                            }}
                            variant={matchesXS ? "h6" : "h5"}
                          >
                            {doc.productName}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            style={{
                              fontFamily: "16px sans-serif",
                              color: "#333333",
                              fontSize: matchesMD ? "16px" : "25px",
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
                            variant={matchesXS ? "body2" : "h6"}
                            style={{ marginTop: "1em" }}
                          >
                            Date:{moment(Number(doc.date)).format("MMM Do YY")}
                          </Typography>
                          <Hidden xsDown>
                            <Typography
                              variant={matchesXS ? "body2" : "h6"}
                              style={{ color: "black", marginTop: "0.5em" }}
                            >
                              #Order ID:{doc.key}
                            </Typography>
                          </Hidden>
                        </CardContent>
                      </div>
                    </Card>
                  </div>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
}

export default MyOrders;
