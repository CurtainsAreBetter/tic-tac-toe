class Game{
    constructor() {
        this.board = [];
        // didn't want to type out a 2d grid
        for (let i = 0; i < 3; i++){
            this.board.push(['','','']);
        }
        // current player starts as X
        this.currentPlayer = 'X';
    }
    // get and # learned from the mdn class docs
    // get acts like a parameter
    // # makes a function 'private'
    get pieceCount() {
        return this.board.reduce((total, row) => {
            return total + row.filter(p => p).length;
        }, 0);
    }
    // copied the constructor
    reset() {
        this.board = [];
        for (let i = 0; i < 3; i++){
            this.board.push(['','','']);
        }
        this.currentPlayer = 'X';
    }
    
    // private to test out private methods ngl
    // doing y, x because that's the order when it comes to a 2d array

    // returns true if plcaed, false if unable to place
    #placePiece(y, x) {
        // check if place is already taken
        if(this.board[y][x]){
            return false;
        } else {
            this.board[y][x] = this.currentPlayer;
            return true;
        }
    }
    makeMove(y, x) {
        if (this.currentPlayer == 'X' && this.#placePiece(y, x)){
            // x was placed by the function in the if statement
            this.currentPlayer = 'O';
            return true;
        } else if(this.currentPlayer == 'O' && this.#placePiece(y, x)){
            this.currentPlayer = 'X';
            return true;
        } else {
            // bad move was made (box is already full)
            return false;
        }
    }
    
    // utility to check if an array counts as a win
    #arrIsWin(arr, piece) {
        return arr.filter(p => p == piece).length == 3;
    }

    checkForWin() {
        // Horizontal wins
        for(const row of this.board) {
            if (this.#arrIsWin(row, 'X')) {
                return 'X wins';
            } 
            if (this.#arrIsWin(row, 'O')) {
                return 'O wins'
            }
        }
        // Vertical wins
        for(let i=0; i<3; i++) {
            const tmpArr = [this.board[0][i], this.board[1][i], this.board[2][i]];
            if (this.#arrIsWin(tmpArr, 'X')) return 'X wins';
            if (this.#arrIsWin(tmpArr, 'O')) return 'O wins';
        }
        // Diagonal wins
        // \
        const leftToRightDiag = [this.board[0][0], this.board[1][1], this.board[2][2]];
        // /
        const rightToLeftDiag = [this.board[2][0], this.board[1][1], this.board[0][2]];
        if (this.#arrIsWin(leftToRightDiag, 'X') || this.#arrIsWin(rightToLeftDiag, 'X')) {
            return 'X wins';
        }
        if (this.#arrIsWin(leftToRightDiag, 'O') || this.#arrIsWin(rightToLeftDiag, 'O')) {
            return 'O wins';
        }

        // if logic has made it this far
        // it's either a tie or nobody has won yet
        if (this.pieceCount == 9) {
            return 'Tie game';
        }
        return false; // nobody has won yet
    }
}