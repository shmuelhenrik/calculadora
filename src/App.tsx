import React, { useState } from 'react';
import { Equal, Delete, Plus, Minus, X, Divide } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const MAX_DISPLAY_LENGTH = 12;

  const handleNumber = (num: string) => {
    if (display.length >= MAX_DISPLAY_LENGTH) return;
    
    if (num === '.' && display.includes('.')) return;

    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' && num !== '.' ? num : display + num);
    }
  };

  const handleOperator = (operator: string) => {
    if (display === 'Error') return;
    setShouldResetDisplay(true);
    setEquation(display + ' ' + operator + ' ');
  };

  const calculate = () => {
    if (!equation || display === 'Error') return;

    const parts = equation.split(' ');
    const num1 = parseFloat(parts[0]);
    const operator = parts[1];
    const num2 = parseFloat(display);

    let result: number;

    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          setDisplay('Error');
          setEquation('');
          setShouldResetDisplay(true);
          return;
        }
        result = num1 / num2;
        break;
      default:
        return;
    }

    const formattedResult = Number.isInteger(result) 
      ? result.toString() 
      : result.toFixed(8).replace(/\.?0+$/, '');

    if (formattedResult.length > MAX_DISPLAY_LENGTH) {
      setDisplay('Error');
    } else {
      setDisplay(formattedResult);
    }
    setEquation('');
    setShouldResetDisplay(true);
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setShouldResetDisplay(false);
  };

  const deleteLastDigit = () => {
    if (display === 'Error') return clear();
    setDisplay(display.length === 1 ? '0' : display.slice(0, -1));
  };

  const ButtonClass = "w-16 h-16 flex items-center justify-center rounded-full text-xl font-semibold transition-all hover:scale-105 active:scale-95";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl w-[340px]">
        {/* Display da calculadora */}
        <div className="mb-6 bg-gray-50/50 p-4 rounded-2xl">
          <div className="text-gray-500 text-right h-6 mb-2 overflow-hidden">{equation}</div>
          <div className="text-4xl font-bold text-right h-12 overflow-hidden text-gray-800">{display}</div>
        </div>
        
        {/* Grid de botões */}
        <div className="grid grid-cols-4 gap-3">
          {/* Primeira linha - Botões de controle */}
          <button onClick={clear} className={`${ButtonClass} bg-red-100 text-red-600 hover:bg-red-200`}>
            AC
          </button>
          <button onClick={deleteLastDigit} className={`${ButtonClass} bg-orange-100 text-orange-600 hover:bg-orange-200`}>
            <Delete size={20} />
          </button>
          <button onClick={() => handleOperator('/')} className={`${ButtonClass} bg-blue-100 text-blue-600 hover:bg-blue-200`}>
            <Divide size={20} />
          </button>
          <button onClick={() => handleOperator('*')} className={`${ButtonClass} bg-blue-100 text-blue-600 hover:bg-blue-200`}>
            <X size={20} />
          </button>

          {/* Segunda linha - 7, 8, 9, - */}
          {[7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(String(num))}
              className={`${ButtonClass} bg-gray-100 text-gray-700 hover:bg-gray-200`}
            >
              {num}
            </button>
          ))}
          <button onClick={() => handleOperator('-')} className={`${ButtonClass} bg-blue-100 text-blue-600 hover:bg-blue-200`}>
            <Minus size={20} />
          </button>

          {/* Terceira linha - 4, 5, 6, + */}
          {[4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(String(num))}
              className={`${ButtonClass} bg-gray-100 text-gray-700 hover:bg-gray-200`}
            >
              {num}
            </button>
          ))}
          <button onClick={() => handleOperator('+')} className={`${ButtonClass} bg-blue-100 text-blue-600 hover:bg-blue-200`}>
            <Plus size={20} />
          </button>

          {/* Quarta e quinta linhas - 1, 2, 3, = e 0, . */}
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(String(num))}
              className={`${ButtonClass} bg-gray-100 text-gray-700 hover:bg-gray-200`}
            >
              {num}
            </button>
          ))}
          <button onClick={calculate} className={`${ButtonClass} bg-green-500 text-white hover:bg-green-600 row-span-2`}>
            <Equal size={20} />
          </button>

          <button
            onClick={() => handleNumber('0')}
            className={`${ButtonClass} bg-gray-100 text-gray-700 hover:bg-gray-200 col-span-2`}
          >
            0
          </button>
          <button
            onClick={() => handleNumber('.')}
            className={`${ButtonClass} bg-gray-100 text-gray-700 hover:bg-gray-200`}
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;