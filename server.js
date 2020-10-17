const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const bcrypt = require('bcrypt')
const cors = require('cors')
const axios = require('axios')
const mailgun = require("mailgun-js")
const SendCloud = require('sendcloud')
const passport = require('passport')
const session = require('express-session')
const cookieSession = require("cookie-session")
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
//models
const Task = require('./models/Task')
const Requester = require('./models/Requester')
const Worker = require('./models/Worker')
const Requester_google = require('./models/Requester_google')

const keys = require("./config/keys")
const { ClientRequest } = require('http')
const saltRounds = 10;
const app = express()

app.use(express.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(cors())
app.use(bodyParser.json())
app.use(express.static("public"))
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,//One Day
    keys: [keys.session.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())

//初始化 sendCloud
var sc = new SendCloud(keys.sendCloud.apiUser, keys.sendCloud.apiKey, 'DavidYangPersonal@outlook.com', 'iCrowd Tech')

//数据库连接部分
// const url = "mongodb://localhost:27017/iCrowd"
const url = "mongodb+srv://mayum:Mym..980919@icrowd.scmrq.mongodb.net/iCrowd?retryWrites=true&w=majority"
mongoose.set('useCreateIndex', true)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log("Successful connection to " + url)
})

//passport Google 登录策略
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: "/google_sign_in/redirect",
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            Requester_google.findOne({ googleId: profile.id }, (err, currentRequester) => {
                if (currentRequester) {
                    //如果已有登陆账户
                    done(null, currentRequester);
                    console.log(' >> This account is existed');
                } else {
                    console.log(' >> We will create a new account');
                    //如果没有，在数据库新建
                    new Requester_google({
                        googleId: profile.id,
                    }).save().then((newRequesterGoogle) => {
                        done(null, newRequesterGoogle);
                    });
                }
            })
        }
    )
);
passport.serializeUser((requester_google, done) => {
    done(null, requester_google.id)//这里的id是mongo生成的id，而非google ID
})
passport.deserializeUser((id, done) => {
    Requester_google.findById(id).then(requester_google => {
        done(null, requester_google)
    })
})

//Google Sign In Route
app.get("/google_sign_in", passport.authenticate("google", {
    scope: ["profile", "email"]
}))
app.get("/google_logout", (req, res) => {
    req.logout()
    res.send(req.user)
})
app.get("/google_sign_in/redirect", passport.authenticate('google'), (req, res) => {
    res.redirect('/req_task')
})

// Requester API Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})
app.get('/requester', (req, res) => {
    Requester.find((err, requesterList) => {
        if (err) res.send(err)
        else res.send(requesterList)
    })
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "public/register.html"))
})
app.get('/req_task', (req, res) => {
    res.sendFile(path.join(__dirname, "public/req_task.html"))
})
app.post('/register_handler', async (req, res) => {
    let hash, confirm_hash, salt
    let temp_requester = req.body
    try {
        salt = await bcrypt.genSalt(saltRounds)
        hash = await bcrypt.hash(temp_requester.password, salt)//加密 密码
        confirm_hash = await bcrypt.hash(temp_requester.confirm_password, salt)//加密 确认密码
    } catch (err) {
        console.log(err);
    }
    if (hash == confirm_hash) {//当确认密码和密码相同时
        let newRequester = new Requester(temp_requester)// Mongoose 会自动找到名称是 model 名字复数形式的 collection
        newRequester.save((err) => {
            if (err) {// send 错误信息
                res.send(err)
                console.log("\n\n this is the error \n\n" + err);
            } else {// 调用 web API 发送欢迎邮件                
                // let data = {
                //     members: [{
                //         email_address: req.body.email,
                //         status: "subscribed",
                //         merge_fields: {
                //             // FNAME and LNAME are named on the mailchimp website
                //             FNAME: req.body.first_name,
                //             LNAME: req.body.last_name
                //         }
                //     }]
                // }
                // let jsonData = JSON.stringify(data)
                // const apiKey = keys.mailchimp.apiKey
                // const list_id = keys.mailchimp.list_id
                // const url = keys.mailchimp.url
                // const options = keys.mailchimp.options
                // const request = https.request(url, options, (res) => {
                //     res.on("data", (data) => {
                //         console.log(JSON.parse(data))
                //     })
                // })
                // request.write(jsonData)
                // request.end()
                console.log('Sent welcome email successfully')
                res.redirect('/')
            }
        })
    } else {
        res.send("Password and Confirm-Password are different!")
    }
})
app.post('/sign_in_handler', (req, res) => {
    let temp_sign_in_user = req.body
    //数据库查询输入邮箱值
    Requester.findOne({
        'email': temp_sign_in_user.email,
    },
        function (err, requester) {
            if (err) return console.log(err)
            if (requester) {
                // 对比输入密码和数据库存储哈希
                bcrypt.compare(temp_sign_in_user.password, requester.password).then(function (result) {
                    if (result) {
                        res.redirect("/req_task")
                        console.log("Login Successfully")
                    } else {
                        res.send("Wrong password")
                    }
                })
            } else {
                res.send("No such email")
            }
        })
})


//Worker API Route
app.route('/workers')
    .get((req, res) => {
        Worker.find((err, workerList) => {
            if (err) res.send(err)
            else res.send(workerList)
        })
    })
    .post((req, res) => {
        const worker = new Worker({
            worker_name: req.body.name,
            worker_password: req.body.password,
            creation_date: req.body.creation_date,
            worker_phone_number: req.body.phone_number,
            worker_address: req.body.address
        })
        worker.save((err) => {
            if (err) res.send("Error occurred: " + err)
            else res.send('Successfully added a new worker!')
        })
    })
    .delete((req, res) => {
        Worker.deleteMany((err) => {
            if (err) res.send("Error occurred: " + err)
            else res.send('Successfully delete all worker!')
        })
    })

app.route('/workers/:w_name')
    .get((req, res) => {
        Worker.findOne({ worker_name: req.params.w_name }, (err, foundWorker) => {
            if (!err) {
                res.send(foundWorker)
            }
            else res.send("No Match Worker Found")
        })
    })
    .put((req, res) => {
        Worker.update(
            { worker_name: req.params.w_name },
            {
                worker_name: req.body.name,
                worker_password: req.body.password,
                creation_date: req.body.creation_date,
                worker_phone_number: req.body.phone_number,
                worker_address: req.body.address
            },
            { overwrite: true },
            (err) => {
                if (err) res.send(err)
                else res.send('Successfully updated!')
            }
        )
    })
    .patch((req, res) => {
        console.log(req.params)
        Worker.updateOne(
            { worker_name: req.params.w_name },
            {
                worker_name: req.body.name,
                worker_password: req.body.password,
                creation_date: req.body.creation_date,
                worker_phone_number: req.body.phone_number,
                worker_address: req.body.address
            },
            (err) => {
                if (!err) res.send('Successfully updated')
                else res.send(err)
            }
        )
    })

// Task API
app.get('/task', (req, res) => {
    Task.find((err, taskList) => {
        if (err) res.send(err)
        else res.send(taskList)
    })
})
app.post('/create_task', (req, res) => {
    let temp_task = req.body
    temp_task.publish_time = (new Date()).valueOf()
    let newTask = new Task(temp_task)
    newTask.save((err) => {
        if (err) {// send 错误信息
            res.send(err)
            console.log("\n\n this is the error \n\n" + err)
        } else {
            res.send({ message: "New task added successfully!" })
            console.log("New task added successfully")
        }
    })
})
app.get('/task/:id',(req, res) => {
    Task.findOne({ _id: req.params.id }, (err, foundTask) => {
        if (!err) {
            res.send(foundTask)
        }
        else res.send("No Match Task Found")
    })
})

app.delete('/task/:id',(req,res)=>{
    Task.remove({ _id: req.params.id }, (err) => {
        if (err) return handleError(err);
        res.send({message:"Removed Successfully"})
      });
})


// Forgot Route
app.get('/forgot', (req, res) => {
    res.sendFile(path.join(__dirname, "public/forgot.html"))
})
app.post('/forgot_handler', (req, res) => {
    let email = req.body.email
    let prefix = req.headers.referer
    prefix = prefix.replace(/forgot/, '')
    //sendCloud
    if (email) {
        // let url = "http://127.0.0.1:8081/reset/" + email
        // let url = "https://icrowd-platform.herokuapp.com/reset/" + email
        let url = `${prefix}reset/${email}`
        console.log('url :>> ', url)
        sc.send(email, 'iCrowd Password Reset', '<h1><a href="' + url + '">Click here to reset your password</a></h1>').then((info) => {
            if (info.message == 'success') {
                console.log('url :>> ', url)
                console.log('info :>> ', info)
                res.redirect('/')
            } else {
                res.send(info)
            }
        })
    } else {
        res.send("please enter your email!")
    }

})

//Reset Route
app.get('/reset/:email', (req, res) => {
    res.sendFile(path.join(__dirname, "public/reset.html"))
})
app.post('/reset/:email', async (req, res) => {
    let hash, confirm_hash, salt
    try {
        salt = await bcrypt.genSalt(saltRounds)
        hash = await bcrypt.hash(req.body.password, salt)//加密 密码
        confirm_hash = await bcrypt.hash(req.body.confirm_password, salt)//加密 确认密码
    } catch (err) {
        console.log(err)
    }
    console.log('req.body.email :>> ', req.body);
    if (hash == confirm_hash) {
        Requester.updateOne(
            { email: req.body.email },
            {
                password: hash,
                confirm_password: confirm_hash
            },
            (err) => {
                if (!err) {
                    console.log('hash :>> ', hash)
                    res.send('Successfully reset!')
                }
                else {
                    console.log('err :>> ', err);
                    res.send(err)
                }
            }
        )
    } else {
        res.send("Password and Confirm-Password are different!")
    }
})

// 监听端口
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8081;
}
var server = app.listen(port, function () {
    console.log("server is running on http://127.0.0.1:" + port)
})

