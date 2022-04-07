import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import Footer from './Footer';

function Layout() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <br />
            <Footer />
        </>
    );
}

export default Layout;
