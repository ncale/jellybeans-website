import { z } from "zod";

export const numSchema = z.coerce.number().positive();

export type numType = z.infer<typeof numSchema>;
