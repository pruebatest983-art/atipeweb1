import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, data } = body;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false, // sometimes needed for some servers
            },
        });

        let subject = "";
        let htmlContent = "";

        if (type === "contact" || type === "sugerencia") {
            subject = `Nuevo mensaje de ${type}: ${data.name}`;
            htmlContent = `
                <h2>Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Tipo:</strong> ${data.type}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${data.message}</p>
            `;
        } else if (type === "budget") {
            subject = `Solicitud de Presupuesto: ${data.name}`;
            htmlContent = `
                <h2>Nueva Solicitud de Presupuesto</h2>
                <p><strong>Nombre:</strong> ${data.name}</p>
                <p><strong>Teléfono:</strong> ${data.phone}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Dispositivo:</strong> ${data.device}</p>
                <p><strong>Urgencia:</strong> ${data.urgency}</p>
                <p><strong>Descripción:</strong></p>
                <p>${data.description}</p>
            `;
        }

        await transporter.sendMail({
            from: `"Atipe Web" <${process.env.SMTP_USER}>`,
            to: "info@atipecomputers.com",
            subject: subject,
            html: htmlContent,
            replyTo: data.email,
        });

        return NextResponse.json({ success: true, message: "Email enviado correctamente" });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ success: false, message: "Error al enviar el email" }, { status: 500 });
    }
}
