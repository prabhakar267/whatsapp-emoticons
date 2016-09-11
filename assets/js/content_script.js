var allowed_emoticons = [];
var suggestionsType = {};
var icon = "";

// reference : http://emojipedia.org/apple/
allowed_emoticons = {
	":)"		: "🙂",
	":D"		: "😄",
	";)"		: "😉",
	":("		: "☹",
	"-_-"		: "😑",
	":|"		: "😐",
	":/"		: "😕",
	":\\"		: "😕",
	":poop:"	: "💩",
	"\\m/"		: "🤘",
	"xD"		: "😆",
	":P"		: "😜",
	":p"		: "😜",
	"xP"		: "😝",
	":*"		: "😘",
	":o"		: "😮",
	":O"		: "😯",
	";|"		: "😒",
	";P"		: "😛",
	":smirk:"	: "😏",
	";D"		: "😂"
};

happy = {
	":)"		: "🙂",
	":D"		: "😄",
	";)"		: "😉",
	";D"		: "😂"
};

sad = {
	":("		: "☹",
	":|"		: "😐",
	":/"		: "😕",
	";|"		: "😒"
};

fun = {
	":poop:"	: "💩",
	"\\m/"		: "🤘",
	":o"		: "😮",
	":smirk:"	: "😏"
};

tease = {
	":P"		: "😜",
	"xP"		: "😝",
	"xD"		: "😆",
	";P"		: "😛"
};

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

function displaySuggestion(suggest, ico) {
	if (suggest != -1) {
		suggestString = "";
		for (icon in suggest)
			if (icon != ico) {
				suggestString = suggestString + icon + " = " + suggest[icon] + "&nbsp;&nbsp;&nbsp;&nbsp;";
			}
		$(".suggestions").html(suggestString);
	} else {
		$(".suggestions").html("");
	}
}

function checkEmojiType(icon) {
	if (Object.keys(happy).indexOf(icon)>-1)
		return happy;
	else if (Object.keys(sad).indexOf(icon)>-1)
		return sad;
	else if (Object.keys(fun).indexOf(icon)>-1)
		return fun;
	else if (Object.keys(tease).indexOf(icon)>-1)
		return tease;
	else 
		return -1;
}

document.addEventListener('keydown', function (e) {
	if ($("h2").length && $(".suggestions").length == 0) {
		$("h2").append("<div class=\"suggestions\"></div>");
	}
	var input_div = document.activeElement;
	if (input_div.tagName == "DIV" && input_div.className == "input")
		replaceEmoticons(input_div);
});

function replaceEmoticons(container){
	var flag = false;
	for (var icon in allowed_emoticons)
		if (container.innerHTML.indexOf(icon)>-1){
			flag = true;
			container.innerHTML = container.innerHTML.replace(icon,allowed_emoticons[icon]);
			suggestionsType = checkEmojiType(icon);
			displaySuggestion(suggestionsType, icon);
		}

	if(flag)
		setEndOfContenteditable(container);
	else
		$(".suggestions").html("");
	return flag;
}
