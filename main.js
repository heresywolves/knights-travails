function knightMoves(from, to) {}

class Space {
  constructor() {
    this.taken = false;
    this.row = 0;
    this.column = 0;
  }
}

class Board {
  constructor() {
    this.spaces = [];
  }

  generateBoard() {
    for (let i = 0; i < 8; i++) {
      const row = [];
      for (let k = 0; k < 8; k++) {
        const space = new Space();
        space.row = i;
        space.column = k;
        row.push(space);
      }
      this.spaces.push(row);
    }
  }

  logBoard() {
    if (this.spaces.length === 0) {
      return console.log('No board is generated');
    }
    for (let i = 7; i >= 0; i--) {
      let rowString = `${i}  `;
      for (let j = 0; j < 8; j++) {
        if (this.spaces[i][j].taken) {
          rowString += '[X]  ';
        } else {
          rowString += '[ ]  ';
        }
      }
      console.log(rowString);
      console.log('\n');
    }
    console.log('    0    1    2    3    4    5    6    7');
    console.log('\n');
  }

  move(position) {
    const column = position[0];
    const row = position[1];
    for (let i = 7; i >= 0; i--) {
      for (let j = 0; j < 8; j++) {
        if (
          this.spaces[i][j].row === row &&
          this.spaces[i][j].column === column
        ) {
          if (this.spaces[i][j].taken) {
            console.log('this space is taken');
            return;
          }
          this.spaces[i][j].taken = true;
          return;
        }
      }
    }
    console.log('no such space found');
  }
}

const board = new Board();
board.generateBoard();
board.logBoard();
board.move([1, 1]);
board.move([1, 3]);
board.move([2, 3]);
board.move([7, 7]);

board.logBoard();
