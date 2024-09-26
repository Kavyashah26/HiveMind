import {z} from 'zod';

export const signupSchema=z.object({
    name:z.string(),  //default not nullable
    email:z.string().email(),
    password:z.string().min(6)
})

export const loginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6)
})

// export const updateSchema=z.object({
//     lineOne:z.string(),
//     lineTwo:z.string().nullable(),
//     pinCode:z.string().length(6),
//     country:z.string(),
//     city:z.string(),
// })

