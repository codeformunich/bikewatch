/**
 * Created by benjamin on 11.11.16.
 */
function heatmapManager(appName) {
    
    //this definition is taken from the heatmap-tutorial
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
    
    this.baseLayerMaxZoom = 18;
    this.standardZoom = 13;
    
    this.layerList = [];
    this.center_lat =48.1564;
    this.center_long = 11.5691;
    
    this.map = null;
    this.heatmapLayer = null;
    
    this.ajaxbaseurl = "/api";
    
    this.appName = appName;
    this.customParams = null;
    this.callbackError = function(msg) {
        alert("Error: " + msg)
    }
        
        
    
    this.createMap = function(targetDivId) {
        var baseLayer =  L.tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: this.baseLayerMaxZoom
          }
        )
        
        this.heatmapLayer = new HeatmapOverlay(this.cfg);
        this.map = new L.Map(targetDivId, {
          center: new L.LatLng(this.center_lat, this.center_long),
          zoom: this.standardZoom,
          layers: [baseLayer, this.heatmapLayer]
        });
        
        this.refreshMap()
    };
    
   this.refreshMap = function () {
        bounds = this.map.getBounds();
        url = this.ajaxbaseurl + "/" + this.appName + "/" + bounds.getNorthWest().lat + "/" + bounds.getNorthWest().lng + '/'
        + bounds.getSouthEast().lat + '/' + bounds.getSouthEast().lng;
        if (this.customParams != null) {
            url += '/' + this.customParams;
        }
        
        var self = this;
        var jqxhr = $.get( url, function(data) {
            /*#ry {
                console.log(data);
                data = JSON.parse(data);
            } catch(err) {
                self.callbackError("Got invalid data from server")
            }*/
            
            self.setHeadmapData(data);
           
        })
        .fail(function() {
                self.callbackError("Could not get data from server");
            }
        );
    }
    
    this.setHeadmapData = function(data) {
        this.heatmapLayer.setData({data: data});
    }
    
    this.removeMap = function() {
        this.map.remove()
    }
    
        
   
} 