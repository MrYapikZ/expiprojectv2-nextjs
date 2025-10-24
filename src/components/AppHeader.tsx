'use client';
import React, {useEffect, useRef} from 'react';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    // MenubarLabel,
    MenubarMenu,
    MenubarTrigger
} from "@/components/ui/menubar";
import Link from "next/link";
import {useTranslations} from "use-intl";
import {gsap} from "gsap";

function AppHeader() {
    const t = useTranslations()

    const leftNavRef = useRef<HTMLDivElement | null>(null);
    const centerNavRef = useRef<HTMLDivElement | null>(null);
    const rightNavRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const leftNav = leftNavRef.current;
        const centerNav = centerNavRef.current;
        const rightNav = rightNavRef.current;
        if (!leftNav || !centerNav || !rightNav) return;

        const tl = gsap.timeline();
        gsap.set([leftNav, centerNav, rightNav], {opacity: 0, y: -50});
        tl.to(leftNav, {opacity: 1, y: 0, duration: 1.6, ease: 'back.out'}, 1)
            .to(centerNav, {opacity: 1, y: 0, duration: 1.6, ease: 'back.out'}, 1.2)
            .to(rightNav, {opacity: 1, y: 0, duration: 1.6, ease: 'back.out'}, 1.4);

    }, []);

    return (
        <div className="fixed top-0 left-0 w-full z-50 p-4 flex flex-row items-center justify-between">
            {/* Left Placeholder */}
            <div ref={leftNavRef} className="hidden md:block w-24"/>

            {/* Center Menubar */}
            <Menubar ref={centerNavRef}>
                {/*<MenubarLabel>{t('App.firstName')}</MenubarLabel>*/}
                <MenubarMenu>
                    <MenubarTrigger className="cursor-none">{t('Navigation.about')}</MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="cursor-none">{t('Navigation.contact')}</MenubarTrigger>
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
            <Menubar ref={rightNavRef}>
                <MenubarMenu>
                    <MenubarTrigger className="cursor-none">{t('Navigation.signIn')}</MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="cursor-none">{t('Navigation.signUp')}</MenubarTrigger>
                </MenubarMenu>
            </Menubar>
        </div>

    );
}

export default AppHeader;