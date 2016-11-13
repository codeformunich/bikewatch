function followLayer() {
    this.init = function(map) {
        this.map = map;
        this.layer = null;
    }

    this.setData = function(data) {
        if(this.layer) {
            this.map.removeLayer(this.layer);
        }

        if(data.data.length > 0) {
            lines = [{"type": "LineString", "coordinates": data.data}];

            document.getElementById('appFollowDates').style.visibility = "visible";
            document.getElementById('appFollowMinDate').innerHTML = data.min_date;
            document.getElementById('appFollowMaxDate').innerHTML = data.max_date;

            this.layer = L.geoJSON(lines).addTo(this.map);
        }
        else {
            alert("No data found for this bike");
        }
    }
}
