// getCurrentPosition checks navigator for availablity of geolocation service
// if a setState callback is passed it will try to set the states latitude and longitude
export const getCurrentPosition = async (setLocation) => {
    const ERROR = {
      0: 'Geolocation is not supported by this browser.',
      1: 'User denied the request for Geolocation.',
      2: 'Location information is unavailable.',
      3: 'The request to get user location timed out.',
      4: 'An unknown error occurred.',
    };
  
    // positionHandler callback method to deconstruct the coords from position
    const positionHandler = async (position) => {
      if (!position) {
        console.log('no postition', ERROR[0]);
        setLocation &&
          setLocation((location) => ({ ...location, ...{ error: ERROR[0] } }));
        return;
      }
      const { coords } = position;
      const { latitude, longitude } = coords;
  
      // if a setState callback is passed
      // it will try to set the states latitude and longitude
      setLocation &&
        setLocation((location) => ({
          ...location,
          ...{ latitude, longitude, error: null },
        }));
      return { latitude, longitude };
    };
  
    // errorHandler callback method for error handling
    const errorHandler = (error) => {
      const { code } = error;
      setLocation &&
        setLocation((location) => ({ ...location, ...{ error: ERROR[code] } }));
    };
  
    try {
      const position = await doGetCurrentPosition();
      return await positionHandler(position);
    } catch (error) {
      errorHandler(error);
    }
  };
  
  export const doGetCurrentPosition = () => {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 5000,
          enableHighAccuracy: true,
        })
      );
    } else {
      return new Promise((resolve) => resolve({}));
    }
  };