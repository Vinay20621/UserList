import { useState } from 'react';
import UserData from '../Component/UserData';
import { useSelector } from "react-redux"
function User() {
  const users=useSelector((state)=>state.User.user)
  const [search,setSearch]=useState('')
  const [filterData,setFilterData]=useState([])
  const handleChange=(e)=>
  {
    setSearch(e.target.value)
    const time=setTimeout(()=>
    {
      const filter=users.filter((user)=>user.FirstName.toLowerCase().includes(e.target.value.toLowerCase()))
      setFilterData(filter)
    },1000)
    return ()=>clearTimeout(time)

  }
    return ( <> 
       <div className="search">        
        <input type="text" className="inputSearch" placeholder='Search By FirstName' onChange={handleChange}/>
       </div>
        <table>
          <thead>
            <tr>
              <th>
               FirstName
              </th>
              <th>
               LastName
              </th>
              <th>
               Email
              </th>
              <th>
               MobileNumber
              </th>
              <th>
              Address
              </th>
              <th>
              Update
              </th><th>
              Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {search.length>1?<UserData users={filterData}/>:<UserData users={users}/>}
             
                 
          </tbody>
          
        </table>
        </> );
}

export default User;