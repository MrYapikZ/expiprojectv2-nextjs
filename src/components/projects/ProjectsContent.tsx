'use client';

import React, {useEffect, useRef} from 'react';
import {useTranslations} from 'use-intl';
import {Link} from '@/i18n/navigation';
import {gsap} from 'gsap';
import {SplitText} from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

function ProjectsContent() {
    const t = useTranslations();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const cleanups: Array<() => void> = [];

            const headings = containerRef.current!.querySelectorAll('h2');

            headings.forEach((h2) => {
                const original = h2.querySelector<HTMLAnchorElement>('[data-split-original]');
                const clone = h2.querySelector<HTMLAnchorElement>('[data-split-clone]');
                if (!original || !clone) return;

                const originalSplit = new SplitText(original, {type: 'chars'});
                const cloneSplit = new SplitText(clone, {type: 'chars'});

                gsap.set([originalSplit.chars, cloneSplit.chars], {yPercent: 0});
                gsap.set(cloneSplit.chars, {rotationX: -90});

                const tl = gsap.timeline({paused: true});
                tl.to(originalSplit.chars, {
                    rotationX: 90,
                    transformOrigin: "50% 50% -50px",
                    stagger: 0.05,
                    ease: 'power3.out',
                });
                tl.to(
                    cloneSplit.chars,
                    {
                        yPercent: -100,
                        rotationX: 0,
                        transformOrigin: "50% 50% -50px",
                        stagger: 0.05,
                        ease: 'power3.out',
                    },
                    0
                );

                const enter = () => tl.play();
                const leave = () => tl.reverse();

                original.addEventListener('mouseenter', enter);
                original.addEventListener('mouseleave', leave);
                clone.addEventListener('mouseenter', enter);
                clone.addEventListener('mouseleave', leave);

                cleanups.push(() => {
                    original.removeEventListener('mouseenter', enter);
                    original.removeEventListener('mouseleave', leave);
                    clone.removeEventListener('mouseenter', enter);
                    clone.removeEventListener('mouseleave', leave);
                    originalSplit.revert();
                    cloneSplit.revert();
                    tl.kill();
                });
            });

            return () => {
                cleanups.forEach((fn) => fn());
            };
        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full px-32 py-16">
            <div className="border-t"/>
            <div className="flex flex-col justify-start gap-32 py-20">
                <div className="p-2">
                    <h2 className="flex flex-col text-8xl font-bebas-neue leading-0.5 perspective-[600px]">
                        <p
                            data-split-original
                            className="opacity-50"
                        >
                            {t('Projects.Project1.name')}
                        </p>
                        <Link
                            href={t('Projects.Project1.link')}
                            data-split-clone
                        >
                            {t('Projects.Project1.name')}
                        </Link>
                    </h2>
                    <p className="hidden text-xl leading-tight">
                        {t('Projects.Project1.description')}
                    </p>
                </div>

                <div className="p-2">
                    <h2 className="flex flex-col text-8xl font-bebas-neue leading-0.5 perspective-[600px]">
                        <p
                            data-split-original
                            className="opacity-50"
                        >
                            {t('Projects.Project2.name')}
                        </p>
                        <Link
                            href={t('Projects.Project2.link')}
                            data-split-clone
                        >
                            {t('Projects.Project2.name')}
                        </Link>
                    </h2>
                    <p className="hidden text-xl leading-tight">
                        {t('Projects.Project2.description')}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProjectsContent;
