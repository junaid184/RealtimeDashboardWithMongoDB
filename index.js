const { response, request } = require("express")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const postmodel = require("./schema")
const signuppostmodel = require("./schema")
const port = 7000;
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose.connect("mongodb+srv://admin:admin@cluster0.vheq2.mongodb.net/post",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)


mongoose.connection.on("connected", () => console.log("Mongoose Connected"))
mongoose.connection.on("error", () => console.log("Mongoose not connected"))


// Create
app.post("/add", (request, response) => {
    try {
        const body = request.body
        postmodel.create(body, (error, data) => {
            if (error) {
                throw error
            } else {
                response.send("Create Successfuly")
            }
        })

    } catch (error) {
        response.send(error)
    }
})


// Read All
app.get("/read", (request, response) => {
    try {
        postmodel.find({}, (error, data) => {
            if (error) {
                throw error
            } else {
                console.log(data)
                response.send(data);
            }
        })
    } catch (error) {
        response.send(error)
    }
})

app.post("/signup", (request, response) => {
    try {
        const body = request.body
        signuppostmodel.create(body, (error, data) => {
            if (error) {
                throw error
            } else {
                response.send("Singup Successful")
                console.log(data);

            }
        })
    } catch (error) {
        response.send(error)
    }
})

app.get("/user", (request, response) => {
    try {
        const { email } = request.headers
        if (emal) {
            postmodel.findOne({ email }, (error, data) => {
                if (error) {
                    throw error
                } else {
                    response.send(data)
                }
            })
        }
        else {
            response.send("User Missing")
        }
    } catch (error) {
        response.send(error)
    }
})


app.listen(port, () => console.log(`Server is running on port: ${port}`))