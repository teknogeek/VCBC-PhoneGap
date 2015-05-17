var DirectionsView = function(churchName, address)
{
	var directionsDisplay;
	var directionsService = new google.maps.DirectionsService();

	this.initialize = function()
	{
		this.$el = $("<div/>");
	};

	this.render = function()
	{
		this.$el.html(this.template({
			"address": address,
			"churchName": churchName
		}));
		return this;
	};

	this.initialize();
};