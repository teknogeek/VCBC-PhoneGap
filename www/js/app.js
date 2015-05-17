(function()
{
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
	ChurchView.prototype.template = Handlebars.compile($("#church-tpl").html());
    DirectionsView.prototype.template = Handlebars.compile($("#directions-tpl").html());
    VSplitView.prototype.template = Handlebars.compile($("#vsplit-tpl").html());

	var homeView = new HomeView();
	var slider = new PageSlider($('body'));

    router.addRoute("", function()
    {
        slider.slidePage(homeView.render().$el);

        homeView.getEtaData().then(function(data)
        {
            homeView.setEtaData(data);
            homeView.loadMap();
        });
    });

    router.addRoute("church/:name", function(church)
    {
	    slider.slidePage(new ChurchView(church).render().$el);
    });

    router.addRoute("directions/:name/:address", function(churchName, address)
    {
        slider.slidePage(new DirectionsView(churchName, address).render().$el);
    });

    router.addRoute("vsplit", function(churchName, address)
    {
        slider.slidePage(new VSplitView(churchName, address).render().$el);
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