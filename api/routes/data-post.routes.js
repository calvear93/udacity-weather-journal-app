import { store } from '../store';

// adds a temperature and feelings by date
function exec({ body }, response)
{
    store.set(body.date, {
        temperature: body.temperature,
        feelings: body.feelings
    });

    response.send();
}

// exports route
export default {
    path: '/create',
    method: 'post',
    exec
};
