
using System.Net;
using System.Net.Mail;

namespace Bank_System
{
    public class EmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string msg)
        {
            var mail = "qktr001@gmail.com";
            var pass = "123456789.Qktr";

            var client = new SmtpClient("qktr001@gmail.com", 587);

            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(mail, pass);
            



            return client.SendMailAsync(new MailMessage(
                from: mail, to: email,
                subject,
                msg));

        }
    }
}
