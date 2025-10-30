// /lib/scroll-lock.ts
let lockCount = 0;
let scrollYBeforeLock = 0;

interface SavedStyles {
    position?: string;
    top?: string;
    left?: string;
    right?: string;
    width?: string;
    overflow?: string;
    touchAction?: string;
    paddingRight?: string;
}

let saved: SavedStyles = {};

const isServer = (): boolean => typeof window === "undefined";

function getScrollbarCompensation(): string {
    if (isServer()) return "";
    const docEl = document.documentElement;
    const diff = window.innerWidth - docEl.clientWidth;
    return diff > 0 ? `${diff}px` : "";
}

export function lockBodyScroll(): void {
    if (isServer()) return;

    if (lockCount === 0) {
        const { body } = document;

        // Save current styles to restore later
        saved = {
            position: body.style.position,
            top: body.style.top,
            left: body.style.left,
            right: body.style.right,
            width: body.style.width,
            overflow: body.style.overflow,
            touchAction: body.style.touchAction,
            paddingRight: body.style.paddingRight,
        };

        scrollYBeforeLock = window.scrollY;

        // Prevent layout shift when scrollbar disappears
        const padRight = getScrollbarCompensation();
        if (padRight) body.style.paddingRight = padRight;

        // Lock the body
        body.style.position = "fixed";
        body.style.top = `-${scrollYBeforeLock}px`;
        body.style.left = "0";
        body.style.right = "0";
        body.style.width = "100%";
        body.style.overflow = "hidden";
        body.style.touchAction = "none";
    }

    lockCount++;
}

export function unlockBodyScroll(): void {
    if (isServer()) return;
    if (lockCount === 0) return;

    lockCount--;
    if (lockCount > 0) return;

    const { body } = document;

    // Restore saved styles
    body.style.position = saved.position ?? "";
    body.style.top = saved.top ?? "";
    body.style.left = saved.left ?? "";
    body.style.right = saved.right ?? "";
    body.style.width = saved.width ?? "";
    body.style.overflow = saved.overflow ?? "";
    body.style.touchAction = saved.touchAction ?? "";
    body.style.paddingRight = saved.paddingRight ?? "";

    // Restore scroll position
    const y = scrollYBeforeLock;
    window.scrollTo(0, y);

    // Cleanup
    saved = {};
    scrollYBeforeLock = 0;
}
