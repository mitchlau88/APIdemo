
$(function() {
    
 //code start
    
  var $orders = $('#orders');
  
  var orderTemplate = $('#order-template').html();
  
  var devices;
    
    //create list of devices after login

    $('#btn').click(function(){
        
    var email = $ ('#txtEmail').val();
        
    var password = $ ('#txtPassword').val();

  
    function addOrder(order) {
    $orders.append(Mustache.render(orderTemplate, order));
    };
    
    $.ajax({
    type: 'GET',
    url: 'http://tattle.cloud/api/devices',
    crossDomain:true,
    dataType:'json',
    contentType: "application/json; charset=utf-8",
        
        headers:{ 
            "Authorization": "Basic " + btoa(email + ":" + password)
      },
        
        
    success: function(data) {
        devices = data;
        
        
        
      $.each(data, function(i, order) {
          
        if (order.id) {
          addOrder(order);
        }
      });
    },
    error: function() {
      alert('error loading orders');
    }
  });
    

 
  });
    
    //del devices
    
    $orders.delegate('.remove', 'click', function() {
        
      
    var email = $ ('#txtEmail').val();
    var password = $ ('#txtPassword').val();
    var $li = $(this).closest('li');
        
        


    $.ajax({
      contentType: "application/json; charset=utf-8",
      crossDomain:true,
      dataType:'json',
      type: 'DELETE',
      url: 'http://tattle.cloud/api/devices/' + $(this).attr('data-id'),
        
        headers:{ 
            "Authorization": "Basic " + btoa(email + ":" + password)
      },
        
      success: function() {
        $li.fadeOut(300, function() {
          $(this).remove();
        });
      }
    });
  });
    
    
    //edit devices
    
    $orders.delegate('.editOrder', 'click', function() {
        
      
    var $li = $(this).closest('li');

    $li.find('input.name').val( $li.find('span.name').html() );
    

    
   
   
    $li.addClass('edit');
    
  });

    //cancel enditing
  $orders.delegate('.cancelEdit', 'click', function() {
    $(this).closest('li').removeClass('edit');
  });
    
    //save setting

  $orders.delegate('.saveEdit', 'click', function() {
      
    var email = $ ('#txtEmail').val();
    var password = $ ('#txtPassword').val();
    var $li = $(this).closest('li');
    var order;
      
      
    for (i = 0; i < devices.length; i++) {
        devices[i]
        if(devices[i].id==$li.attr('data-id')){
            order=devices[i];
           }
    }
      
      order.name =  $li.find('input.name').val();
 
    $.ajax({
      type: 'PUT',
      contentType: "application/json; charset=utf-8",
      crossDomain:true,
     
      dataType:'json',
    
      url: 'http://tattle.cloud/api/devices/' + $(this).attr('data-id'),
      
      headers:{ 
            
            "Authorization": "Basic " + btoa(email + ":" + password)
      },
      
       data: JSON.stringify(order), 
        
        
        
      success: function(newOrder) {
        $li.find('span.name').html(order.name);
        //$li.find('span.drink').html(order.drink);
        $li.removeClass('edit');
      },
      error: function() {
        alert('error updating order');
     }
    });

  });

    
//code ended

});
