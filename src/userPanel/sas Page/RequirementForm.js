import { Button, MenuItem, TextField } from '@material-ui/core';
import React ,{useState,useRef, useMemo, useEffect,useContext}from 'react';
   
import Container from '@material-ui/core/Container';
import FieldConstant from '../../Constants/fieldsConstant';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
 import Storage from '../helper/Storage';
import SocketContext from '../helper/socketProvider';
import { useDispatch, useSelector } from 'react-redux';
import { setCustomerList, setResourceManagerList } from '../../Reducer/action';
  
 const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    button:
    {
        marginTop:10
     },
     save:
     {
        margin:15
     }
   }));

 
export default function RequirementForm(props) {
     const [field ,setField]= useState(false)
    const [selectedDate, handleDateChange] = useState(new Date());
    const elementRef = useRef();

    const [demo ,setDemo]= useState(false)

    const changeHandler = e => {
		setField({...field, [e.target.name]: e.target.value})
	}

    const changeHandler2 = e => {
		setDemo({...demo, [e.target.name]: e.target.value})
	}
    const [customers ,setCustomers]= useState([])
    const [resources ,setResources]= useState([])
    const [success ,setsuccess]= useState()
    const [error,seterror]= useState()
    const dispatch=useDispatch();

    const classes = useStyles();
  
    let socket = useContext(SocketContext);

    const resourceManager=useSelector((state)=>state.reducer1.resourceManager);
    const customer=useSelector((state)=>state.reducer1.customer);

    useEffect(()=>
    {
 
       if(resourceManager.length>0 && customer.length>0)
      {
        console.log("resourceManager",resourceManager,"customer",customer)
        console.log("resourceManager",typeof Array.from(customer),"customer", typeof Array.from(resourceManager))
        setCustomers (customer);
        setResources(resourceManager);
        console.log("customers", customers,"resources", resources)

       }
       else
       {
          getCustommers()
          getResourcesManager()
        }
  
 
      socket.emit("userJoin",{userId:Storage.getItem("USER_ID"),roleName:Storage.getItem("ROLE_NAME")})
 
        socket.on('success',(result)=>
    {
       console.log(result)
       });

     socket.on('error',(error)=>
     {
       seterror(error)
         console.log(error)
      });
    
       return ()=>
      {
        }
    },[])
 
   

    const createRequirement=async(e)=>
	{

    socket.emit("requirements",{ field:field ,selectedDate:selectedDate,userId:Storage.getItem("USER_ID")})
        //   try
        // {
        //  const requestOptions = {
        //    method: 'POST',
        //    headers: { 'Content-Type': 'application/json' },
    		// 	  body: JSON.stringify({ field:field ,selectedDate:selectedDate,userId:Storage.getItem("USER_ID")})
        //  };
        //  const response = await fetch('http://localhost:4000/api/createRequirement', requestOptions);
        //  const data = await response.json();
        //    }
        // catch(err)
        // {
        //   }
       }
 
    const getCustommers=async()=>
    {
      const requestOptions = {
              method: 'GET',
            };
    const response = await fetch('http://localhost:4000/api/getCustomers', requestOptions);
          const data = await response.json();
                 let CusArr=data.result2;
                setCustomers(CusArr);
                dispatch(setCustomerList(CusArr))
       }

      const getResourcesManager=async()=>
      {
       const requestOptions = {
                method: 'GET',
              };
      const response = await fetch('http://localhost:4000/api/getResourceManagers', requestOptions);
            const data = await response.json();
                   let ResArr=data.result2;
                  setResources(ResArr);
                  dispatch(setResourceManagerList(ResArr))

         }

 
  return (
  <>
        <div className={classes.root}>
      <Grid container spacing={2}>
       

        <Grid item  sm={6}>
        <TextField fullWidth select label="Select Customer" 
           variant="outlined" name="customer" onChange={changeHandler}>
          {customers.map((i) => (
            <MenuItem key={i._id} value={i._id}>
              {i.firstName +" "+ i.lastName}
            </MenuItem>
          ))}
        </TextField>
         </Grid>

        <Grid item  sm={6}>
        <TextField variant="outlined" autoFocus margin="dense"   label="Rasied By" type="text" name="rasiedBy" onChange={changeHandler} fullWidth/>
        </Grid>


        <Grid item xs={12} sm={6}>
 
        <div className={classes.root}>
         <Grid container spacing={3}>
         <Grid item xs={9}>
         <TextField   variant="outlined" autoFocus margin="dense"   label="Mandatory Skills" type="text" name="mandatorySkills" onChange={changeHandler} fullWidth/>
          </Grid>
        <Grid item xs={3}>
            <Button className={classes.button} variant="contained" color="primary">
            Add Skills
            </Button>
          </Grid>
       </Grid>
    </div>
          </Grid>


        <Grid item xs={12} sm={6}>
        <div className={classes.root}>
         <Grid container spacing={3}>
         <Grid item xs={9}>
         <TextField   variant="outlined" autoFocus margin="dense"   label="Desirable Skills" type="text" name="desirableSkills" onChange={changeHandler} fullWidth/>
         </Grid>
        <Grid item xs={3}>
            <Button className={classes.button} variant="contained" color="primary">
                Add Skills
                </Button>
         </Grid>
       </Grid>
    </div>
           </Grid>


        <Grid item xs={12} sm={6}>
        <TextField variant="outlined" autoFocus margin="dense"   label="Experience(In Years)" type="text" name="experience" onChange={changeHandler} fullWidth/>
         </Grid>
        <Grid item xs={12} sm={6}>
        <TextField variant="outlined" autoFocus margin="dense"   label="Billing Per Resource(In LPA)" type="text" name="billing" onChange={changeHandler} fullWidth/>
        </Grid>


        <Grid item xs={12} sm={6}>
        <TextField variant="outlined" autoFocus margin="dense"   label="Position Name" type="text" name="positionName" onChange={changeHandler} fullWidth/>
         </Grid>
        <Grid item xs={12} sm={6}>
        <TextField variant="outlined" autoFocus margin="dense"   label="Quantity" type="text" name="quantity" onChange={changeHandler} fullWidth/>
        </Grid>

        <Grid item xs={12} sm={6}>
        <TextField fullWidth select label="Deployment Location" 
           variant="outlined" name="deploymentLocation" onChange={changeHandler}>
          {FieldConstant.Locations.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
 
         </Grid>
        <Grid item xs={12} sm={6}>
        <TextField variant="outlined" autoFocus margin="dense"   label="Postal Code" type="text" name="postalCode" onChange={changeHandler} fullWidth/>
        </Grid>


        <Grid item xs={12} sm={6}>
        <TextField fullWidth select label="Requirement Confirmation Type" 
           variant="outlined" name="requirementConfirmation" onChange={changeHandler}>
          {FieldConstant.Confirmation.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>

         </Grid>
        <Grid item xs={12} sm={6}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>

        <KeyboardDatePicker
        fullWidth
        autoOk
        variant="inline"
        inputVariant="outlined"
        label="Due Deployment Date" 
        format="MM/dd/yyyy"
        value={selectedDate}
        ref={elementRef}
        name="dueDeploymentDate"
        InputAdornmentProps={{ position: "start" }}
        onChange={date => handleDateChange(date)}
          />
          </MuiPickersUtilsProvider>

         </Grid>


        <Grid item xs={12} sm={6}>
        <TextField variant="outlined" autoFocus margin="dense"   label="Deployment Address" type="text" name="deploymentAddress" onChange={changeHandler} fullWidth/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField variant="outlined" autoFocus margin="dense"   label="Job Description" type="text" name="jobDescription" onChange={changeHandler} fullWidth/>
         </Grid>



        <Grid item xs={12} sm={6}>
        <TextField variant="outlined" autoFocus margin="dense"   label="Attach JD" type="file" name="attachJD" onChange={changeHandler} fullWidth/>
          </Grid>
        <Grid item xs={12} sm={6}>
        <TextField fullWidth select label="Select Resource Manager" 
           variant="outlined" name="resourceManager" onChange={changeHandler}>
          {resources.map((i) => (
            <MenuItem key={i._id} value={i._id}>
              {i.firstName +" "+ i.lastName}
            </MenuItem>
          ))}
        </TextField>
         </Grid>

          <Grid item xs={12} sm={6}>
           </Grid>
        <Grid   item xs={12} sm={6}>
        <Button   className={classes.save} onClick={createRequirement} variant="contained" color="primary">
            Send 
            </Button>

            <Button className={classes.save} variant="contained" color="primary">
            Save to Draft
            </Button>

            <Button className={classes.save} variant="contained" color="primary">
            View Draft
            </Button>

            <Button  className={classes.save} variant="contained" color="primary">
            Back to Dashboard
            </Button>


         </Grid>

           </Grid>
            </div>
 
     </>
  );
}