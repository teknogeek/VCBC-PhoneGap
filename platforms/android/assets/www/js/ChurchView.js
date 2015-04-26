var ChurchView = function(church)
{
	this.initialize = function()
	{
		this.$el = $("<div/>");
	};

	this.render = function()
	{
		this.$el.html(this.template({"churchName": church}));
		return this;
	};

	this.initialize();
};