'use client';

import React, {useLayoutEffect, useRef} from 'react';
import {useTranslations} from "use-intl";
import {gsap} from 'gsap';
import {SplitText} from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

let hasAnimatedOnce = false;

function ContactHero() {
    const t = useTranslations();

    const rootRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const paragraph1Ref = useRef<HTMLParagraphElement | null>(null);
    const paragraph2Ref = useRef<HTMLParagraphElement | null>(null);

    useLayoutEffect(() => {
        const root = rootRef.current;
        const title = titleRef.current;
        const paragraph1 = paragraph1Ref.current;
        const paragraph2 = paragraph2Ref.current;
        if (!root || !title || !paragraph1 || !paragraph2) return;

        const delay = hasAnimatedOnce ? 0 : 3.5;
        hasAnimatedOnce = true;

        const ctx = gsap.context(() => {
            const titleSplit = new SplitText(title, {type: 'lines,chars', linesClass: 'split-line'});
            const para1Split = new SplitText(paragraph1, {
                type: 'lines,chars',
                linesClass: 'split-line',
                mask: 'lines'
            });
            const para2Split = new SplitText(paragraph2, {
                type: 'lines,chars',
                linesClass: 'split-line',
                mask: 'lines'
            });

            gsap.set(titleSplit.lines, {display: 'block', overflow: 'hidden'});
            gsap.set(titleSplit.chars, {opacity: 1, yPercent: 100});
            gsap.set(para1Split.lines, {opacity: 1, yPercent: 100});
            gsap.set(para2Split.lines, {opacity: 1, yPercent: 100});

            gsap.to(titleSplit.chars, {
                yPercent: 0,
                opacity: 1,
                duration: 1.4,
                ease: 'back.out(1.7)',
                stagger: {each: 0.04, from: 'start'},
                delay,
            });
            gsap.to(para1Split.lines, {
                yPercent: 0,
                opacity: 1,
                duration: 1.4,
                ease: 'back.out(1.7)',
                stagger: {each: 0.02, from: 'center'},
                delay: delay + 0.5,
            });
            gsap.to(para2Split.lines, {
                yPercent: 0,
                opacity: 1,
                duration: 1.4,
                ease: 'back.out(1.7)',
                stagger: {each: 0.02, from: 'center'},
                delay: delay + 0.8,
            });

            return () => {
                titleSplit.revert();
                para1Split.revert();
                para2Split.revert();
            };
        }, rootRef);

        return () => ctx.revert()
    }, []);

    return (
        <>
            <div ref={rootRef} className="w-full h-full flex flex-col justify-center items-start lg:px-32 px-8 py-48">
                <h1 ref={titleRef} className="md:text-8xl text-4xl font-bebas-neue leading-none text-start select-none">
                    {t('ContactPage.Hero.title')}
                </h1>
                <p ref={paragraph1Ref} className="md:text-2xl text-xl leading-none select-none">
                    {t('ContactPage.Hero.paragraph1')}
                </p>
                <p ref={paragraph2Ref} className="md:text-lg text-md leading-none select-none">
                    {t('ContactPage.Hero.paragraph2')}
                </p>
            </div>
        </>
    );
}

export default ContactHero;