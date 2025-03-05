import doctorService from "../services/doctorService";
let handleGetTopDoctor = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 20;
    try {
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}
let handleGetAllDoctor = async (req, res) => {
    try {
        let response = await doctorService.getAllDoctor()
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server!"
        })
    }
}
let handlePostInforDoctor = async (req, res) => {
    try {
        let respone = await doctorService.saveDetailInforDoctor(req.body);
        return res.status(200).json(respone);
    } catch (error) {
        console.log(error)
        return res.status(200).json({

            errCode: -1,
            errMessage: "error from server!"
        })
    }
}

let handleGetDetailDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "errror from server"
        })
    }
}
let handleBulkCreateSchedule = async (req, res) => {
    try {
        let infor = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(infor);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "errror from server"
        })
    }
}
let handleGetScheduleDoctorByDate = async (req, res) => {
    try {
        let infor = await doctorService.getScheduleDoctorByDate(req.query.doctorId, req.query.date);
        return res.status(200).json(infor);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "errror from server"
        })
    }
}
module.exports = {
    handleGetTopDoctor: handleGetTopDoctor,
    handleGetAllDoctor: handleGetAllDoctor,
    handlePostInforDoctor: handlePostInforDoctor,
    handleGetDetailDoctorById: handleGetDetailDoctorById,
    handleBulkCreateSchedule: handleBulkCreateSchedule,
    handleGetScheduleDoctorByDate: handleGetScheduleDoctorByDate,
}