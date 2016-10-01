var allowed_emoticons = [];
// reference : http://emojipedia.org/apple/
allowed_emoticons = {
	":)"		: "🙂",
	";)"		: "😉",
	":("		: "☹",
	":D"		: "😄",
	"-_-"		: "😑",
	":|"		: "😐",
	":/"		: "😕",
	":\\"		: "😕",
	":poop:"	: "💩",
	"\\m/"		: "🤘",
	"xD"		: "😆",
	":P"		: "😜",
	"xP"		: "😝",
	":*"		: "😘",
	":o"		: "😮",
	":O"		: "😯",
}

// reference : http://stackoverflow.com/a/3866442
function setEndOfContenteditable(contentEditableElement){
	var range,selection;
	range = document.createRange();//Create a range (a range is a like the selection but invisible)
	range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
	range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
	selection = window.getSelection();//get the selection object (allows you to change selection)
	selection.removeAllRanges();//remove any selections already made
	selection.addRange(range);//make the range you have just created the visible selection
}

document.addEventListener('keydown', function (e) {
	//If the space key is pressed
	if (e.keyCode == 32 || e.keyCode == 13) {
		var input_div = document.activeElement;
		if (input_div.tagName == "DIV" && input_div.className == "input")
			replaceEmoticons(input_div)
	}
});

function replaceEmoticons(container){
	var flag = false;

	for (var icon in allowed_emoticons){

		var current_message = container.innerHTML;

		// Get all occurrences of an icon
		var all_occurrences = locations(icon, current_message);

		// For each occurrence
		for(var i = 0; i < all_occurrences.length; i++){
			var emoji_index = all_occurrences[i];

			// If the ascii emoji is present in the string
			if (emoji_index>-1){

				// Get the character before and after
				var char_before = current_message.charAt(emoji_index - 1);
				var char_after  = current_message.charAt(emoji_index + icon.length);

				// Check if those characters are spaces
				var is_char_before_valid = (char_before == ' ' || char_before =='' || char_before == '\n');
				var is_char_after_valid  = (char_after  == ' ' || char_after == '' || char_before == '\n');

				// If the ascii emoji is surrounded by whitespace, replace with the correct character
				if(is_char_before_valid && is_char_after_valid){
					flag = true;
					container.innerHTML = replace(icon, emoji_index, current_message);
				}
			} //end if
		} //end for all_occurrences
	} //end for icon in allowed_emoticons

	if(flag)
		setEndOfContenteditable(container);
	return flag;
}

function locations(substring,string){
	var a=[],i=-1;
	while((i=string.indexOf(substring,i+1)) >= 0) a.push(i);
	return a;
}

function replace(icon, index, message){
	return message.substr(0,index) + allowed_emoticons[icon] + message.substr(index + icon.length, message.length);
}