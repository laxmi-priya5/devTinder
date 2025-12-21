const ValidateSignup = (req)=>{
    const {firstName,lastName,emailId,password } = req.body;
    if(!firstName || !lastName || !emailId || !password){
        throw new Error("all fields are required");
    }
    if(password.length<8){
        throw new Error("password must be at least 8 characters long");
    }       
}
const ValidateEditProfile = (req)=>{
  
    const editableFields = ['firstName','lastName','skills'];
    const isEditable = Object.keys(req.body).every((field)=>editableFields.includes(field))
    return isEditable
}

module.exports = {ValidateSignup,ValidateEditProfile};