const fs = require('fs');
const data = require('../data.json');
const { age, convertToDate } = require('../utils');

//index
exports.index = function (req, res) {
    return res.render("members/index", { members: data.members })
}

//show
exports.show = function (req, res) {
    const { id } = req.params;

    const foundMember = data.members.find(function (member) {
        return member.id == id;
    })

    if (!foundMember) {
        return res.send("Member Not found!");
    }


    const member = {
        ...foundMember,
        age: age(foundMember.birth),
        birth: new Intl.DateTimeFormat("pt-BR").format(foundMember.birth)
    }

    return res.render("members/show", { member });
}

//create
exports.create = function (req, res) {
    return res.render("members/create.njk")
}

//post
exports.post = function (req, res) {
    const keys = Object.keys(req.body);


    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all fields!")
        }
    }


    console.log("vai entrar aqui")
    console.log(req.body.birth)
    birth = Date.parse(req.body.birth)
    created_at = Date.now();

    const lastMember = data.members[data.members.length - 1];

    let id = 1;

    if (lastMember) {
        id = lastMember.id + 1;
    }

    data.members.push({
        ...req.body,
        birth,
        id
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!");
        }

        return res.redirect("/members");
    })

}

//edit
exports.edit = function (req, res) {
    const { id } = req.params;

    const foundMember = data.members.find(function (member) {
        return member.id == id
    })

    if (!foundMember) return res.send("Member Not Found!");

    const member = {
        ...foundMember,
        birth: convertToDate(foundMember.birth)
    }

    return res.render("members/edit", { member });
}

//put
exports.put = function (req, res) {
    const { id } = req.body;

    let index = 0;

    const foundMember = data.members.find(function (member, foundIndex) {
        if (member.id == id) {
            index = foundIndex;
            return true;
        }
    })

    if (!foundMember) return res.send("Member Not Found!");

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write error!")

        return res.redirect(`/members/${id}`);
    })


}

//delete
exports.delete = function (req, res) {
    const { id } = req.body;

    console.log(id)

    const filteredMembers = data.members.filter(function (member) {
        return member.id != id;
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("write file error");

        return res.redirect("/members")
    })

}
