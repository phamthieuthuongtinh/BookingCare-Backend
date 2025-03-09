// const { Model } = require("sequelize/types");
const nodemailer = require("nodemailer");
require('dotenv').config();

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // async..await is not allowed in global scope, must use a wrapper

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"TINHPHAM 👻" <tinhphamtinhpham2002.email>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Appointment for a medical examination", // Subject line
        text: "Hello world?", // plain text body
        html: getBodyHtmlEmail(dataSend),
    });
}
let getBodyHtmlEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result =
            `
            <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
            <td>
                <table width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
                    <tr>
                        <td style="text-align: center;">
                            <h2 style="color: #333;">Xin chào ${dataSend.patientName}!</h2>
                                <h3 style="color: #333;">Xác nhận đặt lịch khám bệnh!</h2>
                            <p style="color: #666; font-size: 14px;">Cảm ơn bạn đã đăng ký dịch vụ từ chúng tôi.</p>
                        </td>
                    </tr>
                        <tr>
                        <td style="text-align: center;">
                            <h4 style="color: #333;">Thông tin đặt lịch khám bệnh</h2>
                            <div><b>Thời gian:</b>${dataSend.time}</div>
                                <div><b>Bác sĩ:</b>${dataSend.doctorName}</div>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center; padding: 20px;">
                            <a href="${dataSend.redirectLink}" style="background-color: #28a745; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Xác nhận ngay</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center; padding-top: 20px; border-top: 1px solid #ddd;">
                            <p style="color: #999; font-size: 12px;">Nếu bạn không yêu cầu email này, vui lòng bỏ qua.</p>
                        </td>
                    </tr>
                </table>
            </td>
            </tr>
            </table>

        `
    }
    if (dataSend.language === 'en') {
        result =
            `
                <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td>
                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
                        <tr>
                            <td style="text-align: center;">
                                <h2 style="color: #333;">Dear ${dataSend.patientName}!</h2>
                                    <h3 style="color: #333;">Confirm the appointment for a medical examination!</h2>
                                <p style="color: #666; font-size: 14px;">Thank you for registering for our service.
</p>
                            </td>
                        </tr>
                            <tr>
                            <td style="text-align: center;">
                                <h4 style="color: #333;">Medical appointment information</h2>
                                <div><b>Time: </b>${dataSend.time}</div>
                                    <div><b>Doctor: </b>${dataSend.doctorName}</div>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: center; padding: 20px;">
                                <a href="${dataSend.redirectLink}" style="background-color: #28a745; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Xác nhận ngay</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: center; padding-top: 20px; border-top: 1px solid #ddd;">
                                <p style="color: #999; font-size: 12px;">If you did not request this email, please ignore it.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

       `
    }
    return result;
}






module.exports = {
    sendSimpleEmail: sendSimpleEmail
}