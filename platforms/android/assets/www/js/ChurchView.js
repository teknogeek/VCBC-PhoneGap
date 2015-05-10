var ChurchView = function(church)
{
	this.initialize = function()
	{
		this.$el = $("<div/>");
	};

	this.render = function()
	{
		var address = (church == "Avon") ? "590+West+Avon+Rd+Avon+CT+06001|" + church : "718+Pine+St+Bristol+CT+06010|" + church;
		var timeUntil = this.calcTime();
		//address = (device.platform == "iOS") ? "http://maps.google.com/maps?q=" + address : "geo:0,0?q=" + address;
		//address = "https://maps.google.com?saddr=Current+Location&daddr=" + address;
		this.$el.html(this.template({
			"churchName": church,
			"address": address,
			"timeUntil" : timeUntil
		}));
		return this;
	};

	this.calcTime = function()
	{
	    var sunday = moment().day("Sunday").format("YYYY-MM-DD");
	    //start times
	    var serviceStartTimes = [
	        moment(sunday + " 08:00:00", "YYYY-MM-DD HH:mm:ss").utcOffset("America/New_York"),
	        moment(sunday + " 09:30:00", "YYYY-MM-DD HH:mm:ss").utcOffset("America/New_York"),
	        moment(sunday + " 11:00:00", "YYYY-MM-DD HH:mm:ss").utcOffset("America/New_York")
	    ];

	    //(psuedo) "end" times
	    var serviceEndTimes = [
	        moment(sunday + " 09:00:00", "YYYY-MM-DD HH:mm:ss").utcOffset("America/New_York"),
	        moment(sunday + " 10:00:00", "YYYY-MM-DD HH:mm:ss").utcOffset("America/New_York"),
	        moment(sunday + " 11:30:00", "YYYY-MM-DD HH:mm:ss").utcOffset("America/New_York")
	    ];

	    //current date and time
	    var today = moment().utcOffset("America/New_York");

	    //loop over service start times
	    for(var timeIndex in serviceStartTimes)
	    {
	        //start of service
	        var service = serviceStartTimes[timeIndex];

	        //end of service
	        var endOfService = serviceEndTimes[timeIndex];

	        //if current time in between start and "end" times
	        if(today.isBetween(service, endOfService))
	        {
	            //return how long service has been going on for and kill loop
	            return "started " + service.from(today);
	            break;
	        }
	        
	        //if not the last service
	        if(parseInt(timeIndex) + 1 != serviceStartTimes.length)
	        {   
	            //if today still before the next service
	            if(today.isBefore(serviceStartTimes[parseInt(timeIndex) + 1]))
	            {
	                //set service to next start time
	                service = serviceStartTimes[parseInt(timeIndex) + 1];

	                //if today is before the current service, e.g. before 8am
	                if(today.isBefore(serviceStartTimes[timeIndex]))
	                {
	                    //set service to current service start time
	                    service = serviceStartTimes[timeIndex];
	                }

	                //return how long until service starts and kill loop
	                return "starts " + service.from(today);
	                break;
	            }
	        }
	        else
	        {
	            //if past last service "end"
	            return "starts next week";
	            break;
	        }
	    }
	};

	this.initialize();
};