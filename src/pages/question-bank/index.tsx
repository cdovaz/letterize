import type { NextPage } from 'next';
import { useState } from 'react';
import Image from 'next/image';

// Dados de exemplo que viriam do Firestore no futuro
const filterOptions = {
  bancas: ["ENEM", "FUVEST", "UNICAMP", "VUNESP"],
  anos: [2024, 2023, 2022, 2021, 2020],
  materias: {
    "Matemática": ["Análise Combinatória", "Geometria", "Trigonometria"],
    "Português": ["Interpretação de Texto", "Gramática", "Literatura"],
    "História": ["História do Brasil", "História Geral"],
  },
};

// Para o template estático, vamos definir a resposta correta
const correctAnswerIndex = 2; // A 3ª alternativa (índice 2)

const QuestionBank: NextPage = () => {
  const [selectedBanca, setSelectedBanca] = useState("");
  const [selectedAno, setSelectedAno] = useState("");
  const [selectedMateria, setSelectedMateria] = useState("");
  const [selectedTema, setSelectedTema] = useState("");
  
  // Estado para a lógica da questão
  const [selectedAlternative, setSelectedAlternative] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleMateriaChange = (materia: string) => {
    setSelectedMateria(materia);
    setSelectedTema("");
  };

  const handleAnswer = () => {
    if (selectedAlternative === null) return; // Não faz nada se nenhuma alternativa for selecionada

    setIsAnswered(true);
    if (selectedAlternative === correctAnswerIndex) {
      setIsCorrect(true);
    }
  };

  const selectStyles = {
    width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px', backgroundColor: '#f8f9fa', color: '#333'
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh',
      background: '#300345', padding: '40px 20px', fontFamily: 'sans-serif'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 2.5rem)' }}>Banco de Questões</h1>
        <p style={{ color: '#ffe085', fontSize: '1.1rem' }}>Filtre e encontre as questões que você precisa.</p>
      </div>

      {/* Seção de Filtros */}
      <div style={{
        padding: '30px', boxShadow: '0 8px 25px rgba(0,0,0,0.3)', background: '#4c0e71', borderRadius: '10px',
        width: '100%', maxWidth: '800px', marginBottom: '40px'
      }}>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <select style={selectStyles} value={selectedBanca} onChange={e => setSelectedBanca(e.target.value)}>
                <option value="" disabled>Selecione a Banca</option>
                {filterOptions.bancas.map(banca => <option key={banca} value={banca}>{banca}</option>)}
            </select>
            <select style={selectStyles} value={selectedAno} onChange={e => setSelectedAno(e.target.value)}>
                <option value="" disabled>Selecione o Ano</option>
                {filterOptions.anos.map(ano => <option key={ano} value={ano}>{ano}</option>)}
            </select>
            <select style={selectStyles} value={selectedMateria} onChange={e => handleMateriaChange(e.target.value)}>
                <option value="" disabled>Selecione a Matéria</option>
                {Object.keys(filterOptions.materias).map(materia => <option key={materia} value={materia}>{materia}</option>)}
            </select>
            <select style={selectStyles} value={selectedTema} onChange={e => setSelectedTema(e.target.value)} disabled={!selectedMateria}>
                <option value="" disabled>Selecione o Tema</option>
                {selectedMateria && filterOptions.materias[selectedMateria as keyof typeof filterOptions.materias].map(tema => (
                <option key={tema} value={tema}>{tema}</option>
                ))}
            </select>
        </div>
        <button style={{width: '100%', padding: '12px', color: '#300345', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', background: '#f8cb46'}}>Filtrar Questões</button>
      </div>

      {/* Template da Questão */}
      <div style={{ padding: '30px', boxShadow: '0 8px 25px rgba(0,0,0,0.3)', background: '#4c0e71', borderRadius: '10px', width: '100%', maxWidth: '800px', color: 'white' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <span style={{ background: '#300345', padding: '5px 10px', borderRadius: '5px', fontSize: '0.9rem' }}>Ano: 2023</span>
          <span style={{ background: '#300345', padding: '5px 10px', borderRadius: '5px', fontSize: '0.9rem' }}>Banca: FUVEST</span>
          <span style={{ background: '#300345', padding: '5px 10px', borderRadius: '5px', fontSize: '0.9rem' }}>Matéria: Português</span>
        </div>

        <p style={{ color: '#e0e0e0', lineHeight: 1.6 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.</p>
        <Image src="https://via.placeholder.com/700x350/300345/ffe085?text=Ilustração+Genérica" alt="Ilustração da questão" width={700} height={350} style={{ width: '100%', height: 'auto', borderRadius: '8px', margin: '20px 0' }} />
        <h3 style={{ color: '#ffe085', marginBottom: '25px' }}>Com base no texto e na imagem, qual das seguintes afirmações é a mais correta?</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {[...Array(5)].map((_, index) => {
            const isSelected = selectedAlternative === index;
            const buttonStyle: React.CSSProperties = { width: '100%', padding: '15px', color: 'white', border: '2px solid #300345', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', transition: 'all 0.2s', background: 'transparent', textAlign: 'left' };

            if (isAnswered) {
                if (index === correctAnswerIndex) {
                    buttonStyle.background = '#28a745'; // Verde para resposta correta
                    buttonStyle.border = '2px solid #28a745';
                } else if (isSelected && !isCorrect) {
                    buttonStyle.background = '#dc3545'; // Vermelho para resposta errada selecionada
                    buttonStyle.border = '2px solid #dc3545';
                }
            } else if (isSelected) {
                buttonStyle.background = '#f8cb46';
                buttonStyle.color = '#300345';
                buttonStyle.border = '2px solid #f8cb46';
            }

            return (
              <button key={index} onClick={() => !isAnswered && setSelectedAlternative(index)} disabled={isAnswered} style={buttonStyle}>
                Alternativa {index + 1}: {index === correctAnswerIndex ? 'Esta é a alternativa correta.' : 'Descrição da opção de resposta.'}
              </button>
            )
          })}
        </div>

        <button onClick={handleAnswer} disabled={isAnswered || selectedAlternative === null} style={{
          width: '100%', padding: '15px', border: 'none', borderRadius: '8px', cursor: isAnswered ? 'not-allowed' : 'pointer',
          fontSize: '18px', fontWeight: 'bold', marginTop: '30px', transition: 'background 0.3s',
          background: isAnswered ? (isCorrect ? '#28a745' : '#dc3545') : '#f8cb46',
          color: isAnswered ? 'white' : '#300345'
        }}>
          {isAnswered ? (isCorrect ? 'Correto!' : 'Errado') : 'Responder Questão'}
        </button>

        {isAnswered && (
            <div style={{ marginTop: '20px', padding: '15px', background: '#300345', borderRadius: '8px' }}>
                <h4 style={{ color: '#f8cb46', marginBottom: '10px' }}>Solução:</h4>
                <p style={{color: '#e0e0e0', lineHeight: 1.6}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac ex sed nulla facilisis tincidunt. Nunc ut lectus eros. Integer nec sem at nunc aliquam tincidunt. Curabitur id blandit elit. Vivamus in efficitur turpis, vel convallis eros.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
