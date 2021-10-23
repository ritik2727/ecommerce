import { ThemeProvider } from "@material-ui/styles";
import React ,{useState,useEffect} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import  Login from "./Login";
import  Register  from "./Register";
import Header from "./ui/Header";
import theme from './ui/Theme';
import { auth ,db} from '../firebase';
import Men from "./productComponents/Men";
import Women from "./productComponents/Women";
import Home from "./Home/Home";
import Cart from "./productComponents/Cart";
import AddWhistlist from "./productComponents/AddWhistlist";
import {StateProvider} from '../context/StateContext'
import MobileCover from "./productComponents/MobileCover";
import Shipping from "./productComponents/Shipping";
import Checkout from "./productComponents/Checkout";
import ForgotPassword from "./ForgetPassward";

function App() {
  const [value,setValue] = useState(0);
  const [selectedIndex,setSelectedIndex] = useState(0)
  const [user, setUser] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) setUser(user)
      else setUser(null)
    }
    )
  }, [])

  return (
    <StateProvider>
   <ThemeProvider theme={theme}>
     <BrowserRouter>
        <Header 
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          user={user}
        />
        <Switch>
        <Route exact path='/men'  component={Men} />
        <Route exact path='/women' component={Women} />
        <Route exact path='/cover'  component={MobileCover} />
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/cart'  
             render={(props)=>(
                      <Cart
                        {...props} 
                        user={user}
                      />
            )} />
             <Route exact path='/whistlist'  
             render={(props)=>(
                      <AddWhistlist
                        {...props} 
                        user={user}
                      />
            )} />
            <Route exact path='/checkout' component={Checkout} />
            <Route exact path='/register' component={Register}  />
            <Route exact path='/forget' component={ForgotPassword}  />
        </Switch>
        {/* <Footer
          setValue={setValue}
          setSelectedIndex={setSelectedIndex}
        /> */}
     </BrowserRouter>
   </ThemeProvider>
   </StateProvider>
  );
}

export default App;
