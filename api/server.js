import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createRoutes } from './routes';

const PORT = 3000;

// initializes express
const app = express();

// MIDDLEWARE
// cross-origin enable
app.use(cors());

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serves webapp
app.use(express.static('app'));
createRoutes(app);

// starts server
app.listen(PORT, () =>
{
    console.info(`Server listening at http://localhost:${PORT}`);
});
