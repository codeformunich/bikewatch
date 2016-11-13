function appProbability() {
    this.mapManager = new heatmapManager("appProbability");
    this.appName = "appProbability";
    this.restEndpoint = "/api/" + this.appName;
    
    //this.errorFunction = app.prototype.errorFunction;
    
    this.evaluateParams = function() {
		// reevaluate sliders and redraw circles
        this.mapManager.submapLayer.onMapClick(null);
    };

    this.refresh = function() {
        this.evaluateParams();
        //this.mapManager.refreshMap();
    };

    this.onNavbarLoaded = function() { /* has to be defined beofre runapp */
        var thiz = this;

        // bind form event handler
        $(document.forms.appProbForm).bind('submit', function(e) {
            e.preventDefault();
            thiz.refresh();
        });
		
		$('#weekdaysliderprob').slider({
            ticks: [1,2,3,4,5,6,7],
            ticks_labels: ["Su","Mo","Tu","We","Th","Fr","Sa"]
        });
        $('#extrapolationtimepickerprob').slider({ formatter: function(value) {
            return value + ' o\'clock';
        }});

        // init map
        // this.evaluateParams();
        this.mapManager.createMap(this.mapDiv, probabilityLayer, true);
        
    }
    
    this.runApp = function (mapDiv,controlDiv) {
        app.prototype.runApp.call(this,mapDiv,controlDiv);
    }
    
    //this.stopApp = app.prototype.stopApp
}
appView.prototype = app.prototype;
