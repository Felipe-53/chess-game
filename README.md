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

### Check

A check is a special condition in which the opponent's King is threatened, meaning that if nothing is done about it, you are in a position such that you could take the king of you opponent in the next move. In the case, the opposing player MUST make one of the possible moves that will spare his king.

### End condition: check mate

The game end when one of the players is in a position such that, no matter what moves he makes, there will be a way for the other player to take over their piece.

### Representing the board: two approaches

I guess we could either represent the board by a 8x8 matrix or using a sparse data structure.

#### 1. Matrix

The matrix approach would require an array of arrays. It would the elements would wither be pieces or empty, of course. The problem is that the board could, at most, be half filled. And as the game progresses there will be less and less pieces.

#### 2. Sparse Data Structure

Only the actual pieces are accounted for. A hashmap of coordinates (i, j) to pieces gives a full description of the board.

### Glossary

**position**: a pair of coordinates defining a piece's position on the board.

**move**: one of the possible ways a piece can switch its position on the board. A _capture_ is also a _move_.

**capture**: when one of the opponents pieces are taken by means of making a move such that this piece new position is the same as the opponent's one. In such case, the opponent piece is removed from the game.

**(to be) Threatened (a piece)**: referring to a single piece on the board, it is a condition in which there exists an opponent piece's **move** such this move places this opponent's piece at the same spot as the one piece we're considering.

This concept is specially useful for the king because the two MAJOR rules of the chess are defined is terms of it.

1. You cannot make a move that will make you king _threatened_ (in this case **doomed** actually, because it's the opponent's turn to play).

2. If you king is threatened (and you turn to play, of couse, see tule #1), the only _valid moves_ are the ones that will make this condition disappear. If no such _move_ exists, you loose the game.

In other words, you CANNOT put your king in a **doomed** position, meaning is it threatened and it is the opposing player's turn. The game is won by bringing the board to a configuration such no matter what move you make, yot king WOULD be _doomed_ in the next turn.
