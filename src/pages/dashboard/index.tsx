import type { NextPage } from 'next';
import QuestionsPerformanceChart from '../../components/QuestionsPerformanceChart';

const Dashboard: NextPage = () => {
  return (
    <div style={{ 
        width: '100%', 
        minHeight: '100vh', 
        margin: '0 auto', 
        fontFamily: 'sans-serif', 
        padding: '20px',
        background: '#300345' // Cor de fundo prpl1
    }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: '#ffe085' }}>Seu Painel de Desempenho</h1>
        <p style={{ fontSize: 'clamp(1rem, 4vw, 1.1rem)', color: '#f8cb46' }}>Acompanhe seu progresso de estudos semanal.</p>
      </header>
      <div style={{ 
        padding: '20px', 
        borderRadius: '8px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
        backgroundColor: '#4c0e71', // Cor de fundo prpl2
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', color: 'white', marginBottom: '20px' }}>Desempenho de Questões</h2>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <div style={{ minWidth: '600px', height: '400px' }}>
             <QuestionsPerformanceChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;