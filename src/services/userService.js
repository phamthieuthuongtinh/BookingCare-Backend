import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
const salt = bcrypt.genSaltSync(10);
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: {
                        email: email,
                    },
                    raw: true,
                })

                if (user) {
                    let check = await bcrypt.compare(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.message = 'Ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = 'Mat khau khong dung';
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.message = 'Nguoi dung khong tim thay';
                }

            } else {
                userData.errCode = 1;
                userData.message = 'Email khong ton tai';

            }
            resolve(userData);
        } catch (error) {
            reject(error)
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail
                }
            })
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}
let compareUserPassword = () => {
    return new Promise((resolve, reject) => {
        try {

        } catch (error) {
            reject(error);
        }
    })
}

let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },

                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({

                    where: {
                        id: userId
                    },
                    attributes: {
                        exclude: ['password']
                    },

                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
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

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'Tour email is already in used'
                })
            }
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
            resolve({
                errCode: 0,
                message: 'OK'
            })
        } catch (error) {
            reject(error);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `User isn't exist`,
                })
            }
            await db.User.destroy({
                where: {
                    id: userId
                }
            });
            resolve({
                errCode: 0,
                errMessage: 'Delete user success!',
            })
        } catch (error) {
            reject(error)
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing  required id!",
                })
            }
            let user = await db.User.findOne({
                where: {
                    id: data.id
                },
                raw: false
            })
            console.log(user);
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                // await db.User.save({
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     address: data.address,
                // })
                resolve({
                    errCode: 0,
                    errMessage: 'User updated success'
                })
            }
            else {
                resolve({
                    errCode: 2,
                    errMessage: 'User is not esxist!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
}