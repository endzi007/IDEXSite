import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Stepper, Step, StepLabel, StepContent, Button, Paper, Typography, TextField } from '@material-ui/core';
import Snackbar from '../helperComponents/snackbar';

const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

const styles = theme => ({
  defaultStyle: {
    width: "50%",
    margin: " 0 auto",
    display: "flex",
    flexDirection: "column",
    opacity: 0.8,
    paddingTop: "4vh",
    "& h4": {
        marginBottom: "3vh",
        alignSelf: "center",
        [theme.breakpoints.down("sm")]:{
          fontSize: "1.4rem",
          paddingTop: "5vh"
        },
        "& span":{
          color: theme.palette.primary.main
        }
      },
    [theme.breakpoints.down("sm")]:{
      width: "90vw"
    }
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,

  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
    fontSize: "1rem"
  },
  MuiStepLabel:{
    root:{
      color: theme.palette.secondary.main,
      
    },
    active:{
      color: theme.palette.primary.main
    }
  },
  snackbar: {
    root: {
      backgroundColor: theme.palette.primary.main
    },
    snackbarContent: {
      backgroundColor: theme.palette.primary.main
    }
  }
});

function getSteps() {
  return ['Enter your name', 'Enter email', 'Enter subject', 'Enter your message'];
}

class VerticalLinearStepper extends React.Component {
  state = {
    activeStep: 0,
    name: "",
    email: "",
    message: "",
    subject: "",
    error: true,
    open: false
  };

  handleNext = () => {
    this.setState(state => ({
      error: true,
      activeStep: state.activeStep + 1,
    }));

  };
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
      error: false
    }));
  };
  handleReset = () => {
    this.setState({
      activeStep: 0,
      name: "",
      email: "",
      message: "",
      subject: "",
      error: true
    });
  };
  handleChange = (type, e) =>{
    let value = e.target.value;
    this.setState({
      [type] : value
    }, ()=>{
      if(value.length === 0){
        this.setState({
          error: true
        });
      }
     switch (type){
       case "name":
          let err = value.length >16 || value.length === 0? true: false;
            this.setState({
              error: err
            })
          break;
       case "email":
            let test; 
            if(value.length === 0){
              test = false;
            } else {
              test = this.validateEmail(value);
            }
            this.setState({
                error: !test
            });
            break;

        default:
          this.setState({error: false});
          break;
     }
    });
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  getStepContent(step) {
    switch (step) {
      case 0:
        return (<TextField
        autoComplete="off"
        fullWidth
        id="formFieldName"
        label="name"
        name="name"
        className={this.props.classes.textField}
        value={this.state.name}
        error={this.state.error}
        onChange={this.handleChange.bind(this, "name")} 
        type="text" />)
      case 1:
      return (<TextField
        autoComplete="off"
        fullWidth
        id="formFieldEmail"
        name="email"
        label="email"
        className={this.props.classes.textField}
        value={this.state.email}
        error={this.state.error}
        onChange={this.handleChange.bind(this, "email")} 
        type="text" />)
      case 2:
        return (<TextField
          autoComplete="off"
          fullWidth
          id="subject"
          name="subject"
          label="Subject"
          className={this.props.classes.textField}
          value={this.state.subject}
          error={this.state.error}
          onChange={this.handleChange.bind(this, "subject")} 
          type="text" /> )
      case 3:
        return (<TextField
          fullWidth
          id="message"
          label="message"
          name="message"
          multiline={true}
          rows="2"
          rowMax="4"
          value={this.state.message}
          onChange={this.handleChange.bind(this, "message")}
          className={this.props.classes.textField}/>)
      default:
        return 'Send your message: ';
    }
  }
  handleButton = (step) => {
    return false;
  }
  handleSubmit = (e) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state })
    })
      .then(() => this.handleReset())
      .catch(error => alert(error));
    e.preventDefault();
    this.setState({
      open: true
    });
    setTimeout(()=>{
      this.setState({
       open: false 
      });
    }, 3000);
  }
  
  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    const dd = "</>"
    return (
      <div className={classes.defaultStyle}>
      <Typography variant="h4" color="inherit"><span>{dd.substr(0,1)}</span> Contact us <span>{dd.substr(1,2)}</span></Typography>
      <Snackbar show={this.state.open} message="enis"/>
      <form onSubmit ={this.handleSubmit}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {this.getStepContent(index)}
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        disabled={this.state.error}
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Thanks for contacting me - send message</Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
            >
              Send
            </Button>
           </Paper>
        )}
      </form>
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);
