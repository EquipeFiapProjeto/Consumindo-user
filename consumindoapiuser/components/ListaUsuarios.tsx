'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ListaUsuarios() {
  interface Usuarios {
    id: number;
    name: string;
    email: string;
    phone: string;
  }

  const [usuarios, setUsuarios] = useState<Usuarios[]>([]);
  const [erro, setErro] = useState('');

  function buscarUsuarios() {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(function (res) {
        setUsuarios(res.data);
      })
      .catch(function () {
        setErro('ERRO AO BUSCAR API');
      });
  }

  useEffect(function () {
    buscarUsuarios();
  }, []);

  return (
    <>
      <h2>Lista de Usuarios</h2>
      {erro !== '' && <p>{erro}</p>}
      {usuarios.length > 0 &&
        usuarios.map(function (usuario) {
          return (
            <div key={usuario.id}>
              <p>
                <strong>Nome:</strong> {usuario.name}
              </p>
              <p>
                <strong>Email:</strong> {usuario.email}
              </p>
              <p>
                <strong>Telefone:</strong> {usuario.phone}
              </p>
            </div>
          );
        })}
    </>
  );
}