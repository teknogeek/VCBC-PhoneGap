var DirectionsView = function(address)
{
	this.initialize = function()
	{
		this.$el = $("<div/>");
	};

	this.render = function()
	{
		var split = address.split("|");
		var addressLoc = split[0];
		var churchName = split[1];
		this.$el.html(this.template({
			"address": address,
			"churchName": churchName
		}));
		return this;
	};

	this.initialize();
};