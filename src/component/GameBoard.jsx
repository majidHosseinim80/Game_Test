import { useEffect, useState } from "react";
import styles from "./GameBoard.module.css";
import img_url_1 from "../assets/product-1.jpg";
import img_url_2 from "../assets/product-2.jpg";
import img_url_3 from "../assets/product-3.jpg";
import img_url_4 from "../assets/product-4.jpg";
import img_url_5 from "../assets/product-5.jpg";
import img_url_6 from "../assets/product-6.jpg";
import img_url_7 from "../assets/product-7.jpg";
import img_url_8 from "../assets/product-8.jpg";
import GameList from "./GameList";
import History from "./History";

const imgs = [
  { id: "1", src: img_url_1, text: "محصول 1", display: false },
  { id: "2", src: img_url_2, text: "محصول 2", display: false },
  { id: "3", src: img_url_3, text: "محصول 3", display: false },
  { id: "4", src: img_url_4, text: "محصول 4", display: false },
  { id: "5", src: img_url_5, text: "محصول 5", display: false },
  { id: "6", src: img_url_6, text: "محصول 6", display: false },
  { id: "7", src: img_url_7, text: "محصول 7", display: false },
  { id: "8", src: img_url_8, text: "محصول 8", display: false },
  { id: "9", src: img_url_1, text: "محصول 1", display: false },
  { id: "10", src: img_url_2, text: "محصول 2", display: false },
  { id: "11", src: img_url_3, text: "محصول 3", display: false },
  { id: "12", src: img_url_4, text: "محصول 4", display: false },
  { id: "13", src: img_url_5, text: "محصول 5", display: false },
  { id: "14", src: img_url_6, text: "محصول 6", display: false },
  { id: "15", src: img_url_7, text: "محصول 7", display: false },
  { id: "16", src: img_url_8, text: "محصول 8", display: false },
];

// تابع random
const randomImg = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const DEFAULT_MOVES = 40;

function GameBoard() {
  const [movesLeft, setMovesLeft] = useState(DEFAULT_MOVES);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedTime, setSelectedTime] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [cards, setCards] = useState(() => randomImg(imgs));
  const [resultMessage, setResultMessage] = useState(null);
  const [history, setHistory] = useState([]);

  // تایمر
  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      endGame("زمان تموم !");
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          endGame("زمان تموم شد!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning]);

  useEffect(() => {
    if (selectedCards.length !== 2) return;

    const [first, second] = selectedCards;

    if (first.src === second.src && first.id !== second.id) {
      setHistory((prev) => [...prev, { id: first.id, text: first.text }]);
      setSelectedCards([]);
    } else {
      const timeoutId = setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === first.id || c.id === second.id
              ? { ...c, display: false }
              : c
          )
        );
        setSelectedCards([]);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards]);

  useEffect(() => {
    const allRevealed = cards.every((c) => c.display === true);
    if (allRevealed && isRunning) {
      endGame("برنده شدی!");
    }
  }, [cards, isRunning]);

  useEffect(() => {
    if (movesLeft <= 0 && isRunning) {
      endGame("تعداد حرکت‌ها تموم شد!");
    }
  }, [movesLeft, isRunning]);

  const handleCardClick = (card) => {
    if (resultMessage) return;
    if (selectedCards.length === 2) return;

    if (!isRunning) {
      setIsRunning(true);
      setTimeLeft(selectedTime);
    }

    setMovesLeft((prev) => prev - 1);

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, display: true } : c))
    );

    setSelectedCards((prev) => [...prev, card]);
  };

  const endGame = (message) => {
    setIsRunning(false);
    setResultMessage(message);
  };

  const startNewGame = () => {
    setMovesLeft(DEFAULT_MOVES);
    setCards(randomImg(imgs));
    setTimeLeft(0);
    setIsRunning(false);
    setSelectedCards([]);
    setResultMessage(null);
    setHistory([]);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <div className={styles["bord-container"]}>
      <header className={styles["game-header"]}>
        <p>حرکت باقیمانده: {movesLeft}</p>
        <h2>زمان: {formatTime(timeLeft)}</h2>
        <button className={styles["reset-btn"]} onClick={startNewGame}>
          شروع دوباره
        </button>
      </header>
      <div className={styles["controls"]}>
        {resultMessage && (
          <div className={styles["game-resulte"]}>{resultMessage}</div>
        )}
      </div>
      {!isRunning && !resultMessage && (
        <div className={styles["time-select"]}>
          <p>لطفاً زمان بازی را انتخاب کنید:</p>
          <div className={styles["time-buttons"]}>
            <button onClick={() => setSelectedTime(60)}>۱ دقیقه</button>
            <button onClick={() => setSelectedTime(120)}>۲ دقیقه</button>
            <button onClick={() => setSelectedTime(180)}>۳ دقیقه</button>
          </div>
          <p>زمان انتخاب‌شده: {selectedTime / 60} دقیقه</p>
        </div>
      )}

      <History matchedItems={history} />
      {!isRunning && !resultMessage && (
        <p>با اولین کلیک روی کارت، تایمر شروع می‌شود.</p>
      )}
      <GameList onClick={handleCardClick} items={cards} />
    </div>
  );
}

export default GameBoard;
