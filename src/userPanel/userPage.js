import React ,{useState,useRef, useMemo}from 'react';
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
import UserDialog from './userDialog';
import { FormControlLabel, Switch } from '@material-ui/core';

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

const columns = [
    { id: 'S.No', label: 'S.No', minWidth: 50 },
 
  { id: 'Role Name', label: 'Role Name', minWidth: 100 },
  { id: 'Role Description', label: 'Role Description', minWidth: 170 },
  {
    id: 'Created On',
    label: 'Created On',
    minWidth: 100,
   },
  {
    id: 'Modified On',
    label: 'Modified On',
    minWidth: 100,
   },

   {
    id: 'Active',
    label: 'Active ',
    minWidth: 50,
   },

   {
    id: 'Delete',
    label: 'Delete',
    minWidth: 50,
   },
 ];
    
export default function UserPage(props) {
  const classes = useStyles();
//   const [row, setRow] = useState([]);
  const data= useRef(new Array())
 const [random,setRandom]=useState(0) 

        console.log(props.role)
 let num=0;

 const rolehandleCallback = (childData) =>{
   data.current=childData.current
    console.log("rolehandleCallback",data)
    setRandom(Math.floor(Math.random() * 1000)) 

  }
  useMemo(()=>
  {
     console.log("render"+random)
  },[random])
  
  return (
  <>
    <UserDialog handlerType={props.role} roleCallback={rolehandleCallback} ></UserDialog>
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
          {data.current.map((row) => (
            <TableRow key={row._id}>
                <TableCell  > {++num}</TableCell>
               <TableCell > {row.rolename}</TableCell>
              <TableCell >{row.roledescription}</TableCell>
              <TableCell  >{row.created_On}</TableCell>
              <TableCell >{row.modified_On}</TableCell>
               <TableCell >
              <FormControlLabel
        control={<Switch
          //  checked={state.checkedA} onChange={handleChange} name="checkedA"
            />}
       />
                </TableCell>
              <TableCell >
              <FormControlLabel
              control={
                <Switch
                  // checked={state.checkedB}
                  // onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
       />
              </TableCell>
              </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
    
    </Paper>
    </>
  );
}