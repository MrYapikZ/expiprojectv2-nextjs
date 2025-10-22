import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import React from "react";
import '@/styles/globals.css';
import AppHeader from "@/components/AppHeader";
import {Roboto_Condensed, Bebas_Neue} from "next/font/google"
import CursorEffect from "@/components/CursorEffect";

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

const robotoCondensed = Roboto_Condensed({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-condensed',
    weight: ['400', '700']
});

const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-bebas-neue',
    weight: ['400']
});

export default async function LocaleLayout({children, params}: Props) {
    // Ensure that the incoming `locale` is valid
    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} className={`${bebasNeue.variable} ${robotoCondensed.variable}`} suppressHydrationWarning>
        <body
            className={`${robotoCondensed.className} antialiased`}
        >
        <NextIntlClientProvider>
            <div className="cursor-none">
                <AppHeader/>
                {children}
                <CursorEffect/>
            </div>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}