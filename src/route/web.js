import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.handleGetAllCode);

    router.get('/api/top-doctor-home', doctorController.handleGetTopDoctor);
    router.get('/api/get-all-doctors', doctorController.handleGetAllDoctor);
    router.post('/api/save-infor-doctors', doctorController.handlePostInforDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.handleGetDetailDoctorById);
    router.post('/api/bulk-create-schedule', doctorController.handleBulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.handleGetScheduleDoctorByDate);
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.handleGetExtraInforDoctorById);
    router.get('/api/get-profile-doctor-by-id', doctorController.handleGetProfileDoctorById);
    router.post('/api/patient-book-appointment', patientController.postBookAppointment);
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment);

    router.post('/api/create-specialty', specialtyController.createSpecialty);


    return app.use("/", router);
}
module.exports = initWebRoutes;