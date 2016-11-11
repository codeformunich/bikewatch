/**
 * Created by benjamin on 11.11.16.
 */
function heatmapManager() {
    
    //this definition is taken from the heatmap-tutorial
    this.cfg = {
          // radius should be small ONLY if scaleRadius is true (or small radius is intended)
          "radius": 2,
          "maxOpacity": .8, 
          // scales the radius based on map zoom
          "scaleRadius": true, 
          // if set to false the heatmap uses the global maximum for colorization
          // if activated: uses the data maximum within the current map boundaries 
          //   (there will always be a red spot with useLocalExtremas true)
          "useLocalExtrema": true,
          // which field name in your data represents the latitude - default "lat"
          latField: 'lat',
          // which field name in your data represents the longitude - default "lng"
          lngField: 'lng',
          // which field name in your data represents the data value - default "value"
          valueField: 'count'
        };
    
    this.baseLayerMaxZoom = 18;
    this.standardZoom = 13;
    
    this.layerList = [];
    this.center_lat =48.1564;
    this.center_lang = 11.5691;
    
    this.map = null;
    this.heatmapLayer = null;
        
        
    
    this.createMap = function(targetDivId) {
        var baseLayer =  L.tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: this.baseLayerMaxZoom
          }
        )
        
        this.heatmapLayer = new HeatmapOverlay(this.cfg);
        this.map = new L.Map(targetDivId, {
          center: new L.LatLng(this.center_lat, -this.center_lang),
          zoom: this.standardZoom,
          layers: [baseLayer, heatmapLayer]
        });
    }
    
    this.setHeadmapData = function(data) {
        this.heatmapLayer.setData(data)
    }
    
        
   
} 