import { Link, Outlet } from "react-router-dom";
import "./Layout.css"
import { useContext, useRef, useState } from "react";
import { AppContext } from "./App";

export default function Layout() {
    const { token, setToken } = useContext(AppContext);

    const userName = !token ? "" : JSON.parse( atob( token.split('.')[1] ) ).Name;

    return <div className="page-container">
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
                        {!token && <>                                    
                            <Link to="/" className="btn btn-outline-dark">
                                <i className="bi bi-person-plus"></i>
                            </Link>
                            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#authModal">
                                <i className="bi bi-box-arrow-in-right"></i>
                            </button></>  }
                        {!!token && <>
                            <span>{userName}</span>
                            <Link to="/cart" className="btn btn-outline-dark"><i className="bi bi-cart"></i></Link>
                            <button type="button" className="btn btn-outline-primary" onClick={() => setToken(null)}>
                                <i className="bi bi-box-arrow-right"></i>
                            </button>
                        </>}
                        </div>
                    </div>
                </div>
            </nav>
        </header>

        <section className="container">
            <main role="main" className="pb-3">
                <Outlet />
            </main>
        </section>
        
        <footer className="border-top footer text-muted">
            <div className="container">
                &copy; 2024 - ASP-P22 - <Link to="/">Угода</Link>
            </div>
        </footer>    
        <AuthModal />
    </div>;
}

function AuthModal() {
    const {request, setToken} = useContext(AppContext);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const closeButtonRef = useRef();

    const authenticateClick = () => {
        // console.log(login, password);
        // RFC 7617
        const credentials = btoa(login + ':' + password);
        request("/api/user", {
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + credentials
            }
        }).then(data => {
            let [_, payload] = data.split('.');
            payload = JSON.parse( atob(payload) );
            console.log(payload.Exp);
            window.localStorage.setItem("token22", data);
            setToken(data);
            closeButtonRef.current.click();
        })
        .catch(console.error);
    };

    return <div className="modal fade" id="authModal" tabIndex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="authModalLabel">Автентифікація</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form id="auth-form">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="auth-login-addon"><i className="bi bi-key"></i></span>
                        <input type="text" className="form-control " placeholder="Логін"
                               value={login}
                               onChange={e => setLogin(e.target.value)}
                               aria-label="Login" aria-describedby="auth-login-addon"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="auth-password1-addon"><i className="bi bi-lock"></i></span>
                        <input type="password" className="form-control" placeholder="*********" 
                               value={password}
                               onChange={e => setPassword(e.target.value)}
                               aria-label="Password" aria-describedby="auth-password1-addon"/>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" ref={closeButtonRef} className="btn btn-secondary" data-bs-dismiss="modal">Скасувати</button>
                <button type="button" onClick={authenticateClick} className="btn btn-primary">Вхід</button>
            </div>
        </div>
    </div>
</div>;
}