/* Author: Christopher Smith */
/*eslint-env browser*/
/* eslint-disable no-console */ //Enables console output

/* Takes button input, toggles appropriate nearby div  */
function showMe(input)
{
	var buttons = document.getElementsByClassName("accordion");
	var panels = document.getElementsByClassName("panel");
	var i = 0;
	
	for(i = 0; i < buttons.length; i++)
	{
		if(buttons[i]==input)
		{
			console.log("Button " + i + " was clicked on!");
			console.log(panels[i].style.display);
			
			$(panels[i]).slideToggle("fast"); // token jQuery line for animations
			panels[i].style.display = "block";
			
			console.log(i);
			buttons[i].classList.toggle("active");
			
		} // End of IF statement
			
	} // End of For loop
		
} // End of function showMe()