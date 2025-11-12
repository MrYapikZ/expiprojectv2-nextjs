// components/AnimatedLink.tsx
'use client';
import React from 'react';
import {usePathname, useRouter} from '@/i18n/navigation';
import {useTransitionRef} from '@/components/TransitionProvider';

type Props = React.PropsWithChildren<{ href: string; className?: string }>;

export default function AnimatedLink({ href, className, children }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const transitionRef = useTransitionRef();

    const onClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();

        // If we're already on this page, don't do anything
        if (pathname === href) {
            return;
        }

        await transitionRef.current?.enter();
        router.push(href);
        // exit() is triggered automatically in TransitionProvider via pathname effect
    };

    return (
        <a href={href} onClick={onClick} className={className}>
            {children}
        </a>
    );
}
