import { withTheme, FormHelperText } from "@material-ui/core";

const navStyles = theme  =>({
    navbar:{
        background: '#0077bb'
    },
    navbarContainer: {
        width: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between'
    },
    navLeft: {
        display: 'flex'
    },
    navRight: {
        display: 'flex',
        alignItems: 'center'
    },
    navHeader: {
        color: '#ffffff',
        paddingRight: '30px'
    },
    navItem: {
        color: '#ffffff',
        paddingRight: '20px'
    }
})

export default navStyles;