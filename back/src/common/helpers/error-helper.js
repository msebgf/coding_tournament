module.exports = class {
  static buildError(statusCode, message, original) {
    if (message instanceof Error) {
      message.statusCode = statusCode;
      return message;
    }
    const error = new Error(message);
    error.statusCode = statusCode;
    if (original) {
      error.original = original;
      error.stack = error.stack.split('\n').slice(0, 2).join('\n');
      error.stack += `\n${original.stack}`;
    }
    return error;
  }
};
