'use client';
import React, {useLayoutEffect, useRef} from 'react';
import {useTranslations} from 'use-intl';
import {gsap} from 'gsap';
import {SplitText} from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

function AboutHero() {
    const t = useTranslations();
    const rootRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);

    useLayoutEffect(() => {
        if (!titleRef.current) return;

        const delay = 2.5;

        const ctx = gsap.context(() => {
            const split = new SplitText(titleRef.current!, {
                type: 'lines,chars',
                linesClass: 'split-line',
            });

            gsap.set(split.lines, {display: 'block', overflow: 'hidden'});
            gsap.set(split.chars, {opacity: 1, yPercent: 100});

            gsap.to(split.chars, {
                yPercent: 0,
                opacity: 1,
                duration: 1.4,
                ease: 'back.out(1.7)',
                stagger: {each: 0.04, from: 'center'},
                delay,
            });

            return () => split.revert();
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div ref={rootRef} className="flex flex-col w-full">
                <div className="h-38 md:h-48 w-full flex justify-center items-end p-4">
                    <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold">{t('AboutPage.title')}</h1>
                </div>
            </div>
        </>
    );
}

export default AboutHero;
