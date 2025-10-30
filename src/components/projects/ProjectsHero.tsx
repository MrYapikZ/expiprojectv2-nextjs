'use client';
import React from 'react';
import {useTranslations} from "use-intl";

function ProjectsHero() {
    const t = useTranslations();

    return (
        <>
            <div className="relative w-full h-screen">
                <div className="w-full h-full flex justify-center items-end">
                    <h1 className="text-[clamp(6rem,20vw,55rem)] font-bebas-neue leading-none">
                        {t('Projects.title')}
                    </h1>
                </div>
            </div>
        </>
    );
}

export default ProjectsHero;