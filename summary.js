(function () {
	
// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

const IO = [	
	["Oral", "IV Fluids", "NG Feed", "Other"],
	["Urine Continent", "Urine Incontinent", "Urine Catheterised", "Gastric", "Drain", "Stoma", "Other"]
];

var COLS = {
	"Input": ["Oral", "IV Fluids", "NG Feed", "Other"],
	"Output": ["Urine Continent", "Urine Incontinent", "Urine Catheterised", "Gastric", "Drain", "Stoma", "Other"]
};
	
const HOURS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, "AM", 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, "PM"]

var el = {};
var grid = {};
var data = [
	{"DT":"2020-06-24 11:00", "IO":"Input", "Type":"Oral", "Value":50},
	{"DT":"2020-06-24 09:00", "IO":"Input", "Type":"Oral", "Value":75},
];
	
// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

var section = document.createElement("section"); $.summary = section;
section.style.flex = "1 1 auto";
section.style.display = "grid";
section.style.gridTemplateColumns = "repeat(15, 1fr)";
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

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "1/2/2/" + (IO[0].length + 3);
div.style.display = "flex";
div.style.textAlign = "center";
div.style.alignItems = "center";
div.style.justifyContent = "center";
div.textContent = "Input";

IO[0].forEach(function ($v, $i) {
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
div.style.backgroundColor = "palegreen";
div.textContent = "Total";

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "1/" + (IO[0].length + 3) + "/2/" + (IO[0].length + IO[1].length + 4);
div.style.display = "flex";
div.style.textAlign = "center";
div.style.alignItems = "center";
div.style.justifyContent = "center";
div.textContent = "Output";

IO[1].forEach(function ($v, $i) {
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "2/" + (IO[0].length + 3 + $i) +"/3/" + (IO[0].length + 4 + $i);
	div.style.display = "flex";
	div.style.textAlign = "center";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	div.textContent = $v;
});

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "2/" + (IO[0].length + IO[1].length + 3) + "/3/" + (IO[0].length + IO[1].length + 4);
div.style.display = "flex";
div.style.textAlign = "center";
div.style.alignItems = "center";
div.style.justifyContent = "center";
div.style.backgroundColor = "palegreen";
div.textContent = "Total";

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "1/" + (IO[0].length + IO[1].length + 4) + "/2/" + (IO[0].length + IO[1].length + 5);
div.style.display = "flex";
div.style.alignItems = "center";
div.style.justifyContent = "center";

	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = "+ Add";
	button.onpointerdown = function () {
		data.push(JSON.parse(prompt('{"DT":"2020-06-24 11:00", "IO":"Input", "Type":"Oral", "Value":50}')));
		build();
	};

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "2/" + (IO[0].length + IO[1].length + 4) + "/3/" + (IO[0].length + IO[1].length + 5);
div.style.display = "flex";
div.style.textAlign = "center";
div.style.alignItems = "center";
div.style.justifyContent = "center";
div.style.backgroundColor = "lightblue";
div.textContent = "Balance";

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

HOURS.forEach(function ($v, $i) {
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = ($i+3) + "/1/" + ($i+4) +"/2";
	div.style.display = "flex";
	div.style.textAlign = "center";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	if (["AM", "PM"].indexOf($v) > -1) div.style.backgroundColor = "yellow";
	div.textContent = $v;
});

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
	if ($id.indexOf("|Total|") > -1) div.style.backgroundColor = "palegreen";
	if ($id.indexOf("|Balance|") > -1) div.style.backgroundColor = "lightblue";
	if ($id.indexOf("|AM|") > -1 || $id.indexOf("|PM|") > -1) div.style.backgroundColor = "yellow";
};

HOURS.forEach(function ($r, $ri) {
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
	
	var calc = {};
	
	data.forEach(function ($v, $i) {
	
		if ($v.DT.substring(0, 10) !== el.inputDate.value) return;
		
		[
			[$v.IO, $v.Type, parseInt($v.DT.substring(11, 13))],
			[$v.IO, "Total", parseInt($v.DT.substring(11, 13))],
			["Balance", parseInt($v.DT.substring(11, 13))],
			[$v.IO, $v.Type, ["AM", "PM"][parseInt($v.DT.substring(11, 13)) % 12]],
			[$v.IO, "Total", ["AM", "PM"][parseInt($v.DT.substring(11, 13)) % 12]],
			["Balance", ["AM", "PM"][parseInt($v.DT.substring(11, 13)) % 12]]
		].forEach(function ($x) {
			var lbl = "|" + $x.join("|") + "|";
			if (calc[lbl] === undefined) calc[lbl] = 0;
			calc[lbl] += $v.Value;
		});
		
	});

}; build();

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

}());
