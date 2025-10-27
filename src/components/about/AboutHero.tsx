'use client';
import React, {useLayoutEffect, useRef} from 'react';
import {useTranslations} from "use-intl";
import {gsap} from "gsap";
import {SplitText} from "gsap/SplitText";

gsap.registerPlugin(SplitText);

let hasAnimated = false;

function AboutHero() {
    const t = useTranslations();

    const rootRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);

    useLayoutEffect(() => {
        const title = titleRef.current;
        if (!title) return;

        if (hasAnimated) {
            gsap.set(title, {clearProps: 'all'});
            return;
        }

        hasAnimated = true;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            const titleSplit = new SplitText(title, {type: 'chars, lines', linesClass: 'split-line'});
            gsap.set(titleSplit.lines, {overflow: 'hidden', display: 'block'});
            gsap.set([...titleSplit.chars], {opacity: 1, yPercent: 100});
            tl.to(titleSplit.chars, {
                opacity: 1,
                yPercent: 0,
                mask: "lines",
                duration: 1.4,
                ease: 'back.out',
                stagger: {
                    each: 0.04,
                    from: 'center'
                }
            }, 3.5);
        }, rootRef);

        return () => ctx.revert();

    }, [])

    return (
        <>
            <div ref={rootRef}  className="flex flex-col w-full">
                <div className="h-38 md:h-48 w-full flex justify-center items-end p-4">
                    <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold">{t('AboutPage.title')}</h1>
                </div>
            </div>
        </>
    );
}

export default AboutHero;