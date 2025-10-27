'use client';
import React, {useEffect, useRef} from 'react';
import AboutHero from '@/components/about/AboutHero';
import AboutContent from '@/components/about/AboutContent';
import {gsap} from 'gsap';
import {ScrollSmoother} from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollSmoother);

export default function AboutPage() {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Ensure we only create one smoother instance
        const smoother = ScrollSmoother.create({
            wrapper: wrapperRef.current!,
            content: contentRef.current!,
            smooth: 1,
            effects: true,
            normalizeScroll: true,
        });

        return () => {
            if (smoother) smoother.kill();
        };
    }, []);

    return (
        <div ref={wrapperRef} id="smooth-wrapper">
            <div ref={contentRef} id="smooth-content">
                <AboutHero/>
                <AboutContent/>
            </div>
        </div>
    );
}
