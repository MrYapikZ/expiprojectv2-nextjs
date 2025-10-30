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
import {useTranslations} from "use-intl";
import {gsap} from 'gsap';
import {useLayoutEffect} from "react";

let hasAnimatedOnce = false;

type Props = {
    action?: (data: ContactFormData) => Promise<void> | void;
    defaultValues?: Partial<ContactFormData>;
};

export function ContactForm({action, defaultValues}: Props) {
    const t = useTranslations();
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

    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const formRef = React.useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const form = formRef.current;
        if (!rootRef.current || !form) return;

        const delay = hasAnimatedOnce ? 0 : 3.5;
        hasAnimatedOnce = true;

        const ctx = gsap.context(() => {
            gsap.set(form, {opacity: 1, yPercent: 100});
            gsap.to(form, {
                opacity: 1,
                yPercent: 0,
                duration: 1.4,
                ease: 'back.out',
                delay,
            });
        }, rootRef);

        return () => ctx.revert();
    }, []);

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
            <div ref={rootRef} className="w-full h-screen flex flex-col justify-center items-center">
                <div ref={formRef} className="lg:w-2/5 w-5/6 h-auto p-8 border-2 rounded-md shadow-sm">
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
                                                placeholder={t('ContactPage.Form.name')}
                                                autoComplete="name"
                                                required
                                                aria-required="true"
                                                className="cursor-none uppercase border-0 border-b border-b-black aria-invalid:border-b-black !all-[unset] !appearance-none !outline-none !shadow-none !bg-transparent !p-0 !m-0 !text-inherit !w-auto !h-auto !min-w-0 !rounded-none !ring-0 !transition-none"
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
                                                placeholder={t('ContactPage.Form.phone')}
                                                autoComplete="tel"
                                                inputMode="tel"
                                                required
                                                aria-required="true"
                                                className="cursor-none uppercase border-0 border-b border-b-black aria-invalid:border-b-black !all-[unset] !appearance-none !outline-none !shadow-none !bg-transparent !p-0 !m-0 !text-inherit !w-auto !h-auto !min-w-0 !rounded-none !ring-0 !transition-none"
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
                                                placeholder={t('ContactPage.Form.email')}
                                                autoComplete="email"
                                                required
                                                aria-required="true"
                                                className="cursor-none uppercase border-0 border-b border-b-black aria-invalid:border-b-black !all-[unset] !appearance-none !outline-none !shadow-none !bg-transparent !p-0 !m-0 !text-inherit !w-auto !h-auto !min-w-0 !rounded-none !ring-0 !transition-none"
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
                                                placeholder={t('ContactPage.Form.message')}
                                                rows={6}
                                                maxLength={messageMax}
                                                required
                                                aria-required="true"
                                                className="cursor-none uppercase border-0 border-b border-b-black aria-invalid:border-b-black max-h-32 !all-[unset] !appearance-none !outline-none !shadow-none !bg-transparent !p-0 !m-0 !text-inherit !w-auto !h-auto !min-w-0 !rounded-none !ring-0 !transition-none"
                                            />
                                        </FormControl>
                                        <div className="text-xs text-muted-foreground">
                                            {messageValue.length}/{messageMax}
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <div className="pt-2">
                                <Button type="submit" disabled={isSubmitting} className="cursor-none w-full sm:w-auto">
                                    {isSubmitting ? t('ContactPage.Form.submit.loading') : t('ContactPage.Form.submit.label')}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
}
