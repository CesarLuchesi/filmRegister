import React, { useState } from "react";
import styled from "styled-components";
import api from "../../api/axios";

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

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  max-height: 200px;
  overflow-y: auto;

  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }

  option {
    padding: 0.5rem;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
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

const STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const CinemaForm = () => {
  const [formData, setFormData] = useState({
    cine_name: "",
    city: "",
    state: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      await api.post("/cine", formData);
      setStatus({ loading: false, error: null, success: true });
      setFormData({
        cine_name: "",
        city: "",
        state: "",
      });
    } catch (error) {
      setStatus({
        loading: false,
        error: error.response?.data?.error || "Erro ao cadastrar cinema",
        success: false,
      });
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome do Cinema</Label>
          <Input
            type="text"
            name="cine_name"
            value={formData.cine_name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Cidade</Label>
          <Input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Estado</Label>
          <Select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um estado</option>
            {STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Button type="submit" disabled={status.loading}>
          {status.loading ? "Cadastrando..." : "Cadastrar Cinema"}
        </Button>

        {status.error && <ErrorMessage>{status.error}</ErrorMessage>}
        {status.success && (
          <SuccessMessage>Cinema cadastrado com sucesso!</SuccessMessage>
        )}
      </Form>
    </FormContainer>
  );
};

export default CinemaForm;