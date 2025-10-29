'use client';
import React, {useLayoutEffect, useRef} from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {useTranslations} from "use-intl";
import {gsap} from "gsap";
import {usePathname} from "@/i18n/navigation";
import {ChevronLeft} from "lucide-react";
import {useIsMobile} from "@/hooks/use-mobile";

function AppHeader() {
    const t = useTranslations()
    const pathname = usePathname();
    const isMobile = useIsMobile()

    const rootRef = useRef<HTMLDivElement | null>(null);
    const leftNavRef = useRef<HTMLDivElement | null>(null);
    const centerNavRef = useRef<HTMLDivElement | null>(null);
    const rightNavRef = useRef<HTMLDivElement | null>(null);
    const hasAnimatedRef = useRef(false);
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

        const delay = hasAnimatedRef.current ? 0 : 4;
        hasAnimatedRef.current = true;

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
        <header ref={rootRef} className="fixed top-0 left-0 w-full z-50 p-4 flex flex-row items-center justify-evenly mix-blend-difference">
            {/* Left Placeholder */}
            {isHomePage ? (
                <div ref={leftNavRef} className="hidden md:block w-64 opacity-0"/>
            ) : (
                <NavigationMenu ref={leftNavRef} className="opacity-0">
                    <NavigationMenuList>
                        <NavigationMenuItem className="cursor-none">
                            <NavigationMenuLink asChild>
                                {isMobile ? (
                                    <Link href="/" className="block md:hidden cursor-none">
                                        <ChevronLeft/>
                                    </Link>
                                ) : (
                                    <Link href="/" className="hidden md:block cursor-none font-bebas-neue !text-white !bg-transparent !text-6xl ">
                                        {t('App.name')}
                                    </Link>
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
                            <Link href="/about" className="cursor-none font-bebas-neue !text-white !bg-transparent !text-2xl">
                                [ {t('Navigation.about')} ]
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/contact" className="cursor-none font-bebas-neue !text-white !bg-transparent !text-2xl">
                                [ {t('Navigation.contact')} ]
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink className="cursor-none font-bebas-neue !text-white !bg-transparent !text-2xl">
                            [ {t('Navigation.projects')} ]
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            {/* Right Menubar */}
            <NavigationMenu ref={rightNavRef} className="opacity-0">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink className="cursor-none font-bebas-neue !text-white !bg-transparent !text-2xl">
                            [ {t('Navigation.signIn')} ]
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink className="hidden md:block cursor-none font-bebas-neue !text-white !bg-transparent !text-2xl">
                            [ {t('Navigation.signUp')} ]
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </header>

    );
}

export default AppHeader;