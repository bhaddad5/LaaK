class Map{
	var regions = new Array();
	var manualWidth = 10;
	var manualHeight = 10;
	
	function Map(){
		generateRegions();
	}
	
	function generateRegions() {
	var Ocean = new Region("Ocean", "ocean", Color32(0,0,255,255));
		Ocean.position = new Vector2(0,0);
		regions.Push(Ocean);
	
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
		
	Silvergate.borders.Push(Darrenport, MilesLanding);
	Darrenport.borders.Push(Silvergate, Esterwood, Wraithden);
	Wraithden.borders.Push(Sansford, Esterwood, Darrenport);
	MilesLanding.borders.Push(Sansford, Darrenport, Sansmarsh);
	Sansford.borders.Push(Wraithden, MilesLanding, Sansmarsh);
	Sansmarsh.borders.Push(Sansford, MilesLanding);
	Esterwood.borders.Push(Wraithden, ValeSur, HighGates, Darrenport);
	ValeSur.borders.Push(Esterwood);
	HighGates.borders.Push(Esterwood);
	}
}