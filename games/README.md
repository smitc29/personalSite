# Match3_HTML

## I'm working on this to develop a sample for a match-3 tile game for the sake of it ##

* 08/02/2020 - Fewer Black tiles appear, granting players more freedom when making combinations
* 07/27/2020 - Got White tiles to function properly, feels like a big step forwards
* 07/19/2020 - Made Orange skill button slightly more useful/powerful, planning on making a few more quick changes
* 07/15/2020 - Added 'Swap Tile' purple button skill, added 'Drop Tiles' green button skill, aiming to complete Yellow button skill soon
* 01/06/2020 - Balanced 'Primer' button skill and added animation to it
* 12/18/2019 - Implemented 'Primer' button ability for setting up combos, will need to balance it but it works
* 12/18/2019 - Hint system reworked to be more reliable in general
* 12/17/2019 - Removed bug where occasionally player sees expander animation mid-game, used 'intro' class on tiles
* 12/10/2019 - Developed a 'Freeze' power that lets players make illegal moves and set up combos for 10 seconds
* 12/10/2019 - Developed system for regenerating 'super moves' by matching tiles relevant to each of the buttons
* 12/10/2019 - Changing scoring algorithm to significantly reward longer combos over smaller ones, added clause to valid move checker for implementing Freeze power
* 12/9/2019 - Players can no longer make moves that don't result in a combo; hints still appear for players, though
* 12/2/2019 - Developed Hint system for players, need to update function to Force board to reset if there's no valid moves detected
* 12/2/2019 - Tweaked Reset Board button functionality for greater convenience
* 10/11/2019 - Got board resetting function/button to work properly
* 10/10/2019 - Prevents players from swapping tiles diagonally or further than 1 tile away
* 10/9/2019 - Made vanishing 'ghosts' for pieces that have just been removed from the grid to indicate that they've just been cleared
* 10/9/2019 - Removed animations for the moment to ensure game logic worked. Trying to get animations to cooperate with grid mechanics, will take time to figure out animations syncing with mechanics
* 10/7/2019 - Got matching mechanics to work properly, grid realizes when combos are made then creates new tiles to fill grid
* 10/4/2019 - Made comboPresent() return webelements instead of strings, resetting board no longer comes with preset combos;
* 10/4/2019 - Board acknowledges matches made and animates them. Need to implement tiles changing color based on above tiles, and animating tiles that are above them as well. 
* 10/3/2019 - Made animations for switching tiles, function for listing tiles to be removed from combos in console log


