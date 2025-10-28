'use client';

import React from 'react';
import {useTranslations} from "use-intl";

function ContactHero() {
    const t = useTranslations();
    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-start lg:px-32 px-8 py-48">
                <h1 className="md:text-8xl text-4xl font-bebas-neue leading-none text-start select-none">
                    {t('ContactPage.Hero.title')}
                </h1>
                <p className="md:text-2xl text-xl leading-none select-none">
                    {t('ContactPage.Hero.paragraph1')}
                </p>
                <p className="md:text-lg text-md leading-none select-none">
                    {t('ContactPage.Hero.paragraph2')}
                </p>
            </div>
        </>
    );
}

export default ContactHero;