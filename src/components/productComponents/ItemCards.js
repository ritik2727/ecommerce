import {  Card, CardContent, CardMedia, makeStyles,Typography } from '@material-ui/core';
import React, { useEffect,useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import styled from "styled-components";
import { auth, database } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  LocalMall} from "@material-ui/icons";

const useStyles = makeStyles(theme=>({
    root: {
        width:'15rem',
        height:'25rem',
      },
    media: {
        height: '19rem',
        width:'15rem',
        position:'absolute',
        // paddingTop: '56.25%', // 16:9
      },
      rootV: {
        width: '15em',
      },
      mediaV: {
        height: "19em",
        width:'15em',
      }

}));

export default function ItemCards({id,productName,image,price,oldPrice},props){
    const classes = useStyles();
    const [user, setUser] = useState("")
    // const theme = useTheme();
    // const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    // const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    // const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
    const [docs, setDocs] = useState([]);
    const [wishData,setWishData] = useState([]);

    useEffect(() => {
      auth.onAuthStateChanged(user => {
          if (user) {
              setUser(user); console.log(user.uid);
              database.collection('users').doc(user.uid).collection('cart').onSnapshot((a) => {
                  const fdata = [];
                  a.forEach((item) => {
                      fdata.push({ ...item.data(), key: item.id })

                  })
                  setDocs(fdata)
              })
              database.collection('users').doc(user.uid).collection('wish').onSnapshot((a) => {
                const wdata = [];
                a.forEach((item) => {
                    wdata.push({ ...item.data(), key: item.id })

                })
                setWishData(wdata)
            })
        
          }
          else setUser(null)
      }
      )
  }, [])

    const Msg = () => (
      <>
          <div style={{ display: "flex", }}>
              <LocalMall fontSize="small" />
              <h6 >&nbsp; Product added to Bag</h6>
          </div>
      </>
  );

    const addToCart = () => {
      let q = docs.filter(a => a.productName === productName)
      console.log(q)
        if (user) {
            if (q.length === 0) {
                database.collection("users").doc(user.uid).collection("cart").add({
                    productName: productName,
                    image: image,
                    price: price,
                    oldPrice: oldPrice
                }).then(() => {
                    toast(Msg,
                        {
                            position: "bottom-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined
                        });
                })
            }
            else {
                toast("Item already in cart", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })

            }
        }
        else {
            toast.warn("Please Login First")
        }

    }

  //   const addToWish = () => {
  //   if(user){
  //     database.collection("users").doc(user.uid).collection("wish").add({
  //       productName:productName,
  //       image:image,
  //       price:price,
  //       oldPrice:oldPrice
  //     }).then(()=>{console.log('Item add to wish')})
  //   }else{
  //     toast.warn("Please Login First")
  //   }
  // }
  const addToWish = () => {
    let q = wishData.filter(a => a.productName === productName)
    if (user) {
        if (q.length === 0) {
            database.collection("users").doc(user.uid).collection("wish").add({
                productName: productName,
                image: image,
                price: price,
                oldPrice: oldPrice
            }).then(() => {
                toast("Item Added to Wishlist",
                    {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
            })
        }
        else {
            toast.warn("Item already in WishList", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            })
        }
    }
    else {
        toast.warn("Please Login First")
    }

}

    const OriginalPrice = styled.span`
        text-decoration: line-through;
        font-size: 15px;
        font-weight: 100;
        color: #7e818c;
        padding: 0 0.2rem;
        `;
    return(
        <div>
       <Card className={classes.rootV} style={{marginTop:'4em'}}>
      <CardMedia
        className={classes.mediaV}
        image={image}
        title="Paella dish"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
        Bewakoof
        <IconButton>
           <FavoriteIcon onClick={()=>{addToWish()}} />
           </IconButton>
           <IconButton>
                <LocalMallIcon  onClick={()=>{addToCart()}} />
            </IconButton>
        </Typography>
        <ToastContainer/>
        <Typography variant="body2" color="textSecondary" component="p">
        {productName}
        </Typography>
        <Typography variant="body1" style={{color:'black'}} component="p">
        ₹{price} <OriginalPrice id="price">{oldPrice}</OriginalPrice>
        </Typography>
      </CardContent>
    </Card>
    </div>
    )
}

//  <Card className={classes.root}>
// <CardActionArea>
// <CardMedia>
//  <img src='https://images.bewakoof.com/t540/bwkf-skateboard-men-s-printed-t-shirts-men-s-printed-t-shirts-315076-1608818262.jpg'
//   alt='cplusplus' className={classes.media} />
//  </CardMedia>
// </CardActionArea>
// <CardActions disableSpacing>

// </CardActions> 
// <CardContent style={{marginTop:'19em'}}>
//     <Typography variant='body1'  style={{color:'black',fontSize:'1rem'}}>
//          blue shirt
//          <IconButton style={{marginLeft:'1em'}}>
// <FavoriteIcon />
// </IconButton>
// <IconButton>
//      <LocalMallIcon />
//  </IconButton>
        
//     </Typography>
//     <Typography variant='body1' style={{color:'black',fontSize:'1rem'}}>
//          $200   
//     </Typography>
// </CardContent>
// </Card> *