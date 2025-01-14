import React, { useState } from "react";

interface Usuario {
    id: number;
    nombre: string;
    email: string;
}

const GestionUsuarios: React.FC = () => {
    const [Usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [nombre, setNombre] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [usuarioEditando, setUsuarioEditando] = useState<number | null>(null);

    const agregarUsuario = () => {
        if (nombre.trim() && email.trim()) {
            if (usuarioEditando !== null) {
                setUsuarios(
                    Usuarios.map(usuario =>
                        usuario.id === usuarioEditando
                            ? { ...usuario, nombre, email }
                            : usuario
                    )
                );
                setUsuarioEditando(null);
            } else {
                const nuevoUsuario: Usuario = {
                    id: Date.now(),
                    nombre,
                    email
                };
                setUsuarios([...Usuarios, nuevoUsuario]);
            }
            setNombre('');
            setEmail('');
        } else {
            alert('Nombre y Email son requeridos');
        }
    };

    const eliminarUsuario = (id: number) => {
        const usuariosFiltrados = Usuarios.filter(usuario => usuario.id !== id);
        setUsuarios(usuariosFiltrados);
    };

    const actualizarUsuario = (id: number) => {
        const usuarioEncontrado = Usuarios.find(usuario => usuario.id === id);
        if (usuarioEncontrado) {
            setNombre(usuarioEncontrado.nombre);
            setEmail(usuarioEncontrado.email);
            setUsuarioEditando(id);
        }
    };

    return (
        <div className="gestion-usuarios">
            <h1 className="gestion-usuarios__titulo">Gestión de Usuarios</h1>
            <div className="gestion-usuarios__form-container">
                <form className="gestion-usuarios__form">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="gestion-usuarios__input"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="gestion-usuarios__input"
                    />
                    <button
                        type="button"
                        id="guardar"
                        onClick={agregarUsuario}
                        className="gestion-usuarios__btn"
                    >
                        {usuarioEditando !== null ? "Actualizar" : "Guardar"}
                    </button>
                </form>
            </div>
            <h2 className="gestion-usuarios__subtitulo">Lista de Usuarios</h2>
            <ul className="gestion-usuarios__lista">
                {Usuarios.map(usuario => (
                    <li key={usuario.id} className="gestion-usuarios__item">
                        <span className="gestion-usuarios__info">
                            [ID: {usuario.id}] {usuario.nombre} - {usuario.email}
                        </span>
                        <div className="gestion-usuarios__acciones">
                            <button
                                type="button"
                                id="eliminar"
                                onClick={() => eliminarUsuario(usuario.id)}
                                className="gestion-usuarios__btn gestion-usuarios__btn--eliminar"
                            >
                                Eliminar
                            </button>
                            <button
                                type="button"
                                id="actualizar"
                                onClick={() => actualizarUsuario(usuario.id)}
                                className="gestion-usuarios__btn gestion-usuarios__btn--actualizar"
                            >
                                Actualizar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GestionUsuarios;
