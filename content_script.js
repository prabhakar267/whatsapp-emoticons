var allowed_emoticons = [];

allowed_emoticons[":)"]=["😊"];

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

document.addEventListener('keyup', function (e) { 
	var input_div = document.activeElement;
	if (input_div.tagName == "DIV" && input_div.className == "input")
		replaceEmoticons(input_div)
});

function replaceEmoticons(container){
	var flag = false;
	for (var icon in allowed_emoticons)
		if (container.innerHTML.indexOf(icon)>-1){
			flag = true;
			container.innerHTML = container.innerHTML.replace(icon,allowed_emoticons[icon][0]);
		}

	if(flag)
		setEndOfContenteditable(container);
	return flag;
}
