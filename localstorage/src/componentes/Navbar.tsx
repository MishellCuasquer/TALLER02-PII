import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-link">
                Inicio
            </Link>
            <Link to="/usuarios" className="navbar-link">
                Usuarios
            </Link>
            <Link to="/departamentos" className="navbar-link">
                Departamentos
            </Link>
            <Link to="/empleados" className="navbar-link">
                Empleados
            </Link>
        </nav>
    );
};


export default Navbar;