import UnityEngine.UI;

var map : Map;
var army : GameObject;
var regions_map : Texture2D;
var vis_map : Texture2D;
var color_map : Texture2D;
var clicked = 0;

//UI Imports
var region_name : Text;

function Start () {
	Random.seed = Time.time;
	
	region_name = GetComponent(Text);
	//region_name.text = "Darrenport";
	
	map = new Map(regions_map);
}

function Update () {

	UpdateCameraPos();
	
	if (Input.GetKeyDown ("r")){
		//var clearTile = regions_map.GetPixels(0,0,20,20,0);
	}

	//Only proceed if clicking down once
	if (Input.GetMouseButton (0) && clicked==0){
		var region = getClickedRegion();
		
		//spawnArmy (region);
		Debug.Log(region.name+" borders:");
		for(var i = 0; i<region.borders.length; i++){
			Debug.Log("     "+region.borders[i].name);
		}
		
		clicked = 1;
	}
	
	if (!Input.GetMouseButton (0) && clicked==1){
		clicked = 0;
	}
}

function UpdateCameraPos () {
	var mouseX = Input.mousePosition.x;
	var mouseY = Input.mousePosition.y;
	var scrollArea = 20;
	var camTransform = Camera.main.transform;

	var camLeft = Camera.main.ScreenToWorldPoint(Vector3(0,0,0)).x;
	var camRight = Camera.main.ScreenToWorldPoint(Vector3(Camera.main.pixelWidth,0,0)).x;
	var camTop = Camera.main.ScreenToWorldPoint(Vector3(0,Camera.main.pixelHeight,0)).y;
	var camBot = Camera.main.ScreenToWorldPoint(Vector3(0,0,0)).y;
	
	if(mouseX <= scrollArea && mouseX >= 0/* && Mathf.Abs(camLeft) <= (vis_map.width/2)/2f*/){
		camTransform.Translate(-.1,0,0);
	}
	if(mouseX >= (Screen.width - scrollArea) && mouseX <= Screen.width /*&& Mathf.Abs(camRight) <= (vis_map.width/2)/2f*/){
		camTransform.Translate(.1,0,0);
	}
	
	if(mouseY >= (Screen.height - scrollArea) && mouseY <= Screen.height /*&& Mathf.Abs(camTop) <= (vis_map.height/2)/2f*/){
		camTransform.Translate(0,.1,0);
	}
	if(mouseY <= scrollArea && mouseY >= 0/* && Mathf.Abs(camBot) <= (vis_map.height/2)/2f*/){
		camTransform.Translate(0,-.1,0);
	}
}

function spawnArmy (r:Region) {
	var spawnPosition : Vector3 = new Vector3 (r.position.x, r.position.y, 0);
	Instantiate (army, spawnPosition, Quaternion.identity);
}

function getClickedRegion () {
	var mousePos : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	var mapPosX : float = (mousePos.x*100) + (vis_map.width/2);
	var mapPosY : float = (mousePos.y*100) + (vis_map.width/2);
	var mapPos : Vector2 = new Vector2(mapPosX, mapPosY);
	var clickedColor : Color32 = color_map.GetPixel(mapPos.x, mapPos.y);

	Debug.Log(mapPos);

	for(var i = 0; i<map.regions.length; i++){
		if(clickedColor == map.regions[i].color){
			return map.regions[i];
		}
	}
	return map.regions[0];
}







