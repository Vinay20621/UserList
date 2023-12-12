import './App.css';
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import { addField, updateField } from './store/UserSlice';
import User from './Pages/User'
import 'react-phone-input-2/lib/style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validation from './Component/Validation';


function App() {
  // get data from redux store
  const users = useSelector((state) => state.User.updateData)
  const upDate = useSelector((state) => state.User.upDate)


  const [user, setUser] = useState(users)
  const [update, setUpdate] = useState(true)

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);


  const dispatch = useDispatch()
  // toast 
  const success = (value) => toast.success(value);
  const error = (value) => toast.error(value);

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleNumber = (value) => {
    setUser({ ...user, MobileNumber: value })
  }

  const handleCountry = (e) => {
    const country = e.target.value
    setUser({ ...user, Country: country })
    const mystate = countries.filter((i) => i.name === country)

    setStates(mystate[0].states)
  }

  const handleStates = (e) => {
    const state = e.target.value
    setUser({ ...user, State: state })
    const mycity = states.filter((i) => i.name === state)

    setCities(mycity[0].cities)
  }

  const handleCities = (e) => {
    const city = e.target.value

    setUser({ ...user, City: city })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = validation(user)
    if (validate) {
      return error(validate);
    }
    dispatch(addField(user))
    setUser({
      FirstName: '',
      LastName: '',
      EmailId: '',
      MobileNumber: '',
      Address: '',
      State: '',
      City: '',
      Country: '',
      ZipCode: ''
    })
    success('User add !Successfully')
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    const validate = validation(user)
    if (validate) {
      return error(validate);
    }
    // validation

    dispatch(updateField(user))
    setUser({
      FirstName: '',
      LastName: '',
      EmailId: '',
      MobileNumber: '',
      Address: '',
      State: '',
      City: '',
      Country: '',
      ZipCode: ''
    })
    setCities([])
    setCountries([])
    setStates([])
    success('User Updated !Successfully')

  }
  // because we have to inisilize the initial value of useState of user
  // if we donot used useEffect then useSlector take time and useState inizilize by undefine
  useEffect(() => {
    setUser(users)
    setUpdate(upDate)

  }, [users])

  useEffect(() => {
    // Fetch countries
    axios.get('http://localhost:3000/getCountryData?name=VinaySingh@63')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="co">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" name='FirstName' placeholder='FirstName' value={user.FirstName} onChange={(e) => handleChange(e)} />
          <input type="text" name='LastName' placeholder='LastName' value={user.LastName} onChange={(e) => handleChange(e)} />
          <input type="text" name='EmailId' placeholder='EmailId' value={user.EmailId} onChange={(e) => handleChange(e)} />
          <div className='phone'><PhoneInput type="text" country={'in'} name='MobileNumber' value={user.MobileNumber} onChange={(e) => handleNumber(e)} /></div>
          <input type="text" name='Address' placeholder='Address' value={user.Address} onChange={(e) => handleChange(e)} />
          <input type="number" name='ZipCode' placeholder='ZipCode' value={user.ZipCode} onChange={(e) => handleChange(e)} />


          <div>
            <div className="center">

              <select value={user.Country} onChange={(e) => handleCountry(e)}>
                <option value="">Select Country</option>
                {countries.map(country => (
                  <option key={country.name} value={country.name}>{country.name}</option>
                ))}
              </select>



              <select value={user.State} onChange={(e) => handleStates(e)}>
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state.name} value={state.name}>{state.name}</option>
                ))}
              </select>

              <select value={user.City} onChange={(e) => handleCities(e)}>
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>




          </div>
          {update ? <button type='button' onClick={handleUpdate}>Update</button> : <button type='submit'>Submit</button>}
        </form>
      </div>
      <User />
    </>

  );
}

export default App;
