import './stylesheet.css';
import 'bootstrap';
import 'bootswatch/dist/lux/bootstrap.min.css';

const apiKey = 'e883aa45abc23c439f559562d45d8863';

const form = document.getElementById('location-form');

function showSpinner() {
  const loadingDiv = document.getElementById('loading');
  loadingDiv.style.visibility = 'visible';
}

function hideSpinner() {
  const loadingDiv = document.getElementById('loading');
  loadingDiv.style.visibility = 'hidden';
}

const getVars = (e) => {
  const city = e.target.cityName.value;
  const state = e.target.stateCode.value;
  const country = e.target.countryCode.value;

  return { city, state, country };
};

const checkVars = (vars) => {
  if (vars.city && vars.city.length > 1) {
    return true;
  }

  return false;
};

async function getRes(vars) {
  let response;
  let data;
  let err;
  const { city, state, country } = vars;

  if (vars.stateCode && vars.countryCode) {
    try {
      response = await fetch(`https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${apiKey}&units=metric`, { mode: 'cors' });
      data = await response.json();
    } catch (error) {
      err = error;
    }
  } else if (vars.stateCode && !vars.countryCode) {
    try {
      response = await fetch(`https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${apiKey}&units=metric`, { mode: 'cors' });
      data = await response.json();
    } catch (error) {
      err = error;
    }
  } else if (!vars.stateCode && !vars.countryCode) {
    try {
      response = await fetch(`https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`, { mode: 'cors' });
      data = await response.json();
    } catch (error) {
      err = error;
    }
  }

  return { data, err };
}

const showMsg = (msg, className) => {
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.style.color = 'red';
  div.style.background = '#000';
  div.appendChild(document.createTextNode(msg));
  const rep = document.getElementById('reports');
  const parent = document.querySelector('.main-container');
  parent.insertBefore(div, rep);

  setTimeout(() => document.querySelector('.alert').remove(), 3000);
};

const showRes = (data) => {
  console.log(data);

  const div = `<div class="card text-white bg-dark m-3" style="max-width: 25rem;">
  <div class="card-header">
    ${data.name} 
    <p class="float-right p-0 m-0">(${data.sys.country})</p>
  </div>
  <div class="card-body">
    <h4 class="card-title">${data.weather[0].description}</h4>
    <p class="card-text">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24pt" height="24pt" viewBox="0 0 24 24" version="1.1">
        <g id="surface1">
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(71.372549%,76.862745%,81.176471%);fill-opacity:1;" d="M 17.304688 12.007812 C 17.230469 11.628906 17.117188 11.261719 16.960938 10.914062 C 16.757812 10.945312 16.558594 10.996094 16.367188 11.070312 C 16.222656 10.3125 15.902344 9.597656 15.433594 8.984375 C 13.929688 7.839844 11.910156 7.644531 10.214844 8.484375 C 8.523438 9.324219 7.453125 11.046875 7.453125 12.9375 C 7.453125 13.066406 7.457031 13.191406 7.46875 13.316406 C 6.558594 13.042969 5.574219 13.347656 4.976562 14.085938 C 4.378906 14.824219 4.285156 15.847656 4.738281 16.683594 C 5.082031 16.871094 5.46875 16.96875 5.859375 16.96875 L 17.4375 16.96875 C 18.550781 16.96875 19.570312 16.363281 20.105469 15.390625 C 20.640625 14.414062 20.605469 13.226562 20.007812 12.289062 C 19.199219 11.773438 18.199219 11.671875 17.304688 12.007812 Z M 17.304688 12.007812 "/>
          <path style="fill:none;stroke-width:20;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0.784314%,0%,36.078431%);stroke-opacity:1;stroke-miterlimit:4;" d="M 146.5 216.833333 C 146.416667 217 146.333333 217.166667 146.25 217.333333 C 146.25 217.583333 146.166667 217.75 146.083333 217.916667 " transform="matrix(0.046875,0,0,0.046875,0,0)"/>
          <path style="fill:none;stroke-width:20;stroke-linecap:round;stroke-linejoin:miter;stroke:rgb(0.784314%,0%,36.078431%);stroke-opacity:1;stroke-miterlimit:10;" d="M 436.833333 300.416667 C 438.75 267.333333 414 237.25 381.166667 232.666667 C 370.333333 231.166667 359.333333 232.333333 349.166667 236.166667 C 342.666667 202.083333 319.166667 173.25 287.833333 158.666667 C 244 137 187 154 158.833333 194.25 " transform="matrix(0.046875,0,0,0.046875,0,0)"/>
          <path style="fill:none;stroke-width:20;stroke-linecap:round;stroke-linejoin:miter;stroke:rgb(0.784314%,0%,36.078431%);stroke-opacity:1;stroke-miterlimit:10;" d="M 416.666667 344.25 C 422.25 338.916667 426.916667 332.583333 430.25 325.583333 " transform="matrix(0.046875,0,0,0.046875,0,0)"/>
          <path style="fill:none;stroke-width:20;stroke-linecap:round;stroke-linejoin:miter;stroke:rgb(0.784314%,0%,36.078431%);stroke-opacity:1;stroke-miterlimit:10;" d="M 139.833333 242.666667 C 138.916667 249.833333 138.75 257 139.333333 264.083333 C 115.833333 257.25 90.833333 268.333333 80 290.25 C 73 304 73 320.25 80 334 C 83 339 86 345 91 349 C 94.75 352 98.75 354.666667 103 357 C 108.833333 359.166667 114.916667 360.833333 121 362 C 207 363 293 363 379 362 C 384 362 390 359 394.916667 357.833333 " transform="matrix(0.046875,0,0,0.046875,0,0)"/>
        </g>
      </svg>
      <span class="mx-3">Clouds: %${data.clouds.all}</span>
    </p>
    <p class="card-text">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24pt" height="24pt" viewBox="0 0 24 24" version="1.1">
        <g id="surface1">
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(33.333333%,37.647059%,50.196078%);fill-opacity:1;" d="M 12 14.601562 C 11.777344 14.601562 11.601562 14.421875 11.601562 14.199219 L 11.601562 6.601562 C 11.601562 6.378906 11.777344 6.199219 12 6.199219 C 12.222656 6.199219 12.398438 6.378906 12.398438 6.601562 L 12.398438 14.199219 C 12.398438 14.421875 12.222656 14.601562 12 14.601562 Z M 12 14.601562 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(33.333333%,37.647059%,50.196078%);fill-opacity:1;" d="M 19.597656 19.800781 C 19.523438 19.800781 19.441406 19.777344 19.375 19.730469 L 12.007812 14.6875 L 5.035156 19.722656 C 4.855469 19.851562 4.605469 19.8125 4.476562 19.632812 C 4.347656 19.453125 4.386719 19.203125 4.566406 19.074219 L 11.992188 13.710938 L 19.824219 19.070312 C 20.007812 19.195312 20.054688 19.441406 19.929688 19.625 C 19.851562 19.738281 19.726562 19.800781 19.597656 19.800781 Z M 19.597656 19.800781 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(86.27451%,41.176471%,11.372549%);fill-opacity:1;" d="M 12 3.800781 C 11.898438 3.800781 11.796875 3.761719 11.71875 3.683594 L 10.515625 2.484375 C 10.359375 2.328125 10.359375 2.074219 10.515625 1.917969 C 10.671875 1.761719 10.925781 1.761719 11.082031 1.917969 L 12.28125 3.117188 C 12.4375 3.273438 12.4375 3.527344 12.28125 3.683594 C 12.203125 3.761719 12.101562 3.800781 12 3.800781 Z M 12 3.800781 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(86.27451%,41.176471%,11.372549%);fill-opacity:1;" d="M 12 3.800781 C 11.898438 3.800781 11.796875 3.761719 11.71875 3.683594 C 11.5625 3.527344 11.5625 3.273438 11.71875 3.117188 L 12.917969 1.917969 C 13.074219 1.761719 13.328125 1.761719 13.484375 1.917969 C 13.640625 2.074219 13.640625 2.328125 13.484375 2.484375 L 12.28125 3.683594 C 12.203125 3.761719 12.101562 3.800781 12 3.800781 Z M 12 3.800781 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(86.27451%,41.176471%,11.372549%);fill-opacity:1;" d="M 12 5 C 11.777344 5 11.601562 4.820312 11.601562 4.601562 L 11.601562 3.398438 C 11.601562 3.179688 11.777344 3 12 3 C 12.222656 3 12.398438 3.179688 12.398438 3.398438 L 12.398438 4.601562 C 12.398438 4.820312 12.222656 5 12 5 Z M 12 5 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(14.901961%,72.54902%,60.392157%);fill-opacity:1;" d="M 23.601562 22.199219 C 23.496094 22.199219 23.394531 22.160156 23.316406 22.082031 L 20.917969 19.683594 C 20.761719 19.527344 20.761719 19.273438 20.917969 19.117188 C 21.074219 18.960938 21.328125 18.960938 21.484375 19.117188 L 23.882812 21.515625 C 24.039062 21.671875 24.039062 21.925781 23.882812 22.082031 C 23.804688 22.160156 23.703125 22.199219 23.601562 22.199219 Z M 23.601562 22.199219 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(14.901961%,72.54902%,60.392157%);fill-opacity:1;" d="M 21.199219 22.199219 C 21.097656 22.199219 20.996094 22.160156 20.917969 22.082031 C 20.761719 21.925781 20.761719 21.671875 20.917969 21.515625 L 23.316406 19.117188 C 23.472656 18.960938 23.726562 18.960938 23.882812 19.117188 C 24.039062 19.273438 24.039062 19.527344 23.882812 19.683594 L 21.484375 22.082031 C 21.40625 22.160156 21.300781 22.199219 21.199219 22.199219 Z M 21.199219 22.199219 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(6.27451%,50.588235%,87.843137%);fill-opacity:1;" d="M 2.800781 19.800781 L 0.398438 19.800781 C 0.179688 19.800781 0 19.621094 0 19.398438 C 0 19.179688 0.179688 19 0.398438 19 L 2.800781 19 C 3.019531 19 3.199219 19.179688 3.199219 19.398438 C 3.199219 19.621094 3.019531 19.800781 2.800781 19.800781 Z M 2.800781 19.800781 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(6.27451%,50.588235%,87.843137%);fill-opacity:1;" d="M 0.398438 22.199219 C 0.296875 22.199219 0.195312 22.160156 0.117188 22.082031 C -0.0390625 21.925781 -0.0390625 21.671875 0.117188 21.515625 L 2.515625 19.117188 C 2.671875 18.960938 2.925781 18.960938 3.082031 19.117188 C 3.238281 19.273438 3.238281 19.527344 3.082031 19.683594 L 0.683594 22.082031 C 0.605469 22.160156 0.503906 22.199219 0.398438 22.199219 Z M 0.398438 22.199219 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(6.27451%,50.588235%,87.843137%);fill-opacity:1;" d="M 2.800781 22.199219 L 0.398438 22.199219 C 0.179688 22.199219 0 22.019531 0 21.800781 C 0 21.578125 0.179688 21.398438 0.398438 21.398438 L 2.800781 21.398438 C 3.019531 21.398438 3.199219 21.578125 3.199219 21.800781 C 3.199219 22.019531 3.019531 22.199219 2.800781 22.199219 Z M 2.800781 22.199219 "/>
        </g>
      </svg>
      <span class="mx-3">Coordinates: lat; ${data.coord.lat} - lon: ${data.coord.lon}</span>
    </p>
    <p class="card-text">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24pt" height="24pt" viewBox="0 0 24 24" version="1.1">
        <g id="surface1">
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(27.058824%,23.921569%,50.588235%);fill-opacity:1;" d="M 22.078125 4.21875 L 20.671875 4.21875 C 20.285156 4.21875 19.96875 3.902344 19.96875 3.515625 C 19.96875 3.128906 20.285156 2.8125 20.671875 2.8125 L 22.078125 2.8125 C 22.464844 2.8125 22.78125 3.128906 22.78125 3.515625 C 22.78125 3.902344 22.464844 4.21875 22.078125 4.21875 Z M 22.078125 4.21875 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(27.058824%,23.921569%,50.588235%);fill-opacity:1;" d="M 21.375 7.03125 L 20.671875 7.03125 C 20.285156 7.03125 19.96875 6.714844 19.96875 6.328125 C 19.96875 5.941406 20.285156 5.625 20.671875 5.625 L 21.375 5.625 C 21.761719 5.625 22.078125 5.941406 22.078125 6.328125 C 22.078125 6.714844 21.761719 7.03125 21.375 7.03125 Z M 21.375 7.03125 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(27.058824%,23.921569%,50.588235%);fill-opacity:1;" d="M 22.078125 9.84375 L 20.671875 9.84375 C 20.285156 9.84375 19.96875 9.527344 19.96875 9.140625 C 19.96875 8.753906 20.285156 8.4375 20.671875 8.4375 L 22.078125 8.4375 C 22.464844 8.4375 22.78125 8.753906 22.78125 9.140625 C 22.78125 9.527344 22.464844 9.84375 22.078125 9.84375 Z M 22.078125 9.84375 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(27.058824%,23.921569%,50.588235%);fill-opacity:1;" d="M 21.375 12.65625 L 20.671875 12.65625 C 20.285156 12.65625 19.96875 12.339844 19.96875 11.953125 C 19.96875 11.566406 20.285156 11.25 20.671875 11.25 L 21.375 11.25 C 21.761719 11.25 22.078125 11.566406 22.078125 11.953125 C 22.078125 12.339844 21.761719 12.65625 21.375 12.65625 Z M 21.375 12.65625 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(27.058824%,23.921569%,50.588235%);fill-opacity:1;" d="M 22.078125 15.46875 L 20.671875 15.46875 C 20.285156 15.46875 19.96875 15.152344 19.96875 14.765625 C 19.96875 14.378906 20.285156 14.0625 20.671875 14.0625 L 22.078125 14.0625 C 22.464844 14.0625 22.78125 14.378906 22.78125 14.765625 C 22.78125 15.152344 22.464844 15.46875 22.078125 15.46875 Z M 22.078125 15.46875 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(88.627451%,87.45098%,95.686275%);fill-opacity:1;" d="M 10.125 19.078125 C 10.125 21.796875 12.328125 24 15.046875 24 C 17.765625 24 19.96875 21.796875 19.96875 19.078125 C 19.96875 17.511719 19.234375 16.113281 18.09375 15.210938 L 18.09375 3.046875 C 18.09375 1.363281 16.730469 0 15.046875 0 C 13.363281 0 12 1.363281 12 3.046875 L 12 15.210938 C 10.859375 16.113281 10.125 17.511719 10.125 19.078125 Z M 10.125 19.078125 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(74.509804%,73.72549%,86.666667%);fill-opacity:1;" d="M 19.96875 19.078125 C 19.96875 17.511719 19.234375 16.113281 18.09375 15.210938 L 18.09375 3.046875 C 18.09375 1.363281 16.730469 0 15.046875 0 L 15.046875 24 C 17.765625 24 19.96875 21.796875 19.96875 19.078125 Z M 19.96875 19.078125 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(97.647059%,97.647059%,97.647059%);fill-opacity:1;" d="M 15.046875 22.59375 C 13.109375 22.59375 11.53125 21.015625 11.53125 19.078125 C 11.53125 17.996094 12.019531 16.988281 12.871094 16.316406 L 13.40625 15.894531 L 13.40625 3.046875 C 13.40625 2.140625 14.140625 1.40625 15.046875 1.40625 C 15.953125 1.40625 16.6875 2.140625 16.6875 3.046875 L 16.6875 15.894531 L 17.222656 16.316406 C 18.074219 16.988281 18.5625 17.996094 18.5625 19.078125 C 18.5625 21.015625 16.984375 22.59375 15.046875 22.59375 Z M 15.046875 22.59375 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(88.627451%,87.45098%,95.686275%);fill-opacity:1;" d="M 15.046875 22.59375 C 16.984375 22.59375 18.5625 21.015625 18.5625 19.078125 C 18.5625 17.996094 18.074219 16.988281 17.222656 16.316406 L 16.6875 15.894531 L 16.6875 3.046875 C 16.6875 2.140625 15.953125 1.40625 15.046875 1.40625 Z M 15.046875 22.59375 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,49.019608%,27.843137%);fill-opacity:1;" d="M 15.75 17.089844 L 15.75 9.140625 C 15.75 8.753906 15.433594 8.4375 15.046875 8.4375 C 14.660156 8.4375 14.34375 8.753906 14.34375 9.140625 L 14.34375 17.089844 C 13.523438 17.378906 12.9375 18.160156 12.9375 19.078125 C 12.9375 20.242188 13.882812 21.1875 15.046875 21.1875 C 16.210938 21.1875 17.15625 20.242188 17.15625 19.078125 C 17.15625 18.160156 16.570312 17.378906 15.75 17.089844 Z M 15.75 17.089844 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,25.098039%,36.078431%);fill-opacity:1;" d="M 15.75 17.089844 L 15.75 9.140625 C 15.75 8.753906 15.433594 8.4375 15.046875 8.4375 L 15.046875 21.1875 C 16.210938 21.1875 17.15625 20.242188 17.15625 19.078125 C 17.15625 18.160156 16.570312 17.378906 15.75 17.089844 Z M 15.75 17.089844 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,49.019608%,27.843137%);fill-opacity:1;" d="M 4.5 11.953125 L 4.5 5.214844 L 5.175781 5.886719 C 5.449219 6.164062 5.894531 6.164062 6.167969 5.886719 C 6.445312 5.613281 6.445312 5.167969 6.167969 4.894531 L 4.292969 3.019531 C 4.019531 2.742188 3.574219 2.742188 3.300781 3.019531 L 1.425781 4.894531 C 1.148438 5.167969 1.148438 5.613281 1.425781 5.886719 C 1.699219 6.164062 2.144531 6.164062 2.417969 5.886719 L 3.09375 5.214844 L 3.09375 11.953125 C 3.09375 12.339844 3.410156 12.65625 3.796875 12.65625 C 4.183594 12.65625 4.5 12.339844 4.5 11.953125 Z M 4.5 11.953125 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(54.509804%,72.54902%,100%);fill-opacity:1;" d="M 8.980469 15.207031 C 8.707031 14.929688 8.261719 14.929688 7.988281 15.207031 L 7.3125 15.878906 L 7.3125 9.140625 C 7.3125 8.753906 6.996094 8.4375 6.609375 8.4375 C 6.222656 8.4375 5.90625 8.753906 5.90625 9.140625 L 5.90625 15.878906 L 5.230469 15.207031 C 4.957031 14.929688 4.511719 14.929688 4.238281 15.207031 C 3.960938 15.480469 3.960938 15.925781 4.238281 16.199219 L 6.113281 18.074219 C 6.386719 18.351562 6.832031 18.351562 7.105469 18.074219 L 8.980469 16.199219 C 9.257812 15.925781 9.257812 15.480469 8.980469 15.207031 Z M 8.980469 15.207031 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,25.098039%,36.078431%);fill-opacity:1;" d="M 6.167969 4.894531 L 4.292969 3.019531 C 4.15625 2.882812 3.976562 2.8125 3.796875 2.8125 L 3.796875 12.65625 C 4.183594 12.65625 4.5 12.339844 4.5 11.953125 L 4.5 5.214844 L 5.175781 5.886719 C 5.449219 6.164062 5.894531 6.164062 6.167969 5.886719 C 6.445312 5.613281 6.445312 5.167969 6.167969 4.894531 Z M 6.167969 4.894531 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(49.019608%,50.588235%,90.588235%);fill-opacity:1;" d="M 8.980469 16.199219 L 7.105469 18.074219 C 6.96875 18.210938 6.789062 18.28125 6.609375 18.28125 L 6.609375 8.4375 C 6.996094 8.4375 7.3125 8.753906 7.3125 9.140625 L 7.3125 15.878906 L 7.988281 15.207031 C 8.261719 14.929688 8.707031 14.929688 8.980469 15.207031 C 9.257812 15.480469 9.257812 15.925781 8.980469 16.199219 Z M 8.980469 16.199219 "/>
        </g>
      </svg>
      <span class="">Temp:</span>
    <p class="">${data.main.temp} Celc.(${data.main.temp_min} ~ ${data.main.temp_max})</p>
    </p>
    <p class="card-text">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24pt" height="24pt" viewBox="0 0 24 24" version="1.1">
        <g id="surface1">
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,20.392157%,48.235294%);fill-opacity:1;" d="M 12 4.21875 C 10.835938 4.21875 9.890625 3.273438 9.890625 2.109375 C 9.890625 0.945312 10.835938 0 12 0 C 13.164062 0 14.109375 0.945312 14.109375 2.109375 C 14.109375 3.273438 13.164062 4.21875 12 4.21875 Z M 12 1.40625 C 11.613281 1.40625 11.296875 1.722656 11.296875 2.109375 C 11.296875 2.496094 11.613281 2.8125 12 2.8125 C 12.386719 2.8125 12.703125 2.496094 12.703125 2.109375 C 12.703125 1.722656 12.386719 1.40625 12 1.40625 Z M 12 1.40625 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,9.019608%,21.568627%);fill-opacity:1;" d="M 12 0 L 12 1.40625 C 12.386719 1.40625 12.703125 1.722656 12.703125 2.109375 C 12.703125 2.496094 12.386719 2.8125 12 2.8125 L 12 4.21875 C 13.164062 4.21875 14.109375 3.273438 14.109375 2.109375 C 14.109375 0.945312 13.164062 0 12 0 Z M 12 0 "/>
          <path style=" stroke:none;fill-rule:evenodd;fill:rgb(100%,95.686275%,95.686275%);fill-opacity:1;" d="M 19.023438 6.324219 C 15.144531 2.441406 8.851562 2.441406 4.96875 6.324219 C 1.089844 10.203125 1.089844 16.496094 4.96875 20.378906 C 8.851562 24.257812 15.144531 24.257812 19.023438 20.378906 C 22.90625 16.496094 22.90625 10.203125 19.023438 6.324219 Z M 19.023438 6.324219 "/>
          <path style=" stroke:none;fill-rule:evenodd;fill:rgb(96.470588%,93.72549%,91.764706%);fill-opacity:1;" d="M 12 3.410156 L 12 23.289062 C 17.472656 23.289062 21.9375 18.824219 21.9375 13.351562 C 21.9375 7.875 17.472656 3.410156 12 3.410156 Z M 12 3.410156 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,25.882353%,61.568627%);fill-opacity:1;" d="M 12 24 C 6.128906 24 1.351562 19.222656 1.351562 13.351562 C 1.351562 7.476562 6.128906 2.699219 12 2.699219 C 17.871094 2.699219 22.648438 7.476562 22.648438 13.351562 C 22.648438 19.222656 17.871094 24 12 24 Z M 12 4.121094 C 6.910156 4.121094 2.769531 8.261719 2.769531 13.351562 C 2.769531 18.4375 6.910156 22.578125 12 22.578125 C 17.089844 22.578125 21.230469 18.4375 21.230469 13.351562 C 21.230469 8.261719 17.089844 4.121094 12 4.121094 Z M 12 4.121094 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(49.019608%,83.529412%,95.686275%);fill-opacity:1;" d="M 17.5 8.015625 C 17.488281 8.007812 17.480469 7.996094 17.46875 7.984375 C 17.457031 7.972656 17.445312 7.960938 17.433594 7.953125 C 16.035156 6.570312 14.113281 5.71875 12 5.71875 C 9.875 5.71875 7.949219 6.578125 6.550781 7.96875 C 6.542969 7.972656 6.535156 7.976562 6.53125 7.984375 C 6.527344 7.988281 6.523438 7.996094 6.515625 8 C 5.121094 9.402344 4.257812 11.332031 4.257812 13.460938 C 4.257812 13.851562 4.570312 14.164062 4.960938 14.164062 C 4.996094 14.164062 5.765625 14.15625 5.765625 14.15625 C 6.152344 14.15625 6.46875 13.839844 6.46875 13.453125 C 6.46875 13.066406 6.152344 12.75 5.765625 12.75 L 5.703125 12.75 C 5.839844 11.53125 6.324219 10.414062 7.054688 9.503906 L 7.09375 9.542969 C 7.230469 9.679688 7.410156 9.746094 7.589844 9.746094 C 7.773438 9.746094 7.953125 9.679688 8.089844 9.542969 C 8.363281 9.265625 8.363281 8.820312 8.089844 8.546875 L 8.050781 8.507812 C 8.960938 7.78125 10.078125 7.300781 11.296875 7.164062 L 11.296875 7.21875 C 11.296875 7.605469 11.613281 7.921875 12 7.921875 C 12.386719 7.921875 12.703125 7.605469 12.703125 7.21875 L 12.703125 7.164062 C 13.921875 7.300781 15.039062 7.78125 15.949219 8.511719 L 15.910156 8.546875 C 15.636719 8.820312 15.636719 9.265625 15.910156 9.542969 C 16.046875 9.679688 16.226562 9.746094 16.410156 9.746094 C 16.589844 9.746094 16.769531 9.679688 16.90625 9.542969 L 16.945312 9.503906 C 17.675781 10.414062 18.160156 11.53125 18.296875 12.75 L 18.234375 12.75 C 17.847656 12.75 17.53125 13.066406 17.53125 13.453125 C 17.53125 13.839844 17.847656 14.15625 18.234375 14.15625 C 18.234375 14.15625 19.042969 14.15625 19.042969 14.15625 C 19.429688 14.15625 19.746094 13.839844 19.742188 13.453125 C 19.742188 11.335938 18.882812 9.414062 17.5 8.015625 Z M 17.5 8.015625 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(99.215686%,74.901961%,0%);fill-opacity:1;" d="M 11.574219 14.589844 C 11.394531 14.589844 11.214844 14.519531 11.078125 14.382812 C 10.804688 14.109375 10.804688 13.664062 11.078125 13.390625 L 14.195312 10.273438 C 14.46875 10 14.914062 10 15.1875 10.273438 C 15.464844 10.546875 15.464844 10.992188 15.1875 11.269531 L 12.074219 14.382812 C 11.9375 14.519531 11.753906 14.589844 11.574219 14.589844 Z M 11.574219 14.589844 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,53.333333%,33.72549%);fill-opacity:1;" d="M 15.1875 10.273438 C 14.914062 10 14.46875 10 14.195312 10.273438 L 12 12.46875 L 12 14.445312 C 12.023438 14.425781 12.050781 14.40625 12.074219 14.382812 L 15.1875 11.269531 C 15.464844 10.992188 15.464844 10.546875 15.1875 10.273438 Z M 15.1875 10.273438 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(99.215686%,74.901961%,0%);fill-opacity:1;" d="M 16.03125 19.921875 L 7.96875 19.921875 C 7.582031 19.921875 7.265625 19.605469 7.265625 19.21875 C 7.265625 18.832031 7.582031 18.515625 7.96875 18.515625 L 16.03125 18.515625 C 16.417969 18.515625 16.734375 18.832031 16.734375 19.21875 C 16.734375 19.605469 16.417969 19.921875 16.03125 19.921875 Z M 16.03125 19.921875 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(99.215686%,74.901961%,0%);fill-opacity:1;" d="M 11.753906 15.898438 C 11.738281 15.898438 11.726562 15.898438 11.710938 15.898438 C 11.324219 15.875 11.027344 15.542969 11.050781 15.152344 C 11.0625 14.953125 10.988281 14.757812 10.847656 14.617188 C 10.703125 14.472656 10.503906 14.398438 10.300781 14.410156 C 9.914062 14.4375 9.578125 14.148438 9.550781 13.757812 C 9.523438 13.371094 9.816406 13.035156 10.203125 13.007812 C 10.8125 12.964844 11.410156 13.191406 11.839844 13.621094 C 12.265625 14.046875 12.488281 14.636719 12.457031 15.234375 C 12.433594 15.609375 12.125 15.898438 11.753906 15.898438 Z M 11.753906 15.898438 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(27.843137%,57.647059%,100%);fill-opacity:1;" d="M 17.5 8.015625 C 17.488281 8.007812 17.480469 7.996094 17.46875 7.984375 C 17.457031 7.972656 17.445312 7.960938 17.433594 7.953125 C 16.035156 6.570312 14.113281 5.71875 12 5.71875 L 12 7.921875 C 12.386719 7.921875 12.703125 7.605469 12.703125 7.21875 L 12.703125 7.164062 C 13.921875 7.300781 15.039062 7.78125 15.949219 8.511719 L 15.910156 8.546875 C 15.636719 8.820312 15.636719 9.265625 15.910156 9.542969 C 16.046875 9.679688 16.226562 9.746094 16.410156 9.746094 C 16.589844 9.746094 16.769531 9.679688 16.90625 9.542969 L 16.945312 9.503906 C 17.675781 10.414062 18.160156 11.53125 18.296875 12.75 L 18.234375 12.75 C 17.847656 12.75 17.53125 13.066406 17.53125 13.453125 C 17.53125 13.839844 17.847656 14.15625 18.234375 14.15625 C 18.234375 14.15625 19.042969 14.15625 19.042969 14.15625 C 19.429688 14.15625 19.746094 13.839844 19.742188 13.453125 C 19.742188 11.335938 18.882812 9.414062 17.5 8.015625 Z M 17.5 8.015625 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,20.392157%,48.235294%);fill-opacity:1;" d="M 12 2.699219 L 12 4.121094 C 17.089844 4.121094 21.230469 8.261719 21.230469 13.351562 C 21.230469 18.4375 17.089844 22.578125 12 22.578125 L 12 24 C 17.871094 24 22.648438 19.222656 22.648438 13.351562 C 22.648438 7.476562 17.871094 2.699219 12 2.699219 Z M 12 2.699219 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,53.333333%,33.72549%);fill-opacity:1;" d="M 16.03125 18.515625 L 12 18.515625 L 12 19.921875 L 16.03125 19.921875 C 16.417969 19.921875 16.734375 19.605469 16.734375 19.21875 C 16.734375 18.832031 16.417969 18.515625 16.03125 18.515625 Z M 16.03125 18.515625 "/>
        </g>
      </svg>
      <span class="">Pressure: ${data.main.pressure}</span>
    </p>
    <p class="card-text">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24pt" height="24pt" viewBox="0 0 24 24" version="1.1">
        <g id="surface1">
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,73.72549%,83.137255%);fill-opacity:1;" d="M 14.625 12 C 14.625 11.792969 14.457031 11.625 14.25 11.625 L 3.75 11.625 C 3.542969 11.625 3.375 11.792969 3.375 12 C 3.375 12.207031 3.542969 12.375 3.75 12.375 L 14.25 12.375 C 14.457031 12.375 14.625 12.207031 14.625 12 Z M 14.625 12 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,73.72549%,83.137255%);fill-opacity:1;" d="M 18 5.25 C 16.550781 5.25 15.375 6.425781 15.375 7.875 C 15.375 8.082031 15.542969 8.25 15.75 8.25 C 15.957031 8.25 16.125 8.082031 16.125 7.875 C 16.125 6.839844 16.964844 6 18 6 C 19.035156 6 19.875 6.839844 19.875 7.875 C 19.875 8.910156 19.035156 9.75 18 9.75 L 6 9.75 C 5.792969 9.75 5.625 9.917969 5.625 10.125 C 5.625 10.332031 5.792969 10.5 6 10.5 L 18 10.5 C 19.449219 10.5 20.625 9.324219 20.625 7.875 C 20.625 6.425781 19.449219 5.25 18 5.25 Z M 18 5.25 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,73.72549%,83.137255%);fill-opacity:1;" d="M 15.375 13.5 L 7.5 13.5 C 7.292969 13.5 7.125 13.667969 7.125 13.875 C 7.125 14.082031 7.292969 14.25 7.5 14.25 L 15.375 14.25 C 16.410156 14.25 17.25 15.089844 17.25 16.125 C 17.25 17.160156 16.410156 18 15.375 18 C 14.339844 18 13.5 17.160156 13.5 16.125 C 13.5 15.917969 13.332031 15.75 13.125 15.75 C 12.917969 15.75 12.75 15.917969 12.75 16.125 C 12.75 17.574219 13.925781 18.75 15.375 18.75 C 16.824219 18.75 18 17.574219 18 16.125 C 18 14.675781 16.824219 13.5 15.375 13.5 Z M 15.375 13.5 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(92.156863%,27.058824%,34.901961%);fill-opacity:1;" d="M 4.875 6.375 L 3.75 6.375 C 3.542969 6.375 3.375 6.207031 3.375 6 C 3.375 5.792969 3.542969 5.625 3.75 5.625 L 4.875 5.625 C 5.082031 5.625 5.25 5.792969 5.25 6 C 5.25 6.207031 5.082031 6.375 4.875 6.375 Z M 4.875 6.375 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(92.156863%,27.058824%,34.901961%);fill-opacity:1;" d="M 10.5 6.375 L 6.375 6.375 C 6.167969 6.375 6 6.207031 6 6 C 6 5.792969 6.167969 5.625 6.375 5.625 L 10.5 5.625 C 10.707031 5.625 10.875 5.792969 10.875 6 C 10.875 6.207031 10.707031 6.375 10.5 6.375 Z M 10.5 6.375 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(92.156863%,27.058824%,34.901961%);fill-opacity:1;" d="M 6.375 7.875 L 5.25 7.875 C 5.042969 7.875 4.875 7.707031 4.875 7.5 C 4.875 7.292969 5.042969 7.125 5.25 7.125 L 6.375 7.125 C 6.582031 7.125 6.75 7.292969 6.75 7.5 C 6.75 7.707031 6.582031 7.875 6.375 7.875 Z M 6.375 7.875 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(92.156863%,27.058824%,34.901961%);fill-opacity:1;" d="M 9.75 7.875 L 7.875 7.875 C 7.667969 7.875 7.5 7.707031 7.5 7.5 C 7.5 7.292969 7.667969 7.125 7.875 7.125 L 9.75 7.125 C 9.957031 7.125 10.125 7.292969 10.125 7.5 C 10.125 7.707031 9.957031 7.875 9.75 7.875 Z M 9.75 7.875 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(92.156863%,27.058824%,34.901961%);fill-opacity:1;" d="M 5.25 17.25 L 4.125 17.25 C 3.917969 17.25 3.75 17.082031 3.75 16.875 C 3.75 16.667969 3.917969 16.5 4.125 16.5 L 5.25 16.5 C 5.457031 16.5 5.625 16.667969 5.625 16.875 C 5.625 17.082031 5.457031 17.25 5.25 17.25 Z M 5.25 17.25 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(92.156863%,27.058824%,34.901961%);fill-opacity:1;" d="M 10.875 17.25 L 6.75 17.25 C 6.542969 17.25 6.375 17.082031 6.375 16.875 C 6.375 16.667969 6.542969 16.5 6.75 16.5 L 10.875 16.5 C 11.082031 16.5 11.25 16.667969 11.25 16.875 C 11.25 17.082031 11.082031 17.25 10.875 17.25 Z M 10.875 17.25 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(92.156863%,27.058824%,34.901961%);fill-opacity:1;" d="M 6.75 18.75 L 5.625 18.75 C 5.417969 18.75 5.25 18.582031 5.25 18.375 C 5.25 18.167969 5.417969 18 5.625 18 L 6.75 18 C 6.957031 18 7.125 18.167969 7.125 18.375 C 7.125 18.582031 6.957031 18.75 6.75 18.75 Z M 6.75 18.75 "/>
          <path style=" stroke:none;fill-rule:nonzero;fill:rgb(92.156863%,27.058824%,34.901961%);fill-opacity:1;" d="M 10.125 18.75 L 8.25 18.75 C 8.042969 18.75 7.875 18.582031 7.875 18.375 C 7.875 18.167969 8.042969 18 8.25 18 L 10.125 18 C 10.332031 18 10.5 18.167969 10.5 18.375 C 10.5 18.582031 10.332031 18.75 10.125 18.75 Z M 10.125 18.75 "/>
        </g>
      </svg>
      <span class="">Wind:</span>
    <p class="">Speed: ${data.wind.speed}</p>
    <p class="">Degree: ${data.wind.deg}</p>
    </p>
  </div>
</div>`;

  const parent = document.getElementById('reports');
  parent.innerHTML += div;
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  showSpinner();
  const vars = getVars(e);
  if (checkVars(vars)) {
    const { data, err } = await getRes(vars);
    if (err) {
      showMsg(err, 'error');
    } else {
      showRes(data);
    }
  } else {
    showMsg('custom error message', 'error');
  }
  hideSpinner();
});
