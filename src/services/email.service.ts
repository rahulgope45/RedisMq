import { Resend } from "resend";

const resend = new Resend(
    process.env.RESEND_FROM_EMAIL
);

export async function sendMail(to:string,subject:string) {
    const data = await resend.emails.send({
        from: "onboarding@resend.dev",
        to,
        subject,
        html: '<h1>Hello from Rahul</h1>'
    });

    return data;
}