import { useRef, type ChangeEvent, type DragEvent } from "react";
import type { ImageFile } from "../types/images"
import { Upload, X } from "lucide-react";
import { compressImage } from "../utils/image";

export default function PicturePicker({ image, label, onImageChange }: PicturePickerProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    async function handleFiles(filesList: FileList | null): Promise<void> {
        if (!filesList || filesList.length === 0) {
            return;
        }

        const file = filesList[0];

        // Create placeholder immediately
        const placeholder: ImageFile = {
            id: crypto.randomUUID(),
            url: URL.createObjectURL(file),
            file,
            publicId: null,
        };

        onImageChange(placeholder);

        // Compress the file
        try {
            const compressed = await compressImage(file, 1600, 0.8);

            const finalImage: ImageFile = {
                ...placeholder,
                file: compressed,
                url: URL.createObjectURL(compressed),
            };

            onImageChange(finalImage);
        } catch {
            // Keep placeholder if compression fails
            onImageChange(placeholder);
        }
    }

    function onInputChange(event: ChangeEvent<HTMLInputElement>): void {
        handleFiles(event.target.files);
        event.target.value = "";
    }

    function handleDrop(event: DragEvent<HTMLDivElement>): void {
        event.preventDefault();
        handleFiles(event.dataTransfer.files);
    }
    return (
        <div className="space-y-3">
            {label && (
                <label className="block text-sm/6 font-medium text-gray-100">
                    {label}
                </label>
            )}

            {/* Hidden input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onInputChange}
            />

            {image ? (
                /** --- Preview Mode --- **/
                <div className="relative w-40 h-40 group">
                    <img
                        src={image.url}
                        alt="Image preview"
                        className="w-40 h-40 object-cover rounded-full shadow-md"
                    />

                    {/* Remove Button */}
                    <button
                        type="button"
                        onClick={() => onImageChange(null)}
                        className="
                            absolute top-1 right-1 rounded-full p-1 
                            bg-black/60 text-white 
                            opacity-100 md:opacity-0 md:group-hover:opacity-100
                            transition
                        "
                    >
                        <X size={14} />
                    </button>
                </div>
            ) : (
                /** --- Empty State (dropzone) --- **/
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="
                        cursor-pointer rounded-full border border-dashed 
                        w-40 h-40 flex flex-col items-center justify-center 
                        text-center transition hover:bg-gray-50/10
                    "
                >
                    <Upload className="h-6 w-6 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-300">
                        Upload
                    </p>
                </div>
            )}
        </div>
    )
}

type PicturePickerProps = {
    image: ImageFile | null;
    label?: string;
    onImageChange: (image: ImageFile | null) => void;
}