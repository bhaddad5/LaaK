class Region{
	var name:String;
	var terrain:String;
	var x:int;
	var y:int;
	var color:Color32;
	
	var borders = new Array();
	
	function Region(n:String, t:String, x:int, y:int, c:Color32){
		this.name = n;
		this.terrain = t;
		this.x = x;
		this.y = y;
		this.color = c;
	}
}