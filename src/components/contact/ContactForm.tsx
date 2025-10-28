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
    const messageMax = 5000;

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
                <div className="lg:w-2/5 w-5/6 h-auto p-8 border-2 rounded-md shadow-sm">
                    <Form {...form}>
                        <form
                            onSubmit={handleSubmit(submitHandler)}
                            className="space-y-6 flex flex-col gap-8"
                            noValidate
                        >
                            <FormField
                                control={control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="your name*"
                                                autoComplete="name"
                                                required
                                                aria-required="true"
                                                className="uppercase border-0 border-b border-b-black aria-invalid:border-b-black !all-[unset] !appearance-none !outline-none !shadow-none !bg-transparent !p-0 !m-0 !text-inherit !w-auto !h-auto !min-w-0 !rounded-none !ring-0 !transition-none"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="phone"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="tel"
                                                placeholder="phone*"
                                                autoComplete="tel"
                                                inputMode="tel"
                                                required
                                                aria-required="true"
                                                className="uppercase border-0 border-b border-b-black aria-invalid:border-b-black !all-[unset] !appearance-none !outline-none !shadow-none !bg-transparent !p-0 !m-0 !text-inherit !w-auto !h-auto !min-w-0 !rounded-none !ring-0 !transition-none"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="your email*"
                                                autoComplete="email"
                                                required
                                                aria-required="true"
                                                className="uppercase border-0 border-b border-b-black aria-invalid:border-b-black !all-[unset] !appearance-none !outline-none !shadow-none !bg-transparent !p-0 !m-0 !text-inherit !w-auto !h-auto !min-w-0 !rounded-none !ring-0 !transition-none"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="message"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Tell us what you need help with…"
                                                rows={6}
                                                maxLength={messageMax}
                                                required
                                                aria-required="true"
                                                className="uppercase border-0 border-b border-b-black aria-invalid:border-b-black max-h-32 !all-[unset] !appearance-none !outline-none !shadow-none !bg-transparent !p-0 !m-0 !text-inherit !w-auto !h-auto !min-w-0 !rounded-none !ring-0 !transition-none"
                                            />
                                        </FormControl>
                                        <div className="text-xs text-muted-foreground">
                                            {messageValue.length}/{messageMax}
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <div className="pt-2">
                                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                                    {isSubmitting ? "Sending…" : "Let’s collaborate"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
}
