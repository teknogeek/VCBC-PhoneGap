var ChurchView = function(church)
{
	this.initialize = function()
	{
		this.$el = $("<div/>");
	};

	this.render = function()
	{
		var address = (church == "Avon") ? "590+West+Avon+Rd+Avon+CT+06001" : "718+Pine+St+Bristol+CT+06010";
		this.$el.html(this.template({
			"churchName": church,
			"address": address
		}));
		return this;
	};

	this.initialize();
};