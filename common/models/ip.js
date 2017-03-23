/**
 * Created by Коля on 23.03.2017.
 */

module.exports = function(ip) {

  ip.observe('before save', function(ctx, next) {

    console.log('> ip before save triggered');

    var model = ctx.instance;
    var ipService = ip.app.dataSources.ipRest;

    ipService.find(function(err, response, context) {
      if (err) throw err; //error making request
      if (response.error) {
        next('> response error: ' + response.error.stack);
      }
      model.ipInfo = response;
      console.log('> coffee shops fetched successfully from remote server');
      //verify via `curl localhost:3000/api/Magazines`
      next();
    });
  });

};
