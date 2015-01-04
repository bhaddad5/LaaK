var clicked = 0;
var colorMap : Texture2D;
var map : Map;
var army : GameObject;

function Start () {
	Random.seed = Time.time;
	
	map = new Map();
}

function Update () {
	//Only proceed if clicking down once
	if (Input.GetMouseButton (0) && clicked==0){
		var region = getClickedRegion();
		
		Debug.Log(region.name);
		spawnArmy(region);
		
		clicked = 1;
	}
	
	if (!Input.GetMouseButton (0) && clicked==1){
		clicked = 0;
	}
}

function spawnArmy (r:Region) {
/*	var mapWidth:float = parseFloat(map.manualWidth);
	var mapHeight:float = parseFloat(map.manualHeight);
	var mapOffsetX:float = parseFloat(mapWidth/2);
	var mapOffsetY:float = parseFloat(mapHeight/2);
	var posX:float = parseFloat(r.position.x)/parseFloat(colorMap.width);
	var posY:float = parseFloat(r.position.y)/parseFloat(colorMap.height);
	
	var adjustedX:float = parseFloat(posX)*parseFloat(mapWidth) - parseFloat(mapOffsetX);
	var adjustedY:float = parseFloat(posY)*parseFloat(mapWidth) - parseFloat(mapOffsetY);*/
	
	var spawnPosition : Vector3 = new Vector3 (r.position.x, r.position.y, 0);
	Instantiate (army, spawnPosition, Quaternion.identity);
}

function getRegionByColor(c:Color32) {
	for(var i = 0; i<map.regions.length; i++){
		if(map.regions[i].color == c){
			return map.regions[i];
		}
	}
	return null;
}

function getClickedRegion () {
	var mousePos : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	var mapPosX : float = (mousePos.x*100)+(colorMap.width/2);
	var mapPosY : float = (mousePos.y*100)+(colorMap.height/2);
	var mapPos : Vector2 = new Vector2(mapPosX, mapPosY);
	var clickedColor : Color32 = colorMap.GetPixel(mapPos.x, mapPos.y);
	
	Debug.Log(mousePos);
	
	for(var i = 0; i<map.regions.length; i++){
		if(compareColors(clickedColor, map.regions[i].color)){
			return map.regions[i];
		}
	}
	
	return map.regions[0];
}

function compareColors (clickedColor:Color32, regionColor:Color32) {
	var redEquals:boolean = (clickedColor.r == regionColor.r);
	var greenEquals:boolean = (clickedColor.g == regionColor.g);
	var blueEquals:boolean = (clickedColor.b == regionColor.b);
    
    if(!redEquals||!greenEquals||!blueEquals){
    	return false;
    }
    else return true;
}







