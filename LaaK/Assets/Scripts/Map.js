class Map {
	var regions = new Array();
	var regionsMap : Texture2D;
		
	function Map(rMap : Texture2D){
		regionsMap = rMap;
		generateRegions();
	}
	
function generateRegions() {
	// This must always be the region occupying the top left corner
	// of the map for generateBorders to work.
	var Ocean = new Region("Ocean", "ocean", Color32(0,0,255,255));
		Ocean.position = new Vector2(0,0);
		regions.Push(Ocean);
		
	var Mountains = new Region("Mountains", "ocean", Color32(0,0,0,255));
		Mountains.position = new Vector2(0,0);
		regions.Push(Mountains);
	
	var Silvergate = new Region("Silvergate", "plains", Color32(155,33,33,255));
		Silvergate.position = new Vector2(-3.4,2.5);
		regions.Push(Silvergate);
	
	var Darrenport = new Region("Darrenport", "plains", Color32(102,179,68,255));
		Darrenport.position = new Vector2(-1.6,3.5);
		regions.Push(Darrenport);
		
	var Wraithden = new Region("Wraithden", "forest", Color32(201,21,21,255));
		Wraithden.position = new Vector2(-0.1,-1.9);
		regions.Push(Wraithden);
		
	var MilesLanding = new Region("Mile's Landing", "plains", Color32(201,179,21,255));
		MilesLanding.position = new Vector2(-3.6,0.1);
		regions.Push(MilesLanding);
		
	var Sansford = new Region("Sansford", "plains", Color32(102,179,21,255));
		Sansford.position = new Vector2(0.0,-4.0);
		regions.Push(Sansford);
		
	var Valmarsh = new Region("Valmarsh", "marsh", Color32(201,179,215,255));
		Valmarsh.position = new Vector2(-3.7,-4.4);
		regions.Push(Valmarsh);
	
	var Esterwood = new Region("Esterwood", "forest", Color32(102,125,21,255));
		Esterwood.position = new Vector2(2.2,3.3);
		regions.Push(Esterwood);
		
	var HighGates = new Region("The High Gates", "forest", Color32(102,240,21,255));
		HighGates.position = new Vector2(1.3,-1.3);
		regions.Push(HighGates);
	
	var ValeSur = new Region("Vale Sur", "forest", Color32(102,15,21,255));
		ValeSur.position = new Vector2(4.3,2.3);
		regions.Push(ValeSur);
	
	var Kindlewood = new Region("Kindlewood", "forest", Color32(123,72,158,255));
		Kindlewood.position = new Vector2(4.3,2.3);
		regions.Push(Kindlewood);
		
	var ThiemanRock = new Region("Thieman Rock", "plains", Color32(158,55,140,255));
		ThiemanRock.position = new Vector2(4.3,2.3);
		regions.Push(ThiemanRock);
		
	var FishermansCliff = new Region("Fisherman's Cliff", "plains", Color32(62,109,54,255));
		FishermansCliff.position = new Vector2(4.3,2.3);
		regions.Push(FishermansCliff);
		
	var Carval = new Region("Carval", "plains", Color32(86,34,239,255));
		Carval.position = new Vector2(4.3,2.3);
		regions.Push(Carval);
		
	var Redpass = new Region("Redpass", "forest", Color32(92,185,20,255));
		Redpass.position = new Vector2(4.3,2.3);
		regions.Push(Redpass);
		
	var Gradshill = new Region("Gradshill", "plains", Color32(163,161,86,255));
		Gradshill.position = new Vector2(4.3,2.3);
		regions.Push(Gradshill);
		
	var Berryford = new Region("Berryford", "plains", Color32(178,35,20,255));
		Berryford.position = new Vector2(4.3,2.3);
		regions.Push(Berryford);
		
	var Brightbend = new Region("Brightbend", "plains", Color32(186,107,20,255));
		Brightbend.position = new Vector2(4.3,2.3);
		regions.Push(Brightbend);
		
	var Willowood = new Region("Willowood", "forest", Color32(186,200,20,255));
		Willowood.position = new Vector2(4.3,2.3);
		regions.Push(Willowood);
		
	var MorgainsFork = new Region("Morgain's Fork", "forest", Color32(18,90,20,255));
		MorgainsFork.position = new Vector2(4.3,2.3);
		regions.Push(MorgainsFork);
		
	generateBorders();
}

function generateBorders(){
	var prevColor : Color32 = Color32(0,0,255,255);
	var currColor : Color32;
	var prevRegion : Region = regions[0];
	var currRegion : Region = regions[0];
	
	//First run them all side to side
	for(var i = 0; i<regionsMap.height; i++){
		for(var j = 0; j<regionsMap.width; j++){
			currColor = regionsMap.GetPixel(j,i);
						
			if(currColor != prevColor){
				prevColor = currColor;
				prevRegion = currRegion;
				currRegion = getRegionByColor(currColor);
				insertBorder(prevRegion, currRegion);
				insertBorder(currRegion, prevRegion);
				checkTop = true;
			}
			else prevColor = currColor;
		}		
	}
	
	//Now do it again top to bottom
	for(var a = 0; a<regionsMap.width; a++){
		for(var b = 0; b<regionsMap.height; b++){
			currColor = regionsMap.GetPixel(a,b);
			
			if(currColor != prevColor){
				prevColor = currColor;
				prevRegion = currRegion;
				currRegion = getRegionByColor(currColor);
				insertBorder(prevRegion, currRegion);
				insertBorder(currRegion, prevRegion);
			}
			else prevColor = currColor;
		}		
	}
	
}

function getRegionByColor(c:Color32) {
	for(var i = 0; i<regions.length; i++){
		if(regions[i].color == c){
			return regions[i];
		}
	}
	return null;
}

function insertBorder(main : Region, adding : Region) {
	if(main == regions[0] || main == regions[1] || adding == regions[0] || adding == regions[1])
		return;

	for(var i = 0; i<main.borders.length; i++){
		if(main.borders[i] == adding){
			return;
		}
	}
	main.borders.Push(adding);	
}

}