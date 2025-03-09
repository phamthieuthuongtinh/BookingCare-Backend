import { where } from "sequelize";
import db from "../models/index";
import { raw } from "body-parser";
require('dotenv').config();
import _, { includes, reject, some } from 'lodash';
import emailService from "./emailService";
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/veify-booking?token=${token}&doctorId=${doctorId}`;
    return result;
}


let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter!"
                })
            }
            else {
                let token = uuidv4();
                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                })
                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: "R3"
                    }
                });


                //create  a booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }

                resolve({

                    errCode: 0,
                    errMessage: "Save succeed"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let verifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false

                })
                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save({

                    })
                    resolve({
                        errCode: 0,
                        errMessage: "Confirm succeed"
                    })
                } else {
                    resolve({
                        errCode: 0,
                        errMessage: "Appointment has been activated or does not exist"
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    postBookAppointment: postBookAppointment,
    verifyBookAppointment: verifyBookAppointment
}