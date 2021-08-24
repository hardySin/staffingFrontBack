import { AGREED_REQUIRMENT,CUSTOMER,RESOURCING_MANAGER,SOURCING_VENDOR } from "../Reducer/contants";

 
  export  function agreedRequirment(payload) {
     
    return { type: AGREED_REQUIRMENT, payload }
  };

  export  function setCustomerList(payload) {
     
    return { type: CUSTOMER, payload }
  };

  export  function setResourceManagerList(payload) {
     
    return { type: RESOURCING_MANAGER, payload }
  };

  export  function setSourcingVendors(payload) {
     
    return { type: SOURCING_VENDOR, payload }
  };
