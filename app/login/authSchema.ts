import { z } from "zod";

const message = "Password must be between 8 and 100 characters";
export const authSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string({ message }).min(8, { message }).max(100, { message }),
});

export type AuthSchemaType = z.infer<typeof authSchema>;

export type authSchemaErrorType = z.ZodFlattenedError<typeof authSchema>;
