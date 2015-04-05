var HomeView = function()
{
	var eta;
	this.initialize = function()
	{
		this.$el = $("<div/>");
		this.render();
	};

	this.render = function()
	{
		this.$el.html(this.template(eta));
		return this;
	};

	this.setEtaData = function(etaData)
	{
		eta = etaData;
		this.render();
	};

	this.loadMap = function()
	{
		var deferred = $.Deferred();
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

				var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
				drawMarkers(map, latLong);
				var etaURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + latLong.lat() + "," + latLong.lng() + "&destinations=590+West+Avon+Rd+Avon+CT+06001|718+Pine+St+Bristol+CT+06010";
				$.get(etaURL, function(data)
				{
					if(data.hasOwnProperty("rows"))
					{
						var etaRows = data["rows"][0]["elements"];
						var etaData = {
							"vcbcETA": etaRows[0]["duration"]["text"],
							"bristolETA": etaRows[1]["duration"]["text"]
						};
						deferred.resolveWith(this, etaData);
					}
				});
			},
			function(error)
			{
				alert("Error getting location. Code: " + error.code + " | Message: " + error.message);
			});

			return deferred.promise();
	};

	this.initialize();
};