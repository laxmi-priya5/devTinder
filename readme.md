1- npm init
2- npm i express
3-npm i -g nodemon(dont run again and again) // if already the use - sudo npm i -g nodemon

.........note.....

- order of the routes matter

# homework

- explore routing and use of + , \* ,? ,() int the routes
- use of regex in routes /a/ , /.\*fly$/
- reading the query params from the route
- reading the dynamic routes
- [link for express routing](https://expressjs.com/en/guide/routing.html)

- ex like app.get(/ab+cd/,(req,res)=>
  res.send("matches ab+cd")
  )

# practice

app.get(/ab+cd/,(req,res)=>
res.send("matches ab+cd")
)

app.get(/ab?cd/ , (req,res)=>res.send("matches ab?cd"))

app.get(/ab.*cd/ , (req,res)=>res.send('matches ab*cd'))

app.get(/a(bc)?d/ , (req,res)=>res.send('matches a(bc)?d'))

app.get(/a/ , (req,res)=>res.send('matches /a/'))

app.get(/.*fly$/ , (req,res)=> res.send('matches /.*fly$/'))

app.get('/product/:id/:reviewId' , (req, res)=>{
res.send(req.params)
// res.send("id: "+ req.params.id)
// res.send("reviewId: " + req.params.reviewId)
})

## to connect node js application to mongo database , we use mongoos library to create schema , models and talk to mongodb database

-> go npm mongoos

# how to use mongoose to connect to our database

- npm i mongoos
