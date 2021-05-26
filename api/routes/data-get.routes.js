import { store } from '../store';

// retrieves temperature and feelings by date
function exec({ query: { date } }, response)
{
    response.send(store.get(date));
}

// exports route
export default {
    path: '/temp',
    method: 'get',
    exec
};
