const express = require('express');
const config = require('./config');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
require('./config/database');
const router = require('./routes');
const path = require('path');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
app.use(express.json());
app.use(cors());

// Swagger documentation route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', router);

const uploadPath = path.join(__dirname, "../upload");
app.use("/upload", express.static(uploadPath));

app.use(errorMiddleware);

app.listen(config.port, () => {
    console.log(`application is runnning on http://localhost:${config.port}`);
});