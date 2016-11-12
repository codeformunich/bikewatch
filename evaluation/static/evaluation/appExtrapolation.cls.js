/**
 * Created by benjamin on 12.11.16.
 */

function appExtrapolation() {
    this.mapManager = new heatmapManager("evaluation");
    this.appName = "appExtrapolation";
    
    //this.errorFunction = app.prototype.errorFunction;
    
    this.evaluateParams = function() {
        var form = document.forms.appExtrapolationForm;
        var weekday = form.weekday.value;
        var extime = form.extrapolationtime.value;
        this.mapManager.customParams = encodeURI(weekday) + '/' + encodeURI(extime);
        console.log(this.mapManager.customParams);
    };

    this.refresh = function() {
        this.evaluateParams();
        this.mapManager.refreshMap();
    };

    this.onNavbarLoaded = function() { /* has to be defined beofre runapp */
        var thiz = this;

        $('#weekdayslider').slider({
            ticks: [0,1,2,3,4,5,6],
            ticks_labels: ["Mo","Tu","We","Th","Fr","Sa","Su"]
        });
        $('#extrapolationtimepicker').slider({ formatter: function(value) {
            return value + ' o\'clock';
        }});

        // bind form event handler
        $(document.forms.appViewForm).bind('submit', function(e) {
            e.preventDefault();
            thiz.refresh();
        });

        // init map
        this.evaluateParams();
        this.mapManager.createMap(this.mapDiv, heatMapLayer);
    }
    
    this.runApp = function (mapDiv,controlDiv) {
        app.prototype.runApp.call(this,mapDiv,controlDiv);
    }
    
    //this.stopApp = app.prototype.stopApp
}
appExtrapolation.prototype = app.prototype;
