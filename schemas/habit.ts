import { z } from "zod";

export const FREQUENCIES = ["daily", "weekly", "monthly"] as const;

export const habitSchema = z.object({
  title: z
    .string({
      error: "Title is required"
    })
    .min(1, "Title is required"),
  description: z
    .string({
      error: "Description is required"
    })
    .min(1, "Description is required"),
  frequency: z.enum(FREQUENCIES, {
    error: () => ({ message: "Frequency is required" })
  })
});

export type HabitSchemaType = z.infer<typeof habitSchema>;
