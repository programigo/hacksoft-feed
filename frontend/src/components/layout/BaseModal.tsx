import { type ReactNode, useEffect, useRef } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { X } from "lucide-react";


export default function BaseModal({ isOpen, onClose, title, children, className }: BaseModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close modal on outside click
    useOutsideClick([modalRef], () => onClose(), isOpen);

    // Prevent scroll behind modal
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = "";
            };
        }
    }, [isOpen]);

    // Close on ESC
    useEffect(() => {
        if (!isOpen) return;

        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [isOpen, onClose]);


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div
                ref={modalRef}
                className={`bg-base-100 rounded-xl w-full max-w-md max-h-[85vh] overflow-y-auto relative flex flex-col ${className ?? ""}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-base-300">
                    <h2 className="text-lg font-semibold text-base-content">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-base-content/60 hover:text-base-content"
                    >
                        <X size={22} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

type BaseModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title: string;
    className?: string; // optional for custom styling
};