function appFollow() {
    this.mapManager = new heatmapManager("appFollow");
    this.appName = "appFollow";
    this.restEndpoint = "/api/" + this.appName;

    //this.errorFunction = app.prototype.errorFunction;

    this.evaluateParams = function() {
        var form = document.forms.appFollowForm;
        var bike_id = form.bike_id.value;
        this.mapManager.customParams = encodeURI(bike_id) + '/';
        console.log(this.mapManager.customParams);
    };

    this.refresh = function() {
        this.evaluateParams();
        this.mapManager.refreshMap();
    };

    this.onNavbarLoaded = function() { /* has to be defined beofre runapp */
        var thiz = this;

        // bind form event handler
        $(document.forms.appFollowForm).bind('submit', function(e) {
            e.preventDefault();
            thiz.refresh();
        });

        // init map
        thiz.mapManager.createMap(thiz.mapDiv,followLayer, true);
    }

    this.runApp = function (mapDiv,controlDiv) {
        app.prototype.runApp.call(this,mapDiv,controlDiv);
    }

    //this.stopApp = app.prototype.stopApp
}
appFollow.prototype = app.prototype;
