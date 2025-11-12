'use client';
import React, {useLayoutEffect, useRef} from 'react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {useTranslations} from "use-intl";
import {gsap} from "gsap";
import {Link, usePathname} from "@/i18n/navigation";
import {ChevronLeft, LogInIcon} from "lucide-react";
import {useIsMobile} from "@/hooks/use-mobile";
import AnimatedLink from "@/components/AnimatedLink";

function AppHeader() {
    const t = useTranslations()
    const pathname = usePathname();
    const isMobile = useIsMobile()

    const rootRef = useRef<HTMLDivElement | null>(null);
    const leftNavRef = useRef<HTMLDivElement | null>(null);
    const centerNavRef = useRef<HTMLDivElement | null>(null);
    const rightNavRef = useRef<HTMLDivElement | null>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        const leftNav = leftNavRef.current;
        const centerNav = centerNavRef.current;
        const rightNav = rightNavRef.current;
        if (!leftNav || !centerNav || !rightNav) return;

        tlRef.current?.kill();
        tlRef.current = null;

        const nodes = [leftNav, centerNav, rightNav].filter(
            (n): n is HTMLDivElement => Boolean(n)
        );
        if (nodes.length === 0) return;

        const delay = 4;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            gsap.set([leftNav, centerNav, rightNav], {opacity: 0, y: -50});
            tl.to(leftNav, {opacity: 1, y: 0, duration: 1.6, ease: 'back.out'}, delay)
                .to(centerNav, {opacity: 1, y: 0, duration: 1.6, ease: 'back.out'}, delay + 0.2)
                .to(rightNav, {opacity: 1, y: 0, duration: 1.6, ease: 'back.out'}, delay + 0.4);
            tlRef.current = tl;
        }, rootRef);

        return () => {
            tlRef.current?.kill();
            tlRef.current = null;
            ctx.revert();
        };
    }, [pathname]);

    const isHomePage = pathname === '/';

    return (
        <header ref={rootRef}
                className="fixed top-0 left-0 w-full z-40 p-4 flex flex-row items-center justify-evenly mix-blend-difference">
            {/* Left Placeholder */}
            {isHomePage ? (
                <div ref={leftNavRef} className="hidden md:block w-64 opacity-0"/>
            ) : (
                <NavigationMenu ref={leftNavRef} className="opacity-0">
                    <NavigationMenuList>
                        <NavigationMenuItem className="cursor-none">
                            <NavigationMenuLink asChild>
                                {isMobile ? (
                                    <AnimatedLink href="/" className="block md:hidden cursor-none">
                                        <ChevronLeft/>
                                    </AnimatedLink>
                                ) : (
                                    <AnimatedLink href="/"
                                          className="hidden md:block cursor-none font-bebas-neue !text-white !bg-transparent !text-6xl ">
                                        {t('App.name')}
                                    </AnimatedLink>
                                )}
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            )}

            {/* Center Menubar */}
            <NavigationMenu ref={centerNavRef} viewport={true} className="opacity-0">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <AnimatedLink href="/about"
                                  className="cursor-none font-bebas-neue !text-white !bg-transparent lg:text-2xl md:text-xl text-lg">
                                [ {t('Navigation.about')} ]
                            </AnimatedLink>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <AnimatedLink href="/contact"
                                  className="cursor-none font-bebas-neue !text-white !bg-transparent lg:text-2xl md:text-xl text-lg">
                                [ {t('Navigation.contact')} ]
                            </AnimatedLink>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <AnimatedLink href="/projects"
                                  className="cursor-none font-bebas-neue !text-white !bg-transparent lg:text-2xl md:text-xl text-lg">
                                [ {t('Navigation.projects')} ]
                            </AnimatedLink>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            {/* Right Menubar */}
            <NavigationMenu ref={rightNavRef} className="opacity-0">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            {isMobile ? (
                                <AnimatedLink href="#" className="block md:hidden cursor-none">
                                    <LogInIcon/>
                                </AnimatedLink>) : (
                                <AnimatedLink href="#"
                                      className="hidden md:block cursor-none font-bebas-neue !text-white !bg-transparent lg:text-2xl md:text-xl text-lg">
                                    [ {t('Navigation.signIn')} ]
                                </AnimatedLink>
                            )}

                        </NavigationMenuLink
                        >
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <AnimatedLink href="#"
                                  className="hidden md:block cursor-none font-bebas-neue !text-white !bg-transparent lg:text-2xl md:text-xl text-lg">
                                [ {t('Navigation.signUp')} ]
                            </AnimatedLink>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </header>

    );
}

export default AppHeader;