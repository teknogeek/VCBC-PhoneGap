(function()
{
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());

	var homeView = new HomeView();
    router.addRoute("", function()
    {
        $("body").html(homeView.render().$el);

        homeView.getEtaData().then(function(data)
        {
            homeView.setEtaData(data);
            homeView.loadMap();
        });
    });

    router.addRoute("church/:id", function(id)
    {
        console.log("church: " + id);
    });

    router.start();

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