function appPath() {
    this.mapManager = new heatmapManager("appPath");
    this.appName = "appPath";

    //this.errorFunction = app.prototype.errorFunction;

    this.onNavbarLoaded = function() { /* has to be defined beofre runapp */
        this.mapManager.createMap(this.mapDiv,pathLayer);
    }

    this.runApp = function (mapDiv,controlDiv) {
        this.mapManager.customParams = '2016.10.10/16';
        app.prototype.runApp.call(this,mapDiv,controlDiv);
    }

    //this.stopApp = app.prototype.stopApp
}
appView.prototype = app.prototype;
