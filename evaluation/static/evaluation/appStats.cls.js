/**
 * Created by daniel on 12.11.16.
 */

function appStats() {
    this.appName = "appStats";

    var self = this;
    var menuElements;
    var currentItem;

    this.onNavbarLoaded = function() {
        console.log('Navbar loaded');
        menuElements = $('#' + self.controlDiv + " a");
        menuElements.click(function() { selectMenuElement(this); });
        selectMenuElement(menuElements[0]);
    };


    function selectMenuElement(element){
        menuElements.parent().removeClass('active');
        currentItem = $(element);
        currentItem.parent().addClass('active');

        console.log("Show Stats: " + currentItem.innerText);

        $.get('/api/stats/' + currentItem.attr('data-src'), function(data) {
            displayContent(data);
        }).fail(function(data) {
            //self.errorFunction("Error loading navigation bar. Please reload the page")
        });

        showLoader(this.mapDiv);
    }


    /**
     * Displays the given data with graph.js
     * @param data an array of graph.js data
     */
    function displayContent(data){
        var content = $('#' + this.mapDiv);
        content.innerHTML = '';

        while(data.length >= 2){
            var div = $('<div/>');

            var canv1 = createChart(data.shift(), "45%"),
                canv2 = createChart(data.shift(), "45%", "right");

            div.append(canv1);
            div.append(canv2);

            content.append(div);
            console.log("Placing 2 canvas in line");
        }
        while(data.length > 0){
            var div = $('<div/>');

            var canv = createChart(data.shift(), "100%");

            div.append(canv);

            content.append(div);
            console.log("Placing single canvas");
        }
    }


    function createChart(data, width, float){
        var canvas = $('<canvas/>').width(width).height('20em');
        if(float != undefined)
            canvas.css("float", float);

        new Chart(this.canvas,data);
        return canvas;
    }


    this.runApp = function (mapDiv,controlDiv) {
        app.prototype.runApp.call(this, mapDiv, controlDiv);
        console.log(this.mapDiv);
        showLoader(this.mapDiv);
    };

    // no map here
    this.stopApp = function(){};
}
appStats.prototype = app.prototype;
