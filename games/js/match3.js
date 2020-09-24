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
    
    // If no tiles are currently selected, select this tile
    if(document.getElementsByClassName("Selected").length < 1)
    {
        item.classList.add("Selected");
        item.style.animationDelay = "0s";
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
    } 
    
    // Ensure there's no combos 
    while(comboPresent().length > 0)
    {
        list = comboPresent();
        ran = Math.floor(Math.random() * comboPresent.length);
        removeColors(list[ran]);
        assignColor(list[ran]);       
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
    
    // Go through each combo tile's color and add value to the appropriate button/super move
    for(i = 0; i < colors.length; i++)
    {
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
            freezeOpacity += 0.05;
        }
        else if(colors[i]=="Blue")
        {
            document.getElementsByTagName("button")[2].style.borderColor = "black";
        }
        
    } // End For loop
    
    // Alter the opacity of the buttons based on what their new value should be
    document.getElementsByTagName("button")[1].style.opacity = resetOpacity;
    
    document.getElementsByTagName("button")[2].style.opacity = freezeOpacity;
    
} // end of function superMeterRefill()