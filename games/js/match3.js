/*eslint-env browser*/
/* eslint-disable no-console */ //Enables console output
// Written by smitc29 / Christopher Smith

function Reaction(item) 
{
   // Prevent players from moving while moves are being resolved/animating
    if(document.getElementById("Board").classList.contains("Wait"))
    {
        return false;
    }
    
    // Verify WHICH tile just got clicked
    console.log(item.id + " clicked");
    item.style.animationDuration = "2s";
    
    // Determine if Orange ability is being used/is auto; if True, then turn all available adjacent tiles into the same color, then deselect everything. 
    
    if(document.getElementsByTagName("button")[3].classList.contains("Auto"))
    {
        //console.log("OrangePrime start here!");
        orangePrime(item);
        deselectAll();
        return false;
    } 
    // Determine if Green ability is being used; if True, then drop that tile and all tiles underneath it from the table entirely
    else if(document.getElementsByTagName("button")[5].classList.contains("Auto"))
    {
        //console.log("GreenDrop start here!");
        deselectAll();
        greenDrop(item);
        return false;
    }
        
    // If no tiles are currently selected, select this tile
    if(document.getElementsByClassName("Selected").length < 1)
    {
        item.classList.add("Selected");
        item.style.animationDelay = "0s";
        document.getElementsByTagName("button")[5].innerHTML = "Drop Tiles";
    }
    else // At least 1 tile is currently Selected
    {
        swapSelection(item); 
    } // End else statement
    
    // Ensure player can always make a move
    preventDeadlock();
    
} // End of Function Reaction()

/* Set board to have randomized pattern when game begins or if no matches are possible */
function setBoard()
{
    deselectAll();
    document.getElementById("Board").classList.add("Reset");
    
    var list = document.getElementsByClassName("Square");
    var i = 0;
    var ran = 1; // Used for randomly selecting tiles

    // Assign each tile a random color to start
    for(i = 0; i < list.length; i++)
    {
        removeColors(list[i]);
        assignColor(list[i]);
        list[i].setAttribute('draggable', false); // Prevent user from dragging tiles
    } 
    
    // Ensure there's no combos 
    while(comboPresent().length > 0)
    {
        list = comboPresent();
        ran = Math.floor(Math.random() * comboPresent.length);
        if(list[ran] != null && list[ran] != undefined)
        {
            removeColors(list[ran]);
            assignColor(list[ran]);   
        }      
    } // End of while loop
    
    // Let functions know board is not being reset atm
    document.getElementById("Board").classList.remove("Reset");
    
} // End of function setBoard()

// Restore player's ability to use special abilities based on the colored combos they match
function superMeterRefill(colors)
{
    var i = 0;
    var resetOpacity = parseFloat(document.getElementsByTagName("button")[1].style.opacity);
    var freezeOpacity = parseFloat(document.getElementsByTagName("button")[2].style.opacity);
    var orangeOpacity = parseFloat(document.getElementsByTagName("button")[3].style.opacity);
    var purpleOpacity = parseFloat(document.getElementsByTagName("button")[4].style.opacity);
    var greenOpacity = parseFloat(document.getElementsByTagName("button")[5].style.opacity);
    var yellowOpacity = parseFloat(document.getElementsByTagName("button")[6].style.opacity);
    
    // Go through each combo tile's color and add value to the appropriate button/super move
    for(i = 0; i < colors.length; i++)
    {
        // White or Black tiles affect all opacities
        if(colors[i]=="White" || colors[i]=="Black")
        {
            resetOpacity += 0.05;
            freezeOpacity += 0.05;
            orangeOpacity += 0.05;
            purpleOpacity += 0.05;
            greenOpacity += 0.05;
            yellowOpacity += 0.05;
        }
        
        // Red tiles affect board reset
        if(colors[i]=="Red" && resetOpacity < 1)
        {
            resetOpacity += 0.05;
        }
        else if(colors[i]=="Red")
        {
            document.getElementsByTagName("button")[1].style.borderColor = "black";
        }
        
        // Blue tiles affect board freeze
        if(colors[i]=="Blue" && freezeOpacity < 1)
        {
            freezeOpacity += 0.03;
        }
        else if(colors[i]=="Blue")
        {
            document.getElementsByTagName("button")[2].style.borderColor = "black";
        }
        
        // Orange tiles allow Tile priming
        if(colors[i]=="Orange" && orangeOpacity < 1)
        {
            orangeOpacity += 0.05;
        }
        else if(colors[i]=="Orange")
        {
            document.getElementsByTagName("button")[3].style.borderColor = "black";
        }
        
        // Purple tiles allow Tile swapping
        if(colors[i]=="Purple" && purpleOpacity < 1)
        {
            purpleOpacity += 0.2;
        }
        else if(colors[i]=="Purple")
        {
            document.getElementsByTagName("button")[4].style.borderColor = "black";
        }
        
        // Purple tiles allow Tile swapping
        if(colors[i]=="Green" && greenOpacity < 1)
        {
            greenOpacity += 0.1;
        }
        else if(colors[i]=="Green")
        {
            document.getElementsByTagName("button")[5].style.borderColor = "black";
        }
        
        // Yellow tiles allow Wild Card tiles to be created
        if(colors[i]=="Yellow" && yellowOpacity < 1)
        {
            yellowOpacity += 0.1;
        }
        else if(colors[i]=="Yellow")
        {
            document.getElementsByTagName("button")[6].style.borderColor = "black";
        }
        

    } // End For loop
    
    // Alter the opacity of the buttons based on what their new value should be
    document.getElementsByTagName("button")[1].style.opacity = resetOpacity;
    
    document.getElementsByTagName("button")[2].style.opacity = freezeOpacity;
    
    document.getElementsByTagName("button")[3].style.opacity = orangeOpacity;
    
    document.getElementsByTagName("button")[4].style.opacity = purpleOpacity;
    
    document.getElementsByTagName("button")[5].style.opacity = greenOpacity;
    
    document.getElementsByTagName("button")[6].style.opacity = yellowOpacity;
    
} // end of function superMeterRefill()

/* Ensure player doesn't drag html objects by mistake */
function nodragging()
{
    var tiles = document.getElementsByClassName("Square");
    
    
    
    
}