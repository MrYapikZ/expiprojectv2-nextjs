import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import React from "react";
import '@/styles/globals.css';
import AppHeader from "@/components/AppHeader";
import {Roboto_Condensed, Bebas_Neue} from "next/font/google"
import CursorEffect from "@/components/CursorEffect";
import AppSplash from "@/components/AppSplash";
import {Analytics} from "@vercel/analytics/next";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Metadata} from "next";

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

export const metadata : Metadata = {
    title: "ExpiProject",
    description:
        "ExpiProject is a collaborative platform where our team showcases creative projects, experiments, and innovations — built for fun and growth.",
    keywords: [
        "ExpiProject",
        "team portfolio",
        "web development",
        "creative projects",
        "collaboration",
        "programming",
        "innovation",
    ],
    authors: [{ name: "ExpiProject Team" }],
    openGraph: {
        type: "website",
        url: "https://expiproject.com/",
        title: "ExpiProject",
        description:
            "Explore our creative works, experiments, and digital builds. ExpiProject is where ideas meet execution.",
        images: [
            {
                url: "https://expiproject.com/preview.jpg",
                width: 1200,
                height: 630,
                alt: "ExpiProject Team Portfolio Preview",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "ExpiProject",
        description:
            "Collaborative projects, experiments, and portfolio builds from the ExpiProject team.",
        images: ["https://expiproject.com/preview.jpg"],
    },
    icons: {
        icon: "/favicon.png",
    },
    themeColor: "#101010",
    metadataBase: new URL("https://expiproject.com"),
};


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
                <AppSplash/>
                <AppHeader/>
                {children}
                <CursorEffect/>
                <Analytics/>
                <SpeedInsights/>
            </div>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}