This is my own version of the boardgame Memory executed as a webgame.

Description: 
Players can turn cards on the bard to reveal famous figures from Belgian politics. Revealing 2 identical cards eliminates them from the game. The game ends when all cards have been eliminated.
In the meantime a timer keeps track of how long the game has been running. At the end of the game, the player receives a summary of the game (with the order and time each card was revealed), as well as a short, humurous description of the politicians in question.

Execution:
This was my very first foray into programming something interactive, so its execution was rather simple and naive. Cards are simple HTML-elements with data values attached to them. Animations are executed in javascript.
A javascript array keeps track of the order in which the cards are dealt. We perform a Fisher-Yates shuffle on this array to amke sure they are randomly distributed. 
