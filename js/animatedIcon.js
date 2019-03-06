(function ( $ ) {
 
    $.fn.animateIcon = function( options ) {

    	if(this.length == 1){
    		var id = this[0].id;
    	}

    	if( typeof Pathformer === "function" && typeof Vivus === "function" ){

			window.iconObject = {}

			var settings = $.extend({
		        type: 'oneByOne',
		        start: 'inViewport',
		        dashGap: 20,
		        duration: 140
			}, options );

			$( '#' + id + ' svg' ).each(function() {
				var iconID = makeId();
				$(this).attr('id', iconID);
				window.iconObject['tc' + iconID] = new Vivus( iconID, settings );
			});

			// Delegate target modified for Clio

			$( '#' + id ).each(function(){
				$( "#" + $( this ).attr('id') ).delegate( ".grid_item", "mouseenter", function() {
					var iconID = $(this).find('.ai-icon svg').attr('id');
					if(!iconID) return false;
					window.iconObject['tc' + iconID].reset().play();
				});
			});

    	} else {

    		console.info("To use animateIcon make sure dependent plugins are available");

		}
		
		function makeId() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for (var i = 0; i < 10; i++)
			  text += possible.charAt(Math.floor(Math.random() * possible.length));
		  
			return text;
		}
        
        return this;
    };
 
}( jQuery ));