$(document).ready(function() {

	var statesArray = [];
	var numberCorrect = 0;

	// Cached jQuery sections for any element that is selected more than once
	var $td = $('td');
	var $IDuserInputField = $('#userInputField');
	var $IDcheckStateBtn = $('#checkStateBtn');
	var $IDstatesLeftLabel_span = $('#statesLeftLabel span');
	var $IDresetBtn = $('#resetBtn');
	var $body = $('body');


	// Define StartGame() function
	function StartGame() {

		// Call easterEgg() function
		easterEgg();


		// Populate array with values of each td tag. Will results in array length of 50.
		function PopulateArray() {
			var i = $(this).text().toLowerCase();
			statesArray.push(i);
			console.log(i);
			console.log(statesArray.length);
		}

		// Call the PopulateArray function on each td tag
		$td.each(PopulateArray);


		// When the cheat button is clicked, run the cheat() function
		$('#cheatBtn').click(cheat);


		// Define RegisterEnterKey() function - triggers a click event on the #checkStateBtn button when the user hits the Enter key on the keyboard
		function RegisterEnterKey(e) {
			if( e.keyCode == 13 ) {
				$IDcheckStateBtn.trigger('click');				
			}
		}// close RegisterEnterKey()

		// On the keyup event, call the RegisterEnterKey() function
		$IDuserInputField.on('keyup', RegisterEnterKey);


		// Define CheckUserInput() function - Compare value the user entered to each item in the array; if there is match, remove item from array and set td tag to 'visible'. Clear the user input field whether there was a match or not
		function CheckUserInput() {

			var $userInput = $IDuserInputField.val().toLowerCase();
			console.log("$userInput: " + $userInput);

			// Compare user input to each item in the the array.  If there is a match, remove the item from the array, change the CSS visibility to visible, and clear out the user input field.
			for( var i = 0; i < statesArray.length; i++ ) {

				// Store each array element in a variable
				var x = statesArray[i];

				// Compare each array element to the user input value
				if( x === $userInput ) {
					console.log("we have a match!");

					// Remove matched element from array
					var i = statesArray.indexOf(x);
					statesArray.splice(i, 1);
					console.log('Array Length: ' + statesArray.length);
					console.log(statesArray);

					// Define ChangeCSSVisibility() function - change CSS of matched td to Visibility: visible
					function ChangeCSSVisibility() {

						var tdTagText = $(this).text().toLowerCase();
						// console.log("tdTagText: " + tdTagText);
						if( tdTagText === $userInput ) {
							$(this).css('visibility', 'visible');
							numberCorrect++;
							$IDstatesLeftLabel_span.text(50 - numberCorrect);

							// If the numberCorrect variable has reach 50, then the user has named all of the state and the game is over.  Call GameOver() function
							if( numberCorrect == 50 ) {
								GameOver();
							}// close nested if statement

						}// close if statement
						
					}// close ChangeCSSVisibility() function

					// Run the ChangeCSSVisibility() function on all matched td tags
					$td.each(ChangeCSSVisibility);

					// Clear user input field
					$IDuserInputField.val('');

				}// close if statement

				// if value that user entered does not match any value from the array, clear out the input field
				else {
					$IDuserInputField.val('');
				}// close else statement

			}// close the for loop

		}// close CheckUserInput() function

		// When the #checkStateBtn button is clicked, run the CheckUserInput() function
		$IDcheckStateBtn.click(CheckUserInput);


	}// close StartGame() function


	// Define GameOver() function - Change H1 label text; call ResetGame() function
	function GameOver() {
		$('#statesLeftLabel h1').text('Congratulations, you named all 50 states!');
		$IDresetBtn.click(ResetGame);
	}// close GameOver() function


	// Define ResetGame() function - reload the page set all variables back to initial state
	function ResetGame() {
		location.reload();
	}// close ResetGame() function

	// Call the ResetGame() function when the #resetBtn is clicked
	$IDresetBtn.click(ResetGame);


	// Define the ShowRemainingStates() function - show all hidden td tags, reset numberCorrect variable to 0, update H1 label text
	function ShowRemainingStates() {

		// Define FindHiddenTDTags() function - find all td tags that currently have a CSS visibility property with a value of 'hidden'
		function FindHiddenTDTags() {
			return $(this).css('visibility') === 'hidden';
		}
		
		// Select td tags that are currently 'hidden' and cache them
		var $hiddenStates = $td.filter(FindHiddenTDTags);
		console.log($hiddenStates.length);

		// Set visibility to 'visible' for all 'hidden' td tags
		$hiddenStates.addClass('unfound').css('visibility', 'visible');

		// Set numberCorrect to '0' and reset label
		numberCorrect = 0;
		$IDstatesLeftLabel_span.text(50 - numberCorrect);

	}// close ShowRemainingStates() function

	// When the #showRemainingStatesBtn button is clicked, run the ShowRemainingStates function()
	$('#showRemainingStatesBtn').click(ShowRemainingStates);


	// Define the easterEgg() function - change the body tag's BG color when up, up, down is typed
	function easterEgg() {
		var keySequence = [38, 38, 40];
		var key_index = 0;
		$(document).keydown(function(e) {
			if( e.keyCode === keySequence[key_index++] ) {
				if( key_index === keySequence.length ) {
					$(document).unbind('keydown', arguments.callee);
					$body.css('background-color', 'black');
					// Set delay
					setTimeout(function() {
						$body.css('background-color', '#3C0000');
					}, 1000);
				}
			}
			else {
				key_index = 0;
			}
		});
	}// close easterEgg() function

	// Call StartGame() function
	StartGame();


	// Define the cheat() function - show all states that the user has not found
	function cheat() {
		// For each element in the array: get its value, set that value to the value of the input field, trigger button submission
		var i = 0;
		while(  i < statesArray.length ) {
			var x = statesArray[0];
			$IDuserInputField.val(x);
			$IDcheckStateBtn.trigger('click');
		}
	}// close cheat() function


});// close document.ready() function

////////////////////////// Bugs to Fix: ///////////////////////////
// - need to remove console.log() calls before making live/pushing to Github



////////////////////////// Features to add: ///////////////////////////
// - Add countdown timer.  This could be used to create difficulty levels
// - Could potentially add leader board, based on quickest amount of time to complete
// - Make responsive
// - Style the page better, use CSS custom buttons


////////////////////////// Things that I learned on this project: ///////////////////////////
// - jQuery ":visiblity" and ":hidden" DO NOT apply to the CSS Visibility property, only to the Display property, etc., according to the jQuery documentation
// - the keyCode for the enter key is "13"; I have a great function in this code that brilliantly triggers a click event on a button element when the enter key is pressed on the text input field element. This is brilliant and should be something I can use in the future.
// - I learned how to populate an array with values from from HTML 'td' tags




























