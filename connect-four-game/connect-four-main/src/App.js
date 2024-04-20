import { useState } from 'react';

function Circle({ value, onColumnClick }) {
  return (
    <button className="square" onClick={onColumnClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [bIsNext, setBIsNext] = useState(true);
  const [circles, setCircles] = useState(Array(42).fill(null));
  function handleClick(i) {
    if (calculateWinner(circles)) {
      return;
    }
    
    const nextCircles = circles.slice();
    let j = 6 * i;
    let turnIsDone = false;
    while (!turnIsDone && j <= (6*i + 5)) {

      if (nextCircles[j]){
        j++;
      }
      else if (!circles[j]){
        if (bIsNext) {
          nextCircles[j] = '🔵';
        } 
        else {
          nextCircles[j] = '🔴';
        }
        setCircles(nextCircles);
        setBIsNext(!bIsNext);
        turnIsDone = true;
      }
      else {
        return;
      }
    }
      
    
  }

  const winner = calculateWinner(circles);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = (bIsNext ? 'Blue' : 'Red') + "'s turn";
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Circle value={circles[5]} onColumnClick={() => handleClick(0)} />
        <Circle value={circles[11]} onColumnClick={() => handleClick(1)} />
        <Circle value={circles[17]} onColumnClick={() => handleClick(2)} />
        <Circle value={circles[23]} onColumnClick={() => handleClick(3)} />
        <Circle value={circles[29]} onColumnClick={() => handleClick(4)} />
        <Circle value={circles[35]} onColumnClick={() => handleClick(5)} />
        <Circle value={circles[41]} onColumnClick={() => handleClick(6)} />
      </div>
      <div className="board-row">
        <Circle value={circles[4]} onColumnClick={() => handleClick(0)} />
        <Circle value={circles[10]} onColumnClick={() => handleClick(1)} />
        <Circle value={circles[16]} onColumnClick={() => handleClick(2)} />
        <Circle value={circles[22]} onColumnClick={() => handleClick(3)} />
        <Circle value={circles[28]} onColumnClick={() => handleClick(4)} />
        <Circle value={circles[34]} onColumnClick={() => handleClick(5)} />
        <Circle value={circles[40]} onColumnClick={() => handleClick(6)} />
      </div>
      <div className="board-row">
        <Circle value={circles[3]} onColumnClick={() => handleClick(0)} />
        <Circle value={circles[9]} onColumnClick={() => handleClick(1)} />
        <Circle value={circles[15]} onColumnClick={() => handleClick(2)} />
        <Circle value={circles[21]} onColumnClick={() => handleClick(3)} />
        <Circle value={circles[27]} onColumnClick={() => handleClick(4)} />
        <Circle value={circles[33]} onColumnClick={() => handleClick(5)} />
        <Circle value={circles[39]} onColumnClick={() => handleClick(6)} />
      </div>
      <div className="board-row">
        <Circle value={circles[2]} onColumnClick={() => handleClick(0)} />
        <Circle value={circles[8]} onColumnClick={() => handleClick(1)} />
        <Circle value={circles[14]} onColumnClick={() => handleClick(2)} />
        <Circle value={circles[20]} onColumnClick={() => handleClick(3)} />
        <Circle value={circles[26]} onColumnClick={() => handleClick(4)} />
        <Circle value={circles[32]} onColumnClick={() => handleClick(5)} />
        <Circle value={circles[38]} onColumnClick={() => handleClick(6)} />
      </div>
      <div className="board-row">
        <Circle value={circles[1]} onColumnClick={() => handleClick(0)} />
        <Circle value={circles[7]} onColumnClick={() => handleClick(1)} />
        <Circle value={circles[13]} onColumnClick={() => handleClick(2)} />
        <Circle value={circles[19]} onColumnClick={() => handleClick(3)} />
        <Circle value={circles[25]} onColumnClick={() => handleClick(4)} />
        <Circle value={circles[31]} onColumnClick={() => handleClick(5)} />
        <Circle value={circles[37]} onColumnClick={() => handleClick(6)} />
      </div>
      <div className="board-row">
        <Circle value={circles[0]} onColumnClick={() => handleClick(0)} />
        <Circle value={circles[6]} onColumnClick={() => handleClick(1)} />
        <Circle value={circles[12]} onColumnClick={() => handleClick(2)} />
        <Circle value={circles[18]} onColumnClick={() => handleClick(3)} />
        <Circle value={circles[24]} onColumnClick={() => handleClick(4)} />
        <Circle value={circles[30]} onColumnClick={() => handleClick(5)} />
        <Circle value={circles[36]} onColumnClick={() => handleClick(6)} />
      </div>
    </>
  );
}

function calculateWinner(circles) {
  const lines = [
    //Vertical possibilities
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [6, 7, 8, 9],
    [7, 8, 9, 10],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [13, 14, 15, 16],
    [14, 15, 16, 17],
    [18, 19, 20, 21],
    [19, 20, 21, 22],
    [20, 21, 22, 23],
    [24, 25, 26, 27],
    [25, 26, 27, 28],
    [26, 27, 28, 29],
    [30, 31, 32, 33],
    [31, 32, 33, 34],
    [32, 33, 34, 35],
    [36, 37, 38, 39],
    [37, 38, 39, 40],
    [38, 39, 40, 41],
    //Horizontal possibilities
    [0, 6, 12, 18],
    [6, 12, 18, 24],
    [12, 18, 24, 30],
    [18, 24, 30, 36],
    [1, 7, 13, 19],
    [7, 13, 19, 25],
    [13, 19, 25, 31],
    [19, 25, 31, 37],
    [2, 8, 14, 20],
    [8, 14, 20, 26],
    [14, 20, 26, 32],
    [20, 26, 32, 38],
    [3, 9, 15, 21],
    [9, 15, 21, 27],
    [15, 21, 27, 33],
    [21, 27, 33, 39],
    [4, 10, 16, 22],
    [10, 16, 22, 28],
    [16, 22, 28, 34],
    [22, 28, 34, 40],
    [5, 11, 17, 23],
    [11, 17, 23, 29],
    [17, 23, 29, 35],
    [23, 29, 35, 41],
    //Diagonal possibilities
    [2, 9, 16, 23],
    [1, 8, 15, 22],
    [8, 15, 22, 29],
    [0, 7, 14, 21],
    [7, 14, 21, 28],
    [14, 21, 28, 35],
    [6, 13, 20, 27],
    [13, 20, 27, 34],
    [20, 27, 34, 41],
    [12, 19, 26, 33],
    [19, 26, 33, 40],
    [18, 25, 32, 39],
    [3, 8, 13, 18],
    [4, 9, 15, 19],
    [9, 14, 19, 24],
    [5, 10, 15, 20],
    [10, 15, 20, 25],
    [15, 20, 25, 30],
    [11, 16, 21, 26],
    [16, 21, 26, 31],
    [21, 26, 31, 36],
    [17, 22, 27, 32],
    [22, 27, 32, 37],
    [23, 28, 33, 38]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (circles[a] && circles[a] === circles[b] && circles[a] === circles[c] && circles[a] === circles[d]) {
      return circles[a];
    }
    else if(circles[5] && circles[11] && circles[17] && circles[23] && circles[29] && circles[35] && circles[41]){
      return "Nobody";
    }
  }
  
  return null;
}
