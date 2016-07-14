$(document).ready(function() {

  var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];
  var offline = [];
  var online = [];

  for (i = 0; i < streamers.length; i++) {

    var pic;
    var name;
    var stream;
    var url;
    var game;

    var urlStream = 'https://api.twitch.tv/kraken/streams/' + streamers[i] + '?callback=?';

    $.getJSON(urlStream, function(data1) {

      if (data1.stream === null) {
        $.getJSON(data1._links.channel, function(data2) {

          pic = data2.logo;
          name = data2.display_name;
          stream = "Offline";
          url = data2.url;
          offline.push(name);

          $("#end").before("<div class='offline'><div class='row vertical-center' id='offline'> <div class='col-md-4'><img src='" + pic + "' class='img-circle' alt='Cinque Terre' width='100' height='100'></div><div class='col-md-4'><a href='" + url + "'target='blank' style='color: #F5EDD7'><h2>" + name + "</h2></a></div><div class='col-md-4'><h4>" + stream + "</h4> </div></div></div>");

        })

      } else if (data1.status === 422) {

        var namesplit = data1.message.split(" ");
        name = namesplit[1];
        pic = "http://learngroup.org/assets/images/logos/default_male.jpg";
        stream = "Account Closed";

        $("#end").append("<div class='closed'><div class='row vertical-center' id='closed'> <div class='col-md-4'><img src='" + pic + "' class='img-circle' alt='Cinque Terre' width='100' height='100'></div><div class='col-md-4'><h2>" + name + "</h2></div><div class='col-md-4'><h4>" + stream + "</h4> </div></div></div>");

      } else {
        pic = data1.stream.channel.logo;
        name = data1.stream.channel.display_name;
        game = data1.stream.game;
        stream = data1.stream.channel.status;
        url = data1.stream.channel.url;
        online.push(name);

        $("#header").after("<div class='online'><div class='row  vertical-center' id='online'> <div class='col-md-4'><img src='" + pic + "' class='img-circle' alt='Cinque Terre' width='100' height='100'></div><div class='col-md-4'><a href='" + url + "'target='blank' style='color: #F5EDD7'><h2>" + name + "</h2></a></div><div class='col-md-4'><h4>" + game + ":</h4><p>" + stream + "</p></div></div></div>");

      }
      $("#allBut").click(function() {
        $(".online").removeClass("non-display");
        $(".offline").removeClass("non-display");
        $(".closed").removeClass("non-display");
      });

      $("#onlineBut").click(function() {
        $(".online").removeClass("non-display");
        $(".offline").addClass("non-display");
        $(".closed").addClass("non-display");
      });

      $("#offlineBut").click(function() {
        $(".online").addClass("non-display");
        $(".offline").removeClass("non-display");
        $(".closed").addClass("non-display");
      });
    });

  }

});
