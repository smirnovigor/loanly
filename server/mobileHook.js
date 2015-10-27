//
//var connectHandler = WebApp.rawConnectHandlers; // get meteor-core's connect-implementation
////var connectHandler = WebApp.connectHandlers; // get meteor-core's connect-implementation
//
//// attach connect-style middleware for response header injection
//Meteor.startup(function () {
//    connectHandler.use(function (req, res, next) {
//        //res.setHeader('Access-Control-Allow-Origin', 'http://meteor.local');
//
// Cordova lives in meteor.local, so it does CORS
//if (req.headers && req.headers.origin === 'http://meteor.local') {
//    res.setHeader('Access-Control-Allow-Origin', 'http://meteor.local');
//}

//        res.setHeader('Access-Control-Allow-Origin', '*');
//        return next();
//    })
//
//    BrowserPolicy.content.allowOriginForAll("http://meteor.local");
//});
//
