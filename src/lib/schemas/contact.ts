import {z} from "zod";

export const contactSchema = z.object({
    name: z
        .string({error: "Name is required"})
        .min(2, {message: "Name must be at least 2 characters long"})
        .max(100, {message: "Name must be at most 100 characters long"}),

    phone: z
        .string({error: "Phone number is required"})
        .min(7, {message: "Phone number must be at least 7 characters long"})
        .max(15, {message: "Phone number must be at most 15 characters long"}),

    email: z.email(),

    message: z
        .string({error: "Message is required"})
        .min(10, {message: "Message must be at least 10 characters long"})
        .max(5000, {message: "Message must be at most 5000 characters long"}),
});

export type ContactFormData = z.infer<typeof contactSchema>;
