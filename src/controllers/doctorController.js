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

module.exports = {
    handleGetTopDoctor: handleGetTopDoctor,
}