import BackToTop from "./back-top";
import Footer from "./footer";
import Header from "./header";

function Layout({ children }) {
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
