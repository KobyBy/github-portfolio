#speed-game

Along with two groupmates, we designed an application of California Speed. In this game, 8 piles are placed and each player has a hand which they don't look at. The goal is to move the cards as fast as possible from your own hand into the piles whose top card is visible in more than one place. 

Each player must first play in the four piles closest to them. Once all 8 piles have cards, then either player can play on any of the 8 piles. If there are at least 2 cards of the same value visible, then those are where the player have to place their top cards as fast as possible. If there are no cards of the same value visible, then the players must shuffle their own 4 piles back into their hands and the 8 piles must be replenished. This game rewards speed of hand, as whoever's hand reaches 0 cards first wins. It also rewards strategy, as when the cards are reshuffled into your hands, you take the piles closest to you, so you'd like to be placing as many of your cards into the far piles as possible.

My part in this project was largely to implement the rules and ensure the logic was functional on the frontend. I ensured there was a win condition, and we have a game history which pulls based on the name a player gives at the end of their game. My other groupmates focused on the web sockets part which would enable us to play the game from two separate devices, and the implementation of the database which would store the game history.

![image](https://github.com/KobyBy/github-portfolio/assets/112783034/aacc2386-d569-42a7-ac50-5b843eba6a01)

Above is an example of standard gameplay from both players' perspectives.

![image](https://github.com/KobyBy/github-portfolio/assets/112783034/1f506cee-1290-46c8-b529-b1ce217f7c2a)

Here is what occurs when there are no valid plays, since all matches have been covered and now no matching cards remain.

![image](https://github.com/KobyBy/github-portfolio/assets/112783034/b4cb4bf0-69aa-47f2-ad3a-5c141d58c20f)

Here is what is triggered when one player runs out of cards, the winner is announced, and the player names are requested for records.

![image](https://github.com/KobyBy/github-portfolio/assets/112783034/de4a6720-109f-430d-8a41-2f8172d14ef1)

After the players input their names, if their names match any on record, those histories appear with the dateTime stamp of their games, the result, and how many cards remained in the losing player's hand.
