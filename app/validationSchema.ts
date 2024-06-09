import { z } from "zod";

export const validationSchema = z.object({
   title: z.string(),
   chain: z.string(),
   url: z.string().url(),
   description: z.string(),
   userId: z.number()

});

