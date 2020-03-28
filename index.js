if (Ext === undefined) var Ext = {};
Ext["Fluids"] = (function () {

	var store = {
		"data": {}
	};
	
	function forward ($in) {
		store.data = $in;
		back();
	};
	
	function back () {
		
	};
	
	var save = null;
	
	return {
		"forward": forward,
		"back": back,
		"save": save,
	};

}());
