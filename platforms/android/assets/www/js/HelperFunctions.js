function drawMarkers(map, latLong)
{
	var geocoder = new google.maps.Geocoder();
	var deferred = $.Deferred();
	geocoder.geocode({"address": "590 West Avon Rd, Avon, CT 06001"}, function(vcbcResults, status)
	{
		if(status == google.maps.GeocoderStatus.OK)
		{
			var bounds = new google.maps.LatLngBounds();
			
			var vcbcMarker = new MarkerWithLabel({
				map: map,
				position: vcbcResults[0].geometry.location,
				labelContent: "VCBC",
				labelAnchor: new google.maps.Point(30, 0),
				labelClass: "labels",
				labelStyle: { opacity: 1.0 }
			});
			
			bounds.extend(vcbcMarker.getPosition());
			
			geocoder.geocode({"address" : "718 Pine St, Bristol, CT 06010"}, function(bristolResults, status)
			{
				if(status == google.maps.GeocoderStatus.OK)
				{
					var bristolMarker = new MarkerWithLabel({
						map: map,
						position: bristolResults[0].geometry.location,
						labelContent: "Bristol",
						labelAnchor: new google.maps.Point(30, 0),
						labelClass: "labels",
						labelStyle: { opacity: 1.0 }
					});
					
					bounds.extend(bristolMarker.getPosition());

					var youMarker = new MarkerWithLabel({
						position: latLong,
						map: map,
						labelContent: "You",
						labelAnchor: new google.maps.Point(30, 0),
						labelClass: "labels",
						labelStyle: { opacity: 1.0 }
					});
					
					bounds.extend(youMarker.getPosition());

					map.fitBounds(bounds);
					deferred.resolve(latLong);
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
	return deferred.promise();
}