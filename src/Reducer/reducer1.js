  
import {AGREED_REQUIRMENT ,RESOURCING_MANAGER, CUSTOMER ,SOURCING_VENDOR, REQUIREMENT} from "./contants";

const initialState = {
          
          agreeRequirement:[],
          customer:[],
          resourceManager:[],
          sourcingVendors:[],
          requirement:{}

 };

function reducer1(state = initialState, action) {
 
        switch(action.type)
    {
          case AGREED_REQUIRMENT:

          const result=action.payload;
          console.log("result", result)

           return { 
            ...state,
            agreeRequirement:[...state.agreeRequirement, result]
           }

           case RESOURCING_MANAGER:

          const result1=action.payload;
          console.log("result", result1)

           return { 
            ...state,
            resourceManager:[...state.resourceManager, result1]
           }

           case CUSTOMER:

          const result2=action.payload;
          console.log("result", result2)

           return { 
            ...state,
            customer:[...state.customer, result2]
           }

           case SOURCING_VENDOR:

          const result3=action.payload;
          console.log("result", result3)

           return { 
            ...state,
            sourcingVendors:[...state.sourcingVendors, result3]
           }

           case REQUIREMENT :
            const result4=action.payload;
             return { 
              ...state,
              requirement:{result4}
             }
  
            
          default:
            return state
            }
 }

export default reducer1;