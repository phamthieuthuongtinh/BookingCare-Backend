import bcrypt from "bcryptjs";
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPassWordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve('Ok create new user succeed!')
        } catch (error) {
            reject(error);
        }
    })
    console.log("data from service");
    console.log(data);
    console.log(hashPassWordFromBcrypt);
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassWord = await bcrypt.hash(password, salt);
            resolve(hashPassWord);
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
}