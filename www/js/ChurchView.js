var ChurchView = function(church)
{
	this.initialize = function()
	{
		this.$el = $("<div/>");
	};

	this.render = function()
	{
		var address = (church == "Avon") ? "590+West+Avon+Rd+Avon+CT+06001" : "718+Pine+St+Bristol+CT+06010";
		var timeUntil = moment("4:30 +0000")

		this.$el.html(this.template({
			"churchName": church,
			"address": address,
			"timeUntil" : timeUntil
		}));
		return this;
	};

	this.calcTime = function()
	{
		var serviceStartTimes = ["8:00", "9:30", "11:00"];
		var serviceEndTimes = ["9:00", "10:00"];

		var currentTime = moment().unix();
	};

	this.initialize();
};