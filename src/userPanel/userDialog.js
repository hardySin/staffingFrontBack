import React,{useState,useEffect,useRef} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
 import DialogContent from '@material-ui/core/DialogContent';
 import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
 import MenuItem from '@material-ui/core/MenuItem';
  import axios from 'axios';
 import Storage from './helper/Storage';
import RoleConstant from '../Constants/RoleConstant';


  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  
export default function UserDialog(props) {
  const [open, setOpen] =  useState(false);
 
  const [user ,setUser]= useState({})
  const [userRole ,setUserRole]= useState({})
  //const [roles ,setRoles]= useState([])
  const roles= useRef(new Array())
  const users= useRef(new Array())

  const dialogRef = useRef();


 
     const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  const changeHandler = e => {
		setUser({...user, [e.target.name]: e.target.value})
	}

  const changeHandler2 = e => {
		setUserRole({...userRole, [e.target.name]: e.target.value})
	}
  
  const createUser=async(e)=>
	{
		 e.preventDefault();

		 try
		 {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json',  "Authorization" : "Bearer " +Storage.getItem(RoleConstant.TOKEN) },
				body: JSON.stringify({ user:user })
			};
			const response = await fetch('http://localhost:4000/api/createUser', requestOptions);
			const data = await response.json();
      console.log("data",data)
      if(data.error=="first name")
      {
        alert(data.error)
      }
      else{
        users.current.push(data.result)
         if(props.handlerType=="User")
        {
         props.userCallback(users)
         handleClose()

         }
//         dialogRef.current.onClose
         }
  		
    }
		 catch(err)
		 {
			console.log("error ", err)
 		 }
     	 
  	}

    
  const createRole=async(e)=>
	{
		 e.preventDefault();

		 try
		 {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' ,  "Authorization" : "Bearer " +Storage.getItem(RoleConstant.TOKEN) },
				body: JSON.stringify({ userRole:userRole })
			};
			const response = await fetch('http://localhost:4000/api/createRole', requestOptions);
			const data = await response.json();
      console.log("data",data)
      if(data.error=="Role Exits")
      {
        alert("Role Exits")
      }
      else{
           roles.current.push(data.result)
           if(props.handlerType=="Role")
           {
            props.roleCallback(roles)
            handleClose()

            }
        }
     }
		 catch(err)
		 {
			console.log("error ", err)
 		 }
   	}

    useEffect(async () => {
      getUsers()
      getRoles()
     },[])


      const getUsers=async()=>
     {
 
      const requestOptions = {
				method: 'GET',
  			};
      const response = await fetch('http://localhost:4000/api/getUsers', requestOptions);
			const data = await response.json();
           if(data.result.length>0)
          {      users.current=[]

             for (let obj of data.result) {
               users.current.push(obj)
 
                 }
           }
             if(props.handlerType=="User")
           {
            props.userCallback(users)
            }
      }

       const getRoles=async()=>
      {
       const requestOptions = {
				method: 'GET',
  			};
      const response = await fetch('http://localhost:4000/api/getRoles', requestOptions);
			const data = await response.json();
           if(data.result.length>0)
          {
            roles.current=[]

             for (let obj of data.result) {
                    roles.current.push(obj)
                  }
           }
            if(props.handlerType=="Role")
           {
            props.roleCallback(roles)
            }
      }

  return (
    <div> 
         <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create {props.handlerType}
      </Button>
       <Dialog ref={dialogRef}  open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
       
       disableBackdropClick={true} disableEscapeKeyDown={true} onClose={handleClose} fullWidth={true}>
            
        <DialogTitle id="form-dialog-title" onClose={handleClose}>Create {props.handlerType}</DialogTitle>
        <DialogContent>
            {props.handlerType=="User" ?
            <>
              <TextField variant="outlined" autoFocus margin="dense"   label="First Name" type="text" name="firstName" onChange={changeHandler} fullWidth/>

                <TextField variant="outlined" autoFocus margin="dense"  label="Last Name" type="text" name="lastName" onChange={changeHandler} fullWidth/>

                <TextField variant="outlined" autoFocus margin="dense" label="Email Address" type="email" name="emailName"  onChange={changeHandler} fullWidth/>

                <TextField fullWidth select label="Select Roles"  name="roleID"
               onChange={changeHandler}  variant="outlined">
                 
                { roles.current.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                {option.rolename}
                </MenuItem>
                ))}
                </TextField>

              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={createUser} color="primary">
                Save
              </Button>
                </>
        :    
        <>
        <TextField fullWidth select label="Select Roles" 
           variant="outlined" name="rolename" onChange={changeHandler2}>
          {RoleConstant.ROLES.map((roles) => (
            <MenuItem key={roles.name} value={roles.name}>
              {roles.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField variant="outlined" autoFocus margin="dense"   label="Role Description" type="text" name="description" onChange={changeHandler2} fullWidth/>

        {/* <TextField fullWidth select label="Select Roles" value={Description}
          onChange={changeDescription}   variant="outlined">

      <MenuItem key="Select the Description" >
                  Select the Description
                   </MenuItem>

          {RoleConstant.ROLES.filter(roles =>roles.name == role).map(filterRoles=>
          {
            console.log("filterRoles",filterRoles)
            return( 
              <MenuItem key={filterRoles.description} value={filterRoles.description}>
              {filterRoles.description}
            </MenuItem>
             )

           })}
        </TextField> */}

        <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createRole} color="primary">
            Save
          </Button>
         </>

        }
          
       
        </DialogContent>
       </Dialog>
    </div>
  );
}
