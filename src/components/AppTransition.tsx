'use client';
import React, {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import { gsap } from 'gsap';

export interface AppTransitionHandle {
    enter: () => Promise<void>;
    exit: () => Promise<void>;
}

const AppTransition = forwardRef<AppTransitionHandle>((_, ref) => {

    const backgroundRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const background = backgroundRef.current;
        const circle = circleRef.current;
        if (!background || !circle) return;

        // Set initial styles
        gsap.set(circle, { opacity: 0, scale: 0, width: '75%', borderWidth: 2, transformOrigin: '50% 50%' });
        gsap.set(background, { opacity: 0 });

        // Build timeline
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { opacity: 1, scale: 1, duration: 2, rotate: 180, ease: 'power3.out' }, 0)
            .to(background, { opacity: 1, duration: 2, ease: 'power3.out' }, 0);

        tlRef.current = tl;

        return () => {
            tl.kill();
            tlRef.current = null;
        };
    }, []);

    useImperativeHandle(ref, () => ({
        enter: () => {
            const tl = tlRef.current;
            if (!tl) return Promise.resolve();
            return new Promise<void>((resolve) => {
                tl.eventCallback('onComplete', () => {
                    resolve();
                });
                tl.restart(); // Play from beginning
            });
        },
        exit: () => {
            const tl = tlRef.current;
            if (!tl) return Promise.resolve();
            return new Promise<void>((resolve) => {
                tl.eventCallback('onReverseComplete', () => {
                    resolve();
                });
                tl.reverse(); // Reverse the animation
            });
        },
    }));

    return (
        <div
            ref={backgroundRef}
            className="fixed top-0 left-0 w-screen h-screen opacity-0 bg-white z-50 flex items-center justify-center pointer-events-none"
        >
            <div
                ref={circleRef}
                className="absolute aspect-square opacity-0 scale-0 w-3/4 border-2 -z-10 border-black border-dashed rounded-full"
            />
        </div>
    );
});

AppTransition.displayName = 'AppTransition';
export default AppTransition;
