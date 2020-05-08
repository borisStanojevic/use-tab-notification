import { useState, useEffect, useRef } from "react";

const originalTitle = document.title;

const useTabNotification = (message, interval = 1000) => {
  const [shouldNotify, setShouldNotify] = useState(false);
  const notificationIntervalId = useRef(null);

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
    if (notificationIntervalId.current && !shouldNotify) stopNotifying();

    if (!notificationIntervalId.current && shouldNotify) startNotifying();
  }, [shouldNotify]);

  useEffect(() => {
    return () => {
      if (document.title !== originalTitle) document.title = originalTitle;
      if (notificationIntervalId.current)
        clearInterval(notificationIntervalId.current);
    };
  }, []);

  return [shouldNotify, setShouldNotify];
};

export default useTabNotification;
