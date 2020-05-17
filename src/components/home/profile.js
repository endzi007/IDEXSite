import React, { useState, useRef} from 'react';
import { Typography, makeStyles, Button} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { creators as actions } from "../../appInfoAndLinks/appInfoAndLinksDuck";

const styles = makeStyles(theme=>({
    root: {
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "50% 50%",
        position: "relative",
        alignItems: "center",
        "& h4":{
            letterSpacing: "0.2rem",
            fontSize: "3vw",
            marginTop: "2vh"
        },
        "& h6":{
            letterSpacing: "0.2rem",
            marginLeft: "5px",
            marginTop: "1vw",
            fontSize: "3.5vw"
        },
        "& h1":{
            fontSize: "7.5vw",
            letterSpacing: "5px",
            letterSpacing: "5px",
            justifySelf: "center"
        }
    },
    left: {
        height: "100%",
        display: "flex",
        flexDirection: "column",

        paddingTop: "20px"

    },
    right: {
        height:"100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingTop: "20px"
    }
}));

const Profile = (props)=>{
    const classes = styles();
    const [enableEdit, setEnableEdit] = useState(false);
    const details = useSelector(state => state.appInfoAndLinks.contact)
    const [name, setName ] = useState(details.fullName);
    const [email, setEmail ] = useState(details.email);
    const dispatch = useDispatch();

    return(
        <div className={classes.root}>
            <div className={classes.left}>
                <Typography variant="h6">Profile</Typography>
                <Avatar style={{alignSelf: "center", width: "120px", height: "120px"}} alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" />
                <Button onClick={()=>{
                    setEnableEdit(!enableEdit);
                    if(enableEdit){
                        dispatch(actions.changeEmail(email))
                        dispatch(actions.changeName(name))
                    }
                }}
                style={{width: "150px", fontSize: "0.7em", alignSelf: "flex-end"}} color="primary">Edit details</Button>
                <TextField
                    disabled={!enableEdit}
                    id="filled-disabled"
                    label="Full name"
                    defaultValue={name}
                    variant="filled"
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                />
                <TextField
                    disabled={!enableEdit}
                    id="filled-disabled"
                    label="email"
                    defaultValue={email}
                    variant="filled"
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                />
            </div>
            <div className={classes.right}>
                <Typography variant="h6">Recent likes</Typography>
            </div>
        </div>
    );

}


export default Profile;
