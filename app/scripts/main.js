var layerOptions = function() {
  return {
    alt: "Activity Layer",
    getTileUrl: getTileUrl,
    maxZoom: 13,
    minZoom: 1,
    name: "Activity Layer",
    tileSize: new google.maps.Size(256, 256),
    opactity: 0.5
  };
};

var getTileUrl = function(tile, zoom) {
  var layer = "climb";
  var date = new Date().toISOString().split("T")[0];

  return "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/" +
              layer + "/default/" + date +
              "/GoogleMapsCompatible_Level6/" +
              zoom + "/" + tile.y + "/" +
              tile.x + ".png";
};

var countries = {
  'us': {
    center: {
      lat: 37.1,
      lng: -95.7
    },
    zoom: 3
  }
};

var map = new google.maps.Map(document.getElementById('map'), {
  center: countries.us.center,
  zoom: countries.us.zoom,
  mapTypeControl: false,
  panControl: false,
  zoomControl: false,
  streetViewControl: false
});

var imageMapType = new google.maps.ImageMapType(layerOptions());
map.overlayMapTypes.push(imageMapType);
