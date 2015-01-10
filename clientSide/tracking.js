// borrowed from : http://www.bennadel.com/blog/1752-tracking-google-adsense-clicks-with-jquery-and-coldfusion.htm
// obviously requires jquery 
var frameHeight;
var frameWidth;
$( document ).ready(function() {

	console.log('initialized tracking script');
	// I am a flag that will determine if the user is
	// currently mousing over a Google AdSense.
	var isOverGoogleAd = false;

	// When a user mouses over a Google AdSense iFrame, we
	// want to track that activity. This way, when the
	// current window blurs, we can guesstimate as to
	// whether or not the window-blur was due to the user
	// clicking the Google ad.

	// we want to support muliple ad providers rendering content in iframes
	// we are interested in where in the page the ads appear. 
	// 
	$('iframe').each(function()
	{
     	console.log($(this).attr('id'));
     	if( $(this).attr('id').match(/aswift/) ) 
     	{	        	        
	        $(this).mouseover(
		        function(){
		        	frameHeight = $this.height();
		        	frameWidth = $this.width();
		            console.log('over:'+frameHeight+'x'+frameWidth);
		            isOverGoogleAd = true;
		        }
		    );
		    $(this).mouseout(
		        function(){
		            isOverGoogleAd = false;
		            console.log('out');
		        }
		    );
     	}
  	});
	

/*
	$( "iframe[ id *= google ]" )
	    .mouseover(
	        function(){
	            console.log('over');
	            isOverGoogleAd = true;
	        }
	    )
	    .mouseout(
	        function(){
	            isOverGoogleAd = false;
	            console.log('out');
	        }
	    );
*/
	// Now that we are tracking the mouse movements over
	// the Google AdSense, let's track the window's blur
	// event to see if we can guesstimate the AdSesnse
	// usage.
	$( window ).blur(
	    function(){
	        // Check to see if the user was over a Google
	        // AdSense ad when the window was blurred.
	        if (isOverGoogleAd){

	            // Because the user was mousing over a
	            // Google AdSense iFrame when the window
	            // was blurred, it is reasonable to
	            // estimate that the blurring is due to
	            // the user clicking one of the ads.
	            
	            // we want to invoke google tag manager here
	            // lets have an alert for know for some testing
	            alert('looks like you clicked an ad! - iframe height:'+frameHeight+' - width:'+frameWidth);

	            /*
	            $.ajax({
	                type: "post",
	                url: "track.cfm",
	                data: {
	                    adUrl: window.location.href
	                    }
	            }); */

	        }
	    }
	)
	// Focus the window by default.
	.focus();
});
