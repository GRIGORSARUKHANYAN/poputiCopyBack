class HttpException extends Error {
  constructor(status, message, includeStackTrace = false) {
    super(message);
    this.status = status;
    this.message = message;
    this.includeStackTrace = includeStackTrace;
  }
}

export default HttpException;
