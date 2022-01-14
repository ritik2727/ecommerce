import { ThemeProvider } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Header from "./ui/Header";
import theme from "./ui/Theme";
import { auth } from "../firebase";
import Men from "./productComponents/Men";
import Women from "./productComponents/Women";
import Home from "./Home/Home";
import Cart from "./productComponents/Cart";
import AddWhistlist from "./productComponents/AddWhistlist";
import { StateProvider } from "../context/StateContext";
import MobileCover from "./productComponents/MobileCover";
import Checkout from "./productComponents/Checkout";
import ForgotPassword from "./ForgetPassward";
import Search from "./ui/Search";
import MyAccount from "./productComponents/MyAccount";
import Chat from "./ChatBot";
import MyOrders from "./MyOrders";
import OrderConfirm from "./ui/OrderConfirm";
import Footer from "./ui/Footer";
import ScrollToTop from "./ui/ScrollToTop";

function App() {
  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [user, setUser] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

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
          <ScrollToTop />
          <Switch>
            <Route
              exact
              path="/men"
              render={(props) => (
                <Men
                  {...props}
                  setValue={setValue}
                  setSelectedIndex={setSelectedIndex}
                />
              )}
            />
            <Route
              exact
              path="/women"
              render={(props) => (
                <Women
                  {...props}
                  setValue={setValue}
                  setSelectedIndex={setSelectedIndex}
                />
              )}
            />
            <Route
              exact
              path="/cover"
              render={(props) => (
                <MobileCover
                  {...props}
                  setValue={setValue}
                  setSelectedIndex={setSelectedIndex}
                />
              )}
            />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/cart"
              render={(props) => <Cart {...props} user={user} />}
            />
            <Route
              exact
              path="/whistlist"
              render={(props) => <AddWhistlist {...props} user={user} />}
            />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/register" component={Register} />

            <Route exact path="/forget" component={ForgotPassword} />
            <Route path="/Search" component={Search} />
            {/* <Route path="/myaccount" component={MyAccount}  user={user} /> */}
            <Route
              exact
              path="/myaccount"
              render={(props) => <MyAccount {...props} user={user} />}
            />
            <Route
              exact
              path="/orderconfirm"
              render={(props) => (
                <OrderConfirm
                  {...props}
                  user={user}
                  setValue={setValue}
                  setSelectedIndex={setSelectedIndex}
                />
              )}
            />
            <Route
              exact
              path="/myorders"
              render={(props) => <MyOrders {...props} user={user} />}
            />
          </Switch>
          <Footer />
          <Chat />
        </BrowserRouter>
      </ThemeProvider>
    </StateProvider>
  );
}

export default App;
