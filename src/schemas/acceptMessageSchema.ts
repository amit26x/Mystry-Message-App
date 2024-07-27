import {z} from "zod"


export const acceptMessageSchema = z.object({
    acceptMesages: z.boolean(),
})

