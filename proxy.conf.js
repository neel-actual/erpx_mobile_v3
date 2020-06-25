const PROXY_CONFIG = {
    "/api/*": {
      "target": "https://www.prulia.org.my",
      "secure": false,
      "changeOrigin": true,
      "logLevel": "debug"
    }
  }

  export default PROXY_CONFIG;