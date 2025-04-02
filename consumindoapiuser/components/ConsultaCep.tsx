'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ListaUsuarios from './ListaUsuarios';

interface Endereco {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export default function BuscaCep() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState<Endereco | null>(null);
  const [erro, setErro] = useState('');

  const buscarCep = async () => {
    setErro('');
    setEndereco(null); // Clear previous results

    if (!cep) {
      setErro('Por favor, digite um CEP.');
      return;
    }

    try {
      const response = await axios.get<Endereco>(
        `https://viacep.com.br/ws/${cep}/json/`
      );

      if (response.data.erro) {
        setErro('CEP não encontrado.');
      } else {
        setEndereco(response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      setErro('Erro ao buscar CEP. Verifique o CEP e tente novamente.');
    }
  };

  return (
    <>
      <h2>Buscar CEP</h2>
      <div>
        <label htmlFor="cep">CEP:</label>
        <input
          type="text"
          id="cep"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))} // Remove non-numeric characters
          maxLength={8}
        />
        <button onClick={buscarCep}>Buscar</button>
      </div>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {endereco && (
        <div>
          <h3>Endereço:</h3>
          <p>
            <strong>CEP:</strong> {endereco.cep}
          </p>
          <p>
            <strong>Logradouro:</strong> {endereco.logradouro}
          </p>
          <p>
            <strong>Complemento:</strong> {endereco.complemento}
          </p>
          <p>
            <strong>Bairro:</strong> {endereco.bairro}
          </p>
          <p>
            <strong>Cidade:</strong> {endereco.localidade}
          </p>
          <p>
            <strong>Estado:</strong> {endereco.uf}
          </p>
        </div>
      )}
    </>
  );
}