import React, { useState, useEffect } from "react";
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

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const ScheduleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #eee;
`;

const RemoveButton = styled.button`
  padding: 0.5rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff5252;
  }
`;

const DAYS_OF_WEEK = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

const SessionForm = () => {
  const [formData, setFormData] = useState({
    cine_id: "",
    film_id: "",
    schedules: [],
  });

  const [newSchedule, setNewSchedule] = useState({
    day_week: "",
    time: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const [films, setFilms] = useState([]);
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Iniciando busca de dados...");

        const filmsResponse = await api.get("/films");
        console.log("Resposta de filmes:", filmsResponse.data);

        const cinemasResponse = await api.get("/cines");
        console.log("Resposta de cinemas:", cinemasResponse.data);

        setFilms(filmsResponse.data.data);
        setCinemas(cinemasResponse.data.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        console.error("Detalhes do erro:", error.response);
        setStatus({
          loading: false,
          error:
            "Erro ao carregar filmes e cinemas. Por favor, tente novamente.",
          success: false,
        });
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSchedule = () => {
    if (!newSchedule.day_week || !newSchedule.time) {
      setStatus({
        loading: false,
        error: "Por favor, selecione o dia e o horário",
        success: false,
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      schedules: [...prev.schedules, newSchedule],
    }));

    setNewSchedule({
      day_week: "",
      time: "",
    });
  };

  const removeSchedule = (index) => {
    setFormData((prev) => ({
      ...prev,
      schedules: prev.schedules.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    if (
      !formData.cine_id ||
      !formData.film_id ||
      formData.schedules.length === 0
    ) {
      setStatus({
        loading: false,
        error:
          "Por favor, preencha todos os campos e adicione pelo menos um horário",
        success: false,
      });
      return;
    }

    try {
      const sessionData = {
        cine_id: formData.cine_id,
        film_id: formData.film_id,
        schedules: formData.schedules,
      };

      const response = await api.post("/sessions", sessionData);

      if (response.status === 201) {
        setStatus({ loading: false, error: null, success: true });
        setFormData({
          cine_id: "",
          film_id: "",
          schedules: [],
        });
        setNewSchedule({
          day_week: "",
          time: "",
        });
      }
    } catch (error) {
      console.error("Erro ao cadastrar sessão:", error);
      setStatus({
        loading: false,
        error:
          error.response?.data?.message ||
          "Erro ao cadastrar sessão. Por favor, tente novamente.",
        success: false,
      });
    }
  };
  console.log(cinemas.data);

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Cinema</Label>
          <Select
            name="cine_id"
            value={formData.cine_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um cinema</option>
            {cinemas && cinemas.length > 0 ? (
              cinemas.map((cinema) => (
                <option key={cinema.id} value={cinema.id}>
                  {cinema.cine_name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Carregando cinemas...
              </option>
            )}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Filme</Label>
          <Select
            name="film_id"
            value={formData.film_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um filme</option>
            {films && films.length > 0 ? (
              films.map((film) => (
                <option key={film.id} value={film.id}>
                  {film.film_name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Carregando filmes...
              </option>
            )}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Horários</Label>
          <ScheduleContainer>
            {formData.schedules.map((schedule, index) => (
              <ScheduleItem key={index}>
                <span>
                  {schedule.day_week} - {schedule.time}
                </span>
                <RemoveButton
                  type="button"
                  onClick={() => removeSchedule(index)}
                >
                  Remover
                </RemoveButton>
              </ScheduleItem>
            ))}

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Select
                name="day_week"
                value={newSchedule.day_week}
                onChange={handleScheduleChange}
                required
              >
                <option value="">Selecione o dia</option>
                {DAYS_OF_WEEK.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </Select>

              <Input
                type="time"
                name="time"
                value={newSchedule.time}
                onChange={handleScheduleChange}
                required
              />

              <Button type="button" onClick={addSchedule}>
                Adicionar Horário
              </Button>
            </div>
          </ScheduleContainer>
        </FormGroup>

        <Button type="submit" disabled={status.loading}>
          {status.loading ? "Cadastrando..." : "Cadastrar Sessão"}
        </Button>

        {status.error && <ErrorMessage>{status.error}</ErrorMessage>}
        {status.success && (
          <SuccessMessage>Sessão cadastrada com sucesso!</SuccessMessage>
        )}
      </Form>
    </FormContainer>
  );
};

export default SessionForm;
