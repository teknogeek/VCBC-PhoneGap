function drawMarkers(map, latLong)
{
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({"address": "590 West Avon Rd, Avon, CT 06001"}, function(results, status)
	{
		if(status == google.maps.GeocoderStatus.OK)
		{
			var bounds = new google.maps.LatLngBounds();
			
			var vcbcMarker = new MarkerWithLabel({
				map: map,
				position: results[0].geometry.location,
				labelContent: "VCBC",
				labelAnchor: new google.maps.Point(22, 50),
				labelClass: "labels", // the CSS class for the label
				labelStyle: {opacity: 1.0}
			});
			
			bounds.extend(vcbcMarker.getPosition());
			
			geocoder.geocode({"address" : "718 Pine Street, Bristol, CT 06010"}, function(results, status)
			{
				if(status == google.maps.GeocoderStatus.OK)
				{
					var bristolMarker = new MarkerWithLabel({
						map: map,
						position: results[0].geometry.location,
						labelContent: "Bristol",
						labelAnchor: new google.maps.Point(22, 50),
						labelClass: "labels", // the CSS class for the label
						labelStyle: {opacity: 1.0}
					});

					bounds.extend(bristolMarker.getPosition());

					var youMarker = new MarkerWithLabel({
						position: latLong,
						map: map,
						labelContent: "You",
						labelAnchor: new google.maps.Point(22, 50),
						labelClass: "labels", // the CSS class for the label
						labelStyle: {opacity: 1.0}
					});
					
					bounds.extend(youMarker.getPosition());

					map.fitBounds(bounds);
				}
				else
				{
					alert("Geocode was not successful for the following reason: " + status);
				}
			});
		}
		else
		{
			alert("Geocode was not successful for the following reason: " + status);
		}
	});
}