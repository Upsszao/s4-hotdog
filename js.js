
var musteribeklentisi = {
	ekmek_pisme_orani: 1,
	sosis_pisme_orani: 1,
	urun_icerik: [],
}
var pisirim = 1;
var pisirim2 = 1;
var pub_1_intvl = null;
var pub_2_intvl = null;
    var ekmekpisiyor = false;
	var sosispisiyor = false;
	
	
	
window.addEventListener('message', (event) => {
	let data = event.data
	switch(data.action) {
		case 'start':
		$("body").css("display","unset");
		$(".state1").css("display","unset");
		resetS4();
		break;
		 
	}
});

	
	$(".ekmek").click(function() { $(".ekmek").draggable('enable'); });
	$(".sosis").click(function() { $(".sosis").draggable('enable'); });
	 $(".sosis").draggable({
		
	  start: function( event, ui ) {  sosispisiyor = false; } 
		
	});
    $( ".ekmek" ).draggable({
		
	  start: function( event, ui ) { ekmekpisiyor = false; } 
		
	});
	
	$( ".sos" ).draggable({ });
	$( ".malzeme" ).draggable({ });
	
	$( ".sosisliekmegi" ).droppable({
          drop: function( event, ui ) {	 
            var konum = Math.floor(Math.random() * 5) + 1;
			musteribeklentisi.urun_icerik.push($(ui.draggable).attr('data-info'));
			switch($(ui.draggable).attr('data-info'))   {
				case "ketcap":
				$(".sosisliekmegi").append(`<div class="eklenensos" style="background: url(img/ketcap.png) no-repeat;left:${konum}vh"></div>`);
				break;
				case "mayo":
				$(".sosisliekmegi").append(`<div class="eklenensos" style="background: url(img/mayo.png) no-repeat;left:${konum}vh"></div>`);
				break;
				case "hardal":
				$(".sosisliekmegi").append(`<div class="eklenensos" style="background: url(img/hardal.png) no-repeat;left:${konum}vh"></div>`);
				break;
				case "mantar":
				$(".sosisliekmegi").append(`<div class="eklenensos" style="background: url(img/vegetable/17.png) no-repeat;left:${konum}vh"></div>`);
				break;
				case "misir":
				$(".sosisliekmegi").append(`<div class="eklenensos" style="background: url(img/vegetable/19.png) no-repeat;left:${konum}vh"></div>`);
				break;
				case "avakado":
				$(".sosisliekmegi").append(`<div class="eklenensos" style="background: url(img/vegetable/16.png) no-repeat;left:${konum}vh"></div>`);
				break;
				case "nane":
				$(".sosisliekmegi").append(`<div class="eklenensos" style="background: url(img/vegetable/8.png) no-repeat;left:${konum}vh"></div>`);
				break;
				case "peynir":
				$(".sosisliekmegi").append(`<div class="eklenensos" style="background: url(img/vegetable/6.png) no-repeat;left:${konum}vh"></div>`);
				break;
				case "hiyar":
				$(".sosisliekmegi").append(`<div class="eklenensos" style="background: url(img/vegetable/5.png) no-repeat;left:${konum}vh"></div>`);
				break;
				case "sogan":
				$(".sosisliekmegi").append(`<div class="eklenensos" style="background: url(img/vegetable/11.png) no-repeat;left:${konum}vh"></div>`);
				break;
				case "marul":
				$(".sosisliekmegi").append(`<div class="eklenensos" style="background: url(img/vegetable/1.png) no-repeat;left:${konum}vh"></div>`);
				break;
				case "domates":
				$(".sosisliekmegi").append(`<div class="eklenensos" style="background: url(img/vegetable/2.png) no-repeat;left:${konum}vh"></div>`);
				break;
			}
			 
			 
		  } 
    });		  
	$( ".grill2" ).droppable({
      drop: function( event, ui ) {
		sosispisiyor = true;
		$(".sosis").draggable('disable');
		if($(ui.draggable).attr('data-info')) {
			pisirim2 = parseInt($(ui.draggable).attr('data-info'));
		}
		if(pub_1_intvl != null) {
			clearInterval(pub_1_intvl);
		}
		
		pub_1_intvl = setInterval(function(){  
		  
          
			if(sosispisiyor == true) {
				if(pisirim2 != 8){  pisirim2 = pisirim2 + 1; }
				$(ui.draggable).css("background", "url(img/make1/sausage"+pisirim2+".png) no-repeat");
				$(ui.draggable).attr('data-info', pisirim2);
				musteribeklentisi.sosis_pisme_orani = pisirim2;
 
			}
            
		}, 1500);
      }
    });
    $( ".grill" ).droppable({
      drop: function( event, ui ) {
		ekmekpisiyor = true;
		$(".ekmek").draggable('disable');
		if($(ui.draggable).attr('data-info')) {
			pisirim = parseInt($(ui.draggable).attr('data-info'));
		}
		if(pub_2_intvl != null) {
			clearInterval(pub_2_intvl);
		}
		
		pub_2_intvl = setInterval(function(){  
		  
          
			if(ekmekpisiyor == true) {
				if(pisirim != 7){  pisirim = pisirim + 1; }
				$(ui.draggable).css("background", "url(img/make3/bread"+pisirim+".png) no-repeat");
				$(ui.draggable).attr('data-info', pisirim);
				musteribeklentisi.ekmek_pisme_orani = pisirim;
 
			}
            
		}, 1500);
      }
    });
	
	$( ".tahta1" ).droppable({
      drop: function( event, ui ) {
    
		 $("p").html("Sosisi pişirin ve daha sonra tabağa bırakın.");
		 if(musteribeklentisi.ekmek_pisme_orani <= 2) {
		   Close("Ekmek hiç pişmemiş");
		 } else if(musteribeklentisi.ekmek_pisme_orani >= 6) { Close("Ekmek çok pişmiş"); }else {
		  $(".state1").css("display","none");
		  $(".state2").css("display","unset");
		 }
	  }
    });
	
	$( ".tabak" ).droppable({
      drop: function( event, ui ) {
    
		 $("p").html("Malzemeleri birleştirin ve paketleyin.");
		 if(musteribeklentisi.sosis_pisme_orani <= 2) {
		   Close("Sosis hiç pişmemiş");
		 } else if(musteribeklentisi.sosis_pisme_orani >= 7) { Close("Sosis çok pişmiş"); }else {
		  $(".state1").css("display","none");
		  $(".state2").css("display","none");
		  $(".state3").css("display","unset");
		 }
	  }
    });
	var firstclick = false;
	$(".right").click( 
		
		function() { 
		if(firstclick == false) {
		 $(".sos").css("display", "unset"); 
		 $(".malzeme").css("display", "none"); 
		 firstclick = true;
		}else {
		 $(".sos").css("display", "none"); 
		 $(".malzeme").css("display", "unset"); 
		  firstclick = false;
		  Close("Başarılı");
		  $(".sosisliekmegi").html("");
		  
		  

		}
		
		
		}
		
	 );
	
	
	function Close(reason){
		$.post("http://s4-hotdog/Close", JSON.stringify({ reason: reason, icerik: musteribeklentisi.urun_icerik }));
		$("body").css("display","none");
		$(".state1").css("display","none");
		$(".state2").css("display","none");
		$(".state3").css("display","none");
		resetS4();
		window.location.reload();
	}
	
	
	function resetS4() {
		$(".ekmek").css({"top":"25vh","left":"0","background":"url(img/make3/bread1.png) no-repeat"  });
		$(".sosis").css({"top":"25vh","left":"0","background":"url(img/make1/sausage1.png) no-repeat"  });
		pisirim = 1;
		pisirim2 = 1;
		ekmekpisiyor = false;
		sosispisiyor = false;
		$(".ekmek").attr('data-info', "1");
		$(".sosis").attr('data-info', "1");
		
		musteribeklentisi.urun_icerik = [];
	}
	 