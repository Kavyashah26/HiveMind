import {z} from 'zod';


const resourceTypeEnum = z.enum(["jpg", "png", "pdf", "link"]);

export const createResourceSchema=z.object({
    // email:z.string().email(),
    // password:z.string().min(6)
    
    pid:z.string().max(24).min(24),
    name:z.string(),  //default not nullable
    link:z.string().url(),
    resourceType:resourceTypeEnum

})


export const updateResourceSchema=z.object({
    // email:z.string().email(),
    // password:z.string().min(6)
    
    pid:z.string().max(24).min(24),
    name:z.string(),  //default not nullable
    link:z.string().url(),
    resourceType:resourceTypeEnum

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

