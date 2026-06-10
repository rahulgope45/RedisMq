import dotenv from "dotenv";
dotenv.config();
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendMail(to, subject) {
    const data = await resend.emails.send({
        from: "onboarding@resend.dev",
        to,
        subject,
        html: '<h1>Hello from Rahul</h1>'
    });
    return data;
}
//# sourceMappingURL=email.service.js.map