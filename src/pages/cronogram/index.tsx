
import type { NextPage } from 'next';
import { useState, useMemo, useEffect } from 'react';
import { CSSProperties } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import useAuth from '@/hooks/useAuth';

// --- ESTRUTURA DE DADOS (sem alterações) ---
interface Task { name: string; completed: boolean; }
interface DailySchedule { tasks: Task[]; quizTaken: boolean; }
interface ScheduleData { [key: string]: DailySchedule; }

// --- DADOS INICIAIS DE EXEMPLO (para novos usuários) ---
const fallbackSchedule: ScheduleData = {
  [formatDate(new Date())]: { // Adiciona tarefas para o dia de hoje dinamicamente
      tasks: [{ name: 'Matemática', completed: false }, { name: 'Física', completed: false }],
      quizTaken: false 
  }
};

function formatDate(date: Date): string { return date.toISOString().split('T')[0]; }

const Cronogram: NextPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [schedule, setSchedule] = useState<ScheduleData>({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // --- EFEITO PARA CARREGAR DADOS DO FIRESTORE ---
  useEffect(() => {
    if (authLoading) return;
    if (!user) { window.location.href = '/login'; return; }

    const fetchSchedule = async () => {
      setIsLoading(true);
      const docRef = doc(firestore, 'schedules', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSchedule(docSnap.data() as ScheduleData);
      } else {
        // Se não existir, cria um cronograma inicial para o usuário
        await setDoc(docRef, fallbackSchedule);
        setSchedule(fallbackSchedule);
      }
      setIsLoading(false);
    };

    fetchSchedule();
  }, [user, authLoading]);

  // --- LÓGICA DE ATUALIZAÇÃO E SALVAMENTO ---
  const updateAndSaveChanges = async (updatedSchedule: ScheduleData) => {
    if (!user) return;
    setSchedule(updatedSchedule);
    const docRef = doc(firestore, 'schedules', user.uid);
    await setDoc(docRef, updatedSchedule, { merge: true });
  };

  const handleToggleTask = (taskName: string) => {
    const newSchedule = { ...schedule };
    const dayTasks = newSchedule[currentDayKey]?.tasks || [];
    const taskIndex = dayTasks.findIndex(t => t.name === taskName);
    if (taskIndex > -1) {
      dayTasks[taskIndex].completed = !dayTasks[taskIndex].completed;
      if (!newSchedule[currentDayKey]) newSchedule[currentDayKey] = { tasks: [], quizTaken: false };
      newSchedule[currentDayKey].tasks = dayTasks;
      updateAndSaveChanges(newSchedule);
    }
  };

  const handleStartQuiz = () => {
    const newSchedule = { ...schedule };
    if (!newSchedule[currentDayKey] || newSchedule[currentDayKey].quizTaken) return;
    newSchedule[currentDayKey].quizTaken = true;
    updateAndSaveChanges(newSchedule);
    alert('Questionário iniciado!');
  };

  // O resto da lógica (navegação, etc.) permanece a mesma...
  const currentDayKey = formatDate(currentDate);
  const todaysSchedule = useMemo(() => schedule[currentDayKey] || { tasks: [], quizTaken: false }, [schedule, currentDayKey]);
  const changeDay = (days: number) => { setCurrentDate(prev => { const d = new Date(prev); d.setDate(d.getDate() + days); return d; }); };

  if (authLoading || isLoading) {
      return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#300345', color: 'white'}}><h1>Carregando seu cronograma...</h1></div>;
  }

  // --- RENDERIZAÇÃO (JSX) idêntica à versão anterior ---
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#300345', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '40px', background: '#4c0e71', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.4)', textAlign: 'center', width: '100%', maxWidth: '600px' }}>
        <h1 style={{ color: 'white', fontSize: '2.2rem', marginBottom: '10px' }}>Conquistas do Dia</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <button onClick={() => changeDay(-1)} style={{ background: 'transparent', border: 'none', color: '#f8cb46', fontSize: '2.5rem', cursor: 'pointer' }}>‹</button>
          <h2 style={{ color: '#f8cb46', fontSize: '1.5rem' }}>{currentDate.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}</h2>
          <button onClick={() => changeDay(1)} style={{ background: 'transparent', border: 'none', color: '#f8cb46', fontSize: '2.5rem', cursor: 'pointer' }}>›</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {todaysSchedule.tasks.length > 0 ? (
            todaysSchedule.tasks.map(task => (
              <div key={task.name} onClick={() => handleToggleTask(task.name)} style={{ display: 'flex', alignItems: 'center', padding: '20px', background: '#300345', borderRadius: '10px', cursor: 'pointer', border: '1px solid #5a1a8a' }}>
                <div style={{ width: '24px', height: '24px', marginRight: '20px', border: `2px solid ${task.completed ? '#f8cb46' : '#8e44ad'}`, borderRadius: '50%', backgroundColor: task.completed ? '#f8cb46' : 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#300345', fontWeight: 'bold' }}>
                  {task.completed && '✔'}
                </div>
                <span style={{ color: 'white', fontSize: '1.2rem', textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? 0.6 : 1 }}>
                  {task.name}
                </span>
              </div>
            ))
          ) : (
            <p style={{ color: '#ccc', fontSize: '1.2rem', padding: '30px 0' }}>Dia de descanso! Aproveite para relaxar.</p>
          )}
        </div>
        {todaysSchedule.tasks.length > 0 && (
          <button
            onClick={handleStartQuiz}
            disabled={todaysSchedule.quizTaken}
            style={{
              padding: '15px 30px', fontSize: '18px', border: 'none', borderRadius: '50px',
              cursor: todaysSchedule.quizTaken ? 'not-allowed' : 'pointer',
              fontWeight: 'bold', transition: 'background-color 0.3s, transform 0.2s',
              marginTop: '30px', width: '100%', maxWidth: '400px',
              backgroundColor: todaysSchedule.quizTaken ? '#555' : '#f8cb46',
              color: todaysSchedule.quizTaken ? '#aaa' : '#300345',
            }}
          >
            {todaysSchedule.quizTaken ? 'Questionário Realizado' : 'Realizar Questionário'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Cronogram;
