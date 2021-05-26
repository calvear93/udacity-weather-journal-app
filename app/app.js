// modern date formatter
const dateHandler = new Intl.DateTimeFormat('de');

// constants
const env = {
    openWeatherApiKey: '391924e7f1452171d7d176541e21a02c',
    apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
    countryCode: 'US',
    localApi: 'http://localhost:3000',
    localApiGet: 'temp',
    localApiPost: 'create',
    units: 'imperial'
};

// input values
let zipCode;
let myFeelings;
let generateRef;
let uiDataBoxRef;

// retrieves current date as string
function getToday()
{
    return dateHandler.format(new Date());
}

// gets current temperature for zip code using open weather api
async function requestWeatherForZipCode(zipCodeInput)
{
    try
    {
        const response = await fetch(`${env.apiUrl}?appid=${env.openWeatherApiKey}&zip=${zipCodeInput},${env.countryCode}&units=${env.units}`);

        const { main: { temp } } = await response.json();

        return {
            status: 1,
            temperature: temp,
            date: getToday()
        };
    }
    catch (err)
    {
        return {
            status: -1,
            message: err.message
        };
    }
}

// posts the new data to local api
async function postWeather(data)
{
    try
    {
        const respose = await fetch(`${env.localApi}/${env.localApiPost}`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'same-origin'
        });

        return respose.ok;
    }
    catch (err)
    {
        alert(`An error has ocurred posting data to local api! ${err.message}`);

        return null;
    }
}

// gets current temperature for zip code using open weather api
async function getWeather()
{
    try
    {
        const response = await fetch(`${env.localApi}/${env.localApiGet}?date=${getToday()}`);

        return await response.json();
    }
    catch (err)
    {
        alert(`An error has ocurred retrieving local api data! ${err.message}`);
    }
}

// updates UI with data
function updateUI({ date, temperature, feelings })
{
    // create fragment container
    let fragment = document.createDocumentFragment();

    // will be thre divs
    let dateEle = document.createElement('div');
    let tempEle = document.createElement('div');
    let contentEle = document.createElement('div');

    // updates content
    dateEle.id = 'date';
    dateEle.textContent = date;
    tempEle.id = 'temp';
    tempEle.textContent = temperature;
    contentEle.id = 'content';
    contentEle.textContent = feelings;

    fragment.appendChild(dateEle);
    fragment.appendChild(tempEle);
    fragment.appendChild(contentEle);

    // cleans DOM data container and appends fragment with new data
    uiDataBoxRef.textContent = '';
    uiDataBoxRef.appendChild(fragment);
}

async function onGenerate()
{
    // input validation
    if (!myFeelings || !zipCode)
    {
        alert('Zipcode and feelings must be filled!');

        return;
    }

    // button style for loading indicator
    generateRef.classList.toggle('loading');

    const { status, temperature, date, message } = await requestWeatherForZipCode(zipCode);

    // in case of error
    if (status === -1)
    {
        alert(`An error has ocurred! ${message}`);
        generateRef.classList.toggle('loading');

        return;
    }

    // posts the weather to the api
    await postWeather({
        date,
        temperature,
        feelings: myFeelings
    });

    // again, request for posted data for
    // updates the UI
    const weather = await getWeather();

    if (!weather)
    {
        alert('An error has ocurred!');
        generateRef.classList.toggle('loading');

        return;
    }

    updateUI({ date, ...weather });
    generateRef.classList.toggle('loading');
}

// on DOM loaded
window.onload = () =>
{
    const zipCodeInputRef = document.getElementById('zip');
    const feelingTextBoxRef = document.getElementById('feelings');

    generateRef = document.getElementById('generate');

    // zip code input listener
    zipCodeInputRef.addEventListener('change', ({ target: { value } }) =>
    {
        zipCode = value;
    });

    // feelings input listener
    feelingTextBoxRef.addEventListener('change', ({ target: { value } }) =>
    {
        myFeelings = value;
    });

    // generate button listener
    generateRef.addEventListener('click', onGenerate);

    uiDataBoxRef = document.getElementById('entryHolder');
};
