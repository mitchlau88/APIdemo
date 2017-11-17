//draw map

var map;
var uluru = {lat: 52.146973, lng: -106.647034};
var devices;
var marker= [];
var infowindow = [];
var devicesType = [];
var $orders = $('#orders');
var email = $ ('#txtEmail').val();
var password = $ ('#txtPassword').val();

    


function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: uluru
        });
        

      }

function updateMarker(){
        map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: uluru
        //console.log(devices);
        });
        for (i = 0; i < devices.length; i++) {
                uluru.lat = devices[i].latitude;
                uluru.lng = devices[i].longitude;
                marker[i]= new google.maps.Marker({
                position: uluru,
                map: map          
            });
            
                infowindow[i] = new google.maps.InfoWindow({
                   content: 'deviceId: '+devices[i].deviceId + '</br>'
                    +'longitude: ' +devices[i].longitude + '</br>'
                    +'latitude: ' +devices[i].latitude
                    
                });
                (function(x) { // the IIFE
            google.maps.event.addListener(marker[x], 'click', function() {
                infowindow[x].open(map, marker[x]);
            });

        })(i);
                
        }
    

    
    
}



   //this function draw marker after login

    $('#btn').click(function(){
        
    var email = $ ('#txtEmail').val();
    var password = $ ('#txtPassword').val();
    
    $.ajax({
    type: 'GET',
    url: 'http://tattle.cloud/api/positions',
    crossDomain:true,
    dataType:'json',
    contentType: "application/json; charset=utf-8",
        
        headers:{ 
            "Authorization": "Basic " + btoa(email + ":" + password)
      },
        
        
    success: function(data) {
      devices = data;
      updateMarker();
    },
    error: function() {
      alert('error loading orders');
    }
  });
    

 
  });