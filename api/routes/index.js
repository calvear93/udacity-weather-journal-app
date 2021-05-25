// add here the routes
const routes = [
    require('./data-get.routes'),
    require('./data-post.routes')
];

// injects routes to express app
export function createRoutes(app)
{
    for (let { default: route } of routes)
    {
        app[route.method](route.path, route.exec);

        console.info(`Route ${route.method.toUpperCase()} at ${route.path} loaded`);
    }
}
