// Импортируем библиотеку fastify для развертывания веб-сервера
const fastify = require('fastify')({
    logger: true // Эта штука нужна, чтобы в терминале отображались логи запросов
})
const pdfmake = require('pdfmake');
const pdfMakePrinter = require('pdfmake/src/printer')

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
    let data = {
        massage: "error",
        statusCode: 400
    }   
    try {
        const users = await client.query(`select * from users`)

        data.massage = users.rows

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
    let data = {
        massage: "error",
        statusCode: 400
    }    
    try {
        const users = await client.query(`insert into users ("name") values ($1) returning "id"`, [ request.body.name ])

        if (users.rowCount == 1 && users.rows.length == 1) {
            data.statusCode = 200
            data.massage = users.rows
        } else {
            console.log("произошла ошибка");
        }
        console.log(users.rowCount, users.rows.length);
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
    reply.send({ data }, [ request.body.name, request.body.id ])
})


fastify.post('/users/update', async function (request, reply) {
    const client = await pool.connect()
    let data = {
        massage: "error",
        statusCode: 400
    }
    try {
        const users = await client.query(`update users set "name" = $1 where "id" = $2 returning "id"`, [ request.body.newName, request.body.id ])
        if (users.rowCount == 1 && users.rows.length == 1) {
            data.statusCode = 200
            data.massage = users.rows
        } else {
            console.log("произошла ошибка");
        }
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
    reply.send({ data }, [ request.body.name, request.body.id ])
})

fastify.post('/users/delete', async function (request, reply) {
    const client = await pool.connect()
    let data = {
        massage: "error",
        statusCode: 400
    }
    try {
        const users = await client.query(`delete from users where id = $1 returning "id"`, [ request.body.id ])
        if (users.rowCount == 1 && users.rows.length == 1) {
            data.statusCode = 200
            data.massage = users.rows
        } else {
            console.log("произошла ошибка");
        }
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
    reply.send({ data })
})

// Создание маршрута для get запроса для folders 
fastify.post('/folders/select', async function (request, reply) {
    const client = await pool.connect()
    let data = {
        massage: "error",
        statusCode: 400
    }
    try {
        const folder = await client.query(`select "folderId", "folderName", "folderColor" from folders`)
        
        data.massage = folder.rows
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
async function getAllFoldersLenght() {
    const client = await pool.connect()
    // let data = {
    //     massage: "error",
    //     statusCode: 400
    // }
    try {
        const folder = await client.query(`select "folderId", "folderName", "folderColor" from folders`)
        
        // data.massage = folder.rows
        // data.statusCode = 200
        console.log("количетво папок", folder.rows.length);
        return folder.rows.length
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
}


// создание маршрутов для пост запросов для folders
fastify.post('/folders/insert', async function (request, reply) {
    const client = await pool.connect()
    let data = {
        massage: "error",
        statusCode: 400
    }
    try {
        const folders = await client.query(`insert into folders ("folderName", "folderColor") values ($1, $2) returning "folderId"`, [ request.body.folderName, request.body.folderColor ])

        if (folders.rowCount == 1 && folders.rows.length == 1) {
            data.statusCode = 200
            data.massage = folders.rows
        } else {
            console.log("произошла ошибка");
        }
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
    reply.send({ data })
})


fastify.post('/folders/update', async function (request, reply) {
    const client = await pool.connect()
    let data = {
        massage: "error",
        statusCode: 400
    }
    try {
        const folders = await client.query(`update folders set "folderName" = $2 where "folderId" = $1 returning "folderId"`, [ request.body.folderId, request.body.newFolderName ])
        if (folders.rowCount == 1 && folders.rows.length == 1) {
            data.statusCode = 200
            data.massage = folders.rows
        } else {
            console.log("произошла ошибка");
        }
        console.log(folders.rowCount, folders.rows.length);
    }   
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
    reply.send({ data }, [ request.body.folderName, request.body.newFolderName ])
})

fastify.post('/folders/delete', async function (request, reply) {
    const client = await pool.connect()
    let data = {
        massage: "error",
        statusCode: 400
    }
    try {
        const folders = await client.query(`delete from folders where "folderId" = $1 returning "folderId"`, [ request.body.folderId ])
        if (folders.rowCount == 1 && folders.rows.length == 1) {
            data.statusCode = 200
            data.massage = folders.rows
        } else {
            console.log("произошла ошибка");
        }
    } 
    catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
    reply.send({ data })
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

fastify.post("/tasksinfolder", async function (request, reply) {
    const client = await pool.connect()
    let data = {
        massage: "error",
        statusCode: 400
    }
    let tasks = []
    try {
        const tasksinfolder = await client.query(`select * from tasks T inner join folders F on T."folderId" = F."folderId" where T."folderId" = $1`, [ request.body.folderId ])

        for (let i = 0; i < tasksinfolder.rows.length; i++) {
            tasks.push({
                taskText: tasksinfolder.rows[i].taskText,
                isDone: tasksinfolder.rows[i].isDone
            })
        }
        data.massage = tasks
        data.statusCode = 200
    } catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
    reply.send({ data })
})
async function getAllTasks() {
    
    const client = await pool.connect()
    const numberOfFolders = await getAllFoldersLenght()

    // let data = {
    //     massage: "error",
    //     statusCode: 400
    // }
    let tasks = [`всего папок: ${numberOfFolders}\n`]
    try {
        console.log(numberOfFolders);
        for (let i = 0; i < numberOfFolders.length; i++) {

            const tasksinfolder = await client.query(`select T."taskText" from tasks T inner join folders F on T."folderId" = F."folderId" where T."folderId" = $1`, [i])
            console.log(tasksinfolder);
            for (let i = 0; i < tasksinfolder.rows.length; i++) {
                tasks.push(tasksinfolder.rows[i].taskText)
            }
        }

        // data.massage = tasks
        // data.statusCode = 200
        console.log("Задания:", tasks);
        return tasks
    } catch (error) {
        console.log(error);
    }
    finally {
        client.release()
    }
}

// 12.05.23
// Define font files
const fonts = {
    Roboto: {
        normal: './fonts/Roboto-Black.ttf',
        bold: './fonts/Roboto-Bold.ttf',
        italics: './fonts/Roboto-Italic.ttf',
    }
};

fastify.post("/pdfAllTasks", async (request, reply)=>{
    try {
        const tasks = await getAllTasks()
        const strTasks = tasks.join('/') 
        console.log(strTasks, "end");

        const printer = new pdfMakePrinter(fonts)
        const docFile = printer.createPdfKitDocument({
            content: [
                `${strTasks}`,
                "end"
            ]
        })
        const doc = await docFileFromStream(docFile)
        reply.header("Content-Type", 'application/pdf')
        reply.send(doc)
    } 
    catch (error) {
        console.log(error);
    }
})
// pdfmake.addFonts(fonts);

// var docDefinition = {
//   // ...
// };

// var options = {
//   // ...
// }

// var pdf = pdfmake.createPdf(docDefinition);
// pdf.write('document.pdf').then(() => {
//   // success event
// }, err => {
//   // error event
//   console.error(err);
// });
async function docFileFromStream(document) {
    const chunks = [];
    let result = null;
    return new Promise(function (resolve, reject) {
        try {
            document.on('data', function (chunk) {
                chunks.push(chunk);
            });
            document.on('end', async function () {
                result = Buffer.concat(chunks);
                console.log('end');
                resolve(result);
                
            });
            document.on('error', reject);
            document.end();
        } catch (error) {
            console.log('docFileFromStream ERROR');
            console.log(error);
            reject(null);
        }
    });
}

fastify.post("/pdf", async (request, reply)=>{
    try {
        const printer = new pdfMakePrinter(fonts)
        const docFile = printer.createPdfKitDocument({
            content: [
                'First paragraph',
                'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
            ]
        })
        const doc = await docFileFromStream(docFile)
        reply.header("Content-Type", 'application/pdf')
        reply.send(doc)
    } 
    catch (error) {
        console.log(error);
    }
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