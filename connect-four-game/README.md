# connect-four-game

This React app is a game of connect four, played on a standard board. This was in my early days of learning react and so we did not utilize a backend or routes at all. We were given free reign on how to execute the app, so I chose to build out the win conditions in a pattern after designing the array layout of the board. I used brute force and mapping out a drawing to ensure I knew all the patterns that would work, then confirmed my calculated amount with the internet. 

One challenge of this assignment was trying to get the pieces to drop to the correct location after clicking on any point of the columns. Since we were required to only use one single dimensional array, this was especially difficult as I had never really used React before, but I found some help online and was able to ensure that no matter where someone clicks on a column, it only went to the lowest empty point on the column unless it was full.

Visually, I chose to use the emoji of a red and blue circle, but early on, they were getting cut off from the edges, so they didn't look like a full circle. After some assistance from a classmate, I found that changing the CSS could fix that, so now it looks as good as it ever did.

Here is what the very beginning of standard play would look like, each player taking turns selecting a column in which they can play.

![image](https://github.com/KobyBy/github-portfolio/assets/112783034/d4fae4f5-6152-4f96-bb99-54059911df01)

Here is a win for one player, when they manage to get 4 in a row at any point on the board.

![image](https://github.com/KobyBy/github-portfolio/assets/112783034/d78537d1-4961-4515-b639-400fd2f35482)

I even accounted for a tie condition, although this is remarkably unlikely which I discovered plenty of times in testing, when I would consistently fail to trigger the tie condition. 

![image](https://github.com/KobyBy/github-portfolio/assets/112783034/2a0bd273-37c8-49fc-a649-cbdfac43b898)
