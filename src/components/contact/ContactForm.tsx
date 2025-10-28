'use client';

import * as React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {contactSchema, type ContactFormData} from "@/lib/schemas/contact";

import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {toast} from "sonner";

type Props = {
    action?: (data: ContactFormData) => Promise<void> | void;
    defaultValues?: Partial<ContactFormData>;
};

export function ContactForm({action, defaultValues}: Props) {
    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        mode: "onTouched",
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            message: "",
            ...defaultValues,
        },
    });

    const {
        handleSubmit,
        control,
        formState: {isSubmitting},
        watch,
    } = form;

    const messageValue = watch("message") ?? "";
    const messageMax = 5000; // mirrors your schema

    async function submitHandler(data: ContactFormData) {
        try {
            if (action) {
                await action(data);
            } else {
                await new Promise((r) => setTimeout(r, 500));
            }
            toast.success("Thanks — we’ll get back to you soon.");
            form.reset();
        } catch (err) {
            console.error(err);
            toast.error("Submission failed. Try again.");
        }
    }

    return (
        <>
            <div className="absolute w-full h-full flex flex-col justify-center items-center">
                <div className="w-2/5 h-3/5 p-8 border-2 rounded-md shadow-sm">
                    <Form {...form}>
                        <form
                            onSubmit={handleSubmit(submitHandler)}
                            className="space-y-6"
                            noValidate
                        >
                            <FormField
                                control={control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Your full name"
                                                autoComplete="name"
                                                required
                                                aria-required="true"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="phone"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="tel"
                                                placeholder="+62 812-3456-7890"
                                                autoComplete="tel"
                                                inputMode="tel"
                                                required
                                                aria-required="true"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="you@example.com"
                                                autoComplete="email"
                                                required
                                                aria-required="true"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="message"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Tell us what you need help with…"
                                                rows={6}
                                                maxLength={messageMax}
                                                required
                                                aria-required="true"
                                            />
                                        </FormControl>
                                        <div className="text-xs text-muted-foreground">
                                            {messageValue.length}/{messageMax}
                                        </div>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <div className="pt-2">
                                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                                    {isSubmitting ? "Sending…" : "Send message"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
}
