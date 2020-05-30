const express = require('express')
const instructor = require('./controllers/instructors')
const member = require('./controllers/members')

const routes = express.Router();

routes.get("/", function (req, res) {
    return res.render("instructors")
})

routes.get("/instructors", instructor.index)
routes.get("/instructors/create", instructor.create)
routes.get("/instructors/:id", instructor.show)
routes.get("/instructors/:id/edit", instructor.edit)
routes.post("/instructors", instructor.post)
routes.put("/instructors", instructor.put)
routes.delete("/instructors", instructor.delete)

//MEMBERS
routes.get("/members", member.index)
routes.get("/members/create",member.create)
routes.get("/members/:id", member.show)
routes.get("/members/:id/edit", member.edit)
routes.post("/members", member.post)
routes.put("/members", member.put)
routes.delete("/members", member.delete)

module.exports = routes;