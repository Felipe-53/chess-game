# Glossary

### The language that describes the system

In order to successfully design and implement the business rules of a system, we need a rigorous and clearly defined language that elegantly describes it. What follows is the language used in this project.

The terms that appear in the **source code** have their meaning precisely (to my best effort) defined here.

**position**: a pair of coordinates defining a piece's position on the board.

**move**: one of the possible ways a piece can switch its position on the board. A _capture_ is also a _move_.

**path**: a set of neighboring board positions that has a 1-square width. Think about the diagonals of a bishop or the straight lines of a rook. The concept of _path_ is used to describe the ways in which a piece can move.

**capture**: we say that a piece is captured when a move is made such that this piece's new position is the same some opponent's piece. In such case, the opponent's piece is removed from the game.

**(to be) Threatened (a piece)**: referring to a single piece on the board, it is a condition in which there exists at least one opponent piece's **move** such that if this move were performed it would result in the piece being captured.

This concept is specially useful for the **king** because the two MAJOR rules of the chess are defined is terms of it.

1. You cannot make a move that will make you king _threatened_ (in this case **doomed** actually, because it's the opponent's turn to play).

2. If you king is threatened and it's you turn to play (_check_ condition), the only _valid moves_ are the ones that will make this condition disappear. If no such _move_ exists, you loose the game (_checkmate_).

In other words, you CANNOT put your king in a **doomed** position, meaning is it threatened and it is the opposing player's turn. The game is won by bringing the board to a configuration such no matter what move you make, yot king WOULD be _doomed_ in the next turn.

**chess condition**: either _normal_, _check_, or _checkmate_.

**possible move**: one of the movements a piece is capable of without considering the _chess condition_.

**valid move**: One of the movements a piece is capable of that DOES NOT make the player's king to be threatened.

**state**: a particular arrangement of pieces on the board is called a _state_.

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

Each piece has a specific set of rules for moving, that takes into consideration the board as well as the other pieces. The set of all the moves a piece is capable of considering those is called _possible moves_ (see Glossary).

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
