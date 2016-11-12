/**
 * Created by benjamin on 12.11.16.
 */
function appView() {
    console.log("constructor running");
    this.mapManager = new heatmapManager();
    
    this.runApp = function (mapDiv,controlDiv,removeOldMap) {
        this.mapDiv = mapDiv;
        this.controlDiv = controlDiv;
        if(removeOldMap) {
            
        }
        this.mapManager.createMap(this.mapDiv);
    }
    
    this.stopApp = function() {
        this.mapManager.removeMap();
    }
}