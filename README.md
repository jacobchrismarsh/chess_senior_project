# Senior Project
## Gaston Aganza and Jacob Marshall
### Advised by Philip Nico 

# Ideas
- [ ] Chess timer
- [ ] Next best move
- [ ] Hints
- [ ] Warning when you make a bad move
- [ ] Multiplayer via firebase

# First Quarter Accomplishments
- Main UI is set up
- Front end communicates with back end 
- Players can move chess pieces within the UI and capture other pieces
- The back end can connect to a chess engine and query it for moves

# Second Quarter Goals
## Week 1
- **Gaston**: Find a way to grab chess key position and send it to back end in square
notation.
- **Jacob**: Convert square notation into algebraic notation. Query the engine for the best
move, return a response to the front end.

## Week 2
- **Gaston**: Send the currently selected piece to the back end. The back end will find all
possible moves for that piece, and front end will highlight all the squares the piece
can move to.
- **Jacob**: Brute-force search the board for all possible moves, return a list back
to the front end. (Bonus: show all the pieces attacking a square that a user wants 
to move to).

## Week 3
- **Gaston**: Implement chess timers that users can interact with. Decide whether or not
the actual timing logic should be in the front end or back end. 
- **Jacob**: By this point we should have all the logic necessary for a Player vs Computer
chess game, so let's get that working pretty thoroughly. Make sure back end supports
all the necessary database calls.

# Week 4
- **Gaston**: Create a user page that allows active players to find other active players.
- **Jacob**: Implement some kind of game-code system that allows a host to start a game,
and a second player to find that game and join it. Figure out how timers are supposed 
to work with this structure. 

# Week 5
- **Gaston**: Create user profiles where players can see their past games 
(and active games?).
- **Jacob**: Update back end to support the database calls necessary for multiplayer 
play.

# Week 6
- **Gaston**: Wrap up login page, user profiles, multiplayer search, and game board
into one cohesive experience. 
- **Jacob**: Create integration tests that check the whole user experience, specifically 
surround the actual Player vs Computer and Player vs Player gameplay

# Week 7
- **Gaston**: Polish things up
- **Jacob**: Polish things up


# 2nd Quarter Summary
Overall this is 6 solid weeks of work set out for us. If everything goes according to 
plan, we finish with time to spare. Since things rarely go to plan, however, this 
provides us 4 weeks of buffer time to fix any outstanding issues and polish everything 
up.
