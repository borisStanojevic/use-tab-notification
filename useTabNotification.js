import { useState, useEffect, useRef } from "react";

const originalTitle = document.title;

const useTabNotification = (interval = 1000) => {
  const [message, setMessage] = useState(null);
  const notificationIntervalId = useRef(null);

  const setTabNotification = (message) => {
    setMessage(message);
  };

  const clearTabNotification = () => {
    setMessage(null);
  };

  const tick = () => {
    document.title = document.title === message ? originalTitle : message;
  };

  const startNotifying = () => {
    notificationIntervalId.current = setInterval(tick, interval);
  };

  const stopNotifying = () => {
    clearInterval(notificationIntervalId.current);
    notificationIntervalId.current = null;
  };

  useEffect(() => {
    if (notificationIntervalId.current && !message) stopNotifying();

    if (!notificationIntervalId.current && message) startNotifying();
  }, [message]);

  useEffect(() => {
    return () => {
      if (document.title !== originalTitle) document.title = originalTitle;
      if (notificationIntervalId.current)
        clearInterval(notificationIntervalId.current);
    };
  }, []);

  return [setTabNotification, clearTabNotification];
};

export default useTabNotification;
