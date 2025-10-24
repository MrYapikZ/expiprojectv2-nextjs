'use client';
import React, {useRef, useEffect} from 'react';
import {gsap} from 'gsap';

export default function CursorEffect() {
    const cursorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const tl = gsap.timeline({paused: true});
        gsap.set(cursor, {opacity: 0, scale: 128, width: 32, height: 32, border: 2, xPercent: -50, yPercent: -50});

        const xTo = gsap.quickTo(cursor, 'x', {duration: 0.6, ease: 'power3'});
        const yTo = gsap.quickTo(cursor, 'y', {duration: 0.6, ease: 'power3'});

        const onFirstMove = (e: MouseEvent) => {
            gsap.set(cursor, {x: e.clientX, y: e.clientY});
            tl.to(cursor, {opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out'}, 4).play();

            // switch to normal tracking
            window.removeEventListener('mousemove', onFirstMove);
            window.addEventListener('mousemove', onMove);
        };

        const onMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener('mousemove', onFirstMove);

        const onEnter = () =>
            gsap.to(cursor, {scale: 0.4, backgroundColor: 'black', duration: 0.3});
        const onLeave = () =>
            gsap.to(cursor, {scale: 1, backgroundColor: 'transparent', duration: 0.3});

        const onOver = (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.closest('button, a, .cursor-hover')) onEnter();
        };
        const onOut = (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.closest('button, a, .cursor-hover')) onLeave();
        };

        document.addEventListener('mouseover', onOver);
        document.addEventListener('mouseout', onOut);

        return () => {
            window.removeEventListener('mousemove', onFirstMove);
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseout', onOut);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 z-[9999] border-black rounded-full pointer-events-none"
        />
    );
}
