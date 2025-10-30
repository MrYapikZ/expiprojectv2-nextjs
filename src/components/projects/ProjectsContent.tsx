'use client';
import React from 'react';
import {useTranslations} from "use-intl";
import {Link} from "@/i18n/navigation";

function ProjectsContent() {
    const t = useTranslations();

    return (
        <>
            <div className="w-full h-full px-32 py-16">
                <div className="border-t"/>
                <div className="flex flex-col justify-start">
                    <div>
                        <h2 className="text-8xl font-bebas-neue leading-tight">
                            <Link href={t('Projects.Project1.link')} className="hover:underline">
                                {t('Projects.Project1.name')}
                            </Link>
                        </h2>
                        <p className="hidden text-xl leading-tight">
                            {t('Projects.Project1.description')}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-8xl font-bebas-neue leading-tight">
                            <Link href={t('Projects.Project2.link')} className="hover:underline">
                                {t('Projects.Project2.name')}
                            </Link>
                        </h2>
                        <p className="hidden text-xl leading-tight">
                            {t('Projects.Project2.description')}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectsContent;