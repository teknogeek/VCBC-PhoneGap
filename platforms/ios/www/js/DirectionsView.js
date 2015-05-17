var DirectionsView = function(churchName, address)
{
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
		$('#map').load("https://maps.google.com?saddr=Current+Location&daddr=" + address);
		return this;
	};

	this.initialize();
};