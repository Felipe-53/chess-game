# Implementation notes

The following is the notes I took while implementing the program. They serve the purpose of building a mental model of the system and guide its development.

### The elements of the game

1. A board

2. Pieces

3. Players

### Turns

So one basic concept is the concept of a _turn_.
A turn is simply the time one of the players makes a move.
The game is played with players alternating turns.

### Moves

Each piece has a specific set of rules for moving.

### Capturing

If a player makes a move such that their piece lands in the same spot as any of the opponents pieces, that piece is removed from the game.

### End condition: check mate

The game end when one of the players is in a position such that, no matter what moves he makes, there will be a way for the other player to take over their piece.

### Representing the board: two approaches

I guess we could either represent the board by a 8x8 matrix or using a sparse data structure.

#### 1. Matrix

The matrix approach would require an array of arrays. It would the elements would wither be pieces or empty, of course. The problem is that the board could, at most, be half filled. And as the game progresses there will be less and less pieces.

#### 2. Sparse Data Structure

Only the actual pieces are accounted for. A hashmap of coordinates (i, j) to pieces gives a full description of the board.
