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
		return this;
	};

	this.initialize();
};