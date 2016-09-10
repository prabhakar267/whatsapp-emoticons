var allowed_emoticons = [];
var happy = [];
var sad = [];
var fun = [];
var suggestions = [];
var index = -1;

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
	"xP"		: "😝",
	":*"		: "😘",
	":o"		: "😮",
	":O"		: "😯",
	";|"		: "😒"
};

happy = {
	":)"		: "🙂",
	":D"		: "😄",
	";)"		: "😉",
	"xD"		: "😆"
};

sad = {
	":("		: "☹",
	":|"		: "😐",
	":/"		: "😕",
	";|"		: "😒"
}

fun = {
	":poop:"	: "💩",
	"\\m/"		: "🤘",
	":o"		: "😮",
	":O"		: "😯"
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

function displaySuggestion(suggest, ind) {
	$(".suggestions").html(icon + " = " + allowed_emoticons[icon]);
}

document.addEventListener("click", function (event) {
	if ($("h2").length && $(".suggestions").length == 0) {
		$("h2").append("<div class=\"suggestions\"></div>");
	}
});

document.addEventListener('keydown', function (e) {
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
			if (happy.indexOf(icon)>-1) {
				suggestions = happy;
				index = happy.indexOf(icon);
			} else if (sad.indexOf(icon)>-1) {
				suggestions = sad;
				index = sad.indexOf(icon);
			} else if (fun.indexOf(icon)>-1) {
				suggestions = fun;
				index = fun.indexOf(icon);
			}
			displaySuggestion()
		}

	if(flag) {
		setEndOfContenteditable(container);
	}
	return flag;
}
