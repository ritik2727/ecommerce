import React ,{useState,useEffect,useContext} from 'react';
import { database } from '../../firebase';
import styled from "styled-components";
import { Grid, makeStyles, Typography,useTheme,useMediaQuery,Button ,TextField,MenuItem,InputLabel} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';
import { StateContext } from '../../context/StateContext';
// import database  from '../../firebase';

const useStyles = makeStyles(theme=>({
    rowContainer:{
        paddingLeft:'4em',
        paddingRight:'4em',
        paddingTop:'2em',
        paddingBottom:'10em',
        [theme.breakpoints.down('md')]:{
            paddingLeft:'1.5em',
            paddingRight:'1.5em',
        },
        [theme.breakpoints.down('sm')]:{
            paddingLeft:'1.5em',
            paddingRight:'1.5em',
            paddingTop:'1em',
        }
    },
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
        marginLeft:'auto'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}))
export default function Cart(props){
    const classes = useStyles();
    const theme = useTheme();

    const [tot, setTot] = useState(0)
    const [sav, setSave] = useState(0)
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const [docs, setDocs] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const {cart,userdata,wish,cartsave,carttotal} =  useContext(StateContext);
    const [dataCart,setDataCart] =  cart;
    const [user,setUser] = userdata;
    const [dataWishlist,setDataWishlist] = wish;
    const [cartSave,setcartSave] = cartsave;
    const [cartTotal,setcartTotal] = carttotal;

    const ide = user;

    // useeffest
    useEffect(() => {
       console.log({dataCart})
      tote()

    }, [tot])

    // delete
    const deleteItem = async(id, e) => {
        await database.collection('users')
        .doc(ide)
        .collection('cart')
        .doc(id)
        .delete()
        .then(() => { 
            tote() 
            toast("Product Deleted", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
        })}
        )
    }

    // total
    function tote() {
        database.collection('users').doc(ide).collection('cart').onSnapshot((a) => {
            let total =0;
            let save =0;
            a.forEach((item) => {
                total = total + Number(item.data().price)
                save = save + Number(item.data().oldPrice - item.data().price)
            })
            setSave(save)
            setTot(total)
        })
    }

    // add to whistlist
    const addtoWish = (doc) => {
        let q = dataWishlist.filter(a => a.productName === doc.productName)
        if (ide) {
            if (q.length === 0) {
                database.collection("users").doc(ide).collection("wish").add({
                    productName: doc.productName,
                    image: doc.image,
                    price: doc.price,
                    oldPrice: doc.oldPrice
                }).then(() => {
                    toast("Item Added to WishList",
                        {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                })
                database.collection('users').doc(ide).collection('cart').doc(doc.key).delete()
            }
            else {
                toast("Product Moved To Wishlist", {
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


      if (dataCart.length === 0 )
      return (
          <img src={`https://i.pinimg.com/originals/fa/90/cd/fa90cdab2a780306d0c350964c81e391.png`} alt="Logo" style={{ width: '100%', height: '30em' }} />
      )
  else if (dataCart !== null)
    return(
        <div>
        {props.user ? 
        <Grid Container direction={matchesSM ? 'column' :' row' }  alignItems='center' className={classes.rowContainer}>
            <Grid item container direction='row' justifyContent='center'>
            <Grid item lg={4}>
                {/* first Item */}
                {dataCart && dataCart.map(doc=>
            <Card className={classes.root} style={{marginBottom:'2em'}}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                    {doc.productName}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                    ₹{doc.price} 
                    <OriginalPrice id="price">{doc.oldPrice}</OriginalPrice>
                    </Typography>
                    <Typography variant="subtitle1" style={{color:'green'}}>
                    You saved ₹{doc.oldPrice - doc.price}!
                    </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                    <IconButton onClick={()=>deleteItem(doc.key)} >
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton onClick={()=>addtoWish(doc)} >
                        <FavoriteIcon/>
                    </IconButton>
                    </div>
                </div>
                <CardMedia
                    className={classes.cover}
                    image={doc.image}
                    title="Live from space album cover"
                />
                </Card>
                )
                }
            </Grid>
            <Grid item lg={5} sm={8} xs={7} style={{marginLeft:matchesMD ? 0 :'8em'}} alignItems='center'  >
            <Card style={{ backgroundColor: '#F6F6F7' }}>
                        <CardContent>
                            <Typography style={{ backgroundColor: '#F6F6F7', color: 'black', fontFamily: "cursive", borderBottom: 'solid ' }}>
                                Subtotal
                            </Typography>
                            <br />
                            <Typography style={{ color: 'black', fontFamily: "fantasy" }}>
                                The total Price is ${cartTotal}
                            </Typography>
                            <Typography style={{ color: 'black', fontFamily: "fantasy" }}>
                                    You Saved ₹{cartSave}
                                </Typography>
                            <br />
                            <Button>
                                Pay Now
                            </Button>
                        </CardContent>
                    </Card>
            </Grid>
            </Grid>
        </Grid>
            : 'sign first' }
            </div>
    )
}

{/* < Container style={{ alignItem: 'center', justifyContent: "center" }}>
<h3>Cart   </h3>
{console.log(docs)}

<Row fixed>
    {docs && docs.map((doc) =>
        <Col xs={13} md={3}>
            <ItemCards
                key={doc.id}
                id={doc.id}
                productName={doc.productName}
                image={doc.image}
                price={doc.price}
            />
        </Col>
    )}
</Row>
</Container>
<Container>
<Row>
    <h3>Total Price:</h3>
</Row>
</Container> */}