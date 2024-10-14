'use client';


import Pagina from '../components/Pagina';
import { Button, Modal, Form, Image } from 'react-bootstrap';  
import { Formik } from 'formik';
import { useState } from 'react';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';


export default function ConversorMoedas() {
  const [showModal, setShowModal] = useState(false);
  const [resultado, setResultado] = useState(0);
  const [moeda, setMoeda] = useState('');

  const taxas = {
    Dolar: 0.20,
    Euro: 0.18,
    Bitcoin: 0.000003,
  };

  function calcular(dados) {
    const valorReal = Number(dados.valor);
    const resultadoConversao = valorReal * taxas[dados.moeda];
    setResultado(resultadoConversao);
    setMoeda(dados.moeda);
    setShowModal(true);
  }

  return (
    <Pagina titulo="Conversor de Moeda">
      <Formik
        initialValues={{
          valor: '0',
          moeda: 'Dólar',
        }}
        onSubmit={calcular}
      >
        {({ values, handleChange, handleSubmit, handleReset }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-2'>
              <Form.Label>Valor em Reais:</Form.Label>
              <Form.Control
                type='number'
                name='valor'
                min={1}
                value={values.valor}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className='mb-2'>
              <Form.Label>Moeda:</Form.Label>
              <Form.Select
                name='moeda'
                value={values.moeda}
                onChange={handleChange}
              >
                <option value="Dólar">Dólar</option>
                <option value="Euro">Euro</option>
                <option value="Bitcoin">Bitcoin</option>
              </Form.Select>
            </Form.Group>

            <div className="text-center mb-2">

              {/* Exibir a imagens das moedas*/}
              {values.moeda === 'Dólar' && (
                <Image src="/Image/Dolar.jfif" alt="Dólar" width={100} />
              )}
              {values.moeda === 'Euro' && (
                <Image src="/Image/Euro_symbol.svg.png" alt="Euro" width={100} />
              )}
              {values.moeda === 'Bitcoin' && (
                <Image src="/Image/Bitcoin.jpg" alt="Bitcoin" width={100} />
              )}

            </div>
            
            <Form.Group className='mb-2 text-center'>
              <Button type='submit' className='me-2'>
                <FaCheck /> Enviar
              </Button>
              <Button type='button' onClick={handleReset}>
                <FaTrashAlt /> Limpar
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>

      {/* Modal do resultado */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Resultado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>O resultado da conversão é {resultado} {moeda}.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Pagina>
  );
}
