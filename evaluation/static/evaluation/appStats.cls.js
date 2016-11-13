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
            content.append(div);
            this.createChart(div, data.shift(), "45%");
            this.createChart(div, data.shift(), "45%", "right");
        }
        while(data.length > 0) {
            var div = $('<div/>');
            content.append(div);

            this.createChart(div, data.shift(), "100%");
        }
    };


    this.createChart = function(parent, data, width, float) {
        var canvas = $('<canvas/>').width(width).height('20em');
        if (float != undefined)
            canvas.css("float", float);
        parent.append(canvas);

        new Chart(canvas[0].getContext('2d'), data);
    };


    this.runApp = function (mapDiv, controlDiv) {
        app.prototype.runApp.call(this, mapDiv, controlDiv);
    };

    // no map here
    this.stopApp = function() {};
}
appStats.prototype = app.prototype;
