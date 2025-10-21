'use client';
import React, {useRef} from 'react';

function HeroBackground() {

    const cprTitle = useRef<HTMLHeadingElement | null>(null);

    return (
        <>
            <div className="h-screen w-full absolute top-0 left-0 -z-10 overflow-hidden">
                {/* Copyright */}
                <h2 ref={cprTitle} className="hidden md:block absolute top-5 left-12 text-xl font-roboto-condensed font-semibold">
                    ©2025:V2
                </h2>
                {/* Center Content */}
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-9/12 h-9/12 flex items-center justify-center">
                        {/* Title */}
                        <div className="flex flex-col h-fit w-full justify-between">
                            <h1 className="text-[clamp(6rem,25vw,55rem)] font-bebas-neue leading-none text-start select-none">
                                EXPI
                            </h1>
                            <h1 className="text-[clamp(5rem,22vw,45rem)] font-bebas-neue leading-none text-end select-none">
                                PROJECT
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroBackground;