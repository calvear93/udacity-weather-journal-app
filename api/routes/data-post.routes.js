function exec(request, response)
{
    response.send('Hello Post!');
}

// export route
export default {
    path: '/create',
    method: 'post',
    exec
};
