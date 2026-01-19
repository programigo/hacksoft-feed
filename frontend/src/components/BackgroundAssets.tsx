import hackSoftOrangeAsset from "../assets/hack_soft_orange_asset.svg";
import bottomTriangleElement from "../assets/bottom-triangle-element.svg";

export default function BackgroundAssets() {
    return (
        <>
            {/* ORANGE – TOP RIGHT */}
            <img
                src={hackSoftOrangeAsset}
                alt=""
                aria-hidden
                className="
                    pointer-events-none
                    fixed
                    z-0
                    hidden lg:block

                    top-15
                    right-0

                    w-[clamp(400px,50vw,806px)]

                "
            />

            {/* GREY – BOTTOM LEFT */}
            <img
                src={bottomTriangleElement}
                alt=""
                aria-hidden
                className="
                    pointer-events-none
                    fixed
                    z-0
                    hidden lg:block

                    bottom-15
                    left-0

                    w-[clamp(370px,50vw,764px)]

                "
            />
        </>
    )
}