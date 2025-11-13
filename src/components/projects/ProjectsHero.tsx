'use client';
import React, {useLayoutEffect, useRef} from 'react';
import {useTranslations} from "use-intl";
import {gsap} from 'gsap';
import {SplitText} from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

function ProjectsHero() {
    const t = useTranslations();

    const rootRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);

    useLayoutEffect(() => {
        const root = rootRef.current;
        const title = titleRef.current;
        if (!root || !title) return;

        const delay = 2.5;

        const ctx = gsap.context(() => {
            const titleSplit = new SplitText(title, {type: 'lines,chars', linesClass: 'split-line', mask: 'lines'});

            gsap.set(titleSplit.lines, {display: 'block', overflow: 'hidden'});
            gsap.set(titleSplit.chars, {opacity: 1, yPercent: 100});

            gsap.to(titleSplit.chars, {
                yPercent: 0,
                opacity: 1,
                duration: 1.4,
                ease: 'back.out',
                stagger: {each: 0.04, from: 'center'},
                delay,
            });
        }, rootRef);
        return () => ctx.revert();
    }, []);

    return (
        <>
            <div ref={rootRef} className="relative w-full h-dvh">
                <div className="w-full h-full flex justify-center items-end">
                    <h1 ref={titleRef} className="text-[clamp(6rem,20vw,55rem)] font-bebas-neue leading-none">
                        {t('Projects.title')}
                    </h1>
                </div>
            </div>
        </>
    );
}

export default ProjectsHero;