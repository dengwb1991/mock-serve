const path = require('path')
//引入express
const express = require('express')
//引入mock
const Mock = require('mockjs')
//实例化express
const app = express()

// post请求体相关
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// mock
const mockData = require('./mall/mock/index.js')
// 允许跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  // 此处根据前端请求携带的请求头进行配置 
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  // 例如： 我们公司的请求头需要携带Authorization和Client-Type，此处就应该按照以下进行配置
  // res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, Client-Type");
  next();
})

// http://localhost:4000/static/owl.png
app.use('/static', express.static(path.join(__dirname, '../public')))

app.post('/user/login', function (req, res) {
  res.send(req.body)
})

// mall
app.get('/mall/product/getModule', function (req, res) {
  res.send(Mock.mock(mockData.getModule))
})

app.listen(4000, function () {
  console.log('Your application is running here: http://localhost:4000')
})