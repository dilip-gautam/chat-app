//check if login,message is empty && if it is string

var isRealString = (str) => {
    return typeof(str) === 'string' && str.trim().length > 0;
  };
module.exports = {isRealString};