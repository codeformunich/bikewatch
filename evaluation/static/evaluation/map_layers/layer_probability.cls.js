function probabilityLayer() {
	
	this.bicycle_tile_size_m = 300;
    
     this.cfg = {
          // radius should be small ONLY if scaleRadius is true (or small radius is intended)
          "blur": 1,
          "radius": 20,
          "maxOpacity": .8, 
          // scales the radius based on map zoom
          "scaleRadius": false, 
          // if set to false the heatmap uses the global maximum for colorization
          // if activated: uses the data maximum within the current map boundaries 
          //   (there will always be a red spot with useLocalExtremas true)
          "useLocalExtrema": true,
          // which field name in your data represents the latitude - default "lat"
          latField: 'lat',
          // which field name in your data represents the longitude - default "lng"
          lngField: 'long',
          // which field name in your data represents the data value - default "value"
          valueField: 'count'
        };
	
	var circle025 = L.circle([10,10], {radius: 500, fill: true, color: '#ff0000'});
	var circle05 = L.circle([10,10], {radius: 1000, fill: true, color: '#ff7700'});
	var circle075 = L.circle([10,10], {radius: 1500, fill: true, color: '#ffff00'});
	var circle09 = L.circle([10,10], {radius: 2000, fill: true, color: '#00ff00'});
	var mapmanager = null;
	
	this.init = function(map, additionalargs) {
		mapmanager = additionalargs.mapmanager;
		this.map = map;
		circle025.addTo(this.map);
		circle05.addTo(this.map);
		circle075.addTo(this.map);
		circle09.addTo(this.map);
		this.map.on('click', onMapClick);
		console.log(Math.pow(2,additionalargs.default_zoom))
        resolution = 156543.03 * Math.cos((2*Math.PI/360)*additionalargs.center_lattitude) / (Math.pow(2,0)); //taken from: http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Resolution_and_Scale
        //this.cfg.radius = this.bicycle_tile_size_m / (2*resolution);
        console.log("xradius is: " + this.cfg.radius);
        this.overlay = new HeatmapOverlay(this.cfg);
        this.map.addLayer(this.overlay);
	}
	
	this.setData = function(data) {
		
		console.log(data.data);
		this.overlay.setData({data: data.data});
	}

	
	function onMapClick(e) {
		// do request for probabilities
		var wdslider = $("#weekdaysliderprob");
		var tslider = $("#extrapolationtimepickerprob");
		url = mapmanager.ajaxbaseurl + "/" + mapmanager.appName + "/0/0/0/0/" + 
			encodeURI(e.latlng.lat) + "/" + encodeURI(e.latlng.lng) + "/" + 
			encodeURI(wdslider.slider('getValue')) + "/" + encodeURI(tslider.slider('getValue'));
		
		var dataJson = null;
		var self = this;
        var jqxhr = $.get( url, function(data) {
			console.warn(data);
            console.warn("data is: " + data);
			dataJson = data;

			circle025.setLatLng(e.latlng);
			circle025.setRadius(dataJson["0.25"]);
			circle05.setLatLng(e.latlng);
			circle05.setRadius(dataJson["0.5"]);
			circle075.setLatLng(e.latlng);
			circle075.setRadius(dataJson["0.75"]);
			circle09.setLatLng(e.latlng);
			circle09.setRadius(dataJson["0.9"]);

			circle025.bringToFront();
			circle05.bringToFront();
			circle075.bringToFront();
			circle09.bringToFront();

			circle025.redraw();
			circle05.redraw();
			circle075.redraw();
			circle09.redraw();
        })
        .fail(function() {
            console.error("Could not get data from server");
        });
		
	}
}