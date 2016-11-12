/**
 * Created by benjamin on 12.11.16.
 */

function appView() {
    this.mapManager = new heatmapManager("appView");
    this.appName = "appView";
    this.restEndpoint = "/api/" + this.appName;
    
    //this.errorFunction = app.prototype.errorFunction;
    
    this.evaluateParams = function() {
        var form = document.forms.appViewForm;
        var date = form.date.value;
        var time = form.time.value;
        this.mapManager.customParams = encodeURI(date) + '/' + encodeURI(time);
        console.log(this.mapManager.customParams);
    };

    this.refresh = function() {
        this.evaluateParams();
        this.mapManager.refreshMap();
    };

    this.onNavbarLoaded = function() { /* has to be defined beofre runapp */
        var thiz = this;

        // bind form event handler
        $(document.forms.appViewForm).bind('submit', function(e) {
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
                enabledDates: data.map(function(str){ return new DateTime(str); })
            });
            $('#timepicker').slider({ formatter: function(value) { return value + ' Uhr';} });

            // init map
            this.evaluateParams();
            this.mapManager.createMap(this.mapDiv, heatMapLayer);
        }).fail(function(){ alert("Could not load available dates!"); });
    }
    
    this.runApp = function (mapDiv,controlDiv) {
        app.prototype.runApp.call(this,mapDiv,controlDiv);
    }
    
    //this.stopApp = app.prototype.stopApp
}
appView.prototype = app.prototype;
