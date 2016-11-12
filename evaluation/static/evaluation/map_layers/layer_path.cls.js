function pathLayer() {
    this.init = function(map) {
        this.map = map;
        this.layers = [];
    }

    this.setData = function(data) {
        console.log(data);
        //overlay = this.map.addLayer(this.overlay);
        //overlay.setData({data: data});
    }
}
