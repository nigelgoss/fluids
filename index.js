(function () {
	
// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

var COLS = {
	"Input": ["Oral", "IV Fluids", "NG Feed", "Other"],
	"Output": ["Urine Continent", "Urine Incontinent", "Urine Catheterised", "Gastric Drain", "Stoma", "Other"]
};
	
const ROWS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, "AM", 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, "PM"];

var el = {};
var grid = {};
var data = [
	{"Id":1, "DT":"2020-06-25 11:00", "IO":"Input", "Type":"Oral", "Volume":50, "Comment":null, "Username":"gosn1fm"},
	{"Id":2, "DT":"2020-06-25 09:00", "IO":"Input", "Type":"Oral", "Volume":75, "Comment":null, "Username":"gosn1fm"},
	{"Id":3, "DT":"2020-06-25 09:00", "IO":"Output", "Type":"Other", "Volume":-500, "Comment":"Runny nose", "Username":"gosn1fm"},
];

function showSection ($pg) {
	var el = document.querySelector("main")
	el.parentNode.replaceChild($pg, el);
};

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

(function () { // Summary

$.summary = function () {
	build();
	showSection(section);
};

var section = document.createElement("main");
section.style.flex = "1 1 auto";
section.style.display = "grid";
section.style.gridTemplateColumns = "repeat(" + (COLS.Input.length + COLS.Output.length + 4) + ", 1fr)";
section.style.gridGap = "1px";

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "1/1/2/1";
div.style.display = "flex";
div.style.alignItems = "center";
div.style.justifyContent = "center";

	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = "<";
	button.onpointerdown = function () {
		el.inputDate.valueAsDate = new Date(el.inputDate.valueAsDate.setDate(el.inputDate.valueAsDate.getDate() - 1));
		build();
	};

	el.buttonToday = document.createElement("button"); div.appendChild(el.buttonToday);
	el.buttonToday.textContent = "Today";
	el.buttonToday.onpointerdown = function () {
		el.inputDate.valueAsDate = new Date();
		build();
	};

	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = ">";
	button.onpointerdown = function () {
		el.inputDate.valueAsDate = new Date(el.inputDate.valueAsDate.setDate(el.inputDate.valueAsDate.getDate() + 1));
		build();
	};

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "2/1/3/1";

	el.inputDate = document.createElement("input"); div.appendChild(el.inputDate);
	el.inputDate.type = "date";
	el.inputDate.valueAsDate = new Date();
	el.inputDate.onchange = function () { build(); };

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "1/2/2/" + (COLS.Input.length + 3);
div.style.display = "flex";
div.style.textAlign = "center";
div.style.alignItems = "center";
div.style.justifyContent = "center";
div.textContent = "Input";

COLS.Input.forEach(function ($v, $i) {
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "2/" + ($i + 2) +"/3/" + ($i + 3);
	div.style.display = "flex";
	div.style.textAlign = "center";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	div.textContent = $v;
});

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "2/6/3/6";
div.style.display = "flex";
div.style.textAlign = "center";
div.style.alignItems = "center";
div.style.justifyContent = "center";
div.style.backgroundColor = "#98d6af";
div.textContent = "Total";

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "1/" + (COLS.Input.length + 3) + "/2/" + (COLS.Input.length + COLS.Output.length + 4);
div.style.display = "flex";
div.style.textAlign = "center";
div.style.alignItems = "center";
div.style.justifyContent = "center";
div.textContent = "Output";

COLS.Output.forEach(function ($v, $i) {
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "2/" + (COLS.Input.length + 3 + $i) +"/3/" + (COLS.Input.length + 4 + $i);
	div.style.display = "flex";
	div.style.textAlign = "center";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	div.textContent = $v;
});

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "2/" + (COLS.Input.length + COLS.Output.length + 3) + "/3/" + (COLS.Input.length + COLS.Output.length + 4);
div.style.display = "flex";
div.style.textAlign = "center";
div.style.alignItems = "center";
div.style.justifyContent = "center";
div.style.backgroundColor = "#98d6af";
div.textContent = "Total";

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "1/" + (COLS.Input.length + COLS.Output.length + 4) + "/2/" + (COLS.Input.length + COLS.Output.length + 5);
div.style.display = "flex";
div.style.alignItems = "center";
div.style.justifyContent = "center";

	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = "= List";
	button.onpointerdown = function () { $.list(); };

	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = "+ Add";
	button.onpointerdown = function () { $.add(); };

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "2/" + (COLS.Input.length + COLS.Output.length + 4) + "/3/" + (COLS.Input.length + COLS.Output.length + 5);
div.style.display = "flex";
div.style.textAlign = "center";
div.style.alignItems = "center";
div.style.justifyContent = "center";
div.style.backgroundColor = "#98bee5";
div.textContent = "Balance";

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

ROWS.forEach(function ($v, $i) {
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = ($i+3) + "/1/" + ($i+4) +"/2";
	div.style.display = "flex";
	div.style.textAlign = "center";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	if (["AM", "PM"].indexOf($v) > -1) div.style.backgroundColor = "#fdf593";
	div.textContent = $v;
});

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

function createCell ($rc, $id) {
	$id = "|" + $id.join("|").replace(/ /g, "") + "|";
	var div = document.createElement("div"); section.appendChild(div);
	grid[$id] = div;
	div.style.gridArea = [$rc[0], $rc[1], $rc[0]+1, $rc[1]+1].join("/");
	div.style.border = "1px solid #CCCCCC";
	div.style.display = "flex";
	div.style.textAlign = "center";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	if ($id.indexOf("|Total|") > -1) div.style.backgroundColor = "#98d6af";
	if ($id.indexOf("|Balance|") > -1) div.style.backgroundColor = "#98bee5";
	if ($id.indexOf("|AM|") > -1 || $id.indexOf("|PM|") > -1) div.style.backgroundColor = "#fdf593";
};

ROWS.forEach(function ($r, $ri) {
	var $ci = 0;
	Object.keys(COLS).forEach(function ($io) {
		COLS[$io].forEach(function ($v) {
			createCell( [$ri + 3, $ci++ + 2], [$io, $v, $r] );
		});
		createCell( [$ri + 3, $ci++ + 2], [$io, "Total", $r] );
	});
	createCell( [$ri + 3, $ci++ + 2], ["Balance", $r] );
});

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

function build () {
	
	var volume = {};
	var comment = {};
	
	data.forEach(function ($v, $i) {
	
		if ($v.DT.substring(0, 10) !== el.inputDate.value) return;
		
		[
			[$v.IO, $v.Type, parseInt($v.DT.substring(11, 13))],
			[$v.IO, "Total", parseInt($v.DT.substring(11, 13))],
			["Balance", parseInt($v.DT.substring(11, 13))],
			[$v.IO, $v.Type, ["AM", "PM"][Math.floor(parseInt($v.DT.substring(11, 13)) / 12)]],
			[$v.IO, "Total", ["AM", "PM"][Math.floor(parseInt($v.DT.substring(11, 13)) / 12)]],
			["Balance", ["AM", "PM"][Math.floor(parseInt($v.DT.substring(11, 13)) / 12)]]
		].forEach(function ($x, $xi) {
			var lbl = "|" + $x.join("|").replace(/ /g, "") + "|";
			if (volume[lbl] === undefined) volume[lbl] = 0;
			volume[lbl] += $v.Volume;
			if ($xi === 0 && $v.Comment !== null) {
				if (comment[lbl] === undefined) comment[lbl] = [];
				comment[lbl].push($v.Comment)
			};			
		});
		
	});
	
	Object.keys(grid).forEach(function ($v) {
		grid[$v].textContent = (volume[$v] === undefined) ? "" : (($v.indexOf("|Balance|") > -1) ? volume[$v] : Math.abs(volume[$v]));
		if (comment[$v] !== undefined) {
			grid[$v].textContent += " *";
			grid[$v].title = comment[$v].join(" | ");
			grid[$v].onpointerdown = function () { alert(comment[$v].join(" | ")); };
		};
	});

}; build();

}());

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

(function () {

$.list = function () {
	build();
	showSection(section);
};

var section = document.createElement("main");

var table = document.createElement("table"); section.appendChild(table);
table.style.width = "100%";
table.style.borderCollapse = "collapse";
var thead = document.createElement("thead"); table.appendChild(thead);
thead.style.fontWeight = "bold";
var tr = document.createElement("tr"); thead.appendChild(tr);
var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = "DT";
var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = "IO";
var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = "Type";
var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = "Volume";
var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = "Username";
var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.style.width = "1px";

function build () {
	
	table.querySelectorAll("tbody").forEach(function ($v) { $v.parentNode.removeChild($v); });
	
	data.forEach(function ($v, $i) {
		
		var tbody = document.createElement("tbody"); table.appendChild(tbody);
		tbody.style.backgroundColor = ($i % 2 === 0) ? "#d8f0fc" : "#fafbfd";
		var tr = document.createElement("tr"); tbody.appendChild(tr);
		var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = $v.DT;
		var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = $v.IO;
		var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = $v.Type;
		var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = $v.Volume;
		var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = $v.Username;
		var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; 
			var button = document.createElement("button"); td.appendChild(button);
			button.textContent = "Delete";
			button.onpointerdown = function () { alert($v.Id); };
		if ($v.Comment !== null) {
			td.rowSpan = 2;
			var tr = document.createElement("tr"); tbody.appendChild(tr);
			var td = document.createElement("td"); tr.appendChild(td);
			td.colSpan = 5;
			td.style.padding = "20px"; 
			td.textContent = "Comment: "+ $v.Comment;
		};
		
	});
	
};

}());

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

(function () {

$.add = function () {
	//Clear
	showSection(section);
};

var section = document.createElement("main");

var inputDateTime = document.createElement("input"); section.appendChild(inputDateTime);
inputDateTime.type = "datetime-local";
var now = new Date(); now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
inputDateTime.value = now.toISOString().slice(0, 16);

var selected = null;

Object.keys(COLS).forEach(function ($v) {
	
	var div = document.createElement("div"); section.appendChild(div);
	div.textContent = $v;
	
	COLS[$v].forEach(function ($v2) {
		var button = document.createElement("button"); div.appendChild(button);
		button.textContent = $v2;
		button.onpointerdown = function () { selected = [$v, $v2]; };
	});
	
});

var volume = document.createElement("input"); section.appendChild(volume);
var comment = document.createElement("textarea"); section.appendChild(comment);
	
var button = document.createElement("button"); section.appendChild(button);
button.textContent = "+ Add";
button.onpointerdown = function () {
	data.push({
		"Id":0,
		"DT": inputDateTime.value,
		"IO": selected[0],
		"Type": selected[1],
		"Volume": parseInt(volume.value),
		"Comment": (comment.value === "") ? null : comment.value,
		"Username":"gosn1fm"
	});
	$.summary();
};

}());

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

}());
