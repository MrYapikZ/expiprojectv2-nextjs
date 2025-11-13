'use client';
import React from 'react';
import AnimatedLink from "@/components/AnimatedLink";
import {useTranslations} from "use-intl";

function AppFooter() {
    const t = useTranslations();
    return (
        <>
            <footer className="w-screen bg-black text-white mt-auto">
                <div className="w-full h-fit px-8 py-12 flex flex-col md:gap-8 gap-4 items-center">
                    <div>
                        <ul className="flex flex-row gap-8">
                            <li><AnimatedLink href={t('Footer.socials.discord.link')}>{t('Footer.socials.discord.label')}</AnimatedLink></li>
                            <li><AnimatedLink href={t('Footer.socials.github.link')}>{t('Footer.socials.github.label')}</AnimatedLink></li>
                            <li><AnimatedLink href={t('Footer.socials.instagram.link')}>{t('Footer.socials.instagram.label')}</AnimatedLink></li>
                            <li><AnimatedLink href={t('Footer.socials.linkedin.link')}>{t('Footer.socials.linkedin.label')}</AnimatedLink></li>
                        </ul>
                    </div>
                    <div className="flex flex-col w-full">
                        <AnimatedLink href="/"
                                      className="cursor-none font-bebas-neue text-center !text-white !bg-transparent text-[clamp(3rem,15vw,20rem)] leading-none">
                            {t('App.name')}
                        </AnimatedLink>
                    </div>
                    <p className="w-full text-start">© {new Date().getFullYear()} {t('App.name')}. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}

export default AppFooter;