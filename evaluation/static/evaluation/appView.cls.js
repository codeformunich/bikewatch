/**
 * Created by benjamin on 12.11.16.
 */

function appView() {
    this.mapManager = new heatmapManager("appView");
    this.appName = "appView";
    this.restEndpoint = "/api/" + this.appName;
    
    var thiz = this;
    //this.errorFunction = app.prototype.errorFunction;
    
    this.setStatus = function(text) {
        $("#appViewStatus").text(text);
    }

    this.evaluateParams = function() {
        var form = document.forms.appViewForm;
        var date = form.date.value;
        var time = form.time.value;
        this.mapManager.customParams = encodeURI(date) + '/' + encodeURI(time);
        console.log(this.mapManager.customParams);
    };

    this.refresh = function() {
        this.evaluateParams();
        this.setStatus("Loading data ...");
        this.mapManager.refreshMap()
            .done(function(){ thiz.setStatus("Done!"); })
            .fail(function(){ thiz.setStatus("Error!"); });
    };

    this.onNavbarLoaded = function() { /* has to be defined beofre runapp */
        // bind form event handler
        $(document.forms.appViewForm).bind('submit', function(e) {
            e.preventDefault();
            thiz.refresh();
        });

        // hide until loading is complete
        $(document.forms.appViewForm).hide();
        this.setStatus("Loading data ...");

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
            $('#timepicker').slider({ formatter: function(value) { return value + " o'clock";} });

            $(document.forms.appViewForm).show();
            
            // init map
            thiz.evaluateParams();
            thiz.mapManager.createMap(thiz.mapDiv, heatMapLayer)
                .done(function(){ thiz.setStatus("Done!"); })
                .fail(function(){ thiz.setStatus("Error!"); });
        }).fail(function(){ alert("Could not load available dates!"); });
    }
    
    this.runApp = function (mapDiv,controlDiv) {
        app.prototype.runApp.call(this,mapDiv,controlDiv);
    }
    
    this.stopApp = function() {
        app.prototype.stopApp.call(this);
    }
    
    //this.stopApp = app.prototype.stopApp
}
appView.prototype = app.prototype;
