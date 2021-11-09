import { createTheme } from '@material-ui/core/styles';
 
const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';
const arcGrey ='#DDDDDD'
const arcWhite ='#F7F6F2'
const arcBlack = '#181818'
export default createTheme({
  palette: {
    common: {
      blue: arcBlue,
      orange: arcOrange,
      grey:arcGrey,
      white:arcWhite,
      black:arcBlack
    },
    primary: {
      main: arcBlack
    },
    secondary: {
      main: arcOrange
    }
  },
  typography:{
      tab:{
        fontFamily:'sans-serif',
        textTransform:'none',
        fontWeight:700,
        fontSize:'1rem',
        color:'#171717'
      },
      estimate:{
        fontFamily:'Pacifico',
        fontSize:'1rem',
        textTransform:'none',
        color:'white'
      },
      h2:{
        fontFamily:'sans-serif',
        fontWeight:700,
        fontSize:'2.5rem',
        color:arcBlack,
        lineHeight:1.5
      },
      h3: {
        fontFamily:'sans-serif',
        fontSize: "2.5rem",
        color: arcBlack
      },
      h4:{
        fontFamily:'sans-serif',
        fontSize:'1.75rem',
        color:arcBlack,
        fontWeight:700
      },
      h6: {
        fontWeight: 500,
        fontFamily:'sans-serif',
        color: arcBlack,
        lineHeight:1
      },
      subtitle1:{
        fontFamily:'sans-serif',
        fontWeight:300,
        color:arcGrey
      },
      subtitle2: {
        color: "white",
        fontWeight: 300,
        fontSize: "1.25rem"
      },
      body1: {
        fontSize: "1.25rem",
        color: arcGrey,
        fontWeight: 300
      },
      caption: {
        fontSize: "1rem",
        fontWeight: 300,
        color: arcGrey
      },
      learnButton: {
        borderColor: arcBlue,
        borderWidth: 2,
        textTransform: "none",
        color: arcBlue,
        borderRadius: 50,
        fontFamily: "Roboto",
        fontWeight: "bold"
      }
  },
  overrides :{
    MuiInputLabel:{
      root:{
        color:arcBlack,
        fontSize:'1.3rem',
        fontFamily:'sans-serif',
        opacity:'40%'
      }
    },
    MuiInput:{
      root: {
        color: arcBlack,
        fontWeight: 300
      },
      underline: {
        "&:before": {
          borderBottom: `2px solid ${arcBlack}`,
          opacity:'30%'
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid ${arcBlack}`
        }
      }
    }
  }
});