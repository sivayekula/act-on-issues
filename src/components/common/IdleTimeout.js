import React, { useState, useRef } from 'react';
import {IdleTimer} from 'react-idle-timer';

const IdleTimeout = ({ onIdle }) => {
  const idleTimerRef = useRef(null);
  const [isExpired, setIsExpired] = useState(false);

  const onIdleHandler = () => {
    setIsExpired(true);
    onIdle();
  };

  const resetIdleTimer = () => {
    setIsExpired(false);
    idleTimerRef.current.reset();
  };

  return (
    <div>
      <IdleTimer ref={idleTimerRef} timeout={300000} onIdle={onIdleHandler} />

      {isExpired && (
        <div className="expiration-window">
          <p>Your session has expired due to inactivity.</p>
          <button onClick={resetIdleTimer}>Continue</button>
        </div>
      )}
    </div>
  );
};

export default IdleTimeout;