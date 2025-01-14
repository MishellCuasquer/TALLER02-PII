import React, { useState } from "react";

interface Empleado {
    id: number;
    nombre: string;
    apellido: string;
    idDepartamento: number;
}

interface Departamento {
    id: number;
    nombre: string;
}

interface EmpleadosProps {
    departamentos: Departamento[];
    empleados: Empleado[];
    setEmpleados: React.Dispatch<React.SetStateAction<Empleado[]>>;
}

const Empleados: React.FC<EmpleadosProps> = ({departamentos, empleados, setEmpleados}) => {

    const [nombre, setNombre] = useState<string>('');
    const [apellido, setApellido] = useState<string>('');
    const [idDepartamento, setIdDepartamento] = useState<number>(0);
    const [empleadoEditando, setEmpleadoEditando] = useState<number | null>(null);

    const agregaroeditarEmpleado = () => {
        if (nombre.trim() && apellido.trim() && idDepartamento) {
            if(empleadoEditando !== null) {
                setEmpleados(
                    empleados.map(empleado =>
                        empleado.id === empleadoEditando
                            ? { ...empleado, nombre, apellido, idDepartamento }
                            : empleado
                    )
                );
                setEmpleadoEditando(null);
            }else{
                const nuevoEmpleado: Empleado = {
                    id: empleados.length + 1,
                    nombre,
                    apellido,
                    idDepartamento
                };
                setEmpleados([...empleados, nuevoEmpleado]);
            }
            setNombre('');
            setApellido('');
            setIdDepartamento(0);
        }else {
            alert('Nombre, Apellido y Departamento son requeridos');
        }
    };

    const eliminarEmpleado = (id: number) => {
        const empleadosFiltrados = empleados.filter(empleado => empleado.id !== id);
        setEmpleados(empleadosFiltrados);
    };

    const actualizarEmpleado = (id: number) => {
        const empleadoEncontrado = empleados.find(empleado => empleado.id === id);
        if(empleadoEncontrado) {
            setNombre(empleadoEncontrado.nombre);
            setApellido(empleadoEncontrado.apellido);
            setIdDepartamento(empleadoEncontrado.idDepartamento);
            setEmpleadoEditando(id);
        }
    };

    return (
        <div>
            <h1>Empleados</h1>
            <input type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del empleado"
            />
            <input type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Apellido del empleado"
            />
            <select
                value={idDepartamento}
                onChange={(e) => setIdDepartamento(parseInt(e.target.value))}
            >
                <option value="0">Seleccione su departamento</option>
                {
                    departamentos.map((departamento) => (
                        <option key={departamento.id} value={departamento.id}>
                            {departamento.nombre}
                        </option>
                    ))
                }                
            </select>
            <button type="button" 
                    id="agregar"
                    onClick={agregaroeditarEmpleado}>
                    {empleadoEditando ? 'Actualizar' : 'Agregar'}
            </button>  
            <h2>Lista de empleados</h2>         
                <ul>
                    {empleados.map((empleado) => (
                        <li key={empleado.id}>
                            {empleado.nombre} {empleado.apellido} - Departamento: {departamentos.find(d => d.id === empleado.idDepartamento)?.nombre}
                            <button onClick={() => eliminarEmpleado(empleado.id)}>Eliminar</button>
                            <button onClick={() => actualizarEmpleado(empleado.id)}>Editar</button>
                        </li>
                    ))}
                </ul>                       

        </div>
    );
    
};

export default Empleados;