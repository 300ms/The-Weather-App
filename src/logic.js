import UI from './ui';

const apiKey = 'e883aa45abc23c439f559562d45d8863';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

class Logic {
  static checkVars(vars) {
    console.log(vars.unitType);
    if (vars.city && vars.city.length > 1) {
      return true;
    }

    return false;
  }

  static async getRes(vars) {
    let response;
    let data;
    let err;
    let unit = '';

    const {
      city, state, country, unitType,
    } = vars;

    if (unitType === 'cel') {
      unit = '&units=metric';
    }

    if (vars.stateCode && vars.countryCode) {
      try {
        response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${apiKey}${unit}`, { mode: 'cors' });
        data = await response.json();
      } catch (error) {
        err = error;
      }
    } else if (vars.stateCode && !vars.countryCode) {
      try {
        response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${apiKey}${unit}`, { mode: 'cors' });
        data = await response.json();
      } catch (error) {
        err = error;
      }
    } else if (!vars.stateCode && !vars.countryCode) {
      try {
        response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}${unit}`, { mode: 'cors' });
        data = await response.json();
      } catch (error) {
        err = error;
      }
    }

    return { data, err };
  }

  static getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(Logic.success, Logic.error, options);
    } else {
      console.log('not found');
      // x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  static async success(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    let response;
    let data;

    try {
      response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`, { mode: 'cors' });
      data = await response.json();
    } catch (error) {
      UI.showMsg(error, 'danger');
    }

    UI.showRes(data);
  }

  static error() {
    UI.showMsg('Cannot get current location to display weather information', 'danger');
  }
}

export { Logic as default };
