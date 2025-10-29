'use client';
import React, {useLayoutEffect, useRef} from 'react';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger
} from "@/components/ui/menubar";
import Link from "next/link";
import {useTranslations} from "use-intl";
import {gsap} from "gsap";
import {usePathname} from "@/i18n/navigation";
import {ChevronLeft} from "lucide-react";

function AppHeader() {
    const t = useTranslations()
    const pathname = usePathname();

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
        <div ref={rootRef} className="fixed top-0 left-0 w-full z-50 p-4 flex flex-row items-center justify-between">
            {/* Left Placeholder */}
            {isHomePage ? (
                <div ref={leftNavRef} className="hidden md:block w-24 opacity-0"/>
            ) : (
                <Menubar ref={leftNavRef} className="opacity-0">
                    <MenubarMenu>
                        <MenubarTrigger className="cursor-none">
                            <Link href="/" className="hidden md:block cursor-none">
                                {t('App.name')}
                            </Link>
                            <Link href="/" className="block md:hidden cursor-none">
                                <ChevronLeft/>
                            </Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                </Menubar>
            )}

            {/* Center Menubar */}
            <Menubar ref={centerNavRef} className="opacity-0">
                <MenubarMenu>
                    <MenubarTrigger className="cursor-none">
                        <Link href="/about" className="cursor-none">
                            {t('Navigation.about')}
                        </Link>
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="cursor-none">
                        <Link href="/contact" className="cursor-none">
                            {t('Navigation.contact')}
                        </Link>
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="cursor-none">{t('Navigation.projects')}</MenubarTrigger>
                    <MenubarContent className="cursor-none">
                        <MenubarItem asChild>
                            <Link href="https://library.expiproject.com" className="cursor-none">
                                {t('Projects.library.title')}
                            </Link>
                        </MenubarItem>
                        <MenubarItem asChild>
                            <Link href="https://miyuki.expiproject.com" className="cursor-none">
                                {t('Projects.miyuki.title')}
                            </Link>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            {/* Right Menubar */}
            <Menubar ref={rightNavRef} className="opacity-0">
                <MenubarMenu>
                    <MenubarTrigger className="cursor-none">{t('Navigation.signIn')}</MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="hidden md:block cursor-none">{t('Navigation.signUp')}</MenubarTrigger>
                </MenubarMenu>
            </Menubar>
        </div>

    );
}

export default AppHeader;