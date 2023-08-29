import React, { useState, useEffect } from 'react';

const Stopwatch = ({PokeBallFound ,JumpluffFound,SnowruntFound,MudkipFound, realTime, setRealTime, gameBegin}) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if(PokeBallFound && JumpluffFound && SnowruntFound && MudkipFound){
      setIsRunning(false);
      setRealTime(time/1000);
    }

  },[PokeBallFound,JumpluffFound,SnowruntFound,MudkipFound])
  useEffect(()=> {
    setIsRunning(!isRunning);
  },[gameBegin])
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10); 
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const formatTime = timeInMilliseconds => {
    const minutes = Math.floor(timeInMilliseconds / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const milliseconds = (timeInMilliseconds % 1000).toString().padStart(3, '0');
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
  };

  return (
      <div style={{fontSize: "1.5em"}}> Time: {formatTime(time)}</div>
  );
};

export default Stopwatch;
