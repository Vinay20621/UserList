import validator from 'validator'
const validation=(user)=>
{
  const{FirstName,LastName,EmailId,MobileNumber,Address,State,City,Country,ZipCode}=user 
  if(!FirstName || !LastName || !EmailId || !MobileNumber || !Address || !State || !City || !Country ||!ZipCode)
 {
     
     return 'Input field is required'
 }
 else if(FirstName.length<5 || LastName.length<5)
 {
 
  return 'FirstName and LastName contain minimum 5 char'
 }
  else if(ZipCode.length<2 || ZipCode.length>6)
 {
    
    return 'ZipCode is InValid'
 }

//  React email validation regex 

 else if(!validator.isEmail(EmailId))
 {
    
    return 'Email is invalid'
 }
 else if(!validator.isMobilePhone(MobileNumber))
 {
   
    return 'Mobile Number is invalid'
 } 
 return ''
}
export default validation;