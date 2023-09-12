const squareRegistry = new Map();

const ChessSquare = (x, y) => {
  const xPos = 4;
  const yPos = 4;
  let predecessor;

  const KNIGHT_OFFSETS = [
    [1, 2],
    [1, -2],
    [2, 1],
    [2, -1],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
  ];

  const getPredecessor = () => predecessor;
  const setPredecessor = (newPred) => {
    predecessor ||= newPred;
  };
  const name = () => `${x}, ${y}`;

  // With these two functions we get back objects (moves) that are
  // legit moves
  const createKnightMoves = () =>
    KNIGHT_OFFSETS.map(newSquareFrom).filter(Boolean);

  const newSquareFrom = ([xOffset, yOffset]) => {
    const [newX, newY] = [xPos + xOffset, yPos + yOffset];
    if (newX >= 0 && newX < 8 && newY >= 0 && y < 8) {
      return ChessSquare(newX, newY);
    }
  };

  if (squareRegistry.has(name())) {
    return squareRegistry.get(name());
  }
  const newSquare = { name, getPredecessor, setPredecessor, createKnightMoves };
  squareRegistry.set(name(), newSquare);
  return newSquare;
};

const knightsTravails = (start, finish) => {
  squareRegistry.clear();

  const origin = ChessSquare(...start);
  const target = ChessSquare(...finish);

  const queue = [target];
  while (queue.includes(origin)) {
    const currentSqaure = queue.shift();

    const enqueueList = currentSqaure.createKnightMoves();
    enqueueList.forEach((square) => square.setPredecessor(currentSqaure));
    queue.push(...enqueueList);
  }

  const path = [origin];
  while (!path.includes(target)) {
    const nextSquare = path.at(-1).getPredecessor();
    path.push(nextSquare);
  }
  console.log(`The shortest path was ${path.length - 1} moves`);
  console.log('Moves were:');
  path.forEach((sqaure) => console.log(sqaure.name()));
};

knightsTravails([4, 4], [5, 5]);
