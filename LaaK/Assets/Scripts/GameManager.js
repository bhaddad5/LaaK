var regions;

var clicked = 0;
var numRegions = 8;
var colorMap:Texture2D;
//var camera : GameObject;

function Start () {
	Random.seed = Time.time;
	GenerateMap();
}

function Update () {
	//Only proceed if clicking
	if (Input.GetMouseButton (0) && clicked==0){
		var region = getClickedRegion();
		
		Debug.Log(region.name);
		
		clicked = 1;
	}
	
	if (!Input.GetMouseButton (0) && clicked==1){
		clicked = 0;
	}
}

function GenerateMap(){
	regions = new Array();
	
	generateRegions();
}
/*
function generateBorders () {
	var colorPix = colorMap.GetPixels32();
	
	for(var i = 0; i<colorPix.length; i+=50){
		var currRegion = getRegionByColor(colorPix[i]);
		getPixelBorders(currRegion, colorPix, i);
	}
	
	Debug.Log("Done!");
}

function getPixelBorders(region:Region, pixels:Array, currPix:int) {

	//Debug.Log("Entering getPixelBorders for " + region.name + " on pixel: " + currPix);
	
	var above = currPix + colorMap.width;
	var below = currPix - colorMap.width;
	
	if(below >= 0){
	
		Debug.Log("Checking Below, comparing " + pixels[below] + " to " + currPix);
		
		if(pixels[below] != region.color){
			var borderRegion:Region = getRegionByColor(pixels[below]);
			if(notInBorders(region, borderRegion)){
				Debug.Log("Pushing : "+borderRegion.name + " to: " + region.name);
				region.borders.push(borderRegion);
			}
		}
	}

}

function notInBorders(mainRegion:Region, border:Region){
	for(var i = 0; i<mainRegion.borders.length; i++){
		if(mainRegion.borders[i] == border){
			return false;
		}
	}
	return true;
}

*/

function getRegionByColor(c:Color32) {

	for(var i = 0; i<regions.length; i++){
		if(regions[i].color == c){
			if(regions[i] == null){
				Debug.Log("Null Region");
			}
			return regions[i];
		}
	}
	return null;
}

function getClickedRegion () {
	var x = Input.mousePosition.x;
	var y = Input.mousePosition.y;
	
	var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	var hit:RaycastHit;
	var pointYouNeed:Vector3;
	
	if (Physics.Raycast(ray, hit)){
		pointYouNeed = hit.point;
		
		var pixelX = hit.textureCoord.x*colorMap.width;
		var pixelY = hit.textureCoord.y*colorMap.height;
	
		var clickedColor:Color32 = colorMap.GetPixel(pixelX,pixelY);
		
		for(var i = 0; i<regions.length; i++){
			if(compareColors(clickedColor, regions[i].color)){
				return regions[i];
			}
		}
	}
	else return regions[0];
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





function generateRegions() {

	var Ocean = new Region("Ocean", "ocean", 0, 0, Color32(0,0,255,255));
	var Silvergate = new Region("Silvergate", "hills", 0, 0, Color32(155,33,33,255));
	var Darrenport = new Region("Darrenport", "hills", 0, 0, Color32(102,179,68,255));
	var Wraithden = new Region("Wraithden", "mountains", 0, 0, Color32(201,21,21,255));
	var MilesLanding = new Region("Mile's Landing", "plains", 0, 0, Color32(201,179,21,255));
	var Sansford = new Region("Sansford", "plains", 0, 0, Color32(102,179,21,255));
	var Gradshill = new Region("Gradshill", "plains", 0, 0, Color32(68,20,179,255));
	var SaltonRock = new Region("Salton Rock", "hills", 0, 0, Color32(68,134,179,255));
	
	Silvergate.borders.Push(Darrenport, MilesLanding);
	Darrenport.borders.Push(Silvergate, MilesLanding, Wraithden);
	Wraithden.borders.Push(Sansford, MilesLanding, Darrenport);
	MilesLanding.borders.Push(Sansford, Wraithden, Darrenport, Sansford);
	Sansford.borders.Push(Wraithden, MilesLanding);
	
	regions.Push(Ocean);
	regions.Push(Silvergate);
	regions.Push(Darrenport);
	regions.Push(Wraithden);
	regions.Push(MilesLanding);
	regions.Push(Sansford);
	regions.Push(Gradshill);
	regions.Push(SaltonRock);

}








