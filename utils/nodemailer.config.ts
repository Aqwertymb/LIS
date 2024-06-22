import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
        user: process.env.YANDEX_EMAIL as string,
        pass: process.env.YANDEX_PASSWORD as string,
    },
});

export default transporter;
