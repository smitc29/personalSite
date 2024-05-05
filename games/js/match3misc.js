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
        
        // If there's score, remove intro animation
        if(parseInt(document.getElementById("Message").innerHTML) > 0)
        {
            list[i].classList.remove("intro"); 
        }

        
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
    
    if(item == undefined || item == null)
    {
        console.log("!!! Unknown value entered switchMe()");
        return false;
    }
    
    var select = document.getElementsByClassName("Selected")[0];
    var temp = [], temp2, i = 0;
    
    // Remove black tiles on bottom of the board
    for(i = 0; i < 8; i++)
    {
        temp2 = document.getElementById("[" + (i) + "][7]");
        if(tileColor(temp2) == "Black")
        {
            deselectAll();
            removeColors(temp2);
            temp.push(temp2);
            resolveBoard(temp);
        }
    }
    
    // Remove black tiles on bottom of the board
    for(i = 0; i < 8; i++)
    {
        temp2 = document.getElementById("[" + (i) + "][0]");
        assignColor(temp2);
    }
    
  
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
        if(Math.abs(myX - selX) + Math.abs(myY - selY) > 1 && !(document.getElementsByTagName("button")[4].classList.contains("Auto")))
        {
            console.log("Tiles must be adjacent! " + item.id + " v " + select.id);
            return false;
        }
        
        // Verify a Black Tile isn't directly beneath another tile
        if(!document.getElementById("Board").classList.contains("Freeze"))
        {
            if((tileColor(item) == "Black" && myY > selY) || (tileColor(select) == "Black" && selY > myY))
            {
                console.log("Black tiles can't be moved directly upwards! " + item.id + " v " + select.id);
                return false;
            }
        } // End of Freeze Check
        
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
        
        // If SwapTile button is active, reduce its opacity and remove the auto class
        if(document.getElementsByTagName("button")[4].classList.contains("Auto") && comboPresent().length > 0)
        {
            document.getElementsByTagName("button")[4].classList.remove("Auto");
            document.getElementsByTagName("button")[4].style.opacity = 0.05;
            document.getElementsByTagName("button")[4].style.borderColor = "white";
        }
        
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
            if(tile.classList.contains(color) || tileColor(tile) == "White")
            {
                combo++;
            }
            else // Not the same as last tile
            {
                // Reset color, and combo chain if 1ast tile wasn't White
                if(tileColor(tile) != "White")
                    combo = 0;
                color = tileColor(tile); 
            } // End else statement
             
            if(color.length > 1 && combo > 1)
            {
                if(!document.getElementById("Board").classList.contains("Reset"))
                    {
                    console.log(color + " combo ROW length: " + (combo+1) + " from [" + (col-combo) + "," + row + "] to [" + (col) + "," + row + "]");
                    }
                
                // Only add tile if it isn't already being added from another combo, prevent repeats
                if(!removeUs.includes(tile))
                    removeUs.push(tile);
            }
            
            if(tileColor(tile) == "White" && tileColor(document.getElementById("[" + (col+1) + "][" + row + "]")) == tileColor(document.getElementById("[" + (col+2) + "][" + row + "]")))
                {
                    if(!removeUs.includes(tile))
                    removeUs.push(tile);
                    if(!removeUs.includes(document.getElementById("[" + (col+1) + "][" + row + "]")))
                    removeUs.push(document.getElementById("[" + (col+1) + "][" + row + "]"));
                if(!removeUs.includes(document.getElementById("[" + (col+2) + "][" + row + "]")))
                    removeUs.push(document.getElementById("[" + (col+2) + "][" + row + "]"));
                }
            
            // The 1st time a combo hits 3 tiles add last 2 tiles
            if(combo == 2)
            {
                if(!removeUs.includes(document.getElementById("[" + (col-1) + "][" + row + "]")))
                    removeUs.push(document.getElementById("[" + (col-1) + "][" + row + "]"));
                if(!removeUs.includes(document.getElementById("[" + (col-2) + "][" + row + "]")))
                    removeUs.push(document.getElementById("[" + (col-2) + "][" + row + "]"));
            }
        } // End of column loop          
    } // End of row loop
    
    // Vertical Checks
    for(col = 0; col < 8; col++)
    {
       color = " "; // Reset color after each column!          
       for(row = 0; row < 8; row++)
        {
            // Grab the current tile and see if its the same as the last color; if so, note it and keep going, otherwise set it as the new color
            tile = document.getElementById("[" + col + "][" + row + "]");
            
            // Is this the same as the last tile's color?
            if(tile.classList.contains(color) || tileColor(tile) == "White")
            {
                combo++;
            }
            else // Not the same as last tile
            {
                // Reset color, and combo chain if 1ast tile wasn't White
                if(tileColor(tile) != "White")
                    combo = 0;
                color = tileColor(tile);
                
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
                
                // Only add tile if it isn't already being added from another combo, prevent repeats
                if(!removeUs.includes(tile))
                    removeUs.push(tile);
            }
            
            if(tileColor(tile) == "White" && tileColor(document.getElementById("[" + col + "][" + (row+1) + "]")) == tileColor(document.getElementById("[" + col + "][" + (row+2) + "]")))
                {
                    if(!removeUs.includes(tile))
                    removeUs.push(tile);
                    if(!removeUs.includes(document.getElementById("[" + col + "][" + (row+1) + "]")))
                    removeUs.push(document.getElementById("[" + col + "][" + (row+1) + "]"));
                if(!removeUs.includes(document.getElementById("[" + (col) + "][" + (row+2) + "]")))
                    removeUs.push(document.getElementById("[" + (col) + "][" + (row+2) + "]"));
                }
            
            // The 1st time a combo hits 3 tiles add last 2 tiles
            if(combo == 2)
            {
                if(!removeUs.includes(document.getElementById("[" + (col) + "][" + (row-1) + "]")))
                    removeUs.push(document.getElementById("[" + (col) + "][" + (row-1) + "]"));
                if(!removeUs.includes(document.getElementById("[" + (col) + "][" + (row-2) + "]")))
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
    if(tile == null || tile == undefined)
       {
           console.log("Invalid value passed to removeColors()");
           return false;
       }
    tile.classList.remove("Red", "Blue", "Yellow", "Green", "Purple", "Orange", "White", "Black");
} // End of function removeColors()

/* Takes a tile and assigns it a color at random, weighted towards Red, Blue, and Yellow */
function assignColor(tile)
{
    // Go through every tile, ensure there's only a few Black tiles tops
    var weights = 0;
    var ran;
    for(var i = 0; i < 8; i++)
    {
        for(var j = 0; j < 8; j++)
        {
            ran = document.getElementById("[" + (j) + "][" + (i) + "]");
            if(ran.classList.contains("Black"))
            {
                weights++;
            }
        }
    }
    
    
    
    var score = parseInt(document.getElementById("Message").innerHTML);
    ran = Math.ceil(Math.random() * 20);
    
    if(tileColor(tile) != false)
    {
        return false;
    }
            
        // Color in the grid randomly    
        switch(ran) {
          case 20:
            if (score > 100 && weights < 3)
                tile.classList.add("Black");
            else
                tile.classList.add("Red");
            break;
          case 19:
            if (score > 50)
                tile.classList.add("White");
            else
                tile.classList.add("Blue");
            break;
          case 18:
          case 17:
            tile.classList.add("Yellow");
            break;
          case 16:
          case 15:
            tile.classList.add("Purple");
            break;
          case 14:
          case 13:
          case 12:
            tile.classList.add("Green");
            break;
          case 11:
          case 10:
          case 9:
            tile.classList.add("Orange");
            break;
          case 8:
          case 7:
          case 6:
          case 5:
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
    if(Math.abs(myX - lastX) + Math.abs(myY - lastY) > 1 && !(document.getElementsByTagName("button")[4].classList.contains("Auto")))
   {
       deselectAll();
       item.classList.add("Selected");
       item.style.animationDelay = "0s";
   } 
    
} // end of function swapSelection()


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
    var i = 0, j = 0, myX = 0, myY = 0, temp = [];
    
    // Go through the list and store which color each tile is
    for(i = 0; i < list.length; i++)
    {  
        results.push(tileColor(list[i]));
        //makeParticle(list[i]);
        redParticle(list[i],tileColor(list[i]));
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
	
	// Verify ALL tiles have colors, remove Weight tiles if on bottom row
	for(j = 0; j <= 7; j++)
    {
        for(i = 0; i < 7; i++)
        {
			// If ANY tile is without color, give it a color!
			score = document.getElementById("[" + (i) + "][" + (j) + "]");
			if(tileColor(score) == false)
			{
				assignColor(score);
			}
			
			if(j == 7 && tileColor(score) == "Black")
			{
				temp = [];
				temp.append(score);
				removeColors(score);
				resolveBoard(temp);
				fillInEmptyTiles();
			}
			
		}
	}
    
    document.getElementById("Board").classList.remove("Wait");
    
    return results;
    
} // end of function resolveCombos()

/* This function ACTUALLY handles the colors/values of the tiles when they're being switched */
function resolveBoard(tiles)
{
    console.log("resolveBoard()");
    
    if(tiles == null || tiles == undefined)
    {
        console.log("Invalid value passed to resolveBoard()");
        return false;
    }
    
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
            if(!tileHasNoColor(temp) && tileHasNoColor(nextTile) && temp != null && temp != undefined)
            {
                nextTile.classList.add(tileColor(temp));
                removeColors(temp);
                row = 0;
                col = 0;
                
            } // End if statement

        } // End vertical/row check
        
    } // End horizontal/column check
    
     // Go through the grid and apply gravity to any 'hovering' tiles
    for(col = 0; col <= 7; col++)
    {
        for(row = 0; row < 7; row++)
        {
            temp = document.getElementById("[" + col + "][" + row + "]");
            nextTile = document.getElementById("[" + col + "][" + (row+1) + "]");
            
            // If current tile has color but 1 below this has no color, move it down and go back to the top-left
            if(!tileHasNoColor(temp) && tileHasNoColor(nextTile) && temp != null && temp != undefined)
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
    if(list.contains("White"))
        return false;
    if(list.contains("Black"))
        return false;
    
    // No conditions were met, return true!
    return true;
    
} // End of function tileHasNoColor()

/* Returns the color of the provided Tile */
function tileColor(tile)
{
    // Verify an actual tile is being entered here
    if (tile == null || tile == undefined)
        {
            return false;
        }
    
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
    if(list.contains("White"))
        return "White";
    if(list.contains("Black"))
        return "Black";
    
    // No conditions were met, return true!
    return false;
     
} // End of function tileColor()

/* Create a 'particle' effect when a tile is added to a combo at specified tile */
function makeParticle(tile)
{
    if (tile == null || tile == undefined)
    {
        console.log("Null value passed to function makeParticle()");
        return false;
    }
    
    
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

/* Effect for priming tiles with the Orange ability */
//function orangeParticle
function orangeParticle(tile, color)
{
    var part = document.createElement("p");
    document.getElementById(tile.id).appendChild(part);
    part.style.backgroundSize = "cover";
    part.style.zIndex = "20";
    part.style.position = "relative";
    part.style.height = "100%";
    part.style.width = "100%";
    part.style.top = "-35%";
    part.classList.add(color);
    part.classList.add("gost");
    part.style.opacity = 1;    

    $(".gost").ready(function(){
        $(".gost").animate({top: '-125px', left: '-125px', height: '300px', width: '300px', opacity: 0}, 500);
    });
    
    setTimeout(function(){
        part.remove();
    }, 500); 
     
} // End of function orangeParticle()

/* Effect for showing tiles being removed */
function redParticle(tile, color)
{
    if(tile == undefined || tile == null)
    {
        console.log("Unknown value passed to redParticle()");
        return false;
    }    
    
    setTimeout(function(){ 
    
        var part = document.createElement("p");
        document.getElementById(tile.id).appendChild(part);
        part.style.backgroundSize = "cover";
        part.style.zIndex = "20";
        part.style.position = "absolute";
        part.style.height = "100%";
        part.style.width = "100%";
        part.style.top = "0%";
        if(tile.classList.contains("LongDrop"))
        {
            part.style.top = "100%";
        }

        part.classList.add(color);
        part.classList.add("gst");
        part.style.opacity = 1;    

        $(".gst").ready(function(){
            $(".gst").animate({top: '-175px', left: '-125px', height: '300px', width: '300px', opacity: 0}, 500);
        });

        setTimeout(function(){
            part.remove();
        }, 500); 
    
    }, 50);
    
    
    
    
     
} // End of function redParticle()

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
    button.innerHTML = "No rules, act fast!";
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

/* Sets tiles 2 vertical/horizontal tiles away to the same color */
function orangePrime(tile)
{
    var xVal = parseInt(tile.id.substring(1,2));
    var yVal = parseInt(tile.id.substring(4,5));
    var temp;
    var list = [];
    
    // Set tiles on the left to be same color
    if(xVal > 1)
    {
        temp = document.getElementById("[" + (xVal-2) + "][" + (yVal) +"]");
        list.push(temp);
    } 
    if(xVal > 3)
    {
        temp = document.getElementById("[" + (xVal-4) + "][" + (yVal) +"]");
        list.push(temp);
    }
    
    // Set tiles on the right to be same color
    if(xVal < 6)
    {
        temp = document.getElementById("[" + (xVal+2) + "][" + (yVal) +"]");
        list.push(temp);
    }
    if(xVal < 4)
    {
        temp = document.getElementById("[" + (xVal+4) + "][" + (yVal) +"]");
        list.push(temp);
    }
    
    // Set tiles above to be same color
    if(yVal > 1)
    {
        temp = document.getElementById("[" + (xVal) + "][" + (yVal-2) +"]");
        list.push(temp);
    }
    if(yVal > 3)
    {
        temp = document.getElementById("[" + (xVal) + "][" + (yVal-4) +"]");
        list.push(temp);
    }
    
    // Set tiles below to be same color
    if(yVal < 6)
    {
        temp = document.getElementById("[" + (xVal) + "][" + (yVal+2) +"]");
        list.push(temp);
    }
    if(yVal < 4)
    {
        temp = document.getElementById("[" + (xVal) + "][" + (yVal+4) +"]");
        list.push(temp);
    }
    
    for(temp = 0; temp < list.length; temp++)
    {
        removeColors(list[temp]);
        list[temp].classList.add(tileColor(tile));
        orangeParticle(list[temp], tileColor(tile));
    }
    
    document.getElementsByTagName("button")[3].style.opacity = 0.05;
    document.getElementsByTagName("button")[3].style.borderColor = "white";
    document.getElementsByTagName("button")[3].classList.remove("Auto");
    
} // End of function orangePrime()

// Used for the greenDrop special effect
function makeGreen(tile, interval)
{
    setTimeout(function(){   
            tile.classList.add("greenDrop");
        }, interval); 
}

/* Removes selected tile and all tiles below it */ 
function greenDrop(tile)
{
    if(document.getElementsByTagName("button")[5].style.opacity < 1)
    {
        console.log("Unable to use greenDrop, it's not fully charged yet!");
        document.getElementsByTagName("button")[5].innerHTML = "Drop Tiles";
        return false;
    }
    
    var xVal = parseInt(tile.id.substring(1,2));
    var yVal = parseInt(tile.id.substring(4,5));
    var temp, list = [];
    var interval = 1;
    
    // Go down the column and wipe every tile's color, starting at the target tile
    while(yVal < 8)
    {
        temp = document.getElementById("[" + (xVal) + "][" + (yVal) +"]");
        list.push(temp);
        makeGreen(temp, interval*50);
        
        yVal += 1;
        interval++;
    }
    
    // Delay added for greenDrop animation effect
    setTimeout(function(){
        
             // Remove effect indicating greenDrop will occur
        yVal = parseInt(tile.id.substring(4,5));
        while(yVal < 8)
        {
            temp = document.getElementById("[" + (xVal) + "][" + (yVal) +"]");
            removeColors(temp);
            temp.classList.remove("greenDrop");
            yVal += 1;
        }

        // Resolve visuals of grid and combos present in aftermath of changes
        resolveBoard(list);
        fillInEmptyTiles();
        resolveCombos(comboPresent());
        deselectAll();
        }, 500); 
    
   
    
    document.getElementsByTagName("button")[5].style.opacity = 0.05;
    document.getElementsByTagName("button")[5].style.borderColor = "white";
    document.getElementsByTagName("button")[5].classList.remove("Auto");
    
} // End of function greenDrop()

// Turn 4 random tiles into White tiles that can match with any color
function makeWhites()
{
    
    var button = document.getElementsByTagName("button")[6];
    // Make sure button is actually fully ready for use
    if(parseFloat(button.style.opacity) < 1)
    {
        console.log("This power isn't ready to use yet!");
        console.log(parseFloat(button.style.opacity));
        return false;
    }
    
    var count = 0;
    var list = [];
    
    while (count < 3)
    {
        var col = Math.floor(Math.random() * 8);
        var row = Math.floor(Math.random() * 8);
        var tile = document.getElementById("[" + col + "][" + row +"]");
        
        // If random tile isn't already being selected, and isn't already a White tile
        if(!list.includes(tile) && tileColor(tile) != "White")
        {
            list.push(tile);
            count++;
        } 
        
    } // End of While loop
    
    for(var i = 0; i < list.length; i++)
    {
        removeColors(list[i]);
        list[i].classList.add("White");
        orangeParticle(list[i], "White");
    }
    
    button.style.opacity = 0.05;
    button.style.borderColor = "white";
  
} // end of function makeWhites()

/* If there's no matches that can be made, reset the board */
function preventDeadlock()
{
    // If Hint button is active, turn on black outlines for tiles that can create combos
    var hints = document.getElementsByTagName("button")[0].classList.contains("Auto");
    
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
                if(hints)
                {
                    current.style.borderColor = "black";
                }
            }
            
        } // End column loop
        
    } // End row loop
    
    // Go through every row/column and verify if 3 in a row/column can be matched
    // Going down each row, Y values
    for(row = 0; row < 5; row++)
    {
        // Going right each column, X values
        for(col = 0; col < 5; col++)
        {
            // Horizontal check
            current = document.getElementById("[" + (col) + "][" + (row) +"]");
            optA = document.getElementById("[" + (col + 1) + "][" + (row) +"]");
            optB = document.getElementById("[" + (col + 2) + "][" + (row) +"]");
            optC = document.getElementById("[" + (col + 3) + "][" + (row) +"]");
            
            // tiles 1, 2, and 4 have same color
			if(tileColor(current) == tileColor(optA) && tileColor(optA) == tileColor(optC) && tileColor(current) != tileColor(optB))
            {
				console.log("Row: " + current.id + tileColor(current) + "_" + tileColor(optA) + "_" + tileColor(optB) + "_" + tileColor(optC));
                if(hints)
                {optC.style.borderColor = "black";}
                moveCount++;
            }
            
            // tiles 1, 3, and 4 have same color
            if(tileColor(current) == tileColor(optB) && tileColor(optB) == tileColor(optC) && tileColor(current) != tileColor(optA))
            {
				console.log("Row: " + current.id + tileColor(current) + "_" + tileColor(optA) + "_" + tileColor(optB) + "_" + tileColor(optC));
                if(hints)
                {current.style.borderColor = "black";}
                moveCount++;
            }
            
            // Vertical check
            optA = document.getElementById("[" + (col) + "][" + (row + 1) +"]");
            optB = document.getElementById("[" + (col) + "][" + (row + 2) +"]");
            optC = document.getElementById("[" + (col) + "][" + (row + 3) +"]");
            
            // tiles 1, 2, and 4 have same color
            if(tileColor(current) == tileColor(optA) && tileColor(optA) == tileColor(optC) && tileColor(current) != tileColor(optB))
            {
                console.log(current.id + tileColor(current) + "_" + tileColor(optA) + "_" + tileColor(optB) + "_" + tileColor(optC));
                if(hints)
                {
                    optC.style.borderColor = "black";
                }
                moveCount++;
            }
            
            // tiles 1, 3, and 4 have same color
            if(tileColor(current) == tileColor(optB) && tileColor(optB) == tileColor(optC) && tileColor(current) != tileColor(optA))
            {
                console.log("Column: " + current.id + tileColor(current) + "_" + tileColor(optA) + "_" + tileColor(optB) + "_" + tileColor(optC));
                if(hints)
                {
                    current.style.borderColor = "black";
                }
                moveCount++;
            }
                   
        } // End column loop
        
    } // End row loop
    
    console.log("Possible movecount: " + moveCount);
    
    // If there's no valid moves, completely reset the board for the player
    if(moveCount < 2)
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
    item = parseInt(item);
    
    if(item === 0)
    {
        var button = document.getElementsByTagName("button")[0];
        
        button.classList.toggle("Auto");
        if(button.classList.contains("Auto"))
        {
            button.innerHTML = "Disable Hints";
        }
        else
        {
            button.innerHTML = "Enable Hints";
        }
        
    }
    
    // Button 4 Primes tiles when activated
    if(item === 3 && document.getElementsByTagName("button")[item].style.opacity >= 1.0)
    {
        document.getElementsByTagName("button")[item].classList.toggle("Auto");
        document.getElementsByTagName("button")[4].classList.remove("Auto");
        document.getElementsByTagName("button")[5].classList.remove("Auto");
    }
    
    // Button 5 Swaps tiles when activated
    if(item === 4 && document.getElementsByTagName("button")[item].style.opacity >= 1.0)
    {
        document.getElementsByTagName("button")[item].classList.toggle("Auto");
        document.getElementsByTagName("button")[3].classList.remove("Auto");
        document.getElementsByTagName("button")[5].classList.remove("Auto");
    }
    
    // Button 6 Drops an entire column, starting with the selected tile
    if(item === 5 && document.getElementsByTagName("button")[item].style.opacity >= 1.0)
    {
        document.getElementsByTagName("button")[5].classList.toggle("Auto");
        document.getElementsByTagName("button")[3].classList.remove("Auto");
        document.getElementsByTagName("button")[4].classList.remove("Auto");
    }
     
} // End of function hintsOn()