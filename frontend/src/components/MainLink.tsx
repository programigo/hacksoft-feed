import { Link } from "react-router";
import hackSoftLogo from "../assets/hacksoft-logo.svg";

export default function MainLink() {
    return (
        <Link to="/" className="flex items-center">
            <img
                src={hackSoftLogo}
                className="h-10 w-auto"
                alt="HackSoft Logo"
            />
        </Link>
    )
}