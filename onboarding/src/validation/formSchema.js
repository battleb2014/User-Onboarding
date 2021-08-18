import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Name is required'),
    email: yup
        .string()
        .trim()
        .email('Must be a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .trim()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long'),
    terms: yup.boolean()
})

export default formSchema;