module.exports = {
    age: function (timeStamp) {
        const dateNow = new Date();
        const dateBirth = new Date(timeStamp);

        let age = dateNow.getFullYear() - dateBirth.getFullYear();

        if (dateNow.getMonth < 0 || dateBirth.getMonth() == 0 && dateNow.getDate() < dateBirth.getDate()) {
            age - + 1;
        }

        return age;

    },

    convertToDate: function (timeStamp) {

        console.log("vai entrar aqui")
        const date = new Date(timeStamp)

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate}`.slice(-2);
        console.log(`${year}-${month}-${day}`);
        return `${year}-${month}-${day}`;
    }
}
