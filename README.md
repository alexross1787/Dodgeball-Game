# Dodgeball-Game

Click the 'Start' button to start the game. 

The goal of the game is to avoid the red balls and catch as many blue balls as you can. You only get points for catching blue balls. Use the left and right arrow keys to move the character. 

'Points' will keep track of your score and 'High Score' will save the highest score gained. 

Once the character is hit with a red ball the game is over. To play again click the 'Play Again' button. 



SetInterval Bug:
SetInterval checks the collisions between the ball and the character. When I restart the game with the spacebar event listener it checks the collisions more often instead of staying the same(when the blue ball hits it counts 500+ points instead of the normal 300 points). 
