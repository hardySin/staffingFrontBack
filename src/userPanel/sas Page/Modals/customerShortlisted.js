import React,{useState, useEffect,useRef, useContext} from 'react';
import { fade, makeStyles,withStyles } from '@material-ui/core/styles';
 
import Dialog from '@material-ui/core/Dialog';
 
 import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

 const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '126ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  grow: {
    flexGrow: 1,
  },
  
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  
   inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function CustomerShortlisted(props) {
  const classes = useStyles();
  const handleClose=()=>
  {

  }

  const columns = [
    { id: 'S.No', label: 'S.No', minWidth: 50 },
    { id: 'Name', label: 'Name', minWidth: 50},
    { id: 'Email', label: 'Email', minWidth: 50 },
   {
    id: 'Moblie',
    label: 'Moblie',
    minWidth: 50,
   },
   {
    id: 'Experience',
    label: 'Experience',
    minWidth: 50,
   },
  {
    id: 'CVs',
    label: 'CVs',
    minWidth: 50,
   }
   ,
  {
    id: 'Status',
    label: 'Status',
    minWidth: 50,
   },
   {
     id: 'Interview Date',
     label: 'Interview Date	',
     minWidth: 50,
    },
    {
      id: 'View',
      label: 'View',
      minWidth: 50,
     } 
  ];
  
   useEffect(()=>
	{	
   
  },[])
  return (
    <>
  
    <Dialog
       fullWidth="true"
       maxWidth="md"
        open={props.open7}
         keepMounted
           onClose={props.handleClose1}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Customer Shortlisted</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">

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
                  {/* <TableRow key={item.modified_On}>
                   <TableCell  > 1</TableCell>
                  <TableCell > {item.positionName}</TableCell>
                 <TableCell >{item.mandatorySkills}</TableCell>
                 <TableCell  >{item.experience}</TableCell>
                 <TableCell >{item.jobDescription}</TableCell>
                  <TableCell >{item.billing}</TableCell>

                </TableRow> */}
            </TableBody>
           </Table>
         </TableContainer>
       
       </Paper>
   
           </DialogContentText>

           <DialogActions>
           
          <Button onClick={props.handleClose1} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
        </DialogContent>
 
      </Dialog>
 
    </>
  );
}
