(function()
{
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());

	var homeView = new HomeView();
	$("body").html(homeView.render().$el);
	var mapData = homeView.loadMap();
    mapData.then(function(data)
    {
        homeView.setEtaData(data);
    });

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