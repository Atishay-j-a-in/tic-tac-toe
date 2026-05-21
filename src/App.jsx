import { useState, useEffect } from 'react'

function App() {
  const [player,setPlayer] = useState(null)
  const [board, setBoard] = useState(Array(9).fill(null))
  const [ winner ,setWinner] = useState(null)
  const [message,setMessage] = useState(null)
  const checkWinner = (board) => {

  const patterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
  ];

  for (let [a,b,c] of patterns) {

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a]; // returns ❌ or ⭕
    }
  }

  return null; // no winner
};
const resetGame = ()=>{
  setBoard(Array(9).fill(null))
  setWinner(null)
  setMessage(null)
}
  const choose=(e)=>{
    setPlayer(()=>setPlayer(e.target.innerText))
    console.log(e.target.innerText)
  }
  const dis= (e)=>{
    const arry=[...board]
    if(!arry[e.target.id] && !winner){

      arry[e.target.id]= player
      setBoard(arry)
      setPlayer(player==="❌"?"⭕":"❌")
    }
  }
  useEffect(() => {
    setWinner(checkWinner(board))
    
  console.log("checkWinner",winner)
}, [player]);
useEffect(()=>{
  let counter= 0
    board.forEach((ele)=>{
      if(ele){
        counter++
      }
    })
    if(counter===9 && !winner){
        setMessage("Draw !! restart now")
    }
   
},[board, winner])
  return (
   <div className="min-h-screen bg-black text-white flex  flex-col gap-4 items-center justify-center  px-4 py-8">

  {/* SOUND */}
  

  <div className="
    bg-zinc-900
    border border-zinc-800
    shadow-2xl
    rounded-3xl
    p-5 sm:p-8
    w-full
    max-w-md
  ">

    {/* TITLE */}
    <h1 className="
      text-3xl sm:text-4xl
      font-bold
      text-center
      mb-8
      tracking-wide
    ">
      Tic Tac Toe
    </h1>

    {/* CHOOSE */}
    {!player && <div className="flex flex-col items-center gap-4 mb-6">

      <p className="
        text-zinc-400
        text-xs sm:text-sm
        uppercase
        tracking-[3px]
      ">
        Choose Your Side
      </p>

      <div className="flex gap-4">

        <button
          onClick={(e) => choose(e)}
          className="
            bg-zinc-800
            hover:bg-zinc-700
            transition-all
            duration-200
            size-14 sm:size-16
            rounded-2xl
            text-2xl sm:text-3xl
            shadow-lg
          "
        >
          ❌
        </button>

        <button
          onClick={(e) => choose(e)}
          className="
            bg-zinc-800
            hover:bg-zinc-700
            transition-all
            duration-200
            size-14 sm:size-16
            rounded-2xl
            text-2xl sm:text-3xl
            shadow-lg
          "
        >
          ⭕
        </button>

      </div>
    </div>
 }

    {/* STATUS */}
    <div className="text-center mb-6 min-h-10 flex items-center justify-center">
     
      {!message?!winner ? (
        <p className="
          text-base sm:text-lg
          font-semibold
          text-zinc-200
        ">
          {player === "❌"
            ? "Player 1 Turn"
            : "Player 2 Turn"}
        </p>
      ) : (
        <p className="
          text-lg sm:text-xl
          font-bold
          text-green-400
          animate-pulse
        ">
          {winner === "❌"
            ? "Player 1 Wins 🎉"
            : "Player 2 Wins 🎉"}
        </p>
      ):message}
      
    </div>

    {/* BOARD */}
    <div className="
      grid
      grid-cols-3
      gap-2 sm:gap-3
      w-fit
      mx-auto
    ">

      {board.map((ele, idx) => (
        <button
          key={idx}
          id={idx}
          onClick={(e) => dis(e)}
          className="
            size-20 sm:size-24 md:size-28
            bg-zinc-800
            hover:bg-zinc-700
            border border-zinc-700
            rounded-xl sm:rounded-2xl
            text-3xl sm:text-4xl md:text-5xl
            font-bold
            flex
            items-center
            justify-center
            transition-all
            duration-200
            active:scale-95
            shadow-lg
          "
        >
          {ele || ""}
        </button>
      ))}

    </div>

  </div>
  <button
    onClick={resetGame}
    className="
      px-6
      py-3
      rounded-2xl
      bg-red-500
      hover:bg-red-600
      active:scale-95
      transition-all
      duration-200
      font-semibold
      shadow-lg
      text-sm
      sm:text-base
    "
  >
    Restart Game
  </button>
</div>
  )
}

export default App
