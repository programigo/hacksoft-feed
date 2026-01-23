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
                className={`bg-white dark:bg-gray-900 rounded-xl w-full max-w-md max-h-[85vh] overflow-y-auto relative flex flex-col ${className ?? ""}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
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