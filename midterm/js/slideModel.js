/* ================================
Week 6 Assignment: Slide Model
================================ */

$(".title").not("#A").hide();
$("#button-prev").hide();
$("#range").hide();
var innitial =[];
var inn =[];

var resetMap = function(){
 mymap.eachLayer(function (layer) {
   //console.log(layer);
    if (layer != titleLayer ) {
     mymap.removeLayer(layer)
      //mymap.removeLayer(overlay)
         .panTo([41.875994, -87.618916], 11,{'duration':1 });
    }
 });
};


var count = 0;
var nextNum = function(){
  var next = $(".title:visible").hide().next();
    if (next.length > 0) {
        next.show();
      } else {
        $(".title:last").show();
      }

  var limit = $('div.title').length - 1;
  if (count + 1 > limit){
      count = 0;
    } else{
      count = count + 1;
      $('#button-prev').show();
    } return count,
      console.log(count);
};

var prevNum = function(){
  var prev = $(".title:visible").hide().prev();
    if (prev.length > 0){
        prev.show();
      } else{
        $(".title:first").show();
      }

  var limit = $('div.title').length - 1;
  if (count - 1 < 0){
      count = 0;
    } else{
      count = count - 1;
    } return count,
      console.log(count);
};

// var idCombo = $( ".title" ).map(function() {
//     return this.id;
//   })
//   .get();
//
// var nextSlide = function(){
//   var id = idCombo[count];
//   return id,
//         console.log(id);
// };

var showMap = function(){
  resetMap();
  if(count === 0){
    $.ajax(philly).done(function(data){
      var parsedData = JSON.parse(data);
      //console.log(parsedData);
      L.geoJSON(parsedData,{
            pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
            }
        }
      ).addTo(mymap);
     });
  } else if(count === 1){
    mymap.flyTo([41.875994, -87.618916], 11,{'duration':1.5 });
    $.ajax(philly).done(function(data){
      var parsedData = JSON.parse(data);
      L.geoJSON(parsedData,{
            pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
            }
        });
      L.markerClusterGroup().addLayer(
        L.geoJSON(parsedData,{
              pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
              }
          })
      ).addTo(mymap);
     });
  } else if (count === 2){
    mymap.flyTo([41.889376, -87.630527], 16, {
      'duration':1.5 }
    );
    $.ajax(philly).done(function(data){
      var parsedData = JSON.parse(data);
      L.geoJSON(parsedData,{
            pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions)
                      .bindPopup(feature.properties.DBA_Name + '<br/>' + feature.properties.Results);
            }
        }
      ).addTo(mymap);
     });
    } else if (count == 3){
      mymap.flyTo([41.875994, -87.618916], 11, {'duration':1.5 });
      $.ajax(philly).done(function(data){
        //console.log(data);
          var parsedData = JSON.parse(data);
          L.geoJSON(parsedData,{
                pointToLayer: function (feature, latlng) {
                  //console.log(feature);
                  return L.circleMarker(latlng, pointStyle(feature))
                          .bindPopup(feature.properties.DBA_Name + '<br/>' + feature.properties.Results);
                }
          }).addTo(mymap);
      });
    } else if (count === 4){
      $.ajax(philly).done(function(data){
          $("#range").show();
          var parsedData = JSON.parse(data);
          L.geoJSON(parsedData,{
                pointToLayer: function (feature, latlng) {
                  return L.circleMarker(latlng, pointStyle(feature))
                          .bindPopup(feature.properties.DBA_Name + '<br/>' + feature.properties.Results);
                }
          }).addTo(mymap);
      });
      clipon();
    }
};

$('#button-next').click(function(){
    nextNum();
    showMap();
    if (count == 4 ){
      $('#button-next').hide();
    }
});

$('#button-prev').click(function(){
    prevNum();
    showMap();
    nMap();
    $('#range').hide();
    $('#button-next').show();
    if (count === 0 ){
      $('#button-prev').hide();
    }
});

$('#button-reset').click(function(){
    count = 0;
    $("#A").show();
    $(".title").not("#A").hide();
    $("#button-prev").hide();
    showMap();
});
