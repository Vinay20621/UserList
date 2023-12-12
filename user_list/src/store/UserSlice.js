import {createSlice} from '@reduxjs/toolkit'
const UserSlice=createSlice({
    name:'User',
    initialState:{
        user:[],
        updateData:{
            FirstName:'',
            LastName:'',
            EmailId:'',
            MobileNumber:'',
            Address:'',           
            State:'' ,
            City:'',
            Country:'',
            ZipCode:''
        },
        upDate:false,
        id:0   
        
    },
    
    reducers:
    {
        addField(state,action)
        {
           
            
           return {...state,user:[...state.user,{...action.payload,id:state.id}],id:state.id+1}

        },
        deleteField(state,action)
        {
            const id=action.payload
           const users=state.user.filter((i)=>i.id!==id)   
             
           return {...state,user:users}
           
           
        },  
        update(state,action)
        {
            
            return {...state,updateData:action.payload,upDate:true}
        },  
        updateField(state, action) {
            const updatedUser = state.user.map((user) =>
              user.id === action.payload.id
                ? action.payload
                : user
            );           
      
            return { ...state, user: updatedUser,upDate:false };
          },
        
    }
})
export const {addField,deleteField,updateField,update}=UserSlice.actions
export default UserSlice.reducer
