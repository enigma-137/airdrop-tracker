import { z } from "zod";

export const validationSchema = z.object({
   title: z.string().min(1, 'Airdrop name is required!').max(255),
   description: z.string().min(1, 'A simple description is needed!')
});
