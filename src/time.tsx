import React, { useState, useEffect } from 'react';

const LiveTimeAndDate: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  const updateDateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toDateString();
    
    setCurrentTime(timeString);
    setCurrentDate(dateString);
  };

  useEffect(() => {
    // Initial update
    updateDateTime();

    // Update every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
        <p>Current Date: {currentDate}</p>
    </div>
  );
};

export default LiveTimeAndDate;
