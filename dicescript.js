/* Drew Davenport
Final Project - WAAAAAAAAGH! Dice JavaScript file
CSIS 228 Herbet
12/11/2019*/

/*****GLOBAL VARIABLES*****/
//setting the enter button and userinput as variables with the javaScript 
var enter = document.getElementById("enter");
var input = document.getElementById("userinput");
/*allRolls is the lichpin array that the random numbers are stored within and setRolls acts as a template
for when you want to run the code multiple times without pressing the reset button.*/
var setRolls= [];
var allRolls = [];
//empty variables to later store the number of instances of each number rolled
var ones;
var twos;
var threes;
var fours;
var fives;
var sixes;
//two flag variables used to properly reset everything either from a fail state or needing to reset
var failState = false;
var used = false;

/*****FUNCTION JUNCTION*****/
//Called to randomly generate a number 1-6, the workhorse of this program
function dieRoll(){
	return Math.floor(Math.random()*6) + 1;
}

//This function sets itself to make sure you enter an integer and if it isn't resets itself for user
function inputValue(){
	input.value = Math.floor(input.value);
	failState = false;
	try {//looking for these specific errors
		if(input.value < 0) throw "You can't throw negative dice. ";
		if(input.value == 0) throw "You can't throw nothing. ";
		if(isNaN(input.value) === true) throw "You need a number. This isn't algebra. ";
	}
	catch(err) {//alerts you user and sets failState to false
		window.alert( "Input Error: " + err + "Please enter an integer");
		failState = true;
	}
	finally{//if statement on whether or not the input fails to either return value or reset
			if(failState != true)return input.value;
			else{
				resetApp();
			}
	}
}

//This function fill the allRolls array with the "dice rolls" 
function rollDice(){
		for(i = 0; i < inputValue(); i++){
			allRolls.push(dieRoll());
		}
}

/*The next 6 functions were a compromise to get all the numbers counted.
the filter method (in orgDice) just wasn't wanting to use numbers or anything.
so i built these to be the argument for the filters*/
function check1s(allRolls){
	return allRolls == 1;	
}
function check2s(allRolls){
	return allRolls == 2;	
}
function check3s(allRolls){
	return allRolls == 3;	
}
function check4s(allRolls){
	return allRolls == 4;	
}
function check5s(allRolls){
	return allRolls == 5;	
}
function check6s(allRolls){
	return allRolls == 6;	
}

//This function sets these variables to the number of instances for each roll
function orgDice(){
	ones = allRolls.filter(check1s).length;
	twos = allRolls.filter(check2s).length;
	threes = allRolls.filter(check3s).length;
	fours = allRolls.filter(check4s).length;
	fives = allRolls.filter(check5s).length;
	sixes = allRolls.filter(check6s).length;
	/*This flag sets up for whenever you want to roll the same amount of dice again this will
	be set to let the program know it needs to reset everything before running it all back again*/
	used = true;
}	

//This simply creates texts nodes and sticks them onto the coresponding number for the user to see
function displayRoll(){
	var roll1 = document.createTextNode(ones);
	document.getElementById("1s").appendChild(roll1);
	var roll2 = document.createTextNode(twos);
	document.getElementById("2s").appendChild(roll2);
	var roll3 = document.createTextNode(threes);
	document.getElementById("3s").appendChild(roll3);
	var roll4 = document.createTextNode(fours);
	document.getElementById("4s").appendChild(roll4);
	var roll5 = document.createTextNode(fives);
	document.getElementById("5s").appendChild(roll5);
	var roll6 = document.createTextNode(sixes);
	document.getElementById("6s").appendChild(roll6);
}
/*This fuction sets mostly everything back to the way it was execpt the input value.
Mainly for continual use of the enter button and clickable button.
However, to clean up the code I have also made this called by the reset button
as the only difference in them was the input value statement.*/
function enterReset(){
	ones = 0;
	twos = 0;
	threes = 0;
	fours = 0;
	fives = 0;
	sixes = 0;
	allRolls = [];
	//sets the flag back to false so that it doesn't need to reset the next time the app is used.
	used = false;
	//rewrites these p tags as they were in the beginning 
	document.getElementById("1s").innerHTML = "1: ";
	document.getElementById("2s").innerHTML = "2: ";
	document.getElementById("3s").innerHTML = "3: ";
	document.getElementById("4s").innerHTML = "4: ";
	document.getElementById("5s").innerHTML = "5: ";
	document.getElementById("6s").innerHTML = "6: ";	
}

//This one is mostly the same as above just with the one difference.
function resetApp(itemid){
	input.value = "";
	enterReset();
}		
/*I suppose by definition this would be the "main" function
 as it is the function that calls all the others in the order they need to be.
It just also happened that this exact same code was going to be written 4 times
so i just made it a function to save space */
function doIt(){
	inputValue();
		//This checks to make sure that if the input fails nothing else will be ran
		if(failState===false){
			rollDice();
			console.log(allRolls);
			orgDice();
			displayRoll();
		}
}
//This function is called whenever user clicks on the "WAAAAAAAAGH" button.
function diceAfterClick(){
	/*This if/else checks for whether the allRolls array is empty and if used variable is flagged
	so that if the app is not empty it runs enterReset then continues as intended*/
	if(used === true && allRolls !== setRolls){
		enterReset();
		doIt();
	} else{
		doIt();
	}
	
}
/*This function activates the app after the user presses the enter button.
This function also was pretty much the same as the above so I condensed it*/
function diceAfterKeypress(event){
	//This if statement activates when the enter button is pressed
	if(event.keyCode === 13){
		diceAfterClick();
	}
}

/*****EVENT LISTENERS*****/
//One for the click button and one for the enter button
enter.addEventListener("click", diceAfterClick);
input.addEventListener("keypress", diceAfterKeypress);