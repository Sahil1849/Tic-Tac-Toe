'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });
  const [gameStatus, setGameStatus] = useState('ongoing');

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return squares.includes(null) ? null : 'draw';
  };

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner === 'X') {
      setGameStatus('xWins');
      setScores(prev => ({ ...prev, x: prev.x + 1 }));
    } else if (winner === 'O') {
      setGameStatus('oWins');
      setScores(prev => ({ ...prev, o: prev.o + 1 }));
    } else if (winner === 'draw') {
      setGameStatus('draw');
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || gameStatus !== 'ongoing') return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus('ongoing');
  };

  const renderSquare = (index) => {
    return (
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        className="w-24 h-24 flex items-center justify-center text-4xl font-bold rounded-xl bg-gray-800 shadow-lg transition-all border border-gray-700"
        onClick={() => handleClick(index)}
      >
        {board[index] && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={board[index] === 'X' ? 'text-cyan-400 neon-text-x' : 'text-purple-400 neon-text-o'}
          >
            {board[index]}
          </motion.span>
        )}
      </motion.button>
    );
  };

  const getStatusMessage = () => {
    if (gameStatus === 'xWins') {
      return <span className="neon-text-x">X Wins!</span>;
    } else if (gameStatus === 'oWins') {
      return <span className="neon-text-o">O Wins!</span>;
    } else if (gameStatus === 'draw') {
      return <span>Game Draw!</span>;
    } else {
      return (
        <span>
          Next Player: {isXNext ? <span className="neon-text-x">X</span> : <span className="neon-text-o">O</span>}
        </span>
      );
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-2">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700"
      >
        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-2 neon-text-title">Tic Tac Toe</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="text-center bg-gray-700 px-4 py-2 rounded-lg border border-gray-600">
            <p className="text-sm text-cyan-300">Player X</p>
            <p className="text-xl font-bold text-cyan-400">{scores.x}</p>
          </div>

          <div className="text-center bg-gray-700 px-4 py-2 rounded-lg border border-gray-600">
            <p className="text-sm text-purple-300">Player O</p>
            <p className="text-xl font-bold text-purple-400">{scores.o}</p>
          </div>

          <div className="text-center bg-gray-700 px-4 py-2 rounded-lg border border-gray-600">
            <p className="text-sm text-gray-300">Draws</p>
            <p className="text-xl font-bold text-gray-400">{scores.draws}</p>
          </div>
        </div>

        <div className="mb-4 text-center">
          <motion.p
            className="text-lg font-semibold text-gray-300"
          >
            {getStatusMessage()}
          </motion.p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <div key={index}>{renderSquare(index)}</div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={resetGame}
          className="w-full py-3 text-white font-bold rounded-lg shadow-lg border border-indigo-500"
        >
          {gameStatus === 'ongoing' ? 'Restart Game' : 'Play Again'}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;