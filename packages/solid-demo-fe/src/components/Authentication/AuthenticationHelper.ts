import * as Yup from "yup";
export const ValidationSchema =Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email address is required"),
    password: Yup.string().required("Password address is required") 
})
