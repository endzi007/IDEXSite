import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from 'react-router-dom';
import { creators as actions } from '../../appConfig/appConfigDuck'
import { useDispatch, useSelector } from 'react-redux';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: '250px',
  },
  toggleDrawerStyle:{
    top: "5px",
    left: "5px",
    width: "70px",
    height: "100vh",
    display: "flex",
    position: "absolute"
  }
});

export default function NewDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const globalState = useSelector(state =>{
    return {
        transitionDuration: state.appConfig.transitionDuration,
        showDrawer: state.appConfig.showDrawerAndCards
    }
});
  const history = useHistory();
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const dispatch = useDispatch();

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Profile', 'Contact' ].map((text, index) => (
          <ListItem button key={text} onClick={()=>{
            dispatch(actions.startPageTransition(true));
            setTimeout(()=>{
                dispatch(actions.showDrawerAndCards(false));
                history.push(text === "Profile"? "/": text);
                dispatch(actions.startPageTransition(false));
            }, globalState.transitionDuration*1000);
    }}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.toggleDrawerStyle}>
          <Button style={{transition: "all 0.25s cubic-bezier(0, 0, 0.2, 1) ", left: state["left"]? "250px": "0px"}} 
          onClick={toggleDrawer("left", true)}>
              {!state["left"]? <NavigateNextIcon />: <ChevronLeftIcon />}
              
              </Button>
          <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
            {list("left")}
          </Drawer>
    </div>
  );
}
