if (Ext === undefined) var Ext = {};
Ext["Fluids"] = (function () {

	function forward () {
		back();
	};
	
	function back () {
		alert("Fluids");
	};
	
	return {
		"forward": forward,
		"back": back,
	};

}());
