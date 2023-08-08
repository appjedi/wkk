// source: https://www.youtube.com/watch?v=z84uTk5zmak
require("dotenv").config()

const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const MySql = require('sync-mysql');
const path = require('path');
const session = require('koa-session');

const GC_CONN_IDX = 2;
let GC_CONNECTIONS = JSON.parse(process.env.MySQL_JSON);

const connection = new MySql(GC_CONNECTIONS[GC_CONN_IDX]);

const app = new Koa();
const router = new KoaRouter();
const PORT = 3000;
//app.use(session());
app.keys = ['Shh, its a secret!'];
app.use(session(app)); 
app.use(json());
app.use(bodyParser());
const GC_RELEASE = "2023-05-08";

const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const GC_MONGO_PROD_URL = "mongodb+srv://appuser:AppData2022@cluster0.aga82.mongodb.net/test";
const GC_MONGO_LOCAL_URL = "mongodb://127.0.0.1:27017/wkk";
const GC_MONGO_URL = GC_MONGO_PROD_URL;
let ssn;
const things = [
    { id: 1, thing: 'Pizza' }, { id: 2, thing: 'Traveling' }, { id: 3, thing: 'Karate' }, { id: 4, thing: 'Coffee' }
];

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug:false
});
app.use(router.routes()).use(router.allowedMethods());

router.get("/", index);
async function index(ctx) {
    await ctx.render('index', {
        title: "Things I really love:",
        things:things
    });
}
router.get("/add", addPage);
async function addPage(ctx) {
    await ctx.render('add');
}
router.get("/amort", amort);
async function amort(ctx) {
    await ctx.render('amort');
}
router.get("/hello/:name", async (ctx) => {
    ctx.body = "Hello " + ctx.params.name;
});
router.get("/dbtest", (ctx) => {
  const results = connection.query('SELECT * FROM users');

  ctx.body=results;
});
router.get("/user", async (ctx) => {
    ctx.body = ctx.session.user;
});
router.post("/add", addPost);
async function addPost(ctx) {
    const thing = { id: things.length +1, thing: ctx.request.body.thing };
    things.push(thing);
    console.log("add thing: ", thing);
    ctx.redirect("/");
}
router.get('/login', (ctx) => {
  const form =
    `
    <html><head><title>login</title></head><body>
   <h1>Login Page: </h1><p>${GC_RELEASE}</p>
   <form method="POST" action="login">
    Username:<br><input type="text" name="username">
    <br>Password:<br><input type="text" name="password">
    <br><br><input type="submit" value="Submit"></form></body></html>
    `;

  ctx.body=form;

});
router.post('/login',  (ctx) => {
  const username = ctx.request.body.username;
  const password = ctx.request.body.password;
  console.log("/login::::::", username);
  const auth = login(username, password);
  if (auth)
  {
    console.log("Authenticated!",auth);
          const obj = { auth: true, userId: auth.id, userName: auth.username, roleId: auth.role_id };
      console.log("AUTH:", obj);
     ssn = ctx.session;
      
      //this.session.user = auth;
      ssn.user = auth;  
     // console.log("SESSION", ssn);
      ctx.body = obj ;
  } else {
        ctx.body={auth:false};
  }
});
function login(u, p) {
    try {
        //const query = `SELECT * FROM users WHERE username='${u}' AND password= '${p}'`;
        const query = `SELECT * FROM users WHERE username=? AND password= PASSWORD(?)`;
        const results = connection.query(query, [u,p]);
        console.log("LOGIN.RESULTS::",results);

        return results[0];
  } catch (e) {
    console.log("ERROR:", e);
    return null;
  }
}
router.get("/students", async (ctx) => {
    const students = await getStudents(0);
    ctx.body=students;
});
const mongoInsert = async (obj) => {
  MongoClient.connect(GC_MONGO_URL, { useUnifiedTopology: true }, function (err, db) {
    if (err)
      throw err;
    var dbo = db.db("wkk");

    dbo.collection("students").insertOne(obj);
    // 
  });
}
const mongoUpate = async (obj) => {
  MongoClient.connect(GC_MONGO_URL, { useUnifiedTopology: true }, function (err, db) {
    if (err)
      throw err;
    var dbo = db.db("test");
    //  dbo.collection.update({ 'id': obj.id }, { $set: { 'status': obj.status, paid: obj.paid } })
    dbo.collection("charges").updateOne({ 'id': obj.id }, { $set: { 'status': obj.status, paid: obj.paid } });

  });
}
const getStudents = async (id) => {
  try {

    const query = id === 0 ? {} : { id: id };
    const db = await MongoClient.connect(GC_MONGO_URL, { useUnifiedTopology: true });
    var dbo = db.db("wkk");
    const rows = await dbo.collection("students").find(query).toArray();
  //  console.log(id, "ROWS:", rows);
    if (rows)
      return id === 0 ? rows : rows[0];
    else
      return null;

  } catch (e) {
    console.log(e);
    return null;
  }
};
const loginMongo = async (un, pw) => {
  try {
    const query = { username: un }
    const db = await MongoClient.connect(GC_MONGO_URL, { useUnifiedTopology: true });
    var dbo = db.db("test");
    const rows = await dbo.collection("charges").find(query).toArray();
    console.log(id, "ROWS:", rows);
    if (rows && rows[0].password === pw) {
      return true;
    }
    else
      return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

app.listen(PORT, () => {
    console.log("listening on port:", PORT);
})

let GC_CONNECTIONS_old = [{
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: ''
},
{
  host: 'appdojo.net',
  user: 'appjedin_sensei',
  database: 'appjedin_training',
  password: 'Sensei2022!'
}, {
  host: "192.168.64.2", // Mac
  user: "training",
  password: "Test1234",
  database: "test",
  port: 3306
}
];
