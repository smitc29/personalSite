// Used for selecting which logic gates are used for a given puzzle
function getRandomInt(max) 
{
    return Math.floor(Math.random() * max);
}

// Shuffle elements for later use
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

// Get the inputs for a given logic gate, using its ID as argument
/* Returns list of 3 values; input01, input02, and output as integers. 1 = positive, 0 = negative, -1 = no signal */
function getInputs(gateID)
{
    var column = Number(gateID[0]);
    var row = Number(gateID[1]);
    var input01 = -1;
    var input02 = -1;
    var output01 = NaN;
    var output02 = NaN;

    // First column has unique inputs, let's go with that first
    if(column < 1)
    {
        var inputs = document.getElementsByClassName("input");
        output01 = inputs[row];
        output02 = inputs[row + 1];
        if(inputs[row].classList.contains("on"))
        {
            input01 = 1;
        }
        if(inputs[row].classList.contains("off"))
        {
            input01 = 0;
        }
        if(inputs[row + 1].classList.contains("on"))
        {
            input02 = 1;
        }
        if(inputs[row + 1].classList.contains("off"))
        {
            input02 = 0;
        }
        
    } // End of first column check
    else
    {
        var parent01 = document.getElementById(String(column-1) + String(row));
        output01 = parent01.querySelector(".output"); // Returns exactly 1 element, an output
        // console.log(output01);
        var parent02 = document.getElementById(String(column-1) + String(row+1));
        output02 = parent02.querySelector(".output");
        // console.log(output02);

        if(output01.classList.contains("on"))
        {
            input01 = 1;
        }
        if(output01.classList.contains("off"))
        {
            input01 = 0;
        }
        if(output02.classList.contains("on"))
        {
            input02 = 1;
        }
        if(output02.classList.contains("off"))
        {
            input02 = 0;
        }
    }

    const logicGate = document.getElementById(gateID);
    var myOutput = logicGate.querySelector(".output");
    var output03 = -1;
    if(myOutput.classList.contains("on"))
    {
        output03 = 1;
    }
    if(myOutput.classList.contains("off"))
    {
        output03 = 0;
    }

    var results = [input01, input02, output03, output01, output02, myOutput];
    return results;
}

/* Sets up a board and immediately tries to solve it; if it cannot be solved,
make another board until it can be solved */
function prepBoard(debugBoard)
{
    setBoard();
    var flag = solveBoard();
    const columns = document.getElementsByClassName("logicColumn").length;
    while(!flag || document.getElementsByClassName("on").length < columns)
    {
        setBoard();
        flag = solveBoard();
    }

    // Make some of the wires "Constant", so that players cannot change them
    
    var elements = Array.from(document.getElementsByClassName("output"));
    var moreElements = Array.from(document.getElementsByClassName("input"));
    var interactables = shuffle(elements.concat(moreElements));
    // console.log(interactables); // For debugging
    // First make sure that every wire is given an OFF class if not ON
    for(var i = 0; i < interactables.length; i++)
    {
        if(!interactables[i].classList.contains("on") && !interactables[i].classList.contains("off"))
        {
            interactables[i].classList.add("off");            
        }
    }

    for(var i = 0; i < columns; i++)
    {
        interactables[i].classList.add("constant");
    }

    // Only run this statement if user clicks to generate board for debugging!
    if(debugBoard != 1)
    {
        // Remove 'ON' and 'OFF' class from wires unless they're a constant
        for(var i = 0; i < interactables.length; i++)
        {
            if(!interactables[i].classList.contains("constant"))
            {
                interactables[i].classList.remove("on"); 
                interactables[i].classList.remove("off");            
            }
        }
    }
    



} // End of function prepBoard()

/* Starting with the last logic gate, go backwards through the board,
 and ensure it's possible to make a solution; if not return false */
function solveBoard()
{
    // reset all wires
    var wires = document.getElementsByClassName("on");
    for(var i = 0; i < wires.length; i++)
    {
        wires[i].classList.remove("on");
    }
    wires = document.getElementsByClassName("off");
    for(var i = 0; i < wires.length; i++)
    {
        wires[i].classList.remove("off");
    }

    // Get an array of every logic gate and reverse it, let's work backwards from the end
    var gates = Array.from(document.getElementsByClassName("logicGate")).reverse();
    var isPossible = true; // Set this to false & end loop if we find an error!

    // First let's randomly set the final output's value
    var outputs = document.getElementsByClassName("output");
    var randomOutput = getRandomInt(8);
    if(randomOutput > 2)
    {
        outputs[outputs.length-1].classList.remove("off");
        outputs[outputs.length-1].classList.add("on");
    }
    else
    {
        outputs[outputs.length-1].classList.remove("on");
        outputs[outputs.length-1].classList.add("off");
    }

    for(var i = 0; i < gates.length; i++)
    {
        var outputOn = gates[i].querySelector(".output").classList.contains("on"); // boolean
        var inputs = getInputs(gates[i].id); // Used to find parent gates
        // Wires are checked bottom to top, start with [1] then check [0]
        // [4] is the bottom wire, [3] is the top wire

        if(gates[i].classList.contains("andgate"))
        {
            // Only turns on if both inputs are on
            if(outputOn)
            {
                if(inputs[4].classList.contains("off")) // Bottom wire doesn't have power!
                {
                    isPossible = false;
                    i = gates.length + 1;
                    break;
                }
                else
                {
                    if(!inputs[4].classList.contains("on")) // Bottom wire isn't on but isn't off either
                    {
                        inputs[4].classList.add("on");
                    }
                    inputs[3].classList.add("on");
                }
            } 
            else // AND gate is OFF
            {
                if(inputs[4].classList.contains("on")) // Bottom wire has power!
                {
                    inputs[3].classList.add("off");
                }
                else // Bottom wire isn't set to be ON
                {
                    randomOutput = getRandomInt(8);
                    if(randomOutput > 3)
                    {
                        inputs[3].classList.add("off");
                    }
                    else
                    {
                        inputs[3].classList.add("on");
                    }
                }
            }



        } // End of AND gate logic

        if(gates[i].classList.contains("orgate"))
        {
            // Turns on if either input is on
            if(outputOn)
            {
                if(!inputs[4].classList.contains("on")) // If the bottom wire isn't on, the top one MUST be!
                {
                    inputs[3].classList.add("on");
                }
                else
                {
                    randomOutput = getRandomInt(8);
                    if(randomOutput > 3)
                    {
                        inputs[3].classList.add("on");
                    }
                }
            }
            else // Neither of the two inputs can be positive!
            {
                if(inputs[4].classList.contains("on")) // Bottom wire isn't on but isn't off either
                {
                    isPossible = false;
                    i = gates.length;
                    break;
                }
                else
                {
                    inputs[3].classList.add("off");
                    inputs[4].classList.add("off");
                }
            }
            
        } // End of OR gate logic

        if(gates[i].classList.contains("xorgate"))
        {
            // Only turns on if exactly ONE input is on
            if(outputOn)
            {
                if(inputs[4].classList.contains("on"))
                {
                    inputs[3].classList.add("off");
                }
                else
                {
                    inputs[3].classList.add("on");
                }
            }
            else // Inputs are the same
            {
                if(inputs[4].classList.contains("on"))
                {
                    inputs[3].classList.add("on");
                }
                else
                {
                    inputs[3].classList.add("off");
                }
            }
        } // End of XOR gate logic

        if(gates[i].classList.contains("nandgate"))
        {
            // Only turns OFF if both inputs are on
            if(outputOn)
            {
                if(inputs[4].classList.contains("on")) // Bottom wire has power!
                {
                    inputs[3].classList.add("off");
                }
                else // Bottom wire isn't set to be ON
                {
                    randomOutput = getRandomInt(8);
                    if(randomOutput > 3)
                    {
                        inputs[3].classList.add("off");
                    }
                    else
                    {
                        inputs[3].classList.add("on");
                    }
                }
            }
            else // Both inputs are on
            {
                if(inputs[4].classList.contains("off")) // Bottom wire doesn't have power!
                {
                    isPossible = false;
                    i = gates.length + 1;
                    break;
                }
                else
                {
                    if(!inputs[4].classList.contains("on")) // Bottom wire isn't on but isn't off either
                    {
                        inputs[4].classList.add("on");
                    }
                    inputs[3].classList.add("on");
                }             
            }
        } // End of NAND gate logic

        if(gates[i].classList.contains("norgate"))
        {
            // Only turns on if neither input is on
            // Turns on if either input is on
            if(outputOn)
            {
                if(inputs[4].classList.contains("on")) // Bottom wire isn't on but isn't off either
                {
                    isPossible = false;
                    i = gates.length;
                    break;
                }
                else
                {
                    inputs[3].classList.add("off");
                    inputs[4].classList.add("off");
                }
            }
            else // Neither of the two inputs can be positive!
            {
                if(!inputs[4].classList.contains("on")) // If the bottom wire isn't on, the top one MUST be!
                {
                    inputs[3].classList.add("on");
                }
                else
                {
                    randomOutput = getRandomInt(8);
                    if(randomOutput > 3)
                    {
                        inputs[3].classList.add("on");
                    }
                }

            }
        } // End of NOR gate logic

        if(gates[i].classList.contains("nxorgate"))
        {
            // Only turns on when inputs are the same/equal
            // Only turns on if exactly ONE input is on
            if(outputOn)
            {
                if(inputs[4].classList.contains("on"))
                {
                    inputs[3].classList.add("on");
                }
                else
                {
                    inputs[3].classList.add("off");
                }
            }
            else // Inputs aren't the same
            {
                if(inputs[4].classList.contains("on"))
                {
                    inputs[3].classList.add("off");
                }
                else
                {
                    inputs[3].classList.add("on");
                }
            }
        } // End of NXOR gate logic

    }

    var elements = Array.from(document.getElementsByClassName("output"));
    var moreElements = Array.from(document.getElementsByClassName("input"));
    var interactables = shuffle(elements.concat(moreElements));
    // console.log(interactables); // For debugging
    // First make sure that every wire is given an OFF class if not ON
    for(var i = 0; i < interactables.length; i++)
    {
        if(!interactables[i].classList.contains("on") && !interactables[i].classList.contains("off"))
        {
            interactables[i].classList.add("off");            
        }
    }

    return isPossible;
} // End of function solveBoard()

// Set the game's board with columns of gates
function setBoard()
{
    // First remove all existing columns from the board
    while(document.getElementsByClassName("logicColumn").length > 0)
    {
        document.getElementsByClassName("logicColumn")[0].remove();
    }

    // Determine if player enabled negative gate logic
    var checkedValue = document.getElementById("negativeGates").classList.contains("active");

    var columns = document.getElementById("numColumns").value; // Default value we can make this dynamic later on
    for(var i = 0; i < columns; i++)
    {
        var newColumn = document.createElement("div");
        newColumn.classList.add("logicColumn");
        newColumn.classList.add(i);
        document.getElementById("playingField").appendChild(newColumn);

        for(var j = i; j < columns; j++)
        {
            var newGate = document.createElement("div");
            newGate.classList.add("logicGate");

            // Asign each gate a 2 digit value relative to its position in the column
            newGate.id = String(Math.abs(i)) + String(Math.abs(i-j));
            // ex. The first column will be 00-05 at the most, and the highest value is 50
            // 10 connects to 00 and 01, 20 connects to 10 and 11, and so forth
            // 1st digit is column, 2nd digit is row within that column

            // Randomly assign gates
            let gateType = getRandomInt(6);
            switch (gateType) 
            {
                case 5:
                    newGate.classList.add("andgate");
                    break;
                case 4:
                    newGate.classList.add("orgate");
                    break;
                case 3:
                    newGate.classList.add("xorgate");
                    break;
                case 2:
                    if(checkedValue)
                    {newGate.classList.add("nandgate");} else {newGate.classList.add("andgate");}
                    break;
                case 1:
                    if(checkedValue)
                    {newGate.classList.add("norgate");} else {newGate.classList.add("orgate");}
                    break;
                default:
                    if(checkedValue)
                    {newGate.classList.add("nxorgate");} else {newGate.classList.add("xorgate");}
                    break;
              }

            newColumn.appendChild(newGate);

            var newOutput = document.createElement("div");
            newOutput.classList.add("output");
            newOutput.onclick = function() {
                if(!this.classList.contains("constant"))
                {
                    if(this.classList.contains("off") || !this.classList.contains("on") && !this.classList.contains("off"))
                    {
                        this.classList.add("on");
                        this.classList.remove("off");
                    }
                    else // Wire isn't off or is ON
                    {
                        this.classList.add("off");
                        this.classList.remove("on");
                    }
                }  
            };

            if(i == columns - 1)
            {
                newOutput.classList.add("finalOutput");
            }           
            else if(Math.abs(i-j) == 0)
            {
                newOutput.classList.add("outputUp");
            }
            else if(j == columns - 1)
            {
                newOutput.classList.add("outputDown");
            }
            else
            {
                newOutput.classList.add("outputDuo");
            }
            newGate.appendChild(newOutput);      

            // If we're working with the first column of logic gates, give them each 2 inputs; 
            // 1 input is shared between gates if they're not the very first or last input
            if(i < 1)
            {
                var newInput = document.createElement("span");
                newInput.classList.add("input");
                newInput.onclick = function() {
                    if(!this.classList.contains("constant"))
                    {
                        if(this.classList.contains("off") || !this.classList.contains("on") && !this.classList.contains("off"))
                        {
                            this.classList.add("on");
                            this.classList.remove("off");
                        }
                        else // Wire isn't off or is ON
                        {
                            this.classList.add("off");
                            this.classList.remove("on");
                        }
                    }
                };
                if(j == 0)
                {
                    newInput.classList.add("highInput");
                    newGate.appendChild(newInput);
                    newInput = document.createElement("div");
                    newInput.classList.add("doubleInput");
                    newInput.classList.add("input");
                    newInput.onclick = function() {
                        if(!this.classList.contains("constant"))
                        {
                            if(this.classList.contains("off") || !this.classList.contains("on") && !this.classList.contains("off"))
                            {
                                this.classList.add("on");
                                this.classList.remove("off");
                            }
                            else // Wire isn't off or is ON
                            {
                                this.classList.add("off");
                                this.classList.remove("on");
                            }
                        }
                    };
                    newGate.appendChild(newInput);
                }
                else if(j == columns - 1)
                {
                    newInput.classList.add("lowInput");
                    newGate.appendChild(newInput);
                }
                else
                {
                    newInput.classList.add("doubleInput");
                    newGate.appendChild(newInput);
                }               
            } // End of circuit input assignment 

            // Add a 'result' child to every logic gate which we can change later
            var newResult = document.createElement("div");
            newResult.classList.add("result");
            newGate.appendChild(newResult);

        } // End of setting up a column's logic gates 

    } // End of setting up the board's columns via For loop

    // Set the playground area in the tutorial for users
    var dummyInputs = document.getElementsByClassName("dummyOutput");
    for(var i = 0; i < dummyInputs.length; i++)
    {
        dummyInputs[i].onclick = function() {
            if(!this.classList.contains("constant"))
            {
                if(this.classList.contains("off") || !this.classList.contains("on") && !this.classList.contains("off"))
                {
                    this.classList.add("on");
                    this.classList.remove("off");
                }
                else // Wire isn't off or is ON
                {
                    this.classList.add("off");
                    this.classList.remove("on");
                }
            }
        };
    }
    dummyInputs = document.getElementsByClassName("dummyInput");
    for(var i = 0; i < dummyInputs.length; i++)
    {
        dummyInputs[i].onclick = function() {
            if(!this.classList.contains("constant"))
            {
                if(this.classList.contains("off") || !this.classList.contains("on") && !this.classList.contains("off"))
                {
                    this.classList.add("on");
                    this.classList.remove("off");
                }
                else // Wire isn't off or is ON
                {
                    this.classList.add("off");
                    this.classList.remove("on");
                }
            }
        };
    }

    console.log("Board set!");
} // End of function setBoard()

// Go through each gate and evaluate if it is correct
function evaluateBoard()
{
    var logicGates = document.getElementsByClassName("logicGate");
    console.log("Evaluating nodes");

    // First clear all results of pass/fail labels
    for(var i = 0; i < logicGates.length; i++)
    {
        var result = logicGates[i].querySelector(".result");
        result.classList.remove("pass");
        result.classList.remove("fail");
    } // End of loop regarding logicGates

    for(var i = 0; i < logicGates.length; i++)
    {
        var result = logicGates[i].querySelector(".result");
        var inputs = getInputs(String(logicGates[i].id));

        // If any of the wires don't have a charge, don't evaluate the gate
        if(inputs[0] == -1 || inputs[1] == -1 || inputs[2] == -1)
        {
            // pass
        }
        else // We have all 3 inputs for this gate
        {
            if(logicGates[i].classList.contains("andgate"))
            {
                // Output is on
                if(inputs[5].classList.contains("on"))
                {
                    // 2 inputs are on
                    if(inputs[3].classList.contains("on") && inputs[4].classList.contains("on"))
                    {
                        result.classList.add("pass");
                    }
                    else
                    {
                        result.classList.add("fail");
                    }
                    
                }
                else // Output is OFF
                {
                    // 2 inputs are on
                    if(inputs[3].classList.contains("on") && inputs[4].classList.contains("on"))
                    {
                        result.classList.add("fail");
                    }
                    else
                    {
                        result.classList.add("pass");
                    }
                }
    
            } // End of ANDgate logic
    
            if(logicGates[i].classList.contains("orgate"))
            {
                // Check logic if the gate is ON
                if(inputs[5].classList.contains("on"))
                {
                    if(inputs[3].classList.contains("on") || inputs[4].classList.contains("on"))
                    {
                        result.classList.add("pass");
                    }
                    else
                    {
                        result.classList.add("fail");
                    }
                }
                else // OR gate is OFF
                {
                    if(inputs[3].classList.contains("on") || inputs[4].classList.contains("on"))
                    {
                        result.classList.add("fail");
                    }
                    else
                    {
                        result.classList.add("pass");
                    }
                }
            } // End of ORgate logic
    
            if(logicGates[i].classList.contains("xorgate"))
            {
                // Check logic if the gate is ON
                if(inputs[5].classList.contains("on"))
                {
                    if(inputs[3].classList.contains("on") != inputs[4].classList.contains("on"))
                    {
                        result.classList.add("pass");
                    }
                    else
                    {
                        result.classList.add("fail");
                    }
                }
                else // Gate is OFF
                {
                    if(inputs[3].classList.contains("on") != inputs[4].classList.contains("on"))
                    {
                        result.classList.add("fail");
                    }
                    else
                    {
                        result.classList.add("pass");
                    }
                }
            } // End of XORgate logic
    
            if(logicGates[i].classList.contains("nandgate"))
            {
                // Check logic if the gate is ON
                if(inputs[5].classList.contains("on"))
                {
                    // 2 inputs are on
                    if(inputs[3].classList.contains("on") && inputs[4].classList.contains("on"))
                    {
                        result.classList.add("fail");
                    }
                    else
                    {
                        result.classList.add("pass");
                    }
                    
                }
                else // Output is OFF
                {
                    // 2 inputs are on
                    if(inputs[3].classList.contains("on") && inputs[4].classList.contains("on"))
                    {
                        result.classList.add("pass");
                    }
                    else
                    {
                        result.classList.add("fail");
                    }
                }
            } // End of NANDgate logic
    
            if(logicGates[i].classList.contains("norgate"))
            {
                // Check logic if the gate is ON
                if(inputs[5].classList.contains("on"))
                {
                    if(inputs[3].classList.contains("on") || inputs[4].classList.contains("on"))
                    {
                        result.classList.add("fail");
                    }
                    else
                    {
                        result.classList.add("pass");
                    }
                }
                else // OR gate is OFF
                {
                    if(inputs[3].classList.contains("on") || inputs[4].classList.contains("on"))
                    {
                        result.classList.add("pass");
                    }
                    else
                    {
                        result.classList.add("fail");
                    }
                }
            } // End of NORgate logic
    
            if(logicGates[i].classList.contains("nxorgate"))
            {
                // Check logic if the gate is ON
                if(inputs[5].classList.contains("on"))
                {
                    if(inputs[3].classList.contains("on") != inputs[4].classList.contains("on"))
                    {
                        result.classList.add("fail");
                    }
                    else
                    {
                        result.classList.add("pass");
                    }
                }
                else // Gate is OFF
                {
                    if(inputs[3].classList.contains("on") != inputs[4].classList.contains("on"))
                    {
                        result.classList.add("pass");
                    }
                    else
                    {
                        result.classList.add("fail");
                    }
                }
            } // End of NXORgate logic

        } // End of verifying all 3 wires have signal on/off
        
        

        
    } // End of loop regarding logicGates

} // End of function evaluateBoard()

function toggleGates()
{
    var target = document.getElementById("negativeGates");
    if(target.classList.contains("active"))
    {
        target.classList.remove("active");
        target.innerText = "Enable Negative Gates";
    }
    else
    {
        target.classList.add("active");
        target.innerText = "Disable Negative Gates";
    }

} // end of function toggleGates()

// TODO:
// 5. Implement final check system (go through every logic gate and verify )

