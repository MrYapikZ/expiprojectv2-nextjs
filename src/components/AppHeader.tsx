import React from 'react';
import {
    Menubar,
    MenubarContent,
    MenubarItem, MenubarLabel,
    MenubarMenu,
    MenubarTrigger
} from "@/components/ui/menubar";
import Link from "next/link";

function AppHeader() {
    return (
        <div className="fixed top-0 left-0 w-full z-50 p-4 flex flex-row items-center justify-between">
            {/* Left Placeholder */}
            <div/>

            {/* Center Menubar */}
            <Menubar>
                <MenubarLabel>Expi</MenubarLabel>
                <MenubarMenu>
                    <MenubarTrigger>About</MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Project</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem asChild>
                            <Link href="https://library.expiproject.com">
                                ExpiLibrary
                            </Link>
                        </MenubarItem>
                        <MenubarItem>
                            <Link href="https://miyuki.expiproject.com">
                                Miyuki
                            </Link>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            {/* Right Menubar */}
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>Sign In</MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Sign Up</MenubarTrigger>
                </MenubarMenu>
            </Menubar>
        </div>

    );
}

export default AppHeader;