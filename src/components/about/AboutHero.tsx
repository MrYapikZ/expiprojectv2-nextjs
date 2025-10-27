'use client';
import React from 'react';
import {useTranslations} from "use-intl";

function AboutHero() {
    const t = useTranslations();
    return (
        <>
            <div className="flex flex-col w-full">
                <div className="h-38 md:h-48 w-full flex justify-center items-end p-4">
                    <h1 className="text-6xl md:text-8xl font-bold">{t('AboutPage.title')}</h1>
                </div>
            </div>
        </>
    );
}

export default AboutHero;