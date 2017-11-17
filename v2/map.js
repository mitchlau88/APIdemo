//draw map

var map;
var uluru = {lat: 52.146973, lng: -106.647034};
var marker= [];
var infowindow = [];
var $orders = $('#orders');
var email = $ ('#txtEmail').val();
var password = $ ('#txtPassword').val();
var devicesPosition = $.Deferred();
var devicesList = $.Deferred();
var devicesIndex;


    
$.when( devicesPosition, devicesList ).done(function ( devicesPositionS, devicesListS ) {
    
    var typeList = [];
    

    for(j=0; j<devicesPositionS.length;j++){
        for(k=0; k<devicesListS.length; k ++){
            if(devicesPositionS[j].id == devicesListS[k].positionId){
                typeList[j]=devicesListS[k].type;
                
            }
        }
    }    
    updateMarker(devicesPositionS,devicesListS,typeList);

});

function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: uluru
        });
        

      }

function createMarker(map,tattleMarker,devicesIndex,devicesPositionS,markerLength,Icon){
    //devicesIndex bigcounter
    //tattlemarker storageltattleMarker& othersMarker
    //devicesPositionS devicesTable
    //markerLength tattlemakerLength
    
    
    var counter = 0;
     for (i = devicesIndex; i < markerLength; i++) {
          uluru.lat = tattleMarker[counter].latitude;
          uluru.lng = tattleMarker[counter].longitude;
         
            
                marker[i]= new google.maps.Marker({
                position: uluru,
                map: map,
                icon: Icon,
                
            });
            
          
                infowindow[i] = new google.maps.InfoWindow({
                   content: 'deviceId: '+devicesPositionS[i].deviceId + '</br>'
                    +'longitude: ' +devicesPositionS[i].longitude + '</br>'
                    +'latitude: ' +devicesPositionS[i].latitude + '</br>'
                    
                });
                (function(x) { // the IIFE
            google.maps.event.addListener(marker[x], 'click', function() {
                infowindow[x].open(map, marker[x]);
            });
                    
                    counter++;
                    devicesIndex++;
        })(i);
                
        }
    
}


function updateMarker(devicesPositionS,devicesListS,typeList){
        var storageltattleMarker=[]; //
        var othersMarker=[];
        var devicesIndex = 0; //
        map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: uluru 
    
      
        
        });
        for(p=0;p< devicesPositionS.length; p++){
            if(typeList[p]=='storageltattle'){
                storageltattleMarker.push(devicesPositionS[p]);
            }else if(typeList[p]!='storageltattle'){
                othersMarker.push(devicesPositionS[p]);
            }
        }
    var icon = '';
        
               
    createMarker(map,storageltattleMarker,devicesIndex,devicesPositionS,storageltattleMarker.length,icon);
    
    
    icon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    
    createMarker(map,othersMarker,devicesIndex,devicesPositionS,othersMarker.length ,icon );
    
 
         


//            var counter = 0;
//            for (i = devicesIndex; i < othersMarker.length + devicesIndex; i++) {
//                uluru.lat = othersMarker[counter].latitude;
//                uluru.lng = othersMarker[counter].longitude;
//            
//                marker[i]= new google.maps.Marker({
//                position: uluru,
//                map: map,
//                icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
//                
//            });
//            
//          
//                infowindow[i] = new google.maps.InfoWindow({
//                   content: 'deviceId: '+devicesPositionS[i].deviceId + '</br>'
//                    +'longitude: ' +devicesPositionS[i].longitude + '</br>'
//                    +'latitude: ' +devicesPositionS[i].latitude + '</br>'
//                    
//                });
//                (function(x) { // the IIFE
//            google.maps.event.addListener(marker[x], 'click', function() {
//                infowindow[x].open(map, marker[x]);
//            });
//
//        })(i);
//              counter++;  
//        }
  
    
}



   //this function draw marker after login

    $('#btn').click(function(){
        
    var email = $ ('#txtEmail').val();
    var password = $ ('#txtPassword').val();
    
    
  
     $.ajax({
    type: 'GET',
    url: 'http://tattle.cloud/api/devices',
    crossDomain:true,
    dataType:'json',
    async: false,
    contentType: "application/json; charset=utf-8",
        
        headers:{ 
            "Authorization": "Basic " + btoa(email + ":" + password)
      },
        
        
    success: function(data) {
        //devicesList = data;
        devicesList.resolve(data);
        
    },
    error: function() {
      alert('error loading orders');
    }
  });
        
    
    $.ajax({
    type: 'GET',
    url: 'http://tattle.cloud/api/positions',
    crossDomain:true,
    dataType:'json',
    async: false,
    contentType: "application/json; charset=utf-8",
        
        headers:{ 
            "Authorization": "Basic " + btoa(email + ":" + password)
      },
        
        
    success: function(data) {
      //devicesPosition = data;
      devicesPosition.resolve(data);
    
      
     
        
    },
    error: function() {
      alert('error loading orders');
    }
  });
        
 
 
  });