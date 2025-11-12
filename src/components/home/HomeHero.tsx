'use client';
import React, {useLayoutEffect, useRef} from 'react';
import {useTranslations} from 'use-intl'
import {gsap} from 'gsap';
import {SplitText} from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

function HomeHero() {
    const t = useTranslations();

    const rootRef = useRef<HTMLDivElement | null>(null);
    const copyrightRef = useRef<HTMLHeadingElement | null>(null);
    const fNameRef = useRef<HTMLHeadingElement | null>(null);
    const lNameRef = useRef<HTMLHeadingElement | null>(null);

    useLayoutEffect(() => {
        const copyright = copyrightRef.current;
        const fName = fNameRef.current;
        const lName = lNameRef.current;
        if (!copyright || !fName || !lName) return;

        const delay = 2.5;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            const fNameSplit = new SplitText(fName, {type: 'chars'});
            const lNameSplit = new SplitText(lName, {type: 'chars'});
            gsap.set(copyright, {opacity: 0, y: -50});
            gsap.set([...fNameSplit.chars], {opacity: 0, y: 50, x: -250});
            gsap.set([...lNameSplit.chars], {opacity: 0, y: -50, x: 250});
            tl.to(fNameSplit.chars, {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 1.4,
                ease: 'back.out',
                stagger: {
                    each: 0.06,
                    from: 'end'
                }
            }, delay)
                .to(lNameSplit.chars, {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    duration: 1.,
                    ease: 'back.out',
                    stagger: {
                        each: 0.06,
                        from: 'start'
                    }
                }, delay)
                .to(copyright, {opacity: 1, y: 0, duration: 1.6, ease: 'back.out'}, delay + 0.5);
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div ref={rootRef} className="h-full w-full absolute top-0 left-0 -z-10 overflow-hidden">
                {/* Copyright */}
                <h2 ref={copyrightRef}
                    className="hidden md:block absolute top-5 left-12 text-xl font-roboto-condensed font-semibold">
                    ©{new Date().getFullYear()}:V{t('App.shortVersion')}
                </h2>
                {/* Center Content */}
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-9/12 h-9/12 flex items-center justify-center">
                        {/* Title */}
                        <div className="flex flex-col h-fit w-full justify-between">
                            <h1 ref={fNameRef}
                                className="text-[clamp(6rem,25vw,55rem)] font-bebas-neue leading-none text-start select-none">
                                {t('App.firstName')}
                            </h1>
                            <h1 ref={lNameRef}
                                className="text-[clamp(5rem,22vw,45rem)] font-bebas-neue leading-none text-end select-none">
                                {t('App.lastName')}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeHero;