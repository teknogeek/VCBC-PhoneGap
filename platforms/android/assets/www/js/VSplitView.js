var VSplitView = function(churchName)
{
	this.initialize = function()
	{
		this.$el = $("<div/>");
	};

	this.render = function()
	{
		this.$el.html(this.template({
			"churchName": churchName
		}));
		return this;
	};

	this.initialize();
};