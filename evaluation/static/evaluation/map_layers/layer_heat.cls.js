/**
 * Created by benjamin on 12.11.16.
 */
function heatMapLayer() {
     this.bicycle_tile_size_m = 100;
    
     this.cfg = {
          // radius should be small ONLY if scaleRadius is true (or small radius is intended)
          "blur": 0.2,
          "radius": 0.001,
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
          lngField: 'long',
          // which field name in your data represents the data value - default "value"
          valueField: 'count'
        };
    
    
    
    this.init = function(map, variable_args) {
        this.map = map;
        console.log(Math.pow(2,variable_args.default_zoom))
        resolution = 156543.03 * Math.cos((2*Math.PI/360)*variable_args.center_lattitude) / (Math.pow(2,0)); //taken from: http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Resolution_and_Scale
        this.cfg.radius = this.bicycle_tile_size_m / (2*resolution);
        console.log("xradius is: " + this.cfg.radius);
        this.overlay = new HeatmapOverlay(this.cfg);
        this.map.addLayer(this.overlay);
    }
    
    this.setData = function(data) {
        console.log(data);
        this.overlay.setData({data: data});
    }
}