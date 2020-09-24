/*eslint-env browser*/
/* eslint-disable no-console */ //Enables console output
// Written by smitc29 / Christopher Smith

/* Romoves selection status from all tiles */
function deselectAll()
{
    var list = document.getElementsByClassName("Selected");
    var i = 0;
    
    // Go through all Selected tiles and deselect them    
    for(i = 0; i < list.length; i++)
    {
        list[i].style.animationDuration = "0s";
        list[i].classList.remove("Selected", "VanishCombo");   
        //list[i].style.borderColor = "darkgrey"; 
    } // end For loop
    
    list = document.getElementsByClassName("Square");
    for(i = 0; i < list.length; i++)
    {
        list[i].style.borderColor = "darkgrey"; 
    } // end For loop

} // End of function deselectAll()

/* Mouse is being lifted on this panel */
function switchMe(item)
{
   // Prevent players from moving while moves are being resolved/animating
    if(document.getElementById("Board").classList.contains("Wait"))
    {
        return false;
    }
    
    var select = document.getElementsByClassName("Selected")[0];
    var temp, temp2, i = 0;
  
    if(0 < select.length < 2 && !item.classList.contains("Selected"))
    {
      
        // Copy 2nd element of selected tile
        //console.log("Selected: " + select.classList);
        //console.log("Current: " + item.classList + "\n");
        select.classList.remove("Selected");
        temp = tileColor(select);
        temp2 = tileColor(item);
        select.style.animationDuration = "0s";
        item.style.animationDuration = "0s";
        
        // Verify the classlists aren't equal; if they are, immediately cancel this function
        if(temp2 == temp)
        {
            console.log("Can't swap identical tiles!");
            return false;
        }
        
        // Verify that the tiles aren't more than 1 tile apart
        var myX = parseInt(item.id.substring(1,2));
        var myY = parseInt(item.id.substring(4,5));
        var selX = parseInt(select.id.substring(1,2));
        var selY = parseInt(select.id.substring(4,5));
        if(Math.abs(myX - selX) + Math.abs(myY - selY) > 1)
        {
            console.log("Tiles must be adjacent! " + item.id + " v " + select.id);
            return false;
        }
 
        // Add selected tile's color to current tile; save current tile color to end of selected tile's list
        item.classList.add(temp);
        select.classList.add(temp2);
        
        // Remove the 2nd element from each list
        select.classList.remove(temp);
        item.classList.remove(temp2);
        //console.log("Selected: " + select.classList);
        //console.log("Current: " + item.classList);
        
        deselectAll();       
        visibleSwap(item, select);
        
        // If no matches are made, lock the player and reset the tiles
        if(comboPresent() < 1 && !document.getElementById("Board").classList.contains("Freeze"))
        {
           // Reset tile poisitons and force user to wait a moment
            console.log("No combo was made, try to revert that move!"); document.getElementById("Board").classList.add("Wait");
            
            setTimeout(function(){
                item.classList.add(temp2);
            select.classList.add(temp);

            // Remove the 2nd element from each list
            select.classList.remove(temp2);
            item.classList.remove(temp);
            visibleSwap(item, select);
                
                setTimeout(function(){
                 // After 200ms 
                 document.getElementById("Board").classList.remove("Wait");
                 console.log("Control returned to player");
                }, 200);
                  
            }, 200);
                     
        } // End of IF statement
        
        // If Board is frozen, bypass this section entirely
        if(!document.getElementById("Board").classList.contains("Freeze"))
        {
            
            // Verify if matches have been made (At regular intervals)
            myX = 200;
            var winCheck = setInterval(function() 
            {
                temp = comboPresent();
                if (temp.length > 0) 
                {
                    resolveCombos(temp);
                    myX = 800;
                }
                else
                {
                    clearInterval(winCheck);
                }
            }, myX);
            
        } // End of Freeze check
             
    }
    else
    {
        return false; // There's 0 or 2+ selected tiles, don't swap
    }
     
    deselectAll();
    
} // End of function switchMe()

/* Takes 2 tiles and makes it appear as though they're switching places */
function visibleSwap(tile1, tile2)
{
    // set tiles to not transition while they're being moved to new location
    tile1.style.transitionDuration = "0s";
    tile2.style.transitionDuration = "0s";
    
    tile1.style.animationDuration = "0.2s";
    tile1.style.animationDelay = "0s";
    tile2.style.animationDuration = "0.2s";
    tile2.style.animationDelay = "0s";
    
    // Grab tile 1 & tile 2 X/Y values
    var tile1X = parseInt(tile1.id.substring(1,2));
    var tile1Y = parseInt(tile1.id.substring(4,5));
    var tile2X = parseInt(tile2.id.substring(1,2));
    var tile2Y = parseInt(tile2.id.substring(4,5));
    
    // If tile 1 is left of tile 2
    if(tile1X < tile2X)
    {
        //console.log("Animate itemX < selX");
        tile1.classList.add("LeftShift");    
        tile2.classList.add("RightShift");  
    }
    else if(tile1X > tile2X) // tile1 right of tile2
    {
        //console.log("Animate itemX > selX");    
        tile1.classList.add("RightShift");
        tile2.classList.add("LeftShift");  
    }
    // If tile 1 is below tile 2
    if(tile1Y < tile2Y)
    {
        //console.log("Animate itemY < selY");
        tile1.classList.add("UpShift");
        tile2.classList.add("DownShift");         
    }
    else if(tile1Y > tile2Y) // tile1 above tile2
    {
        //console.log("Animate itemY > selY");
        tile1.classList.add("DownShift");
        tile2.classList.add("UpShift");  
    }
    
    // Remove shifting animation
    setTimeout(function(){
        tile1.classList.remove("RightShift", "LeftShift", "UpShift", "DownShift");
        tile1.style.animationDuration = "0s";
        tile2.classList.remove("RightShift", "LeftShift", "UpShift", "DownShift");
        tile2.style.animationDuration = "0s";
    }, 200);
     
} // end of function visibleSwap()

/* Determines if there's any matches in the grid, then returns the tiles (Webelements) in valid combos */
function comboPresent()
{
    document.getElementById("Board").classList.add("Wait");
    
    // Gather all tiles
    var row = 0, col = 0, combo = 0;
    var color = " ";
    var tile;
    var removeUs = [];
    
    // Determine if there's any possible matches at the moment
    // Col is horizontal space, row is vertical space
    // Horizontal Checks
    for(row = 0; row < 8; row++)
    {
       color = " "; // Reset color after each row!          
       for(col = 0; col < 8; col++)
        {
            // Grab the current tile and see if its the same as the last color; if so, note it and keep going, otherwise set it as the new color
            tile = document.getElementById("[" + col + "][" + row + "]");
            
            // Is this the same as the last tile's color?
            if(tile.classList.contains(color))
            {
                combo++;
            }
            else // Not the same as last tile
            {
                // Reset color and combo chain
                color = tileColor(tile);
                combo = 0;
                
            } // End else statement
            
            
            if(color.length > 1 && combo > 1)
            {
                if(!document.getElementById("Board").classList.contains("Reset"))
                    {
                    console.log(color + " combo ROW length: " + (combo+1) + " from [" + (col-combo) + "," + row + "] to [" + (col) + "," + row + "]");
                    }
                removeUs.push(tile);
            }
            
            // The 1st time a combo hits 3 tiles add last 2 tiles
            if(combo == 2)
            {
                removeUs.push(document.getElementById("[" + (col-1) + "][" + row + "]"));
                removeUs.push(document.getElementById("[" + (col-2) + "][" + row + "]"));
            }
        } // End of column loop          
    } // End of row loop
    
    // Horizontal Checks
    for(col = 0; col < 8; col++)
    {
       color = " "; // Reset color after each column!          
       for(row = 0; row < 8; row++)
        {
            // Grab the current tile and see if its the same as the last color; if so, note it and keep going, otherwise set it as the new color
            tile = document.getElementById("[" + col + "][" + row + "]");
            
            // Is this the same as the last tile's color?
            if(tile.classList.contains(color))
            {
                combo++;
            }
            else // Not the same as last tile
            {
                // Reset color and combo chain
                color = tileColor(tile);
                combo = 0;
                
            } // End else statement
            
            // If color is null/nonexistant, return empty list
            if(color == null)
            {
                return [];
            }
            
            if(color.length > 1 && combo > 1)
            {
                if(!document.getElementById("Board").classList.contains("Reset"))
                {
                   console.log(color + " combo COLUMN length: " + (combo+1) + " from [" + (col) + "," + (row-combo) + "] to [" + (col) + "," + row + "]");
                }
                removeUs.push(tile);
            }
            
            // The 1st time a combo hits 3 tiles add last 2 tiles
            if(combo == 2)
            {
                removeUs.push(document.getElementById("[" + (col) + "][" + (row-1) + "]"));
                removeUs.push(document.getElementById("[" + (col) + "][" + (row-2) + "]"));
            }
        } // End of row loop          
    } // End of column loop
    
 if(!document.getElementById("Board").classList.contains("Reset") && removeUs.length > 0)
    {
        // Verify that this list always has at least 3 of one number
        console.log("\n Remove these tiles: ");
        console.log(removeUs);
             
    } // End of console output
    
    document.getElementById("Board").classList.remove("Wait");
    return removeUs;
       
} // End of function comboPresent()

/* Remove all color classes from provided tile */
function removeColors(tile)
{
    tile.classList.remove("Red", "Blue", "Yellow", "Green", "Purple", "Orange");
} // End of function removeColors()

/* Takes a tile and assigns it a color at random, weighted towards Red, Blue, and Yellow */
function assignColor(tile)
{
    var ran = Math.ceil(Math.random() * 14);
            
        // Color in the grid randomly    
        switch(ran) {
          case 14:
            tile.classList.add("Yellow");
            break;
          case 13:
            tile.classList.add("Purple");
            break;
          case 12:
          case 11:
          case 10:
            tile.classList.add("Green");
            break;
          case 9:
          case 8:
          case 7:
            tile.classList.add("Orange");
            break;
          case 6:
          case 5:
          case 4:
            tile.classList.add("Blue");
            break;
          default:
            tile.classList.add("Red");
            break;
        
        } // End switch 
    
} // End of function assignColor()

/* Visibly switch the tiles provided in this function */
function swapSelection(item)
{
    var lastChoice = document.getElementsByClassName("Selected")[0];
    var lastX = parseInt(lastChoice.id.substring(1,2));
    var lastY = parseInt(lastChoice.id.substring(4,5));
    console.log("Last pick was " + lastX + "-" + lastY);

    // Compare last selected item with this item's X/Y values; if 2 or more apart, deselect
    var myX = parseInt(item.id.substring(1,2));
    var myY = parseInt(item.id.substring(4,5));
    if(Math.abs(myX - lastX) + Math.abs(myY - lastY) > 1)
   {
       deselectAll();
       item.classList.add("Selected");
       item.style.animationDelay = "0s";
   } 
    
} // end of function swapTiles()


/* Remove all tiles relevant to combos, shift all tiles above them downwards, fill in empty tiles, then verify that there's no combos present */
function resolveCombos(list)
{
    document.getElementById("Board").classList.add("Wait");
    
    if(list.length < 3)
    {
        document.getElementById("Board").classList.remove("Wait"); 
        return false;
    }
    
    console.log("Resolving combos!");
    var results = [];
    var i = 0, j = 0, myX = 0, myY = 0, temp = [], temp2 = [];
    
    // Go through the list and store which color each tile is
    for(i = 0; i < list.length; i++)
    {  
        results.push(tileColor(list[i]));
        makeParticle(list[i]);
    } // End of For loop
     
    // Trigger tiles to switch colors HERE
    resolveBoard(list);
    
    // Function that fills in the empty tiles on the top of the board
    fillInEmptyTiles();
    
    // Handle scoring here?
    console.log(results);
    
    superMeterRefill(results); // Handled in match3.js
    
    var score = parseInt(document.getElementById("Message").innerHTML);
    score += Math.pow(2, results.length);
    document.getElementById("Message").innerHTML = score;
    
    document.getElementById("Board").classList.remove("Wait");
    
    return results;
    
} // end of function resolveCombos()

/* This function ACTUALLY handles the colors/values of the tiles when they're being switched */
function resolveBoard(tiles)
{
    console.log("resolveBoard()");
    
    var col = 0, row = 0, myX = 0, myY = 0, nextTile = 0, temp = 0;
    // i for columns, j for rows
    
    // Remove colors from all tiles that are part of combos;
    // This HAS to be resolved before any shifting can take place, hence the separate For loops
    for(col = 0; col < tiles.length; col++)
    {
        removeColors(tiles[col]);
    } // End For loop
    
    // Go through the grid and apply gravity to any 'hovering' tiles
    for(col = 0; col <= 7; col++)
    {
        for(row = 0; row < 7; row++)
        {
            temp = document.getElementById("[" + col + "][" + row + "]");
            nextTile = document.getElementById("[" + col + "][" + (row+1) + "]");
            
            // If current tile has color but 1 below this has no color, move it down and go back to the top-left
            if(!tileHasNoColor(temp) && tileHasNoColor(nextTile))
            {
                nextTile.classList.add(tileColor(temp));
                removeColors(temp);
                row = 0;
                col = 0;
                
            } // End if statement

        } // End vertical/row check
        
    } // End horizontal/column check
        
} // End of function resolveBoard()

/* Fill in empty tiles starting at the top of the board */
function fillInEmptyTiles()
{
    // Go through board and apply colors to blank tiles
    var temp = document.getElementsByClassName("Square");
    var col = 0;
    for(col = 0; col < temp.length; col++)
    {
        if(tileHasNoColor(temp[col]))
        {
            temp[col].style.animationDelay = "0s";
            temp[col].style.animationDuration = "0.2s";
            temp[col].classList.add("LongDrop");
            assignColor(temp[col]);  
        }
           
    } //End of For loop
    
    setTimeout(function(){
    // Go through board and remove dropping animation
    col = 0;
    for(col = 0; col < temp.length; col++)
    {    
        temp[col].style.animationDuration = "0s";
        temp[col].classList.remove("LongDrop"); 
             
        } //End of For loop
        
    }, 200); 
    
} // End of function fillInEmptyTiles()

/* Determines if a tile has no color; returns false if classlist has any colors  */
function tileHasNoColor(tile)
{
    var list = tile.classList;
    
    if(list.contains("Red"))
        return false;
    if(list.contains("Blue"))
        return false;
    if(list.contains("Yellow"))
        return false;
    if(list.contains("Orange"))
        return false;
    if(list.contains("Purple"))
        return false;
    if(list.contains("Green"))
        return false;
    
    // No conditions were met, return true!
    return true;
    
} // End of function tileHasNoColor()

/* Returns the color of the provided Tile */
function tileColor(tile)
{
    var list = tile.classList;
    
    if(list.contains("Red"))
        return "Red";
    if(list.contains("Blue"))
        return "Blue";
    if(list.contains("Yellow"))
        return "Yellow";
    if(list.contains("Orange"))
        return "Orange";
    if(list.contains("Purple"))
        return "Purple";
    if(list.contains("Green"))
        return "Green";
    
    // No conditions were met, return true!
    return false;
     
} // End of function tileColor()

/* Create a 'particle' effect when a tile is added to a combo at specified tile */
function makeParticle(tile)
{
    var part = document.createElement("p");
    document.getElementById(tile.id).appendChild(part);
    part.style.backgroundSize = "cover";
    part.style.zIndex = "20";
    part.style.position = "relative";
    part.style.height = "100%";
    part.style.width = "100%";
    part.style.top = "-35%";
    part.classList.add(tileColor(tile));
    part.classList.add("ghost");
    part.style.opacity = 1;

    
    // Animate shapes moving towards center top of board
    var left = 37.5;
    
    if(!isNaN(parseFloat(tile.style.left)))
    {
        left = (50 - parseFloat(tile.style.left)) * 3;
    }
    else
    {
        left = 37.5;
    }

    $(".ghost").ready(function(){
        $(".ghost").animate({top: '-600%', left: left, opacity: 0}, 1000);
    });
    
    setTimeout(function(){
        part.remove();
    }, 1000); 
     
} // End of function makeParticle()

/* Effect for resetting board with >0 score */
function RedWipe()
{
    var score = parseInt(document.getElementById("Message").innerHTML);
    var opacity = parseFloat(document.getElementsByTagName("button")[1].style.opacity);
    
    if(score > 0 && opacity < 1)
    {
        console.log("You can't use this skill right now!");
        return false;
    }
    
    if(score <= 0)
    {
        return false; // This shouldn't appear to do anything
    }
    
    // Apply the wiper to the Board
    var part = document.createElement("div");
    document.getElementById("Board").appendChild(part);
    part.id = "WipeBoard";
    setBoard();
    
    // Reduce the button's opacity, and ability to spam this function 
    document.getElementsByTagName("button")[1].style.opacity = 0.05;
    
    // Remove border indicating move can be used
    document.getElementsByTagName("button")[1].style.borderColor = "white";
    
    /*part.style.width = "100%";
    part.style.height = "100%";
    part.style.zIndex = "99";
    part.style.position = "absolute";
    part.style.top = "0%";
    part.style.left = "0%";
    part.style.margin = "-50 0 0 0";*/
    
    setTimeout(function(){
        part.remove();
    }, 1000); 
    
} // End of function RedWipe()

// Immobilize the pieces on the board for the next 3 tile swaps
function blueFreeze()
{
    var button = document.getElementsByTagName("button")[2];
    // Make sure button is actually fully ready for use
    if(parseFloat(button.style.opacity) < 1 && button.innerHTML == "Freeze Board")
    {
        console.log("This power isn't ready to use yet!");
        console.log(parseFloat(button.style.opacity));
        return false;
    }
    
    // Apply Freeze class to the board and commence a countdown that will expire in 10 seconds
    document.getElementById("Board").classList.add("Freeze");
    
    // Update the count down every 1 second
    
    var timeLeft = 10;
    var x = setInterval(function() {

  // Set button to display time left in freeze
  button.innerHTML = " &nbsp - &nbsp - &nbsp" + (timeLeft-1) + "&nbsp - &nbsp - &nbsp ";
  timeLeft--;

  // If the count down is finished, reset button text
  if (timeLeft < 1) {
    clearInterval(x);
    button.innerHTML = "Freeze Board";
      button.style.opacity = 0.05;
      button.style.borderColor = "white";
    document.getElementById("Board").classList.remove("Freeze");
  }
}, 1000);
    
    
    
} // end of function blueFreeze()

/* If there's no matches that can be made, reset the board */
function preventDeadlock()
{
    // If Hint button is active, turn on black outlines for tiles that can create combos
    
    // Go through all non-edge tiles and verify if they can be moved to make a combo
    var moveCount = 0;
    var count = 0, color = "Red";
    var col = 1;
    var row = 1;
    var current = document.getElementById("[1][1]");
    var BackMe = document.getElementById("[1][0]");
    var optA = document.getElementById("[0][2]");
    var optB = document.getElementById("[2][2]");
    var optC = document.getElementById("[2][2]");
    
    // Going down each row, Y values
    for(row = 1; row < 7; row++)
    {
        // Going right each column, X values
        for(col = 1; col < 7; col++)
        {
            count = 0;
            current = document.getElementById("[" + col + "][" + row +"]");
            
            //Check current tile vs (Y-1)(X-1,Y+1)(X+1,Y+1)
            BackMe = document.getElementById("[" + col + "][" + (row-1) +"]");
            optA = document.getElementById("[" + (col+1) + "][" + (row+1) +"]");
            optB = document.getElementById("[" + (col-1) + "][" + (row+1) +"]");
            moveCount += possibleMove(current, BackMe, optA, optB);
            
            //Check current tile vs (Y+1)(X-1,Y-1)(X+1,Y-1)
            BackMe = document.getElementById("[" + col + "][" + (row+1) +"]");
            optA = document.getElementById("[" + (col+1) + "][" + (row-1) +"]");
            optB = document.getElementById("[" + (col-1) + "][" + (row-1) +"]");
            moveCount += possibleMove(current, BackMe, optA, optB);
            
            //Check current tile vs (X-1)(X+1,Y-1)(X+1,Y+1)
            BackMe = document.getElementById("[" + (col-1) + "][" + row +"]");
            optA = document.getElementById("[" + (col+1) + "][" + (row-1) +"]");
            optB = document.getElementById("[" + (col+1) + "][" + (row+1) +"]");
            moveCount += possibleMove(current, BackMe, optA, optB);
            
            //Check current tile vs (X+1)(X-1,Y-1)(X-1,Y+1)
            BackMe = document.getElementById("[" + (col+1) + "][" + row +"]");
            optA = document.getElementById("[" + (col-1) + "][" + (row-1) +"]");
            optB = document.getElementById("[" + (col-1) + "][" + (row+1) +"]");
            moveCount += possibleMove(current, BackMe, optA, optB);
            
            // Check the 4 surrounding tiles for color; if 3 match, label this tile as one to be moved
            optA = document.getElementById("[" + (col) + "][" + (row-1) +"]");
            optB = document.getElementById("[" + (col-1) + "][" + (row) +"]");
            optC = document.getElementById("[" + (col) + "][" + (row+1) +"]");
            color = tileColor(BackMe);
            
            if(tileColor(optA) === color)
                count++;
            if(tileColor(optB) === color)
                count++;
            if(tileColor(optC) === color)
                count++;
            
            if(count > 1)
            {
                moveCount++;
                if(document.getElementsByTagName("button")[0].classList.contains("Auto"))
                {
                    current.style.borderColor = "black";
                }
            }
            
            //Determine if we can get 3 in a row horizontal
            if(col < 5)
            { 
                optA = document.getElementById("[" + (col - 1) + "][" + (row) +"]");
                optB = document.getElementById("[" + (col + 1) + "][" + (row) +"]");
                optC = document.getElementById("[" + (col + 2) + "][" + (row) +"]");
                color = tileColor(optA);

                if(tileColor(optC) === color)
                {
                    if(tileColor(current) === color)
                    {
                        moveCount++;
                        if(document.getElementsByTagName("button")[0].classList.contains("Auto"))
                        {
                            optC.style.borderColor = "black";
                        }
                    }
                    
                    if(tileColor(optB) === color)
                    {
                        moveCount++;
                        if(document.getElementsByTagName("button")[0].classList.contains("Auto"))
                        {
                            optA.style.borderColor = "black";
                        }                    
                    }
                    
                } // End if 

                 
            } // End of horizontal check
            
            //Determine if we can get 3 in a row vertically
            if(row < 5)
            { 
                optA = document.getElementById("[" + (col) + "][" + (row - 1) +"]");
                optB = document.getElementById("[" + (col) + "][" + (row + 1) +"]");
                optC = document.getElementById("[" + (col) + "][" + (row + 2) +"]");
                color = tileColor(optA);

                if(tileColor(optC) === color)
                {
                    if(tileColor(current) === color)
                    {
                        moveCount++;
                        if(document.getElementsByTagName("button")[0].classList.contains("Auto"))
                        {
                            optC.style.borderColor = "black";
                        }
                    }
                    
                    if(tileColor(optB) === color)
                    {
                        moveCount++;
                        if(document.getElementsByTagName("button")[0].classList.contains("Auto"))
                        {
                            optA.style.borderColor = "black";
                        }                    
                    }
                    
                } // End if 

                 
            } // End of vertical check
            

        } // End column loop
        
    } // End row loop
    
    console.log("Possible movecount: " + moveCount);
    
    // If there's no valid moves, completely reset the board for the player
    if(moveCount < 1)
    {
        console.log("No valid moves, attempting to reset board!");
        setBoard();
    }
      
} // End of function preventDeadLock()

/* Determine if a move can be made based on the colors of these 4 tiles; if a move can be made, change the outline colors of the squares */
function possibleMove(middle, back, optA, optB)
{
    var flag = false;
    
    var hints = document.getElementsByTagName("button")[0].classList.contains("Auto");
    
    // See if we've got 2 tiles of the same color lined up; otherwise, don't even bother with additional checks
    if(tileColor(middle) === tileColor(back))
    {
        if(tileColor(middle) === tileColor(optA))
        {
            optA.style.borderColor = "black";
            flag = true;
        }
        
        if(tileColor(middle) === tileColor(optB))
        {
            optB.style.borderColor = "black";
            flag = true;
        }
        
    } // End of main IF statement
    
    // If these options are the same color as the selected tile and each other
    if(tileColor(middle) === tileColor(optA) === tileColor(optB))
        {
            //console.log(middle.id + " " + optA.id + " " + optB.id);
            middle.style.borderColor = "black";
            flag = true;
        }
    
    //If hints are disabled, reset all borders to be grey
    if(!hints)
    {
        middle.style.borderColor = "darkgrey";
        back.style.borderColor = "darkgrey";
        optA.style.borderColor = "darkgrey";
        optB.style.borderColor = "darkgrey";
    }
    
    // If we have a possible move, return function right here
    if(flag)
    {
       return 1;
    }

    // We don't have a possible move, return 0
    return 0;
    
} // End of function possibleMove()

/* Enable or disable hints button */
function hintsOn(item)
{
    if(item === 1)
    {
        document.getElementsByTagName("button")[0].classList.toggle("Auto");
    }
    
    
} // End of function hintsOn()
