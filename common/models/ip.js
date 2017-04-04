/**
 * Created by Коля on 23.03.2017.
 */

module.exports = function(Ip) {

  Ip.observe('before save', function(ctx, next) {

    console.log('>save triggered');

    var model = ctx.instance;
    var ipService = Ip.app.dataSources.ipService;

    ipService.find(function(err, response, context) {
      if (err) throw err; //error making request
      if (response.error) {
        next('> response error: ' + response.error.stack);
      }
      model.ipInfo = response;
      console.log('>successfully from remote server');

      
      next();
    });
  });
};
