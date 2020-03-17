import React from 'react';
import { withStyles, Typography, withWidth } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: "100%",
        position: "relative",
        height: "25px",
        marginTop: "8px",
        overflow: "hidden"
    },
    background: {
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 0,
        borderRadius: "3px",
        backgroundColor: theme.palette.background.paper
    },
    bar:{
        left: "0",
        width: "100%", 
        height: "98%",
        backgroundColor: theme.palette.primary.main,
        position: "absolute",
        zIndex: "1",
        transformOrigin: "left",
        transition: `transform 500ms ease-in`
    },
    label: {
        position: "absolute",
        top: "50%",
        zIndex: 3,
        transform: "translateY(-50%)",
        display: "block",
        minWidth: "150px",
        backgroundColor: theme.palette.primary.dark,
        padding: "6px 3px 6px 6px",
        '& span': {
            fontWeight: "bold",
            color: theme.palette.secondary.light
        }
    },
})
class ProgressBar extends React.Component {

       state={
            value: 1,
            barColor: "",
            backgroundColor: "",
            duration: 500,
            height: 10,
            label: "",
        }


    componentDidMount = ()=>{
        setTimeout(()=>{
            this.setState({
                value: this.props.value,
                label: this.props.label,
            });
        }, 0);
    }
    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <div className={classes.label}> 

                <Typography variant="body1"><span>{`${this.state.value}%`} </span> | {this.state.label} </Typography>
                </div>
                <div>
                    <div className={classes.background}></div>
                    <div className={classes.bar} style={{ transform: `scalex(${this.state.value/100})`}} ></div>
                </div>
            </div>
        );
    }

}

export default withWidth()(withStyles(styles, {withTheme: true})(ProgressBar));