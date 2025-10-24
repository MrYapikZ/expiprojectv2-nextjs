'use client';
import React, {useState, useEffect} from 'react';
import {gsap} from 'gsap';

function AppSplash() {
    const [showIntro, setShowIntro] = useState(true);

    const backgroundRef = React.useRef<HTMLDivElement | null>(null);
    const circleRef = React.useRef<HTMLDivElement | null>(null);
    const loadingTitleRef = React.useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
        const background = backgroundRef.current;
        const circle = circleRef.current;
        const loadingTitle = loadingTitleRef.current;
        if (!background || !circle || !loadingTitle) return;
        const tl = gsap.timeline();
        gsap.set(circle, {opacity: 0, scale: 0, width: "75%", border: 2});
        gsap.set(loadingTitle, {opacity: 0, y: 50});
        tl.to(circle, {opacity: 1, scale: 1, duration: 1.6, rotate: 180, ease: 'power3.out'}, 0)
            .to(loadingTitle, {opacity: 1, y: 0, duration: 1.2, ease: 'back.out'}, 0.6)
            .to(loadingTitle, {opacity: 0, y: -50, duration: 1.2, ease: 'power3.in'}, 1.8)
            .to(circle, {scale: 100, border: 2000, rotate: 25000, duration: 1, ease: 'power3.in'}, 3)
            .to(background, {opacity: 0, duration: 0.5, ease: 'power3.in'}, 3);

        const counterObj = {value: 0};
        gsap.to(counterObj, {
            value: 100,
            duration: 2,
            ease: "linear",
            onUpdate: () => {
                if (loadingTitle)
                    loadingTitle.textContent = `${Math.floor(counterObj.value)}%`;
            }
        });

        const timer = setTimeout(() => setShowIntro(false), 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {showIntro && (
                <div ref={backgroundRef}
                     className="fixed top-0 left-0 w-full h-full bg-white z-50 flex items-center justify-center pointer-events-none">
                    <div ref={circleRef}
                         className="absolute aspect-square -z-10 border-black border-dashed rounded-full"/>
                    <h1 ref={loadingTitleRef}
                        className="text-4xl font-bebas-neue leading-none"/>
                </div>
            )}
        </>
    );
}

export default AppSplash;