import {
  Grid,
  useTheme,
  useMediaQuery,
  Typography,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
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

export default function Shipping() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  // const matchesXS = useMediaQuery(theme.breakpoints.down('xs'))

  const buttonContents = <React.Fragment>Send Message</React.Fragment>;
  return (
    <Grid container direction="row">
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        lg={4}
        xl={3}
        style={{
          marginTop: matchesSM ? "1em" : matchesMD ? "5em" : undefined,
          marginBottom: matchesMD ? "5em" : undefined,
        }}
      >
        <Grid item>
          <Grid item container direction="column">
            <Grid item>
              <Typography
                variant="h2"
                align={matchesMD ? "center" : undefined}
                style={{ lineHeight: 1 }}
              >
                Shipping Address
              </Typography>
              <Typography
                variant="body1"
                align={matchesMD ? "center" : undefined}
                style={{ color: theme.palette.common.blue }}
              >
                We're waiting
              </Typography>
            </Grid>
            <Grid item>
              <Typography>Delviry info</Typography>
            </Grid>
            {/* <Grid item container style={{marginTop:'2em'}}>
                        <Grid item>
                        <PhoneIcon style={{marginRight:'0.5em',color:'black'}}/>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant='body1'
                                style={{color:theme.palette.common.blue,fontSize:'1rem'}}    
                            >
                            <a href ='tel:55555555555' 
                                style={{textDecoration:'none',color:'inherit'}}
                            >
                                (555) 555-5555
                            </a>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container style={{marginBottom:'2em'}}>
                        <Grid item>
                        <MailIcon  style={{marginRight:'0.5em',verticalAlign:'bottom'}}/>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant='body1'
                                style={{color:theme.palette.common.blue ,fontSize:'1rem'}}    
                            >
                           
                            <a href ='mailto:ritikjain2727@gmail.com' 
                                style={{textDecoration:'none',color:'inherit'}}
                            >
                                zachary@gmail.com
                            </a>
                            </Typography>
                        </Grid>
                    </Grid> */}
            <Grid item container direction="column" style={{ width: "20em" }}>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  label="Name"
                  id="name"
                  fullWidth
                  // value={name}
                  // onChange={(e)=>setName(e.target.value)}
                />
              </Grid>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  label="Email"
                  // error={emailHelper.length !== 0}
                  // helperText={emailHelper}
                  id="email"
                  fullWidth
                  // value={email}
                  // onChange={onChange}
                />
              </Grid>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  label="Phone"
                  // error= {phoneHelper.length !== 0}
                  // helperText={phoneHelper}
                  id="phone"
                  fullWidth
                  // value={phone}
                  // onChange={onChange}
                />
              </Grid>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  label="Pincode"
                  // error= {phoneHelper.length !== 0}
                  // helperText={phoneHelper}
                  id="phone"
                  fullWidth
                  // value={phone}
                  // onChange={onChange}
                />
              </Grid>
              <Grid item>
                <Typography>Address info</Typography>
              </Grid>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  label="city"
                  // error= {phoneHelper.length !== 0}
                  // helperText={phoneHelper}
                  id="phone"
                  fullWidth
                  // value={phone}
                  // onChange={onChange}
                />
              </Grid>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  label="State"
                  // error= {phoneHelper.length !== 0}
                  // helperText={phoneHelper}
                  id="phone"
                  fullWidth
                  // value={phone}
                  // onChange={onChange}
                />
              </Grid>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  label="Address"
                  // error= {phoneHelper.length !== 0}
                  // helperText={phoneHelper}
                  id="phone"
                  fullWidth
                  // value={phone}
                  // onChange={onChange}
                />
              </Grid>
            </Grid>
            <Grid item style={{ width: "20em" }}>
              <TextField
                InputProps={{ disableUnderline: true }}
                // value={message}
                placeholder="Tell us more about your project"
                multiline
                fullWidth
                rows={10}
                id="message"
                // onChange={(e)=>setMessage(e.target.value)}
                className={classes.message}
              />
            </Grid>
            <Grid
              item
              container
              justifyContent="center"
              style={{ marginTop: "2em" }}
            >
              <Button
                // disabled={
                //     name.length === 0 ||
                //     email.length === 0 ||
                //     phone.length === 0 ||
                //     message.length === 0 ||
                //     phoneHelper.length !== 0 ||
                //     emailHelper.length !== 0
                //     }
                variant="contained"
                className={classes.sendButton}
                // onClick={()=>setOpen(true)}
              >
                {buttonContents}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
