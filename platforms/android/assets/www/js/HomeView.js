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
		this.loadMap();
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
		},
		function(error)
		{
			alert("Error getting location. Code: " + error.code + " | Message: " + error.message);
		});
	};

	this.initialize();
};