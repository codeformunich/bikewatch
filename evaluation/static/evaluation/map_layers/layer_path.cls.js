function pathLayer() {
    this.init = function(map) {
        this.map = map;
        this.layer = null;
    }

    this.setData = function(data) {
        lines = [];

        for(d in data) {
            tmp = {"type": "LineString", "coordinates": []};
            for(p in data[d].path) {
                tmp["coordinates"].push(data[d].path[p]);
            }
            lines.push(tmp);
        }

        if(this.layer) {
            this.map.removeLayer(this.layer);
        }
        this.layer = L.geoJSON(lines).addTo(this.map);
    }
}
