import React, { useState } from 'react'
import { Typography, Paper,Grid, Avatar, Button, FormControl, Input, InputLabel ,Divider} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import {auth} from '../firebase'
import { useHistory } from 'react-router';
import firebase from '@firebase/app-compat';


const useStyles = makeStyles(theme=>({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
			width: 500,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
}));



export default function Login() {

    const classes = useStyles();
    
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

    const history = useHistory()
   const onSubmit =async (e)=> {
        e.preventDefault();
        console.log(email,password);
        await auth.signInWithEmailAndPassword(email,password);
        history.push('/')
    }
	const onSignWithGoogle = () =>{
		var provider = new firebase.auth.GoogleAuthProvider();
		auth
		  .signInWithPopup(provider)
		  .then((result) => {
			/** @type {firebase.auth.OAuthCredential} */
			var credential = result.credential;
			var token = credential.accessToken;
			var user = result.user;
			if (result) {
			  history.push("/");
			}
			// ...
		  }).catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			var email = error.email;
			var credential = error.credential;
			// ...
		  });
	}
	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
       			</Typography>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email Address</InputLabel>
						<Input id="email" name="email" autoComplete="off" autoFocus value={email} onChange={e => setEmail(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={onSubmit}
						className={classes.submit}>
						Sign in
          			</Button>
					  <Grid container style={{marginTop:'1em'}}>
						<Grid item xs >
							<Link to='/forget' variant="body2">
							Forgot password?
							</Link>
						</Grid>
						<Grid item >
							<Link to='/register' variant="body2">
							{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
					<Divider spacing={2}>Hello World</Divider>
					{/* <Divider>
						<span>
							hi
						</span>
					</Divider> */}
					{/* <Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/register"
						className={classes.submit}>
						SignUp
          			</Button> */}
					  
					  <Button
						type="submit"
						fullWidth
						variant="contained"
						style={{backgroundColor:'black'}}
						onClick={onSignWithGoogle}
						className={classes.submit}>
						<img style={{width:'2em'}} src='https://cdn-icons-png.flaticon.com/128/281/281764.png' alt='googleicon' />	
						{/* <Typography style={{color:'white'}}>
							Sign In With Google
						</Typography> */}
          			</Button>
				</form>
			</Paper>
		</main>
	)
}
