import React,{useState, useEffect,useRef, useContext} from 'react';
import { fade, makeStyles,withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
 
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
 
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { format } from 'date-fns' // 21K (gzipped: 5.8K)
import moment from 'moment' // 292.3K (gzipped: 71.6K)

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

 // custom code
import Storage from './helper/Storage';
import RoleConstant from '../Constants/RoleConstant';
import { useHistory } from "react-router-dom";
import SocketHelper from './helper/SocketHelper';
import { useSelector , useDispatch } from 'react-redux';
import { agreedRequirment } from '../Reducer/action';
import SocketContext from './helper/socketProvider';
 
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

export default function Header() {
  const columns = [
    { id: 'S.No', label: 'S.No', minWidth: 50 },
    { id: 'Position Name', label: 'Position Name', minWidth: 50},
    { id: 'Skill Set', label: 'Customer Name', minWidth: 50 },
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
   }
  ];

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationanchorEl, setnotificationAnchorEl] = React.useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
   const isMenuOpen = Boolean(anchorEl);
  const isNotificationOpen = Boolean(notificationanchorEl);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  //made code
  let history = useHistory();
  let socket = useContext(SocketContext);


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setnotificationAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleNotificationClose = () => {
    setnotificationAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [result, setResult] =useState([]);
  const [notificationCount, setnotificationCount] =useState(0);

 
    let notificationViewCount=0;

  const [item, setItem] =useState([]);
  //  const [agreeResult, setagreeResult] =useState([]);
  const agreeResult= useRef([])

  const disagreeData= useRef([])

     const dispatch= useDispatch();

  const logout = () => {
    
      socket.disconnect();

     Storage.clearItem()
    history.push("/");
    window.location.reload(true);
  };
  
  const handleClickOpen = async (item) => {
       setOpen(true);
     setItem(item);
    };


  const handleClose = () => {
    setOpen(false);
  };

  const agree = async(item) => {
    try
   {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({userId:item._id})
    };
    const response = await fetch('http://localhost:4000/api/updateAgree', requestOptions);
    const data = await response.json();
   if(data!=undefined)
    {      

      const index= disagreeData.current[0].findIndex(items=>items._id=== item._id);
         if(index!=-1)
         {
               disagreeData.current[0].splice(index,1);
               setOpen(false);
               dispatch(agreedRequirment(data.result))
          }
      }
       }
   catch(err)
   {

  }
  };

  const pushToDisagree=(val)=>
  {
    if(disagreeData.current instanceof Array && disagreeData.current.length>0)
    {
      disagreeData.current[0].push(val)
    }
    else
    {
      disagreeData.current.push(val)
    }
  }

  const notificationData = async(item) => {
     try
    {
       let userId=Storage.getItem("USER_ID");

     const requestOptions = {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({userId:userId})
     };
     const response = await fetch('http://localhost:4000/api/disagreeData', requestOptions);
     const data = await response.json();
    if(data!=undefined)
     {      
           //  setResult(result => [...result, data.result]);
           pushToDisagree(data.result)
            setnotificationCount(disagreeData.current[0].length);
         }
        }
    catch(err)
    {
      }
    };


    const agreeData = async(item) => {
      try
     {
        let userId=Storage.getItem("USER_ID");
 
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId:userId})
      };
      const response = await fetch('http://localhost:4000/api/agreeData', requestOptions);
      const data = await response.json();
     if(data!=undefined)
      {      
            //  setResult(result => [...result, data.result]);
             for (const iterator of data.result) {
               dispatch(agreedRequirment(iterator))
            }
        }
         }
     catch(err)
     {
       }
     };
 
  const menuId = 'primary-search-account-menu';
  const notificationId = 'primary-notification-menu';
  

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const renderNotificationMenu = (
    <Menu
      anchorEl={notificationanchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={notificationId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isNotificationOpen}
      onClose={handleNotificationClose}
    >
          <List className={classes.root}>
            {(disagreeData.current[0] instanceof Array && (disagreeData.current[0].length) !==0)?
              disagreeData.current[0].map((item)=>
            {
               return(
              <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={item.positionName}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {item.deploymentLocation}-
              </Typography>
 
              {item.mandatorySkills}
                 <div>{item.rasiedBy}</div>
                <div>{item.requirementConfirmation}</div>
                <div>{
                
                // moment().format(,"dddd, MMMM Do YYYY, h:mm:ss a"); 

                item.created_On}</div>
                <div>
                <Button color="secondary" onClick={()=> handleClickOpen(item)}>View Details </Button>
              </div>
 
            </React.Fragment>
 
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />

              </>  
              )
            }):
            <>

<ListItem alignItems="flex-start">
         <ListItemText
           secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                No Notification
               </Typography>
 
                        </React.Fragment>
           }
        />
      </ListItem>
               </>}
     </List>
     </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
       
      <MenuItem>
        <IconButton 
          aria-label="show 11 new notifications"
          color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={logout}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
 
   useEffect(()=>
	{	
 
    notificationData();
    agreeData();
    socket.on('connect', function() {
      console.log('Connected! ID: ' + socket.id);
      });

       socket.on('reqNotification',(result1)=>
      {
            pushToDisagree(result1.result)
           setnotificationCount(disagreeData.current[0].length);
      });   

 
     if(Storage.getItem(RoleConstant.TOKEN)!=null && Storage.getItem(RoleConstant.ROLENAME)!=undefined &&
    Storage.getItem(RoleConstant.ROLENAME)!=null && Storage.getItem(RoleConstant.ROLENAME)!="" )
    {
      return history.push("/SASpanel");
     }
     else if(Storage.getItem(RoleConstant.TOKEN)!=null)
     {
      return history.push("/admin");
      }
      else
      {
        return history.push("/");
      }
   
  },[])
  return (
    <>
 
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography className={classes.title} variant="h6" noWrap>
            Staffing
          </Typography>
           { Storage.getItem(RoleConstant.TOKEN)!=null ?
           <>
           <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
 
             <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
              aria-controls={notificationId}
              aria-haspopup="true"
              onClick={handleNotificationMenuOpen}
>
              <Badge badgeContent={notificationCount} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          </>
          :""}

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotificationMenu}
    </div>


            {/* this dialog will appear at the time of  notification view of item */}
    <Dialog
       fullWidth="true"
       maxWidth="md"
        open={open}
         keepMounted
           onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">New Requirement Rasied</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">

          <Paper className={classes.root}>
         
         <TableContainer component={Paper} className={classes.container}>
           <Table stickyHeader  className={classes.table} aria-label="customized table">
             <TableHead>
               <TableRow>
                 {columns.map((column) => 
                 {
 
                    return(
 
                    <StyledTableCell 
                     key={column.id}
                     align={column.align}
                     style={{ minWidth: column.minWidth }}
                   >
                     {column.label}
                   </StyledTableCell >
                 )})}
               </TableRow>
             </TableHead>
              
             <TableBody>
                  <TableRow key={item.modified_On}>
                   <TableCell  > 1</TableCell>
                  <TableCell > {item.positionName}</TableCell>
                 <TableCell >{item.mandatorySkills}</TableCell>
                 <TableCell  >{item.experience}</TableCell>
                 <TableCell >{item.jobDescription}</TableCell>
                  <TableCell >{item.billing}</TableCell>

                </TableRow>
            </TableBody>
           </Table>
         </TableContainer>
       
       </Paper>
   
           </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={()=>agree(item)} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
