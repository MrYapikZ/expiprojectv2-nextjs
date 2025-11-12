// components/TransitionProvider.tsx
'use client';
import React, {createContext, useContext, useEffect, useRef} from 'react';
import {usePathname} from 'next/navigation';
import AppTransition, {AppTransitionHandle} from '@/components/AppTransition';

type TransitionRef = React.MutableRefObject<AppTransitionHandle | null>;

const TransitionCtx = createContext<TransitionRef | null>(null);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
    const ref = useRef<AppTransitionHandle | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        // When pathname changes, exit the transition (reveal the new page)
        ref.current?.exit();
    }, [pathname]);

    return (
        <TransitionCtx.Provider value={ref}>
            <AppTransition ref={ref} />
            {children}
        </TransitionCtx.Provider>
    );
}

export function useTransitionRef() {
    const ctx = useContext(TransitionCtx);
    if (!ctx) throw new Error('useTransitionRef must be used within TransitionProvider');
    return ctx; // type: MutableRefObject<AppTransitionHandle | null>
}
