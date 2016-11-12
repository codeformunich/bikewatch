/**
 * Created by benjamin on 12.11.16.
 */
function appView() {
    this.mapManager = new heatmapManager("evaluation");
    this.appName = "appView";
    
    this.errorFunction = app.prototype.errorFunction
    
    this.onNavbarLoaded = function() {
        this.mapManager.createMap(this.mapDiv);
    }
    
    this.runApp = function (mapDiv,controlDiv) {
        this.mapManager.customParams = '2016.10.10/16';
        app.prototype.runApp.call(this,mapDiv,controlDiv);
    }
    
    this.stopApp = app.prototype.stopApp
}