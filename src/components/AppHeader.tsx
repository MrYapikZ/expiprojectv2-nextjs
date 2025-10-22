'use client';
import React from 'react';
import {
    Menubar,
    MenubarContent,
    MenubarItem, MenubarLabel,
    MenubarMenu,
    MenubarTrigger
} from "@/components/ui/menubar";
import Link from "next/link";
import {useTranslations} from "use-intl";

function AppHeader() {
    const t =  useTranslations()
    return (
        <div className="fixed top-0 left-0 w-full z-50 p-4 flex flex-row items-center justify-between">
            {/* Left Placeholder */}
            <div className="hidden md:block w-24"/>

            {/* Center Menubar */}
            <Menubar>
                {/*<MenubarLabel>{t('App.firstName')}</MenubarLabel>*/}
                <MenubarMenu>
                    <MenubarTrigger>{t('Navigation.about')}</MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>{t('Navigation.contact')}</MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>{t('Navigation.projects')}</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem asChild>
                            <Link href="https://library.expiproject.com">
                                {t('Projects.library.title')}
                            </Link>
                        </MenubarItem>
                        <MenubarItem>
                            <Link href="https://miyuki.expiproject.com">
                                {t('Projects.miyuki.title')}
                            </Link>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            {/* Right Menubar */}
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>{t('Navigation.signIn')}</MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>{t('Navigation.signUp')}</MenubarTrigger>
                </MenubarMenu>
            </Menubar>
        </div>

    );
}

export default AppHeader;