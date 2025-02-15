import { Json } from 'sequelize/lib/utils';
import db from '../models/index';
import CRUDService, { createNewUser } from '../services/CRUDService';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', { data: JSON.stringify(data) });
    } catch (error) {
        console.log(error);
    }
}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await createNewUser(req.body);
    console.log(message);
    return res.send("CRUD from server")
}
let displayGetCRUD = async (req, res) => {
    let users = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', {
        users: users,
    });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let user = await CRUDService.getUserInfoById(userId);
        return res.render('editCRUD.ejs', {
            user: user,
        });

    }
    else {
        return res.send('id not found')
    };

}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        users: allUsers,
    });
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
}