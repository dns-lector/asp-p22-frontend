import { Link, Outlet } from "react-router-dom";
import "./Layout.css"

export default function Layout() {
    return <div>
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Крамниця</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-dark">Домашня</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-dark">Угода</Link>
                        </li>
                    </ul>
            
                    <div className="auth-block">                                        
                            <Link to="/" className="btn btn-outline-dark"><i className="bi bi-person-plus"></i></Link>
                            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#authModal">
                                <i className="bi bi-box-arrow-in-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

        <div className="container">
            <main role="main" className="pb-3">
                <Outlet />
            </main>
        </div>
        
        <footer className="border-top footer text-muted">
            <div className="container">
                &copy; 2024 - ASP-P22 - <Link to="/">Угода</Link>
            </div>
        </footer>
            
    </div>;
}
