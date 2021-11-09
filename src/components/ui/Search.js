import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { database } from '../../firebase'
import { Grid,useMediaQuery,useTheme,makeStyles,Typography } from '@material-ui/core';
import ItemCards from '../productComponents/ItemCards'

const useStyles = makeStyles(theme => ({
   rowContainer: {
       paddingLeft: '5em',
       paddingRight: '5em',
       paddingTop: '2em',
       paddingBottom: '10em',
       [theme.breakpoints.down('sm')]: {
           paddingLeft: '1em',
           paddingRight: '1em',
           paddingTop: '1em',
       },
       [theme.breakpoints.down('xs')]: {
           paddingLeft: '0.5em',
           paddingRight: '0.5em',
           paddingTop: '0.5em',
       }
   },
}))

const Search = (props) => {
   const theme = useTheme();
    const classes = useStyles();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
   const [data, setData] = useState([]);
   const useQuery = () => {
      return new URLSearchParams(useLocation().search)
   }
   let query = useQuery();
   let search = query.get("name");
   console.log(search)
   useEffect(() => {
      window.scroll(0,0)
      const searchData = async () => {
         console.log(search)
         let cw = await database.collection('collection').doc('womens')
         cw.collection('lists').where("type", "==", search).get().then((querySnapshot) => {
            const fdata = [];
            querySnapshot.forEach((item) => {
               // doc.data() is never undefined for query doc snapshots
               console.log(" => ", item.data());
               fdata.push({ ...item.data(), key: item.id })
            });
            console.log(fdata)
            if (fdata.length !== 0) { setData(fdata); }
         }).catch(setData([]))
   
         let cm = await database.collection('collection').doc('mens')
         cm.collection('lists').where("type", "==", search).get().then((querySnapshot) => {
            const fdata = [];
            querySnapshot.forEach((item) => {
               // doc.data() is never undefined for query doc snapshots
               console.log(" => ", item.data());
               fdata.push({ ...item.data(), key: item.id })
            });
            if (fdata.length !== 0) {
               setData(fdata);
            }
         }).catch(setData([]))
   
         
         let cn = await database.collection('collection').doc('mobile')
         cn.collection('lists').where("type", "==", search).get().then((querySnapshot) => {
            const fdata = [];
            querySnapshot.forEach((item) => {
               // doc.data() is never undefined for query doc snapshots
               console.log(" => ", item.data());
               fdata.push({ ...item.data(), key: item.id })
            });
            if (fdata.length !== 0) {
               setData(fdata);
            }
         }).catch(setData([]))
      }
      searchData();
   }, [search])
   
   return (
      <Grid 
      Container 
      direction='column' 
      alignItems='center' 
      justifyContent='center' 
      className={classes.rowContainer}
      >
      <Grid item>
         <Typography  variant='h4' >Search Results</Typography>
      </Grid>
      <Grid 
          item 
          container 
          direction='row' 
          alignItems='center' 
          justifyContent='center' 
          className={classes.rowContainer}
      >
      {data && data.map((doc) =>
              <Grid item style={{maxWidth:'40em',marginLeft:matchesXS?0:matchesSM?'1em':matchesMD?'2em':'8em'}} >
      
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
          )}
            {data.length !== 0 ? (<></>) : (<h2>Eh ! Keyword Error......</h2>)}
      </Grid>
      </Grid>
   )
}

export default Search;


