import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
 import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Storage from './helper/Storage';
import RoleConstant from '../Constants/RoleConstant';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme)=>({
  root: {
     margin:150,
  },
  root1: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
 }));
 

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

export default function Login() {
  const classes = useStyles();
 
 
  const [cred ,setCred]= useState({})
  const [id ,setId]= useState()
  const [error ,seterror]= useState()
  const [accordin ,setAccordin]= useState(false)
  const [emailState ,setEmailState]= useState(false)
  const [passState ,setPassState]= useState(false)
  
  let history = useHistory();

  const changeHandler = e => {
		setCred({...cred, [e.target.name]: e.target.value})
	}

  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const email=async(e)=>
	{
		 e.preventDefault();
      if(cred.emailName.includes("admin"))
      {
        console.log("admiin")
        try
        {
         const requestOptions = {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ cred:cred })
         };
         const response = await fetch('http://localhost:4000/api/adminUser', requestOptions);
         const data = await response.json();
         console.log("response",data)
         if(data.error=="Admin Already Created")
         {      
            seterror(data.error)
            setEmailState(false)
            setPassState(true)
             setId(data.adminId)
             setAccordin(true)
            alert("admin already created")
              handleClick(TransitionRight)
          }
          
          else if(data.error =="Invalid Admin Email ID")
          {
            seterror(data.error)
          }
         else{
            setEmailState(false)
            setPassState(true)
             setAccordin(true)
            setId(data.result._id)
              }
         }
        catch(err)
        {
         console.log("error ", err)
         }
       }
       else
       {

        try
        {
         const requestOptions = {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ cred:cred })
         };
         const response = await fetch('http://localhost:4000/api/userEmailChecked', requestOptions);
         const data = await response.json();
         console.log("response",data)
         if(data.error=="EmailID Already Created")
         {      
            seterror(data.error)
            setEmailState(false)
            setPassState(true)
            setId(data.userID)
            setAccordin(true)
            alert("EmailID Already Created")
            handleClick(TransitionRight)
          }
          else if(data.error =="Invalid Email ID")
          {
            seterror(data.error)
          }
         }
        catch(err)
        {
         console.log("error ", err)
         }
         console.log("not admin")
       }
      	 
  	}
 
    const login=async(e)=>
    {
       e.preventDefault();
        if(cred.emailName.includes("admin"))
        {
          console.log("admin")
          try
          {
           const requestOptions = {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({data:{ cred:cred ,id:id}})
           };
           const response = await fetch('http://localhost:4000/api/adminPassword', requestOptions);
           const data = await response.json();
           console.log("response",response)
           Storage.setItem(RoleConstant.TOKEN,data.token)
             setPassState(false)
             return history.push("/admin");

              }
          catch(err)
          {
           console.log("error ", err)
           }
         }
         else
         {
          try
          {
           const requestOptions = {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({data:{ cred:cred ,id:id}})
           };
           const response = await fetch('http://localhost:4000/api/userLogin', requestOptions);
          const data = await response.json();
          console.log("response",data)

          if(data.error!="Invalid Passowrd")
          {
            console.log("response",data)
            Storage.setItem(RoleConstant.TOKEN,data.token)
            Storage.setItem(RoleConstant.USEREMAIL,data.emailName)
            Storage.setItem(RoleConstant.FIRSTNAME,data.firstName)
            Storage.setItem(RoleConstant.LASTNAME,data.lastName)
            Storage.setItem(RoleConstant.ROLEID,data.roleID)
            Storage.setItem(RoleConstant.ROLENAME,data.roleName)
            Storage.setItem(RoleConstant.USERID,data.userID)

             setPassState(false)  
             return history.push("/SASpanel");
           }
           else{
             alert(data.error)
           }
             }
          catch(err)
          {
           console.log("error ", err)
           }
           console.log("not admin")
         }
           
      }
   
 
    useEffect(()=>
	{	
    console.log(Storage.getItem(RoleConstant.TOKEN))
    setTimeout(() => {
      setEmailState(true)
    }, 1000);
    setId()
    console.log("hello",id , accordin)
  	},[])
 

  return (
<>

<div className={classes.root}>
  <h3>Login </h3>
      <Accordion expanded={emailState}>
        <AccordionSummary
          
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Email</Typography>
        </AccordionSummary>
        <AccordionDetails>

        <Card className={classes.root1} variant="outlined">
           <CardContent> 
       
           <TextField variant="outlined" autoFocus margin="dense"   label="Email" type="text" name="emailName" onChange={changeHandler} fullWidth/>
          
            </CardContent>
           <CardActions>
             <Button onClick={email} size="large">Password</Button>
           </CardActions>
         </Card>
       
         <Snackbar
             open={open}
             onClose={handleClose}
             TransitionComponent={transition}
             message={error}
             key={transition ? transition.name : ''}
           />

         </AccordionDetails>
      </Accordion>
      <Accordion  disabled={!accordin && id==undefined}
              expanded={passState}
       >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Password</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Card className={classes.root1}  variant="outlined">
           <CardContent> 
       
           <TextField variant="outlined" autoFocus margin="dense"   label="Password" type="text" name="password" onChange={changeHandler} fullWidth/>
          
           <TextField variant="outlined" autoFocus margin="dense"   label="Confrim Password" type="text"  fullWidth/>

            </CardContent>
           <CardActions>
             <Button onClick={login} size="large">Login</Button>
           </CardActions>
         </Card>
       
         <Snackbar
             open={open}
             onClose={handleClose}
             TransitionComponent={transition}
             message={error}
             key={transition ? transition.name : ''}
           />
        </AccordionDetails>
      </Accordion>
       
    </div>

    </>

    );
}
