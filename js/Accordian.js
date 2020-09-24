/* Author: Christopher Smith */
/*eslint-env browser*/
/* eslint-disable no-console */ //Enables console output

/* Takes button input, toggles appropriate nearby div  */
function showMe(input)
{
	var buttons = document.getElementsByClassName("accordion");
	var panels = document.getElementsByClassName("panel");
	var i = 0, pick = -1;
	
	for(i = 0; i < buttons.length; i++)
	{
		if(buttons[i]==input)
		{
			console.log("Button " + i + " was clicked on!");
			console.log(panels[i].style.display);
			
			$(panels[i]).slideToggle("fast");			
			
		}
		
		if(panels[i].style.display)
	    {

	    }
		
		
		
			
		
	}
	
	
	
	
	
	
}