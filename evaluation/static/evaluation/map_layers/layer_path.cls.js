function pathLayer() {
    this.init = function(map) {
        this.map = map;
        this.layers = [];
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

        console.log(lines);

        var myLayer = L.geoJSON(lines).addTo(this.map);
    }
}
