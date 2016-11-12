function appPath() {
    this.mapManager = new heatmapManager("appPath");
    this.appName = "appPath";
    this.restEndpoint = "/api/" + this.appName;

    //this.errorFunction = app.prototype.errorFunction;

    this.evaluateParams = function() {
        var form = document.forms.appPathForm;
        var date = form.date.value;
        this.mapManager.customParams = encodeURI(date) + '/';
        console.log(this.mapManager.customParams);
    };

    this.refresh = function() {
        this.evaluateParams();
        this.mapManager.refreshMap();
    };

    this.onNavbarLoaded = function() { /* has to be defined beofre runapp */
        var thiz = this;

        // bind form event handler
        $(document.forms.appPathForm).bind('submit', function(e) {
            e.preventDefault();
            thiz.refresh();
        });

        $.get(this.restEndpoint + "/available_dates", function(data) {
            if(!$.isArray(data)) {
                alert("Could not load available dates: Expected array.");
                return;
            }

            // init date picker and time slider
            $("#datepicker").datetimepicker({
                format: 'YYYY-MM-DD',
                enabledDates: data.map(function(str){ return new Date(str); })
            });

            // init map
            thiz.evaluateParams();
            thiz.mapManager.createMap(thiz.mapDiv,pathLayer);
        }).fail(function(){ alert("Could not load available dates!"); });
    }

    this.runApp = function (mapDiv,controlDiv) {
        app.prototype.runApp.call(this,mapDiv,controlDiv);
    }

    //this.stopApp = app.prototype.stopApp
}
appPath.prototype = app.prototype;
