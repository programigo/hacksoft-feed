import { useEffect, type RefObject } from "react";

type OutsideClickHandler = (event: MouseEvent | TouchEvent) => void;

export function useOutsideClick(
    refs: RefObject<HTMLElement | SVGElement>[],
    onOutsideClick: OutsideClickHandler,
    enabled: boolean = true
) {
    useEffect(() => {
        if (!enabled) {
            return;
        }

        function handleEvent(event: MouseEvent | TouchEvent) {
            const target = event.target as Node | null;

            const isInside = refs.some((ref) => ref.current && target && ref.current.contains(target));

            if (!isInside) {
                onOutsideClick(event);
            }
        }

        document.addEventListener("mousedown", handleEvent);
        document.addEventListener("touchstart", handleEvent);

        return () => {
            document.removeEventListener("mousedown", handleEvent);
            document.removeEventListener("touchstart", handleEvent);
        }
    }, [enabled, onOutsideClick, refs]);
}