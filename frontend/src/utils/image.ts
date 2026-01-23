export async function compressImage(file: File, maxWidthOrHeight = 1600, quality = 0.8): Promise<File> {
    // If file is already small, return as-is
    if (file.size < 500_000) {
        return file; // < ~0.5MB
    }

    return new Promise<File>((resolve, reject) => {
        const reader = new FileReader();

        reader.onerror = () => reject(new Error("Failed to read file for compression"));

        reader.onload = () => {
            const img = new Image();

            img.onerror = () => reject(new Error("Invalid image"));

            img.onload = async () => {
                const { width, height } = img;
                let newWidth = width;
                let newHeight = height;

                if (width > maxWidthOrHeight || height > maxWidthOrHeight) {
                    const ratio: number = width > height
                        ? maxWidthOrHeight / width
                        : maxWidthOrHeight / height;

                    newWidth = Math.round(width * ratio);
                    newHeight = Math.round(height * ratio);
                }

                const canvas = document.createElement("canvas");
                canvas.width = newWidth;
                canvas.height = newHeight;

                const context = canvas.getContext("2d");

                if (!context) {
                    return reject(new Error("Canvas not supported"));
                }

                context.drawImage(img, 0, 0, newWidth, newHeight);

                canvas.toBlob((blob) => {
                    if (!blob) {
                        return reject(new Error("Compression failed"));
                    }

                    const compressed = new File([blob], file.name, { type: file.type });

                    resolve(compressed);
                },
                    file.type === "image/png" ? "image/png" : "image/jpeg",
                    quality,
                );
            };

            img.src = reader.result as string;
        };

        reader.readAsDataURL(file);
    })
}