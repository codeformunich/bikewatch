function followLayer() {
    this.init = function(map) {
        this.map = map;
        this.layer = null;
    }

    this.setData = function(data) {
        if(this.layer) {
            this.map.removeLayer(this.layer);
        }

        if(data.length > 0) {
            lines = [{"type": "LineString", "coordinates": data}];

            this.layer = L.geoJSON(lines).addTo(this.map);
        }
        else {
            alert("No data found for this bike");
        }
    }
}
