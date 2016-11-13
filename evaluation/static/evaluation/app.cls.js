function app() {
    
}

app.prototype = {
    
    onNavbarLoaded: function() {
        
    },
    errorFunction: function (msg) {
        alert(msg)
    },
    runApp: function(mapDiv,controlDiv) {
        var self = this;
        this.mapDiv = mapDiv;
        this.controlDiv = controlDiv;
        $.get('/controlbars/'+ this.appName, function(data) {
            $('#' + self.controlDiv).html(data);
            self.onNavbarLoaded();
        })
        .fail(function(data) {
            self.errorFunction("Error loading navigation bar. Please reload the page") 
        })
    },
    
    stopApp: function() {
        this.mapManager.removeMap();
    }
};