var config = { 
"application": {
    "socket_url": process.env.JUJU_WS || "ws://localhost:8081/ws"
    },

"server": {
      "port": 8888,
      "public_hostname": "localhost",
      "template_dir": __dirname + "/app/templates/",
      "view_dir": __dirname + "/lib/views/",
      "public_dir": __dirname + "/app"
  }
};

exports.config = config;
