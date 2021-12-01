import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#2c48b0',
    },
    secondary: {
      main: '#c3b975',
      contrastText: '#ffffff',
    },
    background:{
      default:'#000000',
      paper:'#070b16'
    }
  },
  components:{
    MuiAppBar:{
      styleOverrides:{
        root:{
          backgroundColor:'#11225e'
        }
      }
    }
  }
  
 
});
