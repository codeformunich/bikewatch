/**
 * Created by daniel on 12.11.16.
 */

function appStats() {
    this.appName = "appStats";

    this.menuElements = null;
    this.currentItem = null;

    this.onNavbarLoaded = function() {
        this.menuElements = $('#' + this.controlDiv + " a");
        this.currentItem = $(this.menuElements[0]);
        var self = this;
        this.menuElements.click(function() { self.selectMenuElement($(this)); });
        this.selectMenuElement(this.currentItem);
    };

    this.selectMenuElement = function(element) {
        this.menuElements.parent().removeClass('active');
        this.currentItem = element;
        this.currentItem.parent().addClass('active');

        var self = this;
        $.getJSON('/api/appStats/' + this.currentItem.attr('data-src'), function(data) {
            self.displayContent(data);
        }).fail(function(data) {
            self.errorFunction("Error loading navigation bar. Please reload the page")
        });

        showLoader(self.mapDiv);
    };

    /**
     * Displays the given data with graph.js
     * @param data an array of graph.js data
     */
    this.displayContent = function(data) {
        var content = $('#' + this.mapDiv);
        content.innerHTML = '';

        while(data.length >= 2) {
            var div = $('<div/>');

            var canv1 = this.createChart(data.shift(), "45%");
            var canv2 = this.createChart(data.shift(), "45%", "right");

            div.append(canv1);
            div.append(canv2);

            content.append(div);
            console.log("Placing 2 canvas in line");
        }
        while(data.length > 0){
            var div = $('<div/>');

            var canv = this.createChart(data.shift(), "100%");

            div.append(canv);

            content.append(div);
            console.log("Placing single canvas");
        }
    };


    this.createChart = function(data, width, float) {
        var canvas = $('<canvas/>').width(width).height('20em');
        if (float != undefined)
            canvas.css("float", float);

        new Chart(canvas, data);
        return canvas;
    };


    this.runApp = function (mapDiv, controlDiv) {
        app.prototype.runApp.call(this, mapDiv, controlDiv);
        showLoader('content');
    };

    // no map here
    this.stopApp = function() {};
}
appStats.prototype = app.prototype;
