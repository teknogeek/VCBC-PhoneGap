// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function()
{
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());

	$("body").html(new HomeView().render().$el);
	ActivityIndicator.hide();

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