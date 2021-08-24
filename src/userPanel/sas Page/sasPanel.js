import React ,{useEffect}from 'react';
import PropTypes from 'prop-types';
 import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import RequirementForm from '../sas Page/RequirementForm'
import BdmDash from '../sas Page/BdmDash'
import CustomerDash from '../sas Page/CustomerDash'
import HrDash from '../sas Page/HrDash'
import RmDash from './RmDash';
import SourcingVendor from './sourcingVendor';
import RoleConstant from '../../Constants/RoleConstant';
import Storage from '../helper/Storage';
import SocketHelper from '../helper/SocketHelper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
   },
}));

export default function SASPanel() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
   };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
   
 

  return (
     <div className={classes.root}>

    {Storage.getItem(RoleConstant.ROLENAME)=="Customer" 
          ?
          (
            <>
            <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          
          <Tab label="RequirementForm"   />
          <Tab label="Customer"  />
           </Tabs>
          <TabPanel value={value} index={0} dir={theme.direction}>
              <RequirementForm  ></RequirementForm>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
              <CustomerDash></CustomerDash>
        </TabPanel>
 
               </>
          )
          :""}

  {Storage.getItem(RoleConstant.ROLENAME)=="Human Resources" 
          ?
          (
            <>
            <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
           <Tab label="HR"  />
            </Tabs>

            <TabPanel value={value} index={0} dir={theme.direction}>
              <HrDash></HrDash>
        </TabPanel>
               </>
          )
          :""}
  
  {Storage.getItem(RoleConstant.ROLENAME)=="BDM" 
          ?
          (
            <>
            <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="BDM"  />
            </Tabs>

            <TabPanel value={value} index={0} dir={theme.direction}>
              <BdmDash></BdmDash>
        </TabPanel>
               </>
          )
          :""}


          
{Storage.getItem(RoleConstant.ROLENAME)=="Resource Manager" 
          ?
          (
            <>
            <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Resource Manager"  />
            </Tabs>

            <TabPanel value={value} index={0} dir={theme.direction}>
              <RmDash></RmDash>
        </TabPanel>
               </>
          )
          :""}

           
    {Storage.getItem(RoleConstant.ROLENAME)=="Sourcing Vendor" 
          ?
          (
            <>
            <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Sourcing Vendor"  />
            </Tabs>

            <TabPanel value={value} index={0} dir={theme.direction}>
              <SourcingVendor></SourcingVendor>
        </TabPanel>
               </>
          )
          :""}
 
      </div>
  );
}
