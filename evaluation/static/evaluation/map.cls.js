/**
 * Created by benjamin on 11.11.16.
 */
function heatmapManager(appName) {
    
    //this definition is taken from the heatmap-tutorial
    
    this.baseLayerMaxZoom = 18;
    this.standardZoom = 13;
    
    this.layerList = [];
    this.center_lat =48.1564;
    this.center_long = 11.5691;
    
    this.map = null;
    this.submapLayer = null;
    
    this.ajaxbaseurl = "/api";
    
    this.appName = appName;
    this.customParams = null;
    this.callbackError = function(msg) {
        alert("Error: " + msg)
    }
        
        
    
    this.createMap = function(targetDivId, submapClass, noload) {
        noload = typeof noload !== 'undefined' ? noload : false;

        var baseLayer =  L.tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>, <a href="http://opendatacommons.org/licenses/odbl/1.0/">ODbL</a>',
            maxZoom: this.baseLayerMaxZoom
          }
        );
        
        this.map = new L.Map(targetDivId, {
          center: new L.LatLng(this.center_lat, this.center_long),
          zoom: this.standardZoom,
          layers: [baseLayer]
        });
        
        this.submapLayer = new submapClass();
        this.submapLayer.init(this.map, {default_zoom: this.standardZoom, center_lattitude: this.center_lat});
        if(!noload) {
            return this.refreshMap();
        }
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
            console.log("data is: " + data);
            self.submapLayer.setData(data);
           
        })
        .fail(function() {
                self.callbackError("Could not get data from server");
            }
        );

        return jqxhr; // return jQuery promise
    }
    
    this.removeMap = function() {
        this.map.remove()
    }
    
        
   
} 
