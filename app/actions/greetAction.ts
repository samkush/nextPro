"use server";

import z, { success } from "zod";

// define zod schema
const greetSchema = z.object({
    name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long"),
})

export async function greetAction(formData: FormData) {
    //simulate backend latency 
    await new Promise((res) => setTimeout(res, 12000))
    const name = formData.get("name");
    const result = greetSchema.safeParse({ name });

//     if(!result.success) {
//         return (
//             {
//                 success: false,
//                 error: result.error.errors[0].message
//             }
//         )


// }

return {
    success: true,
    message: `Hello, ${result.data?.name }! validated on server using Zod + Server Actions!!`      
};

}