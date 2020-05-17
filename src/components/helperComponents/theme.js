import { createMuiTheme } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { cyan } from '@material-ui/core/colors';


function createFontSizes (xs, sm, md, lg, xl){
  return {
    [breakpoints.up("xs")]:{
      fontSize: "xs"
    },
    [breakpoints.up("sm")]:{
      fontSize: sm
    },
    [breakpoints.up("md")]:{
      fontSize: md
    },
    [breakpoints.up("lg")]:{
      fontSize: lg
    },
    [breakpoints.up("xl")]:{
      fontSize: xl
    },
  }
}
const breakpoints = createBreakpoints({});

const theme = (props)=>{
  let { paletteType, primaryColor  } = props;
  
  return createMuiTheme({
    palette: {
      type: paletteType,
      primary: {
          main: paletteType === "dark"? primaryColor: "#ff5851"
      },
      secondary: {
          main: paletteType === "dark"? "#18ffff": "#ff5851"
      },
      grey: {
          main: "#18ffff"
      },
      headers: {
          main: "#fff",
      },
      background: {
          default: paletteType === "dark"? "#181718": "#f8f8f8"
      }
    },
    overrides:{
        MuiSvgIcon:{
            root:{
                backgroundColor: cyan
            }
        },
        MuiStepIcon:{
            root:{
              color: cyan,
              active:{
                  color: cyan
              }
            },
            active: {
              color: cyan, 
              fill: cyan
            },
            completed: {
                color: cyan,
                fill: cyan
            }
        }
    },
    typography: {
        fontFamily: "Montserrat, Georgia, Times, Times New Roman, serif",
        h1:{
          fontFamily: "Anton, Times, sans-serif"
        },
        h2:{
          fontFamily: "Anton, Times, sans-serif"
        },
        h3:{
          fontFamily: "Anton, Times, sans-serif"
        },
        h4:{
          fontFamily: "Anton, Times, sans-serif"
        },
        h5:{
          fontFamily: "Anton, Times, sans-serif"
        },
        h6:{
          fontFamily: "Anton, Times, sans-serif",
        },
        h7:{
          fontFamily: "Anton, Times, sans-serif"
        },
        body1: {
        },
        subtitle1:{
          fontFamily: "Anton, Times, sans-serif"
        }
    },
    dimensions:{
        desktop: {
            margins: {
              top: "70px",
              left: "80px",
              right: "70px",
              bottom: "50px"
            }
        },
        mobile: {
          margins: {
            top: "70px",
            left: "80px",
            right: "5px",
            bottom: "5px"
          }
      }
    }
  
  });

}




export default theme;