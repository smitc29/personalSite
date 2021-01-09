/* eslint-env browser */
/* eslint-disable no-console */ //Enables console output

// This function is called whenever a space is clicked on
function Reaction(space)
{
    // Compile 2D array of board, X right, Y down
    var board = GatherBoard();
    console.log(space.id);
    
    // Determine who's turn it is, stored in 'Counter' id
    var turn = parseInt(document.getElementById("Counter").textContent);
    console.log(turn);
    
    if((space.classList.contains("X") || space.classList.contains("O")) && turn < 10) // Invalid move
    {
        console.log("Invalid move!");
        document.getElementById("Message").textContent = "Invalid move!";  
    }
    else if(turn < 10) // Valid move
    {
        if(turn % 2 == 1) // Odd value, X turn
        {
            space.classList.add("X");
            document.getElementById("Message").textContent = "O's turn";
        }
        else // Even value, o turn
        {
            space.classList.add("O");
            document.getElementById("Message").textContent = "X's turn";     
        }  
        turn++;
    } // End of valid move 'Else' statement
    
    var check = WinCheck(board); // Check is boolean value

    if(!check) // Nobody has won
    { 
        console.log(turn + " game is still going"); 
    }
    else if(turn % 2 == 0 && turn < 11) // X made last move
    {
        document.getElementById("Message").textContent = "X won!";
        turn = 11;
        FadeLose(board, "X");
    }
    else if(turn < 11) // O made last move
    {
        document.getElementById("Message").textContent = "O won!";
        turn = 11;
        FadeLose(board, "O");
    }
    
    if(turn == 10) // The game has ended in a tie
    {
        document.getElementById("Message").textContent = "Draw! Play again?";   
    }
    
    turn = turn.toString();
    document.getElementById("Counter").textContent = turn;
    
    // See if autoplay is on for X or O
    var list = document.getElementsByTagName('button');
    if(list[1].classList.contains("Auto") && turn % 2 == 1 && turn < 10)
   {
        console.log("Autoplay for X's turn");
        Reaction(getValidMove());
   }
    if(list[2].classList.contains("Auto") && turn % 2 == 0 && turn < 10)
   {
        console.log("Autoplay for O's turn");
        Reaction(getValidMove());
   }
    
} // End of function Reaction

function GatherBoard()
{
    var list = document.getElementsByClassName("box");
    var count = 0;
    //console.log(list.length);
    var board = [[],[],[]];
    for(var y = 0; y < 3; y++)
        {
            for(var x = 0; x < 3; x++)
                {
                    board[x][y] = list[count];
                    count++;
                } 
        } // End of double For loop 
    return board;
} // End of function GatherBoard

function WinCheck(board)
{
    var check = false;
    var letter = "X";
for(var count = 0; count < 2; count++)
    {
        if(count == 1) // Second run through use 'O'
            letter = "O";
        
    for(var i = 0; i < 3; i++)
    {
    //console.log("Row " + i + ": " + board[0][i].classList + ", " + board[1][i].classList + ", " + board[2][i].classList);
    //console.log("Col " + i + ": " + board[i][0].classList + ", " + board[i][1].classList + ", " + board[i][2].classList);
    
    // Determine if there's 3 in a row
    if(board[0][i].classList.contains(letter) && board[1][i].classList.contains(letter) && board[2][i].classList.contains(letter))
        {check = true;}

    // Determine if there's 3 in a column
    if(board[i][0].classList.contains(letter) && board[i][1].classList.contains(letter) && board[i][2].classList.contains(letter))
        {check = true;}   
    }
 // Check diagonals    
if(board[0][0].classList.contains(letter) && board[1][1].classList.contains(letter) && board[2][2].classList.contains(letter))
    {
       check = true; 
    }
else if(board[0][2].classList.contains(letter) && board[1][1].classList.contains(letter) && board[2][0].classList.contains(letter))
    {
        check = true;
    }

        
        
} // End of 2run For loop
      
    return check;
} // End of function WinCheck

function FadeLose(board, winner)
{
    for(var y = 0; y < 3; y++)
        {
            for(var x = 0; x < 3; x++)
                {
                    if (!board[x][y].classList.contains(winner))
                        {
                            board[x][y].style.opacity = 0.35;
                        }
                } 
        } // End of double For loop 
} // End of function FadeLose

function ResetBoard()
{
    var list = document.getElementsByClassName("box");
    for(var i = 0; i < list.length; i++)
    {
        list[i].classList = "box";
        list[i].style.opacity = 1.0;
    } 
    document.getElementById("Counter").textContent = "1";
    document.getElementById("Message").textContent = "X's turn";
    console.clear();
    
} // End of function ResetBoard

function getValidMove()
{
    var list = document.getElementsByClassName("box");
    var i = 4; // 'AI' tries to take center
    while(list[i].classList.contains("X") || list[i].classList.contains("O"))
    {
        i = Math.floor(Math.random()*list.length);    
    } // End of While loop
        
    return list[i];
} // End of function getEmptyTiles