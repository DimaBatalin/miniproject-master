// Импортируем библиотеку fastify для развертывания веб-сервера
const fastify = require('fastify')({
    logger: true // Эта штука нужна, чтобы в терминале отображались логи запросов
})

// для базы данных
const Pool = require('pg-pool')

var pool = new Pool({
    database: 'postgres',
    user: 'postgres',
    password: '123456789',
    port: 5432,
    ssl: false,
    max: 20, // set pool max size to 20
    idleTimeoutMillis: 1000, // close idle clients after 1 second
    connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
    maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion)
})

pool.on('error', (error, client) => {
    console.error(error)
    process.exit(-1)
})
pool.on('connect', client => {
    console.log('New client')
})
pool.on('remove', client => {
    console.log('Client pool removed')
})


// Блок кода, который нужен для исправления ошибки с CORS
fastify.register(require('@fastify/cors'), (instance) => {
    return (req, callback) => {
        const corsOptions = {
            // This is NOT recommended for production as it enables reflection exploits
            origin: true
        };

        // do not include CORS headers for requests from localhost
        if (/^localhost$/m.test(req.headers.origin)) {
            corsOptions.origin = false
        }

        // callback expects two parameters: error and options
        callback(null, corsOptions)
    }
})

// Создание маршрута для get запроса для  users 
fastify.post('/users/select', async function (request, reply) {
    const client = await pool.connect()
    let data = null

    try {
        const users = await client.query(`select * from users`)
        // const users = await client.query(`delete * from users returing id`) //
        data = users.rows

        console.log(users.rows);
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
        reply.send({ data })
    }
})


// создание маршрутов для пост запросов для users
fastify.post('/users/insert', async function (request, reply) {
    const client = await pool.connect()
    let data = null
    try {
        const users = await client.query(`insert into users ("name") values ($1)`, [ request.body.name ])
        console.log(users.rows);
        data = users
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
    reply.send({ Hello: "world" }, [ request.body.name, request.body.id ])
})


fastify.post('/users/update', async function (request, reply) {
    const client = await pool.connect()
    let data = null
    try {
        const users = await client.query(`update users set "name" = $1 where "id" = $2`, [ request.body.newName, request.body.id ])
        console.log(users.rows);
        data = users
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
    reply.send({ Hello: "world" }, [ request.body.name, request.body.id ])
})

fastify.post('/users/delete', async function (request, reply) {
    const client = await pool.connect()
    
    try {
        const users = await client.query(`delete from users where id = $1`, [ request.body.id ])
        console.log(users.rows);
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
    reply.send({ Hello: "world" })
})

// Создание маршрута для get запроса для folders 
fastify.post('/folders/select', async function (request, reply) {
    const client = await pool.connect()
    let data = {
        message: "error",
        statusCode: 400
    }
    try {
        const folder = await client.query(`select "folderId", "folderName", "folderColor" from folders`)
        
        data.message = folder.rows
        data.statusCode = 200
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
        reply.send({ data })
    }
})


// создание маршрутов для пост запросов для folders
fastify.post('/folders/insert', async function (request, reply) {
    const client = await pool.connect()
    try {
        await client.query(`insert into folders ("folderName", "folderColor") values ($1, $2)`, [ request.body.folderName, request.body.folderColor ])
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
    reply.send({ Hello: "world" })
})


fastify.post('/folders/update', async function (request, reply) {
    const client = await pool.connect()
    try {
        await client.query(`update folders set "folderName" = $2 where "folderId" = $1`, [ request.body.folderId, request.body.newFolderName ])
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
    reply.send({ Hello: "world" }, [ request.body.folderName, request.body.newFolderName ])
})

fastify.post('/folders/delete', async function (request, reply) {
    const client = await pool.connect()
    
    try {
        await client.query(`delete from folders where "folderId" = $1`, [ request.body.folderId ])
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
    reply.send({ Hello: "world" })
})

// Создание маршрута для get запроса для tasks 
fastify.post('/tasks/select', async function (request, reply) {
    const client = await pool.connect()
    let data = {
        message: "error",
        statusCode: 400
    }
    try {
        const users = await client.query(`select "taskId", "taskText", "isDone", "folderId" from tasks`)
        
        data.message = users.rows
        data.statusCode = 200
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
        reply.send({ data })
    }
})


// создание маршрутов для пост запросов для tasks
fastify.post('/tasks/insert', async function (request, reply) {
    const client = await pool.connect()
    try {
        await client.query(`insert into tasks ("taskText", "folderId", "isDone") values ($1, $2, $3)`, [ request.body.taskText, request.body.folderId, false ])
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
    reply.send({ Hello: "world" })
})


fastify.post('/tasks/update', async function (request, reply) {
    const client = await pool.connect()
    try {
        await client.query(`update tasks set "taskText" = $1, "isDone" = $3 where "taskId" = $2`, [ request.body.taskText, request.body.taskId, request.body.isDone ])
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
    reply.send({ Hello: "world" })
})

fastify.post('/tasks/delete', async function (request, reply) {
    const client = await pool.connect()
    
    try {
        await client.query(`delete from tasks where "taskId" = $1`, [ request.body.taskId ])
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
    reply.send({ Hello: "world" })
})



// Создание маршрута для post запроса
fastify.post('/post',function (request, reply) {
    console.log(`Тело запроса: `,JSON.stringify(request.body))
    reply.send(request.body)
})

// Создание запроса с использование path параметров
fastify.get('/:id',function (request, reply) {
    console.log(`Path параметры, переданные в запросе: `,JSON.stringify(request.params))
    reply.send(request.params)
})

// Создание запроса с использованием query параметров
fastify.get('/query',function (request, reply) {
    console.log(`Query параметры, переданные в запросе`, JSON.stringify(request.query))
    reply.send(request.query)
})

// Запускаем сервер на порту 3000
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})