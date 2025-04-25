import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../../api/axios';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff5252;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.p`
  color: #4caf50;
  margin-top: 0.5rem;
`;

const FilmForm = () => {
  const [formData, setFormData] = useState({
    film_name: '',
    gender: '',
    duration: '',
    classification: '',
    launch: '',
    synopsis: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const formattedData = {
        ...formData,
        duration: parseInt(formData.duration),
        launch: formatDate(formData.launch)
      };

      await api.post('/films', formattedData);
      setStatus({ loading: false, error: null, success: true });
      setFormData({
        film_name: '',
        gender: '',
        duration: '',
        classification: '',
        launch: '',
        synopsis: '',
      });
    } catch (error) {
      setStatus({
        loading: false,
        error: error.response?.data?.message || 'Erro ao cadastrar filme',
        success: false,
      });
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome do Filme</Label>
          <Input
            type="text"
            name="film_name"
            value={formData.film_name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Gênero</Label>
          <Input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Duração (minutos)</Label>
          <Input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Classificação</Label>
          <Select
            name="classification"
            value={formData.classification}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="livre">Livre</option>
            <option value="10">10 anos</option>
            <option value="12">12 anos</option>
            <option value="14">14 anos</option>
            <option value="16">16 anos</option>
            <option value="18">18 anos</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Data de Lançamento</Label>
          <Input
            type="date"
            name="launch"
            value={formData.launch}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Sinopse</Label>
          <TextArea
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button type="submit" disabled={status.loading}>
          {status.loading ? 'Cadastrando...' : 'Cadastrar Filme'}
        </Button>

        {status.error && <ErrorMessage>{status.error}</ErrorMessage>}
        {status.success && <SuccessMessage>Filme cadastrado com sucesso!</SuccessMessage>}
      </Form>
    </FormContainer>
  );
};

export default FilmForm; 