'use client';
import React from 'react';
import {useTranslations} from "use-intl";

function AboutContent() {
    const t = useTranslations();
    return (
        <>
            <div className="flex flex-col w-full md:gap-64 gap-32 lg:p-24 p-8 bg-black text-white">
                <section id="section1" className="grid grid-cols-1 md:grid-cols-12 md:p-8 p-4 gap-4">
                    <h3 className="md:text-4xl text-xl font-bold col-span-3">
                        {t('AboutPage.section1.title')}
                    </h3>
                    <div className="lg:col-span-6 col-span-8 flex flex-col gap-2">
                        <p className="md:text-6xl text-3xl font-bold col-span-3">{t('AboutPage.section1.content.paragraph1')}</p>
                        <p className="md:text-4xl text-xl text-gray-200">{t('AboutPage.section1.content.paragraph2')}</p>
                    </div>
                </section>
                <section id="section2" className="grid grid-cols-1 md:grid-cols-12 md:p-8 p-4 gap-4">
                    <h3 className="md:text-xl text-lg col-span-3">
                        {t('AboutPage.section2.title')}
                    </h3>
                    <div className="lg:col-span-4 col-span-6 flex flex-col gap-2">
                        <p className="md:text-xl text-lg text-gray-200">{t('AboutPage.section2.content.paragraph1')}</p>
                        <code className="md:text-md text-sm text-gray-200">{t('AboutPage.section2.content.paragraph2')}</code>
                        <p className="md:text-xl text-lg text-gray-200">{t('AboutPage.section2.content.paragraph3')}</p>
                    </div>
                </section>
                <section id="section3" className="grid grid-cols-1 md:grid-cols-12 md:p-8 p-4 gap-4">
                    <h3 className="md:text-xl text-lg col-span-3">
                        {t('AboutPage.section3.title')}
                    </h3>
                    <div className="lg:col-span-4 col-span-6 flex flex-col gap-2">
                        <p className="md:text-xl text-lg text-gray-200">{t('AboutPage.section3.content.paragraph1')}</p>
                        <p className="md:text-xl text-lg text-gray-200">{t('AboutPage.section3.content.paragraph2')}</p>
                    </div>
                </section>
                <section id="section4" className="grid grid-cols-1 md:grid-cols-12 md:p-8 p-4 gap-4">
                    <h3 className="md:text-xl text-lg col-span-3">
                        {t('AboutPage.section4.title')}
                    </h3>
                    <div className="lg:col-span-4 col-span-6 flex flex-col gap-2">
                        <p className="md:text-xl text-lg text-gray-200">{t('AboutPage.section4.content.paragraph1')}</p>
                        <p className="md:text-xl text-lg text-gray-200">{t('AboutPage.section4.content.paragraph2')}</p>
                    </div>
                </section>
                <section id="section5" className="grid grid-cols-1 md:grid-cols-12 md:p-8 p-4 gap-4">
                    <h3 className="md:text-xl text-lg col-span-3">
                        {t('AboutPage.section5.title')}
                    </h3>
                    <div className="lg:col-span-4 col-span-6 flex flex-col gap-2">
                        <p className="md:text-xl text-lg text-gray-200">{t('AboutPage.section5.content.paragraph1')}</p>
                        <p className="md:text-xl text-lg text-gray-200">{t('AboutPage.section5.content.paragraph2')}</p>
                    </div>
                </section>
            </div>
        </>
    );
}

export default AboutContent;