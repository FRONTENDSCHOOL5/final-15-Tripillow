import React from 'react';
import { useState, useEffect } from 'react';

const useIsDesktop = () => {
  const [isPCScreen, setIsPCSCreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) setIsPCSCreen(true);
      else setIsPCSCreen(false);
    };

    window.addEventListener('resize', handleResize);
  }, []);

  return isPCScreen;
};

export default useIsDesktop;
