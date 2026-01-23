import type { ImgHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function ProfilePicture({ ...props }: ProfilePictureProps) {
    return (
        <img
            {...props}
            className={twMerge("rounded-full object-cover", props.className)}
        />
    )
}

type ProfilePictureProps = ImgHTMLAttributes<HTMLImageElement>;