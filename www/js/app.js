(function()
{
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
	ChurchView.prototype.template = Handlebars.compile($("#church-tpl").html());

	var homeView = new HomeView();
	var slider = new PageSlider($("body"));

    router.addRoute("", function()
    {
        slider.slidePage(homeView.render().$el);

        homeView.getEtaData().then(function(data)
        {
            homeView.setEtaData(data);
            homeView.loadMap();
        });
    });

    router.addRoute("church/:id", function(church)
    {
	    slider.slidePage(new ChurchView(church).render().$el);
    });

    router.start();

    console.log("Service " + calcTime());

    document.addEventListener("deviceready", function()
    {
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString("#FFF");
	    StatusBar.styleDefault();
        FastClick.attach(document.body);
        if(navigator.notification)  // Override default HTML alert with native dialog
        {
            window.alert = function(message)
            {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "VCBC",     // title
                    "OK"        // buttonName
                );
            };
        }
    }, false);
}());

function calcTime()
{
    var sunday = moment().day("Sunday").format("YYYY-MM-DD");
    var serviceStartTimes = [
        moment(sunday + " 08:00:00", "YYYY-MM-DD HH:mm:ss").utcOffset("America/New_York"),
        moment(sunday + " 09:30:00", "YYYY-MM-DD HH:mm:ss").utcOffset("America/New_York"),
        moment(sunday + " 11:00:00", "YYYY-MM-DD HH:mm:ss").utcOffset("America/New_York")
    ];

    var serviceEndTimes = [
        moment(sunday + " 09:00:00", "YYYY-MM-DD HH:mm:ss").utcOffset("America/New_York"),
        moment(sunday + " 10:00:00", "YYYY-MM-DD HH:mm:ss").utcOffset("America/New_York")
    ];

    //var today = moment().utcOffset("America/New_York");
    var today = moment().day("Sunday").hour(10).minute(5).second(0);

    for(var time in serviceStartTimes)
    {
        var service = serviceStartTimes[time];

        if(time != serviceStartTimes.length - 1)
        {
            var endOfService = serviceEndTimes[time];

            if(today.isBetween(service, endOfService))
            {
                return "started " + service.from(today);
                break;
            }
            else
            {
                service = serviceStartTimes[parseInt(time) + 1];
                return "starts " + service.from(today);
                break;
            }
        }
    }
}