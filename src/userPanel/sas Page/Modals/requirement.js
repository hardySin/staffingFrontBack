import React,{useState, useEffect,useRef, useContext} from 'react';
import { fade, makeStyles,withStyles } from '@material-ui/core/styles';
 
import Dialog from '@material-ui/core/Dialog';
 
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

 
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Grid, MenuItem, Typography, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setSourcingVendors } from '../../../Reducer/action';
  
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
 
export default function Requirement(props) {
  const classes = useStyles();
  console.log("sdasdsdsadsa",props.item)
  
  const [sourcingVendor ,setSourcingVendor]= useState([])
  const [field ,setField]= useState(false)

  const dispatch=useDispatch();

  const vendors=useSelector((state)=>state.reducer1.sourcingVendors);

  const changeHandler = e => {
		setField({...field, [e.target.name]: e.target.value})
	}


const getSourcingVendor=async()=>
{
 const requestOptions = {
          method: 'GET',
        };
const response = await fetch('http://localhost:4000/api/getSourcingVendor', requestOptions);
      const data = await response.json();
             let ResArr=data.result2;
             setSourcingVendor(ResArr);
             dispatch(setSourcingVendors(ResArr))
    }  

   
   useEffect(()=>
	{	
    if(vendors.length>0)
      {
        setSourcingVendor(vendors);
        console.log("sourcingVendor", vendors)
        }

       else
       {
        getSourcingVendor()
        }
    },[])


   return (
    <>
  
    <Dialog
       fullWidth="true"
       maxWidth="md"
        open={props.open9}
         keepMounted
           onClose={props.handleClose1}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">New Requirement Rasied</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
      <Grid container spacing={3}>
      <Grid item xs={6} sm={3}>
      <Typography variant="h6" component="h6">
      Customer Name
         </Typography>
         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="span" component="span">
            {props.item}
         </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="h6" component="h6">
        Position Name
         </Typography>

        </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="span" component="span">
        {props.item}

        </Typography>

         </Grid>
        </Grid>
     

        <Grid container spacing={3}>
      <Grid item xs={6} sm={3}>
      <Typography variant="h6" component="h6">
      Mandatory Skills
        </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="span" component="span">
        {props.item}

        </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="h6" component="h6">
        Desirable Skills
 
         </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="span" component="span">
        {props.item}

        </Typography>

         </Grid>
        </Grid>


        <Grid container spacing={3}>
      <Grid item xs={6} sm={3}>
      <Typography variant="h6" component="h6">
      Quantity
        </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="span" component="span">
        {props.item}

        </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="h6" component="h6">
        Due Deployment Date
         </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="span" component="span">
        {props.item}

        </Typography>

         </Grid>
        </Grid>


        
        <Grid container spacing={3}>
      <Grid item xs={6} sm={3}>
      <Typography variant="h6" component="h6">
      Deployment Address
         </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="span" component="span">
        {props.item}

        </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="h6" component="h6">
        Postal Code
           </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="span" component="span">
        {props.item}

        </Typography>

         </Grid>
        </Grid>


        <Grid container spacing={3}>
      <Grid item xs={6} sm={3}>
      <Typography variant="h6" component="h6">
      Job Description
         </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="span" component="span">
        {props.item}

        </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="h6" component="h6">
        Attached Job Description
 
         </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="span" component="span">
            View
        </Typography>

         </Grid>
        </Grid>
 
        <Grid container spacing={3}>
      <Grid item xs={6} sm={3}>
      <Typography variant="h6" component="h6">
      Requirement Received From
          </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="span" component="span">
        {props.item}

        </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="h6" component="h6">
        Created On
           </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="span" component="span">
        {props.item}

        </Typography>

         </Grid>
        </Grid>
 
        <Grid container spacing={3}>
      <Grid item xs={6} sm={3}>
      <Typography variant="h6" component="h6">
      Budget(In LPA)
          </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="span" component="span">
        {props.item}

        </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="h6" component="h6">
        Experience(In Years)
         </Typography>

         </Grid>
        <Grid item xs={6} sm={3}>
        <Typography variant="span" component="span">
        {props.item}
         </Typography>

         </Grid>
        </Grid>

 
        <Grid container spacing={3}>
      <Grid item xs={6} sm={3}>
          </Grid>
        <Grid item xs={6} sm={3}>
          </Grid>
        <Grid item xs={6} sm={3}>
          </Grid>
        <Grid item xs={6} sm={3}>
 
        <TextField fullWidth select label="Select Sourcing Vendor" 
           variant="outlined" name="customer" onChange={changeHandler}>
          {sourcingVendor.map((i) => (
            <MenuItem key={i._id} value={i._id}>
              {i.firstName +" "+ i.lastName}
            </MenuItem>
          ))}
        </TextField>

         </Grid>
        </Grid>

             </DialogContentText>
           <DialogActions>
           <Button  className={classes.save} variant="contained" color="primary">
               Select Sourcing Vendor
             </Button>
         </DialogActions>
        </DialogContent>
 
      </Dialog>
 
    </>
  );
}
