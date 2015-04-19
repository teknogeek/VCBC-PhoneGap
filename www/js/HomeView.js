var HomeView = function()
{
	var eta;
	var latLong;

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
		latLong = etaData["latLong"];
		this.render();
	};

	this.getEtaData = function()
	{
		var deferred = $.Deferred();
		navigator.geolocation.getCurrentPosition(function(position)
		{
			var longitude = position.coords.longitude;
			var latitude = position.coords.latitude;
			var latLongData = new google.maps.LatLng(latitude, longitude);

			var etaURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + latLongData.lat() + "," + latLongData.lng() + "&destinations=590+West+Avon+Rd+Avon+CT+06001|718+Pine+St+Bristol+CT+06010";
			$.get(etaURL, function(data)
			{
				if(data.hasOwnProperty("rows"))
				{
					var etaRows = data["rows"][0]["elements"];
					var etaData = {
						"vcbcETA": etaRows[0]["duration"]["text"],
						"bristolETA": etaRows[1]["duration"]["text"],
						"latLong": latLongData
					};
					deferred.resolve(etaData);
				}
			});
		},
		function(error)
		{
			alert("Error getting location. Code: " + error.code + " | Message: " + error.message);
		});

		return deferred.promise();
	};

	this.loadMap = function()
	{
		var mapOptions = {
			center: latLong,
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		drawMarkers(map, latLong);
	};

	this.initialize();
};