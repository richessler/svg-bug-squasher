SVG Bug Squasher Submission for Richard Hessler
============

## To Start
- Enter the directory of the application, in this case:
    `bug_squash_express_node`
- Start the application with:
    `node app`
- If you have install the package `nodemon` you may use:
    `nodemon`
  to begin the application

## Gameplay Requirements
- The game should have an infinite series of levels
- There should be a running score that increases as bugs are squashed.
- Levels should have a set time limit
- Each level should get progressively harder
- Bugs will appear on the left side of the playing screen in random locations, and make their way to the right side of the playing screen
- Clicking on a bug should kill it and give the user points.
- If a bug reaches the right side of the playing screen without getting squashed, the player loses
- There should be three different types of bugs:
  - Each bug should have its own SVG graphics
  - There should be an easy, medium, and hard bug. For example, the easy bug could be large and slow, while the hard bug is small, fast, and have unpredictable movement. Harder bugs should be worth more points.
- The game should keep track of the top 10 scores.

## Other Requirements for Project Completion
- The player should see a welcome screen that displays game instructions and the high scores.
- A player should be able to start a new game from the welcome screen.
- After each level, the game should pause and ask the player to continue to the next level.
- If a player loses, they should see a "Game Over" message along with their final score.
- At the end of a game, if the player has a top 10 score, ask them to enter their name and save it to the high score board.
- At the end of a game, the player should return to the welcome screen

## Guidelines
- Graphics for bugs need to be in SVG.
- You are free to use whatever client side libraries you want.
- The server-side code should be written in Node.js. You can use any 3rd party modules you want.
- The top 10 scores can be stored in memory. No database persistence necessary.
- We'll be judging your UI and design skills. Make it easy to play. Try to make it look good too, but we understand you have limited time.

## Additional Libraries/Technology Used
- Express to support the Node application
- [Enchant.js](https://github.com/wise9/enchant.js) Library

