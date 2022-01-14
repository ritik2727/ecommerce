import React, { useState, } from "react";
import {
  Typography,
  Paper,
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  Grid,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
import { auth, database } from "../firebase";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    boxShadow: theme.shadows[10],
    borderRadius: 10,
    marginTop: "6em",
    marginBottom: "7em",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
}));

export default function Register(props) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();



  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, name);
    if (password === confirmPassword) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          auth.user.updateProfile({ displayName: name });
          database
            .collection("users")
            .doc(auth.user.uid)
            .set({
              name: name,
            });
          if (auth) {
            history.push("/");
          }
        })

        .catch((error) => alert(error.message));
    } else {
      alert("Password must be same");
    }
  };
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register Account
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => e.preventDefault() && false}
        >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              autoComplete="off"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Confirm Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#42A2A2", color: "white" }}
            onClick={onSubmit}
            className={classes.submit}
          >
            <Typography variant="h5" style={{ textTransform: "none" }}>
              Register
            </Typography>
          </Button>
          <Grid
            container
            justifyContent="flex-end"
            style={{ marginTop: "1em" }}
          >
            <Grid item>
              <Link to="/login" variant="body2" style={{ color: "#42A2A2" }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </main>
  );
}
