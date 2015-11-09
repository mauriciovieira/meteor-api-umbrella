/*
Tests for the API Backends v1 wrapper.
*/
// Tinytest.add(
//   "Admin API v1 - API Backends - getBackend",
//   function (test) {
//     //var response = apiUmbrellaWeb.adminApi.v1.apiUsers.getUsers();
//     //console.log(response.statusCode);
//     test.fail();
//   },
//   "Could not get all API Backends."
// );

Tinytest.add(
  "Admin API v1 - API Backends - getBackends",
  function (test) {
    var response = apiUmbrellaWeb.adminApi.v1.apiBackends.getApiBackends();
    if (response.statusCode !== 200) {
      test.fail();
    }
  },
  "Could not get individual all API Backends."
);

Tinytest.add(
  "Admin API v1 - API Backends - createApiBackend",
  function (test) {
    var apiBackend = {
         "name":"Flaky", // ok
         "backend_protocol":"httpdf", // does not exist
         "servers":[
            {
               "host":"does.not.exist",
               "port":80,
            }
         ],
         "backend_host": '/fdasa/f',
         "frontend_host":"umbrella.apinf.io",
         "pass_api_key_header": false,
         "pass_api_key_query_param": false,
         "balance_algorithm":"least_conn",
         "settings":{
            "default_response_headers_string": 'Access-Control-Allow-Origin: *',
            "override_response_headers_string": 'Access-Control-Allow-Origin: *'
          }
      };
    var constructedBackend = {
      "api": apiBackend
    };

    try {
      apiUmbrellaWeb.adminApi.v1.apiBackends.createApiBackend(constructedBackend);
    } catch (error) {
      test.equal(error.name,'ApiUmbrellaError', 'Not an ApiUmbrellaError');
      test.equal(error.http_status, 422, 'Unexpected http_status');
    }
    // test.throws(
    //   function(){
    //     apiUmbrellaWeb.adminApi.v1.apiBackends.createApiBackend(constructedBackend);
    //   },
    //   /Blablabla/
    // );
  },
  "Could not create API Backend."
)
