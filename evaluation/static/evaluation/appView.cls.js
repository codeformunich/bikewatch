/**
 * Created by benjamin on 12.11.16.
 */

function appView() {
    this.mapManager = new heatmapManager("evaluation");
    this.appName = "appView";
    
    //this.errorFunction = app.prototype.errorFunction;
    
    this.evaluateParams = function() {
        var form = document.querySelector("#" + this.controlDiv + " form");
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

        // bind change event handlers
        var form = document.querySelector("#" + this.controlDiv + " form");
        $(form.date).bind('dp.change', function(){ thiz.refresh(); });
        // TODO find out event for slider
        //$(form.timo).change(function(){ thiz.refresh(); });

        // init map
        this.evaluateParams();
        this.mapManager.createMap(this.mapDiv,heatMapLayer);
    }
    
    this.runApp = function (mapDiv,controlDiv) {
        app.prototype.runApp.call(this,mapDiv,controlDiv);
    }
    
    //this.stopApp = app.prototype.stopApp
}
appView.prototype = app.prototype;