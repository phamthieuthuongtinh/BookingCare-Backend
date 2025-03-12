import specialtyService from "../services/specialtyService";

let createSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "errror from server"
        })
    }
}
let handleGetAllSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.getAllSpecialty();
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "errror from server"
        })
    }
}
let getDetailSpecialtyById = async (req, res) => {
    try {
        let infor = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "errror from server"
        })
    }
}
module.exports = {
    createSpecialty: createSpecialty,
    handleGetAllSpecialty: handleGetAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById
}