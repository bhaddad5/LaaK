class Region{
	var name:String;
	var terrain:String;
	var position:Vector2;
	var color:Color32;
	var borders = new Array();
	
	function Region(n:String, t:String, c:Color32){
		this.name = n;
		this.terrain = t;
		this.color = c;
	}
}