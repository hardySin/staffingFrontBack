import React ,{useState,useEffect,useRef, useMemo}from 'react';
import { useContext } from 'react';

import {withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
 import Button from '@material-ui/core/Button';
import { FormControlLabel, Switch } from '@material-ui/core';

import SendForEvaluation from '../sas Page/Modals/SendForEvaluation';
import CustomerNotShortlisted from '../sas Page/Modals/customerNotshortlisted';
import CustomerSelected from '../sas Page/Modals/customerSelected';
import CustomerShortlisted from '../sas Page/Modals/customerShortlisted';
import EvalDone  from '../sas Page/Modals/evalDone';
import ProfileApproval from '../sas Page/Modals/profileApproval';
import ProfileNotShortlisted from '../sas Page/Modals/profileNotshortlisted';
import ProfileReceived from '../sas Page/Modals/ProfileReceived';
import Requirement from '../sas Page/Modals/requirement';



import SocketHelper from '../helper/SocketHelper';
import SocketContext from '../helper/socketProvider';
import Storage from '../helper/Storage';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../Store/index';
import { setRequirement } from '../../Reducer/action';
  
 const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles((theme)=>({
root: {
  width: '100%',
},
container: {
  maxHeight: 440,
  marginTop: 20
},
margin: {
  margin: theme.spacing(1),
 },
extendedIcon: {
  marginRight: theme.spacing(1),
},
}));

export default function RmDash(props) {
   
   
  const[open1,setOpen1]=useState(false);
  const[open2,setOpen2]=useState(false);
  const[open3,setOpen3]=useState(false);
  const[open4,setOpen4]=useState(false);
  const[open5,setOpen5]=useState(false);
  const[open6,setOpen6]=useState(false);
  const[open7,setOpen7]=useState(false);
  const[open8,setOpen8]=useState(false);
  const[open9,setOpen9]=useState(false);
  const[propsItem,setPropsItem]=useState();

  const handleClose1=()=>
  {
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
    setOpen6(false);
    setOpen7(false);
    setOpen8(false);
    setOpen9(false);

   }

  let socket = useContext(SocketContext);

     const classes = useStyles();
    const columns = [
      { id: 'S.No', label: 'S.No', minWidth: 50 },
      { id: 'Customer Name', label: 'Customer Name', minWidth: 50 },
       { id: 'Position Name', label: 'Position Name', minWidth: 50},
      {
      id: 'Experience',
      label: 'Experience',
      minWidth: 50,
     },
     {
      id: 'Job Description',
      label: 'Job Description',
      minWidth: 50,
     },
    {
      id: 'Billing(in LPA)',
      label: 'Billing(in LPA)',
      minWidth: 50,
     },
     {
      id: 'Profile Received',
      label: 'Profile Received',
      minWidth: 30,
     },
     {
      id: 'Send For Evaluation',
      label: 'Send For Evaluation',
      minWidth: 50,
     },
     {
      id: 'Evaluation Done',
      label: 'Evaluation Done',
      minWidth: 50,
     },{
      id: 'Profile Approved',
      label: 'Profile Approved',
      minWidth: 50,
     },{
      id: 'Profile Not Shortlisted',
      label: 'Profile Not Shortlisted',
      minWidth: 50,
     },{
      id: 'Customer Selected',
      label: 'Customer Selected',
      minWidth: 50,
     },{
      id: 'BiCustomer Shortlist',
      label: 'Customer Shortlist',
      minWidth: 50,
     },{
      id: 'Customer Not Shortlisted',
      label: 'Customer Not Shortlisted',
      minWidth: 50,
     },
    ];

  //   const unsubscribe = store.subscribe(() =>
  //   console.log('State after dispatch: ', store.getState())
  // )
    
  const agreedRequirment=useSelector((state)=>state.reducer1.agreeRequirement);
  const dispatch=useDispatch();

   let sno=1;
    const requirements=(item)=>
    {
                dispatch(setRequirement(item))
                setPropsItem(item)
              setOpen9(true)
    }
  useEffect(()=>
  {   
     socket.emit("userJoin",{userId:Storage.getItem("USER_ID"),roleName:Storage.getItem("ROLE_NAME")})
      return ()=>
    {
      // do futher coding closing the records
      }
  },[])


  

  //  store.subscribe(() => {
  //   // When state will be updated(in our case, when items will be fetched), 
  //   // we will update local component state and force component to rerender 
  //   // with new data.
  //   store.getState();

  // });

 

  return (
    <>

                      <ProfileReceived open1={open1} handleClose1={()=> setOpen1(false)}></ProfileReceived>
                      <SendForEvaluation open2={open2} handleClose1={()=> setOpen2(false)}></SendForEvaluation> 
                      <EvalDone open3={open3} handleClose1={()=> setOpen3(false)}></EvalDone>
                      <ProfileApproval open4={open4} handleClose1={()=> setOpen4(false)}></ProfileApproval>
                      <ProfileNotShortlisted open5={open5} handleClose1={()=> setOpen5(false)}></ProfileNotShortlisted>
                      <CustomerSelected open6={open6} handleClose1={()=> setOpen6(false)} ></CustomerSelected>
                      <CustomerShortlisted open7={open7} handleClose1={()=> setOpen7(false)} ></CustomerShortlisted>
                      <CustomerNotShortlisted open8={open8} handleClose1={()=> setOpen8(false)}></CustomerNotShortlisted>
                      <Requirement open9={open9} handleClose1={()=> setOpen9(false)} item={propsItem} ></Requirement>

        <Paper className={classes.root}>
         
      <TableContainer component={Paper} className={classes.container}>
        <Table stickyHeader  className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell 
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell >
              ))}
            </TableRow>
          </TableHead>
           
          <TableBody>
            {agreedRequirment.map((item)=>
            {
                  return(
                    <>
                 <TableRow key={item.modified_On}>
                   <TableCell  > {sno++}</TableCell>
                   <TableCell onClick={()=>requirements(item)} >{item.customer}</TableCell>
                   <TableCell > {item.positionName}</TableCell>
                  <TableCell  >{item.experience}</TableCell>
                   <TableCell >{item.billing}</TableCell>

                   <TableCell >0</TableCell>
                   <TableCell onClick={()=>setOpen1(true)} ><div>0</div></TableCell>
                   <TableCell onClick={()=>setOpen2(true)}><div>0</div></TableCell>
                   <TableCell onClick={()=>setOpen3(true)}><div>0</div></TableCell>
                   <TableCell onClick={()=>setOpen4(true)}><div>0</div></TableCell>
                   <TableCell onClick={()=>setOpen5(true)}><div>0</div></TableCell>
                   <TableCell onClick={()=>setOpen6(true)}><div>0</div></TableCell>
                   <TableCell onClick={()=>setOpen7(true)}><div>0</div></TableCell>
                   <TableCell onClick={()=>setOpen8(true)}><div>0</div></TableCell>

                </TableRow> 
                    </>
                  )
                  })}  
                  
            </TableBody>
           
        </Table>
      </TableContainer>
    
    </Paper>

      </>

  );

}