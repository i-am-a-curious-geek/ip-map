var map = null;
var latitude;
var longitude;
var marker;

var osm;

function showMap() {
	if (map != null) {
		map.remove();
	}
	osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19
	});

	var ipAddress = $("#ipAddress").val();

	$.ajax({
		url: "https://ipinfo.io/" + ipAddress,
		type: "get",
		dataType: "jsonp",
		/*
		 data: {
		 jsoncallback: ""
		 },
		 */
		success: function (data) {
				/*
				"ip": "175.156.41.10",
				"hostname": "10.41.156.175.unknown.m1.com.sg",
				"city": "Singapore",
				"region": "Central Singapore Community Development Council",
				"country": "SG",
				"loc": "1.2931,103.8558",
				"org": "AS4773 MobileOne Ltd. Mobile/Internet Service Provider Singapore"
				 */ 
			if(typeof data.loc != "undefined") {
				latitude = data.loc.split(',')[0];
				longitude = data.loc.split(',')[1];
				
				$("#hostname").html(data.hostname);
				$("#city").html(data.city);
				$("#region").html(data.region);
				$("#organisation").html(data.org);

				$("#latitude").html(latitude);
				$("#longitude").html(longitude);

				map = L.map('map', {
					center: [latitude, longitude],
					zoom: 15,
					layers: [osm]
				});

				marker = L.marker([latitude, longitude]).addTo(map);                        
			} else {
				/*
				"ip": "192.168.1.244",
				"hostname": "ip-192-168-1-244.ap-southeast-1.compute.internal"
				 */
				$("#hostname").html(data.hostname);
				$("#city, #region, #organisation, #latitude, #longitude").html("???");     
				map = null;
			}
		},
		error: function (status) {
			alert("Error" + status + " has occurred.");
		}
	});
}