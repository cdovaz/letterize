"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dados de exemplo para o desempenho semanal
const performanceData = [
  { day: 'Seg', 'Questões Feitas': 30, 'Questões Acertadas': 20, 'Questões Erradas': 10 },
  { day: 'Ter', 'Questões Feitas': 45, 'Questões Acertadas': 35, 'Questões Erradas': 10 },
  { day: 'Qua', 'Questões Feitas': 50, 'Questões Acertadas': 40, 'Questões Erradas': 10 },
  { day: 'Qui', 'Questões Feitas': 60, 'Questões Acertadas': 45, 'Questões Erradas': 15 },
  { day: 'Sex', 'Questões Feitas': 75, 'Questões Acertadas': 60, 'Questões Erradas': 15 },
  { day: 'Sáb', 'Questões Feitas': 40, 'Questões Acertadas': 38, 'Questões Erradas': 2 },
  { day: 'Dom', 'Questões Feitas': 20, 'Questões Acertadas': 15, 'Questões Erradas': 5 },
];

const QuestionsPerformanceChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={performanceData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="day" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
        <Line type="monotone" dataKey="Questões Feitas" stroke="#4a90e2" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Questões Acertadas" stroke="#7ed321" strokeWidth={2} />
        <Line type="monotone" dataKey="Questões Erradas" stroke="#d0021b" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default QuestionsPerformanceChart;
