import React from 'react';
import { Grid,Card,CardContent, makeStyles ,Button,Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    learnButtonHero: {
      backgroundColor:'#FF5DA2',
      color:'white',
      marginTop:'2em',
      fontSize:'1rem',
      fontFamily:'sans-serif',
      textTransform:'none',
      "&:hover":{
        backgroundColor:'#FF5DA2',
        color:'white'
      },
      height: 45,
      width: 200
    },
    revolutionCard: {
      position: "absolute",
      boxShadow: theme.shadows[10],
      borderRadius: 15,
      padding: "8em",
      [theme.breakpoints.down("sm")]: {
        paddingTop: "8em",
        paddingBottom: "8em",
        paddingLeft: 0,
        paddingRight: 0,
        borderRadius: 0,
        width: "100%"
      }
    },
  }));

export default function OrderConfirm(props){
    const classes = useStyles();
    // const theme = useTheme();
    // const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    // const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
    return(
        <Grid container direction="column" >
              <Grid
          container
          style={{marginTop:'20em',marginBottom:'20em'}}
          alignItems="center"
          justify="center"
        >
          <Card className={classes.revolutionCard}>
            <CardContent>
              <Grid
                container
                direction="column"
                style={{ textAlign: "center" }}
              >
                <Grid item>
                  <img src='https://www.mediastorehouse.com/p/629/digital-illustration-white-tick-pink-circle-13550803.jpg'
                    alt='order confirm'
                    style={{maxWidth:'10em'}}
                    />
                  </Grid>
                <Grid item>
                  <Typography variant="h5" gutterBottom>
                    Hey {props.user.displayName}!
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h3" gutterBottom>
                    Your Order is Confirmed!
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" style={{color:'black'}}>
                    We'll send you shipping confirmation email
                    as soon as your order ship
                  </Typography>
                  <Button
                    component={Link}
                    to="/myorders"
                    className={classes.learnButtonHero}
                    variant='contained'
                    onClick={() => props.setValue(5)}
                  >
                    <span style={{ marginRight: 10 }}>CHECK ORDER</span>
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

        </Grid>
      </Grid>
    )
}