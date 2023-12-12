import { useDispatch } from "react-redux"
import { deleteField,updateField,update } from "../store/UserSlice"


function UserData({users})
{
  
    const dispatch=useDispatch()
    
  const handleDelete=(email)=>
  {
   
    dispatch(deleteField(email))
  }
  const handleUpdate=(current)=>
  {
   
    dispatch(update(current))
  }
    return(
        <>
        {
            users.map((current)=>
            {
                const {id,FirstName,LastName,EmailId,MobileNumber,City,State,Country,ZipCode}=current
                
                
                return(
                    <tr key={id}>
                        <td>{FirstName}</td>
                        <td>{LastName}</td>
                        <td>{EmailId}</td>    
                        <td>{MobileNumber}</td>                     
                        <td>{City}, {State}, {" "}, {Country},{ZipCode}</td>
                        
                        <td><button className='update' onClick={()=>handleUpdate(current)}>Update</button></td> 
                        <td><button className='delete' onClick={()=>handleDelete(id)}>Delete</button></td>  
                        </tr>
                )
            })
        }
        </>
    )
}
export default UserData