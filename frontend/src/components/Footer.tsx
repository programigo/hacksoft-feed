export default function Footer() {
    return (
        <footer className="footer footer-center bg-white p-4
                            fixed bottom-0 left-0 w-full z-50">
            <aside>
                <p>
                    Copyright © {new Date().getUTCFullYear()} HackSoft Ltd. All right reserved.
                    No part of this site may be reproduced without our written permission.
                </p>
            </aside>
        </footer>
    )
}