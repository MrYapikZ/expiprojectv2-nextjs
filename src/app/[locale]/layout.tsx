import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import React from "react";
import '@/app/styles/globals.css';

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({children, params}: Props) {
    // Ensure that the incoming `locale` is valid
    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} suppressHydrationWarning>
        <body
            className={`antialiased`}
        >
        <NextIntlClientProvider>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}