import React, { useState } from 'react';

interface Empleado {
  id: number;
  nombre: string;
  idDepartamento: number;
}

interface Departamento {
  id: number;
  nombre: string;
}

interface PropsDepartamento {
  departamentos: Departamento[];
  setDepartamentos: React.Dispatch<React.SetStateAction<Departamento[]>>;
  empleados: Empleado[]; // Agregar la lista de empleados
}

const RegistrarDepartamento: React.FC<PropsDepartamento> = ({
  departamentos,
  setDepartamentos,
  empleados,
}) => {
  const [nombre, setNombre] = useState<string>('');
  const [departamentoEditando, setDepartamentoEditando] = useState<number | null>(null);

  const manejarAgregarOEditar = () => {
    if (nombre.trim()) {
      if (departamentoEditando !== null) {
        setDepartamentos(
          departamentos.map((departamento) =>
            departamento.id === departamentoEditando ? { ...departamento, nombre } : departamento
          )
        );
        setDepartamentoEditando(null);
      } else {
        const nuevoDepartamento: Departamento = {
          id: departamentos.length + 1,
          nombre,
        };
        setDepartamentos([...departamentos, nuevoDepartamento]);
      }
      setNombre('');
    } else {
      alert('Nombre es requerido');
    }
  };

  const eliminarDepartamento = (id: number) => {
    const empleadosEnDepartamento = empleados.some((empleado) => empleado.idDepartamento === id);
    if (empleadosEnDepartamento) {
      alert('No se puede eliminar el departamento porque tiene empleados asignados.');
      return;
    }
    const departamentosFiltrados = departamentos.filter((departamento) => departamento.id !== id);
    setDepartamentos(departamentosFiltrados);
  };

  const actualizarDepartamento = (id: number) => {
    const departamento = departamentos.find((departamento) => departamento.id === id);
    if (departamento) {
      setNombre(departamento.nombre);
      setDepartamentoEditando(departamento.id);
    }
  };

  return (
    <div>
      <h1>Departamentos</h1>
      <div>
        <form>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del departamento"
          />
          <button type="button" onClick={manejarAgregarOEditar}>
            {departamentoEditando !== null ? 'Editar' : 'Agregar'}
          </button>
        </form>
        <h2>Lista de Departamentos</h2>
        <ul>
          {departamentos.map((departamento: Departamento) => (
            <li key={departamento.id}>
              <span>
                [ID: {departamento.id}] {departamento.nombre}
              </span>
              <button onClick={() => actualizarDepartamento(departamento.id)}>Editar</button>
              <button onClick={() => eliminarDepartamento(departamento.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RegistrarDepartamento;