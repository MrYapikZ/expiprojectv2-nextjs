'use client';
import React, {useLayoutEffect, useRef} from 'react';
import {useTranslations} from 'use-intl';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {SplitText} from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);

let hasAnimatedOnce = false;

function AboutContent() {
    const t = useTranslations();
    const rootRef = useRef<HTMLDivElement | null>(null);
    const aboutTitleRef = useRef<HTMLHeadingElement | null>(null);
    const aboutContentRef1 = useRef<HTMLParagraphElement | null>(null);
    const aboutContentRef2 = useRef<HTMLParagraphElement | null>(null);

    useLayoutEffect(() => {
        const root = rootRef.current;
        const aboutTitle = aboutTitleRef.current;
        const aboutContent1 = aboutContentRef1.current;
        const aboutContent2 = aboutContentRef2.current;
        if (!root || !aboutTitle || !aboutContent1 || !aboutContent2) return;

        const lockScroll = () => {
            document.body.style.position = 'fixed';
            document.body.style.top = '0';
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        };
        const unlockScroll = () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };

        const firstTime = !hasAnimatedOnce;
        const delay = hasAnimatedOnce ? 0 : 4;
        hasAnimatedOnce = true;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            if (firstTime) lockScroll();
            gsap.set(root, {opacity: 0, y: 256});
            const splitTitle = SplitText.create(aboutTitle!, {
                type: 'lines, words',
                linesClass: 'split-line',
            });
            const splitContent1 = SplitText.create(aboutContent1!, {
                type: 'lines, words',
                linesClass: 'split-line',
            });
            const splitContent2 = SplitText.create(aboutContent2, {
                type: 'lines, words',
                linesClass: 'split-line',
                mask: 'lines'
            })
            gsap.set(splitTitle.lines, {display: 'block', overflow: 'hidden'});
            gsap.set(splitTitle.words, {opacity: 1, yPercent: 100});
            gsap.set(splitContent1.lines, {display: 'block', overflow: 'hidden'});
            gsap.set(splitContent1.words, {opacity: 1, yPercent: 100});
            gsap.set(splitContent2.lines, {opacity: 1, yPercent: 100});
            tl.to(root, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
            }, delay).to(splitTitle.words, {
                yPercent: 0,
                opacity: 1,
                duration: 1.4,
                ease: 'back.out',
                stagger: {each: 0.04, from: 'start'}
            }, "-=0.5").to(splitContent1.words, {
                yPercent: 0,
                opacity: 1,
                duration: 1,
                ease: 'back.out',
                stagger: {each: 0.25, from: 'start'}
            }, "-=1.25").to(splitContent2.lines, {
                opacity: 1,
                yPercent: 0,
                duration: 0.6,
                ease: 'back.out',
                stagger: {each: 0.2, from: 'start'}
            }, "-=1").add(() => {
                ScrollTrigger.refresh();
                if (firstTime) unlockScroll();
            }).play();

            const sections = gsap.utils.toArray<HTMLElement>('section');

            sections.forEach((section) => {
                const title = section.querySelector('[data-title]');
                const content = section.querySelectorAll('[data-content]');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                });

                if (title) {
                    tl.from(title, {
                        opacity: 0,
                        y: 50,
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                    });
                }

                if (content.length) {
                    tl.from(
                        content,
                        {
                            opacity: 0,
                            y: 30,
                            duration: 0.8,
                            ease: 'power2.out',
                            stagger: 0.15,
                        },
                        '-=0.2'
                    );
                }
            });
        }, rootRef);

        return () => {
            unlockScroll();
            ctx.revert();
        };
    }, []);

    return (
        <>

            <div
                ref={rootRef}
                className="flex flex-col w-full min-h-screen gap-24 lg:p-24 p-8 bg-black text-white"
            >
                {/* SECTION 1 */}
                <div className="grid grid-cols-1 md:grid-cols-12 md:p-8 p-4 gap-4 h-[50vh] items-center">
                    <h3 ref={aboutTitleRef} className="md:text-4xl text-xl font-bold col-span-3">
                        {t('AboutPage.section1.title')}
                    </h3>
                    <div className="lg:col-span-6 col-span-8 flex flex-col gap-2">
                        <p ref={aboutContentRef1} className="md:text-6xl text-3xl font-bold text-center">
                            {t('AboutPage.section1.content.paragraph1')}
                        </p>
                        <p ref={aboutContentRef2} className="md:text-4xl text-xl text-gray-200 text-center">
                            {t('AboutPage.section1.content.paragraph2')}
                        </p>
                    </div>
                </div>

                <div className="border-2 border-gray-200"/>

                <div className="flex flex-col w-full md:gap-64 gap-32">
                    {/* SECTION 2 */}
                    <section className="grid grid-cols-1 md:grid-cols-12 md:p-8 p-4 gap-4">
                        <h3 data-title className="md:text-xl text-lg col-span-3">
                            {t('AboutPage.section2.title')}
                        </h3>
                        <div className="lg:col-span-4 col-span-6 flex flex-col gap-2">
                            <p data-content className="md:text-xl text-lg text-gray-200">
                                {t('AboutPage.section2.content.paragraph1')}
                            </p>
                            <code data-content className="md:text-md text-sm text-gray-200">
                                {t('AboutPage.section2.content.paragraph2')}
                            </code>
                            <p data-content className="md:text-xl text-lg text-gray-200">
                                {t('AboutPage.section2.content.paragraph3')}
                            </p>
                        </div>
                    </section>

                    {/* SECTION 3 */}
                    <section className="grid grid-cols-1 md:grid-cols-12 md:p-8 p-4 gap-4">
                        <h3 data-title className="md:text-xl text-lg col-span-3">
                            {t('AboutPage.section3.title')}
                        </h3>
                        <div className="lg:col-span-4 col-span-6 flex flex-col gap-2">
                            <p data-content className="md:text-xl text-lg text-gray-200">
                                {t('AboutPage.section3.content.paragraph1')}
                            </p>
                            <p data-content className="md:text-xl text-lg text-gray-200">
                                {t('AboutPage.section3.content.paragraph2')}
                            </p>
                        </div>
                    </section>

                    {/* SECTION 4 */}
                    <section className="grid grid-cols-1 md:grid-cols-12 md:p-8 p-4 gap-4">
                        <h3 data-title className="md:text-xl text-lg col-span-3">
                            {t('AboutPage.section4.title')}
                        </h3>
                        <div className="lg:col-span-4 col-span-6 flex flex-col gap-2">
                            <p data-content className="md:text-xl text-lg text-gray-200">
                                {t('AboutPage.section4.content.paragraph1')}
                            </p>
                            <p data-content className="md:text-xl text-lg text-gray-200">
                                {t('AboutPage.section4.content.paragraph2')}
                            </p>
                        </div>
                    </section>

                    {/* SECTION 5 */}
                    <section className="grid grid-cols-1 md:grid-cols-12 md:p-8 p-4 gap-4">
                        <h3 data-title className="md:text-xl text-lg col-span-3">
                            {t('AboutPage.section5.title')}
                        </h3>
                        <div className="lg:col-span-4 col-span-6 flex flex-col gap-2">
                            <p data-content className="md:text-xl text-lg text-gray-200">
                                {t('AboutPage.section5.content.paragraph1')}
                            </p>
                            <p data-content className="md:text-xl text-lg text-gray-200">
                                {t('AboutPage.section5.content.paragraph2')}
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default AboutContent;
