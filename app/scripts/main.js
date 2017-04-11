var mapModule = (function() {
  var map,
    countries,
    autocomplete,
    places,
    imageMap,
    currentDateISO,
    activity,
    climbConditions,
    skiConditions
    ;

  function getTileUrl(tile, zoom) {
    var layer = (activity == 'ski') ? skiConditions : climbConditions;

    return "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/" +
              layer + "/default/" + currentDateISO +
              "/GoogleMapsCompatible_Level6/" +
              zoom + "/" + tile.y + "/" +
              tile.x + ".png";
  }

  function layerOptions() {
    return {
      alt: 'Activity Layer',
      getTileUrl: getTileUrl,
      maxZoom: 13,
      minZoom: 1,
      name: 'Activity Layer',
      tileSize: new google.maps.Size(256, 256),
      opactiy: 0.5
    };
  }

  function init() {
    countries = {
      'us': {
        center: {
          lat: 37.1,
          lng: -95.7
        },
        zoom: 3
      }
    };

    currentDateISO = new Date().toISOString().split("T")[0];
    activity = 'climb';
    climbConditions = 'AMSR2_Soil_Moisture_SCA_Day';
    skiConditions = 'AMSR2_Snow_Water_Equivalent';

    // Create the map
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: countries.us.zoom,
      center: countries.us.center,
      mapTypeControl: false,
      panControl: false,
      zoomControl: true,
      streetViewControl: false
    });

    // Create autocomplete
    autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */
      (
        document.getElementsByClassName('search-query')[0]), {
        types: ['geocode'],
        componentRestrictions: {
          'country': 'us'
        }
      });

    // Create places search
    places = new google.maps.places.PlacesService(map);

    // Create overlay map
    imageMap = new google.maps.ImageMapType(layerOptions());
    map.overlayMapTypes.push(imageMap);
  }
  return {
    init: init,
  };
})();

mapModule.init();
