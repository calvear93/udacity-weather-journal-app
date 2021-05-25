function exec(request, response)
{
    response.send('Hello World!');
}

// export route
export default {
    path: '/all',
    method: 'get',
    exec
};
