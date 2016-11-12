function appPath() {
    this.mapManager = new heatmapManager("appPath");
    this.appName = "appPath";

    //this.errorFunction = app.prototype.errorFunction;

    this.evaluateParams = function() {
        var form = document.forms.appViewForm;
        var date = form.date.value;
        this.mapManager.customParams = encodeURI(date) + '/';
        console.log(this.mapManager.customParams);
    };

    this.onNavbarLoaded = function() { /* has to be defined beofre runapp */
        this.mapManager.createMap(this.mapDiv,pathLayer);
    }

    this.runApp = function (mapDiv,controlDiv) {
        this.mapManager.customParams = '2016/11/10/';
        app.prototype.runApp.call(this,mapDiv,controlDiv);
    }

    //this.stopApp = app.prototype.stopApp
}
appPath.prototype = app.prototype;
