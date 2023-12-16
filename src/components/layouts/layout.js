import BackToTop from "./back-top";
import Footer from "./footer";
import Header from "./header";
import { useEffect } from "react";
function Layout({ children }) {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);
    return (
        <>
            <Header />
            <div>{children}</div>
            <BackToTop />
            <Footer />
        </>
    );
}
export default Layout;
