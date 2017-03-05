/* =====================
 Leaflet setup
===================== */
//set the basemap
var mymap = L.map('map',{
          center:[41.875994, -87.618916],
          zoom: 11
        });

titleLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
           maxZoom: 18,
           attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
      }).addTo(mymap);


var nMap=function(){
    titleLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
         maxZoom: 18,
         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
    }).addTo(mymap).bringToFront();
};

//first slide map
var philly = "https://gist.githubusercontent.com/Ziqinwang/175b3c0fbca09e304edece2e0c757d44/raw/5c7671b92d0af864c06228e888d46c2d1284e755/mid.json";
//dot style
var geojsonMarkerOptions = {
    radius: 5,
    fillColor: "#ff7800",
    stroke:false,
    fillOpacity: 0.6
};

var pointStyle = function(a){
    if(a.properties.Results == "Fail" ) {
        return {fillColor: "#ff7800",radius: 5,fillOpacity: 0.6,stroke:false,};
    } else{
       return {fillColor: "#4575b5",radius: 5,fillOpacity: 0.6,stroke:false,};
    }
    //console.log(feature);
  };


function clipon(){
  clip();
  range['oninput' in range ? 'oninput' : 'onchange'] = clip;
  mymap.on('move', clip);
}


function clip() {
  overlay = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png').addTo(mymap);
  var range = document.getElementById('range');
    var nw = mymap.containerPointToLayerPoint([0, 0]),
        se = mymap.containerPointToLayerPoint(mymap.getSize()),
        clipX = nw.x + (se.x - nw.x) * range.value;
    overlay.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
  }


$(document).ready(function() {
  $.ajax(philly).done(function(data){
    var parsedData = JSON.parse(data);
    innitial = L.geoJSON(parsedData,{
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
          }
      }
    ).addTo(mymap);
   });
});
