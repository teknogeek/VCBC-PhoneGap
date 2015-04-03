var HomeView = function()
{
	this.initialize = function()
	{
		this.$el = $("<div/>");
		this.render();
	};

	this.render = function()
	{
		this.$el.html(this.template());
		return this;
	};

	this.loadMap = function()
	{
		navigator.geolocation.getCurrentPosition(
		function(position)
		{
			var longitude = position.coords.longitude;
			var latitude = position.coords.latitude;
			var latLong = new google.maps.LatLng(latitude, longitude);

			var mapOptions = {
				center: latLong,
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions)

			var youMarker = new google.maps.Marker({
				position: latLong,
				map: map,
				title: "You"
			});

			var geocoder = new google.maps.Geocoder();
			var bounds = new google.maps.LatLngBounds();
			geocoder.geocode({"address": "590 West Avon Rd, Avon, CT 06001"}, function(results, status)
			{
				if(status == google.maps.GeocoderStatus.OK)
				{
					var vcbcMarker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location,
						title: "VCBC"
					});
					bounds.extend(vcbcMarker.getPosition());
				}
				else
				{
					alert("Geocode was not successful for the following reason: " + status);
				}
			});

			geocoder.geocode({"address" : "718 Pine Street, Bristol, CT 06010"}, function(results, status)
			{
				if(status == google.maps.GeocoderStatus.OK)
				{
					var bristolMarker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location,
						title: "Bristol Multi-Site"
					});
					bounds.extend(vcbcMarker.getPosition());
				}
				else
				{
					alert("Geocode was not successful for the following reason: " + status);
				}
			});

			map.fitBounds(bounds);
		},
		function(error)
		{
			alert("Error getting location. Code: " + error.code + " | Message: " + error.message);
		});
	};

	this.initialize();
};