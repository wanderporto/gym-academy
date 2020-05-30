const fs = require('fs');
const data = require('../data.json');
const { age, convertToDate } = require('../utils.js');

//index
exports.index = function (req, res) {
    return res.render("instructors/index", { instructors: data.instructors })
}

//show
exports.show = function (req, res) {
    const { id } = req.params;

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id;
    })

    if (!foundInstructor) {
        return res.send("Instructor Not found!");
    }


    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
    }

    return res.render("instructors/show", { instructor });
}


//create

exports.create = function (req, res) {
    return res.render("instructors/create.njk")
}

//post
exports.post = function (req, res) {
    const keys = Object.keys(req.body);


    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all fields!")
        }
    }

    let { id, avatar_url, name, birth, gender, services } = req.body;

    birth = Date.parse(req.body.birth)
    created_at = Date.now();
    id = Number(data.instructors.length + 1);


    data.instructors.push({
        id,
        name,
        birth,
        avatar_url,
        gender,
        services,
        created_at,

    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!");
        }

        return res.redirect("/instructors");
    })

}

//edit
exports.edit = function (req, res) {
    const { id } = req.params;

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Inspector Not Found!");

    const instructor = {
        ...foundInstructor,
        birth: convertToDate(foundInstructor.birth)
    }

    return res.render("instructors/edit", { instructor });
}

//put
exports.put = function (req, res) {
    const { id } = req.body;

    let index = 0;

    const foundInstructor = data.instructors.find(function (instructor, foundIndex) {
        if (instructor.id == id) {
            index = foundIndex;
            return true;
        }
    })

    if (!foundInstructor) return res.send("Inspector Not Found!");

    const instruct = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instruct;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write erroe!")

        return res.redirect(`/instructors/${id}`);
    })


}

//delete
exports.delete = function (req, res) {
    console.log("vai deletar")

    const { id } = req.body;

    console.log(id)

    const filteredInstructors = data.instructors.filter(function (instructor) {
        return instructor.id != id;
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("write file error");

        return res.redirect("/instructors")
    })

}
