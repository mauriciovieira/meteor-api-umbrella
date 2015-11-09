/**
 * Define an API-Umbrella specific Error type
 * This error prototypally inherits from the Error constructor.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
 */
ApiUmbrellaError = function (messageOrError) {
  this.name = 'ApiUmbrellaError';
  this.message = messageOrError.message || messageOrError || 'ApiUmbrellaError';
  console.log("Inside ApiUmbrellaError constructor :-)");
  // Parses HTTP.error containing a string message
  // Ex:
  //  'failed [422] {"errors":{"backend_protocol":["is not included in the list"]}'
  var parsedErrorMessage = /failed \[(\d+)\] ({.+})/.exec(this.message);
  if (parsedErrorMessage) {
    // Assigns the http_status number, e.g. 422
    this.http_status = parsedErrorMessage[1];

    // Assigns the backend_errors as JSON, e.g. {"errors":{"backend_protocol":["is not included in the list"]}
    this.backend_errors = JSON.parse(parsedErrorMessage[2]);
  }
  // console.log("http_status: "+this.http_status);
  console.log("backend_errors: "+this.backend_errors.errors.errors.backend_protocol);

  this.stack = (new Error()).stack;
}
ApiUmbrellaError.prototype = Object.create(Error.prototype);
ApiUmbrellaError.prototype.constructor = ApiUmbrellaError;
