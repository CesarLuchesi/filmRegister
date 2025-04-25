import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessions, clearError } from "./sessionSlice";
import styled from "styled-components";

const SessionsListContainer = styled.div`
  padding: 2rem;
  margin-top: 84px;
`;

const SessionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const SessionsCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SessionsTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const SessionsTexts = styled.p`
  color: #333;
  margin: 0.25rem 0;
`;

const ScheduleContainer = styled.div`
  margin-top: 1rem;
`;

const DaySchedule = styled.div`
  margin-bottom: 1rem;
`;

const DayTitle = styled.h4`
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const TimeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TimeBadge = styled.span`
  background-color: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #333;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #666;
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  text-align: center;
`;

const SessionsList = () => {
  const dispatch = useDispatch();
  const { sessions, status, error } = useSelector((state) => state.sessions);

  useEffect(() => {
    dispatch(fetchSessions());
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  if (status === "loading") {
    return <LoadingMessage>Carregando sessões...</LoadingMessage>;
  }

  if (status === "failed") {
    return <ErrorMessage>Erro ao carregar as sessões: {error}</ErrorMessage>;
  }

  if (!sessions?.data) {
    return <LoadingMessage>Nenhuma sessão encontrada</LoadingMessage>;
  }

  const groupSchedulesByDay = (schedules) => {
    return schedules.reduce((acc, schedule) => {
      if (!acc[schedule.day_week]) {
        acc[schedule.day_week] = [];
      }
      acc[schedule.day_week].push(schedule.time);
      return acc;
    }, {});
  };

  return (
    <SessionsListContainer>
      <h2>Lista de Sessões</h2>
      <SessionsGrid>
        {sessions.data.map((session) => {
          const schedulesByDay = groupSchedulesByDay(session.schedules || []);
          
          return (
            <SessionsCard key={session.id}>
              <SessionsTitle>{session.film_name}</SessionsTitle>
              <SessionsTexts>
                <strong>Cinema:</strong> {session.cine_name}
              </SessionsTexts>
              <SessionsTexts>
                <strong>Classificação:</strong> {session.classification}
              </SessionsTexts>
              
              <ScheduleContainer>
                <h4>Horários:</h4>
                {Object.entries(schedulesByDay).map(([day, times]) => (
                  <DaySchedule key={day}>
                    <DayTitle>{day}</DayTitle>
                    <TimeList>
                      {times.map((time, index) => (
                        <TimeBadge key={index}>
                          {time.split(':').slice(0, 2).join(':')}
                        </TimeBadge>
                      ))}
                    </TimeList>
                  </DaySchedule>
                ))}
              </ScheduleContainer>
            </SessionsCard>
          );
        })}
      </SessionsGrid>
    </SessionsListContainer>
  );
};

export default SessionsList;
