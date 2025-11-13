'use client';

import React, {useLayoutEffect, useRef} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type Props = {
    children: React.ReactNode;
    contentClassName?: string;
    wrapperClassName?: string;
};

export default function SmoothScroll({
                                         children,
                                         contentClassName = 'min-h-full w-full',
                                         wrapperClassName,
                                     }: Props) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const smootherRef = useRef<ScrollSmoother | null>(null);
    const createdRef = useRef(false); // avoid duplicate create() in React Strict Mode

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;
        if (!wrapperRef.current || !contentRef.current) return;
        if (createdRef.current) return; // already created (Strict Mode dev)

        // If ScrollSmoother isn't available (Club plugin not installed), fail fast with a clear error.
        if (!ScrollSmoother) {
            console.error(
                'GSAP ScrollSmoother not found. Ensure you have access to the plugin and the import path is correct.'
            );
            return;
        }

        createdRef.current = true;

        // GSAP context keeps things tidy and auto-cleans on revert()
        const ctx = gsap.context(() => {
            smootherRef.current = ScrollSmoother.create({
                wrapper: wrapperRef.current!,
                content: contentRef.current!,
                smooth: 1,
                effects: true,
                normalizeScroll: true
            });
        }, wrapperRef);

        return () => {
            // kill smoother first, then revert context
            if (smootherRef.current) {
                smootherRef.current.kill();
                smootherRef.current = null;
            }
            ctx.revert();
            createdRef.current = false;
        };
    }, []);

    return (
        <div ref={wrapperRef} id="smooth-wrapper" className={wrapperClassName}>
            <div ref={contentRef} id="smooth-content" className={contentClassName}>
                {children}
            </div>
        </div>
    );
}
