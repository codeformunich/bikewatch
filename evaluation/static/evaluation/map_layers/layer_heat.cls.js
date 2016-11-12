/**
 * Created by benjamin on 12.11.16.
 */
function heatMapLayer() {
     this.cfg = {
          // radius should be small ONLY if scaleRadius is true (or small radius is intended)
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
    
    
    this.overlay = new HeatmapOverlay(this.cfg);
    
    this.init = function(map) {
        this.map = map;
        this.map.addLayer(this.overlay);
    }
    
    this.setData = function(data) {
        this.overlay.setData({data: data});
    }
}