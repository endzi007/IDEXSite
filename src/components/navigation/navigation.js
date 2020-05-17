import React, { useState } from "react";
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter, useLocation, useHistory} from 'react-router-dom';
import { creators as actions } from '../../appConfig/appConfigDuck'
import { Typography, makeStyles, Switch } from '@material-ui/core/';
import { useRef } from "react";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import { useEffect } from "react";

const styles = makeStyles (theme =>{
    return {
    root: (props)=>({
        paddingTop: "3vh",
        width: "50%",
        height: "100%",
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        height: "100%",
        background: theme.palette.background.default,
        justifyContent: "space-between",
        transition: "all 0.5s cubic-bezier(0,.84,0,1.0)",
        position: "fixed",
        zIndex: 2,
        bottom: 0
    }),
    navItemStyle: (props)=>({
        fontFamily: "'Anton', sans-serif",
        fontSize: "3vmax",
        position: "relative",
        display: "grid",
        justifyContent:"start",
        marginLeft: "0.8vw",
        color: props.showSpan? theme.palette.primary.main : theme.palette.primary.main.contrastText
    }),
    info: (props)=> ({
        marginLeft: "1em",
        paddingBottom: "1em",
        wordWrap: "break-word",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.down("sm")]:{
            "& p":{
                fontSize: "0.6rem"
            }
        },
        "& p":{
            color: props.color
        }
    }),
    links:{
        display: "flex",
        justifyContent: "center",
        "& a":{
            color: theme.palette.primary.main,
            marginLeft: "0.5vw"
        },
        "& a:hover":{
            color: theme.palette.primary.light,
            opacity: "0.5"
        }
    },
    switchTheme:{
        display: "flex",
        alignItems: "center"
    }
    }
});


const itemsStyle = makeStyles(theme => ({
    defaultStyle: (props)=> ({
        "& span":{
            display: "block",
            backgroundColor: theme.palette.background.default,
            height: "1em",
            width: "100%",
            marginTop: "-1.2em",
            marginLeft:"-0.8vw",
            transform: props.showSpan?"scaleX(1.2) scaleY(0.5)":"scaleX(0) scaleY(0.5)",
            transition: "all 0.5s cubic-bezier(1,0,0,1)",
            transformOrigin: "left",
            clipPath: "polygon(1% 0%, 6% 7%, 0% 10%, 6% 12%, 0% 13%, 6% 15%, 0% 17%, 46% 19%, 0% 22%, 8% 24%, 0% 25%, 98% 37%, 1% 36%, 4% 41%, 1% 43%, 6% 44%, 0% 46%, 6% 53%, 0% 56%, 14% 65%, 0% 66%, 6% 70%, 1% 74%, 7% 78%, 1% 79%, 7% 85%, 0% 85%, 16% 90%, 0% 100%, 30% 95%, 42% 96%, 51% 95%, 67% 96%, 74% 100%, 87% 95%, 100% 100%, 86% 86%, 100% 83%, 88% 80%, 100% 75%, 90% 75%, 100% 69%, 77% 66%, 99% 62%, 82% 57%, 99% 57%, 78% 46%, 100% 49%, 79% 39%, 100% 39%, 91% 30%, 100% 28%, 93% 23%, 100% 16%, 87% 12%, 99% 10%, 89% 8%, 99% 5%, 95% 4%, 100% 1%, 71% 3%, 56% 0%, 45% 5%, 35% 1%, 18% 4%);"
        },
        "&:hover>span":{
            transform: "scaleX(1.2) scaleY(0.5)"
        },
        "&:hover":{
            cursor: "pointer",
            opacity: "0.8"
        }
    })
}));

export const NavItem = (props)=>{
    const { name, url } = props;
    const globalState = useSelector(state =>{
        return {
            transitionDuration: state.appConfig.transitionDuration,
            showDrawer: state.appConfig.showDrawerAndCards
        }
    });
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const onMouseEnterHandler = (path)=>{
        setTimeout(()=>{
            props.currentHover(path);
        },0);
    }
    const handleClick = (path) => {
        if (location.pathname === path){
            return;
        }
        dispatch(actions.startPageTransition(true));
        setTimeout(()=>{
            dispatch(actions.showDrawerAndCards(false));
            history.push(path);
            dispatch(actions.startPageTransition(false));
        }, globalState.transitionDuration*1000);
    }
    let styleProps = {
        showSpan: false
    }
    if(location.pathname === url){
        styleProps.showSpan = true;
    } else {
        styleProps.showSpan = false;
    }
    const classes = itemsStyle({showSpan: styleProps.showSpan});
    return (
    <Typography  variant="body1" color={styleProps.showSpan? "primary": ""} className={`${classes.defaultStyle} ${props.className}`} onClick={()=>{handleClick(url)}}> 
     {name} <span></span>
    </Typography>
    )
}

const Navigation = (props)=> {
    const dispatch = useDispatch();
    const appInfos = useSelector((state)=>{
        return state.appInfoAndLinks;
    })
    const currentTheme = useSelector((store)=>{
        return store.appConfig.currentTheme;
    });

    const [ theme, setTheme ] = useState(currentTheme === "dark"? true : false);


    const handleThemeSwitch = (e)=>{
        setTheme(e.target.checked);
        dispatch(actions.currentTheme(e.target.checked? "dark": "light"));
        try {
            localStorage.setItem("theme", e.target.checked? "dark": "light");
        } catch (error) {
            console.log(error);
        }
    }

        const  classes  = styles({showDrawer: props.appConfig.showDrawerAndCards});
        return(
            <div className={classes.root} style={{transform: !props.appConfig.showDrawerAndCards? `translateX(-${100}%)` : "translateX(0px)",}}>
                <div className={classes.info}>
                    <Typography variant="h6">Choose theme</Typography>
                    <div className={classes.switchTheme}>
                        <Typography variant="body2" color="textPrimary">Light</Typography>
                        <Switch checked={theme} onChange={handleThemeSwitch} name="checkedA" />
                        <Typography variant="body2" color="initial">Dark</Typography>
                    </div>
                    
                </div>
                <div>
                    <NavItem url="/" name="Profile" className={classes.navItemStyle}/>
                    <NavItem url="/Contact" name="Contact" className={classes.navItemStyle}/>

                </div>
                <div className={classes.info}>
                <Typography variant="body2">{appInfos.contact.email}</Typography>
                <div className={classes.links}>
                    <a href={appInfos.contact.github} target="_blank"><GitHubIcon /></a>
                    <a href={appInfos.contact.linkedIn} target="_blank"><LinkedInIcon /></a>
                    <a href={appInfos.contact.resume} target="_blank"><PictureAsPdfIcon /></a>
                    <a href={appInfos.contact.paypal} target="_blank"><CreditCardIcon /></a>
                    <a href={appInfos.contact.buyMeACoffe} target="_blank"><FreeBreakfastIcon /></a>
                    
                </div>
                </div>
            </div>
        );
}

function mapStateToProps (state){
    return {
        appConfig: state.appConfig
    }

}

const mapDispatchToProps = {
    showDrawerAndCards: actions.showDrawerAndCards,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));