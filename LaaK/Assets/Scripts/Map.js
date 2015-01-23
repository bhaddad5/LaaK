class Map {
	var regions = new Array();
	var regionsMap : Texture2D;
	var terrainMap : Texture2D;
	var base : Texture2D;
	var terrain_base : Texture2D;
	var tiles : Texture2D;
	var treeTiles : Texture2D;
	var tSize = 40;
		
	function Map(rMap : Texture2D, tMap : Texture2D, baseMap : Texture2D, baseTerrain : Texture2D, tileTexturs : Texture2D, trees : Texture2D){
		regionsMap = rMap;
		terrainMap = tMap;
		base = baseMap;
		terrain_base = baseTerrain;
		tiles = tileTexturs;
		treeTiles = trees;
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
		
	var Sansmarsh = new Region("Sansmarsh", "marsh", Color32(201,179,215,255));
		Sansmarsh.position = new Vector2(-3.7,-4.4);
		regions.Push(Sansmarsh);
	
	var Esterwood = new Region("Esterwood", "forest", Color32(102,125,21,255));
		Esterwood.position = new Vector2(2.2,3.3);
		regions.Push(Esterwood);
		
	var HighGates = new Region("The High Gates", "forest", Color32(102,240,21,255));
		HighGates.position = new Vector2(1.3,-1.3);
		regions.Push(HighGates);
	
	var ValeSur = new Region("Vale Sur", "forest", Color32(102,15,21,255));
		ValeSur.position = new Vector2(4.3,2.3);
		regions.Push(ValeSur);
		
	generateBorders();
	
	spawnTiles();
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

function spawnTiles(){
	var oceanColor = new Color32(0,0,255,255);
	var forestColor = new Color32(0,255,0,255);
	var mountainColor = new Color32(255,255,255,255);
	
	var coastArray1 = buildTileArray(tSize,2, tiles);
	var coastArray2 = buildTileArray(tSize*5,2, tiles);
	var coastArray3 = buildTileArray(tSize*9,2, tiles);
	var coastArray4 = buildTileArray(tSize*13,2, tiles);
	var coastArray5 = buildTileArray(tSize*17,1, tiles);
	
	var forestArray = buildAssetArray(0,3,treeTiles);
	
	var landTile = tiles.GetPixels(0,0,tSize,tSize,0);
	var waterTile = tiles.GetPixels(tSize,0,tSize,tSize,0);
	
	//Loop through every square on the RegionsMap, draw the coast and the terrain
	//TODO: Clamp texture to prevent overflow?
	for(var i = 0; i<regionsMap.width; i++){
		for(var j = regionsMap.height - 1; j>=0; j--){
		
			var pos = new Vector2(i,j);
		
			tileColor = regionsMap.GetPixel(i,j);
			leftColor = regionsMap.GetPixel(i-1,j);
			rightColor = regionsMap.GetPixel(i+1,j);
			topColor = regionsMap.GetPixel(i,j+1);
			botColor = regionsMap.GetPixel(i,j-1);
			
		if(tileColor != oceanColor){
			//checkAdjacentColors(left, right, top, bottom, etc... checks if each true side is the color it is checking
			
			if(checkAdjacentColors(false, false, true, false, pos, oceanColor)){
				base.SetPixels(i*tSize,j*tSize,tSize,tSize,(coastArray1[Random.Range(0,coastArray1.length)])[3],0);
			}
			else if(checkAdjacentColors(false, false, false, true, pos, oceanColor)){
				base.SetPixels(i*tSize,j*tSize,tSize,tSize,(coastArray1[Random.Range(0,coastArray1.length)])[1],0);
			}
			else if(checkAdjacentColors(true, false, false, false, pos, oceanColor)){
				base.SetPixels(i*tSize,j*tSize,tSize,tSize,(coastArray1[Random.Range(0,coastArray1.length)])[2],0);
			}
			else if(checkAdjacentColors(false, true, false, false, pos, oceanColor)){
				base.SetPixels(i*tSize,j*tSize,tSize,tSize,(coastArray1[Random.Range(0,coastArray1.length)])[0],0);
			}
			
			else if(checkAdjacentColors(false, true, true, false, pos, oceanColor)){
				base.SetPixels(i*tSize,j*tSize,tSize,tSize,(coastArray2[Random.Range(0,coastArray2.length)])[0],0);
			}
			else if(checkAdjacentColors(true, false, true, false, pos, oceanColor)){
				base.SetPixels(i*tSize,j*tSize,tSize,tSize,(coastArray2[Random.Range(0,coastArray2.length)])[3],0);
			}
			else if(checkAdjacentColors(false, true, false, true, pos, oceanColor)){
				base.SetPixels(i*tSize,j*tSize,tSize,tSize,(coastArray2[Random.Range(0,coastArray2.length)])[1],0);
			}
			else if(checkAdjacentColors(true, false, false, true, pos, oceanColor)){
				base.SetPixels(i*tSize,j*tSize,tSize,tSize,(coastArray2[Random.Range(0,coastArray2.length)])[2],0);
			}
			
			else if(checkAdjacentColors(false, false, true, true, pos, oceanColor)){
				base.SetPixels(i*tSize,j*tSize,tSize,tSize,(coastArray3[Random.Range(0,coastArray3.length)])[1],0);
			}
			else if(checkAdjacentColors(true, true, false, false, pos, oceanColor)){
				base.SetPixels(i*tSize,j*tSize,tSize,tSize,(coastArray3[Random.Range(0,coastArray3.length)])[0],0);
			}
			
			else if(checkAdjacentColors(true, true, false, true, pos, oceanColor)){
				base.SetPixels(i*tSize,j*tSize,tSize,tSize,(coastArray4[Random.Range(0,coastArray4.length)])[2],0);
			}
			else if(checkAdjacentColors(true, true, true, false, pos, oceanColor)){
				base.SetPixels(i*tSize,j*tSize,tSize,tSize,(coastArray4[Random.Range(0,coastArray4.length)])[0],0);
			}
			else if(checkAdjacentColors(false, true, true, true, pos, oceanColor)){
				base.SetPixels(i*tSize,j*tSize,tSize,tSize,(coastArray4[Random.Range(0,coastArray4.length)])[3],0);
			}
			else if(checkAdjacentColors(true, false, true, true, pos, oceanColor)){
				base.SetPixels(i*tSize,j*tSize,tSize,tSize,(coastArray4[Random.Range(0,coastArray4.length)])[1],0);
			}
			
			else if(checkAdjacentColors(true, true, true, true, pos, oceanColor)){
				base.SetPixels(i*tSize,j*tSize,tSize,tSize,(coastArray5[Random.Range(0,coastArray5.length)])[0],0);
			}
			
			else if(tileColor != oceanColor){
				base.SetPixels(i*tSize,j*tSize,tSize,tSize,landTile,0);
			}
		}
		else base.SetPixels(i*tSize,j*tSize,tSize,tSize,waterTile,0);
		
		//Set Terrain
		if(terrainMap.GetPixel(i,j) == forestColor){
			//base.SetPixels(i*tSize,j*tSize,tSize,tSize,forestArray[0],0);
			terrain_base.SetPixels(i*tSize,j*tSize,tSize,tSize,forestArray[0],0);
			Debug.Log(terrain_base.GetPixel(i*tSize+20,j*tSize+20));
		}
		
		}		
	}
	
	base.Apply();
}

function checkAdjacentColors(left : boolean, right : boolean, top : boolean, bot : boolean, position : Vector2, color : Color32){
    tileColor = regionsMap.GetPixel(position.x, position.y);
	leftColor = regionsMap.GetPixel(position.x-1, position.y);
	rightColor = regionsMap.GetPixel(position.x+1, position.y);
	topColor = regionsMap.GetPixel(position.x, position.y+1);
	botColor = regionsMap.GetPixel(position.x, position.y-1);
	
	if(left == true && leftColor != color)
			return false;
	if(left == false && leftColor == color)
			return false;
	
	if(right == true && rightColor != color)
			return false;
	if(right == false && rightColor == color)
			return false;
	
	if(top == true && topColor != color)
			return false;
	if(top == false && topColor == color)
			return false;
	
	if(bot == true && botColor != color)
			return false;
	if(bot == false && botColor == color)
			return false;
	
	return true;
}

//Build Array of Arrays of tiles.  The inside arrays contain all 4 rotations of each tile

function buildTileArray(height : int, num : int, sourceTiles : Texture2D){
	var tileArray = new Array();
	var rotationArray;
		
	for(var i = 0; i<num; i++){
		rotationArray = new Array();
		rotationArray.Push(sourceTiles.GetPixels(tSize*i, height, tSize,tSize,0));
		rotationArray.Push(sourceTiles.GetPixels(tSize*i, height+tSize, tSize,tSize,0));
		rotationArray.Push(sourceTiles.GetPixels(tSize*i, height+tSize*2, tSize,tSize,0));
		rotationArray.Push(sourceTiles.GetPixels(tSize*i, height+tSize*3, tSize, tSize,0));
		
		tileArray.Push(rotationArray);
	}
	
	return tileArray;
}

function buildAssetArray(height : int, num : int, sourceTiles : Texture2D){
	var assetArray = new Array();
		
	for(var i = 0; i<num; i++){
		assetArray.Push(sourceTiles.GetPixels(tSize*i, height, tSize,tSize,0));
	}
	
	return assetArray;
}
}








