// Handle 404 Not Found errors
const handle404Error = (res, message = 'Not Found') => {
    res.status(404).json({ error: message });
  };
  
  // Handle 500 Internal Server Error
  const handle500Error = (res, message = 'Internal Server Error') => {
    res.status(500).json({ error: message });
  };
  
  module.exports = { handle404Error, handle500Error };
  