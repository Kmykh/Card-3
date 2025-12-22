const express = require('express');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Credenciales desde .env
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_MESSAGING_SID = process.env.TWILIO_MESSAGING_SID;
const TU_EMAIL = process.env.EMAIL_USER;
const TU_NUMERO = process.env.TU_NUMERO;
const NUMERO_MABEL = process.env.NUMERO_MABEL;

// Configurar transporter de Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD
  }
});

// Configurar Twilio
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Endpoint para enviar correos
app.post('/.netlify/functions/send-email', async (req, res) => {
  try {
    const { tipo, guestEmail, mensaje, telefonoMabel } = req.body;

    console.log('Recibido:', { tipo, guestEmail, mensaje, telefonoMabel });

    if (tipo === 'aceptar') {
      
      // ========== CORREO 1: PARA MABEL (Confirmacion bonita) ==========
      const emailParaMabel = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Georgia, serif; background: #f4e4bc; margin: 0; padding: 20px; }
            .container { max-width: 520px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
            .header { background: linear-gradient(135deg, #630d16, #4d0a11); padding: 35px 20px; text-align: center; }
            .header h1 { color: #c5a059; font-family: Georgia, serif; margin: 0; font-size: 32px; }
            .header p { color: rgba(255,255,255,0.9); margin: 10px 0 0; font-style: italic; }
            .content { padding: 35px; text-align: center; background: linear-gradient(180deg, #fffef9, #f4e4bc); }
            .heart { font-size: 50px; margin-bottom: 15px; }
            .message { font-size: 18px; color: #333; line-height: 1.8; margin-bottom: 25px; }
            .info-box { background: white; border: 2px solid #c5a059; border-radius: 12px; padding: 25px; margin: 25px 0; text-align: left; }
            .info-box h3 { color: #630d16; margin: 0 0 15px; font-size: 16px; text-align: center; border-bottom: 1px solid #c5a059; padding-bottom: 10px; }
            .info-box p { margin: 10px 0; color: #444; font-size: 15px; }
            .signature { margin-top: 30px; font-style: italic; color: #630d16; font-size: 16px; }
            .footer { background: #630d16; color: white; padding: 20px; text-align: center; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Reserva Confirmada</h1>
              <p>Tu cita especial esta lista</p>
            </div>
            <div class="content">
              <div class="heart">💝</div>
              <p class="message">
                Hermosa Mabel, tu reserva ha sido confirmada exitosamente.<br><br>
                Maycol te espera con mucha ilusion para compartir una tarde increible juntos. 
                Habra makis deliciosos, legos para construir y un paseo navideno que sera inolvidable.
              </p>
              
              <div class="info-box">
                <h3>Detalles de tu Cita</h3>
                <p><strong>Fecha:</strong> Martes, 23 de Diciembre 2025</p>
                <p><strong>Hora:</strong> 4:00 PM - 6:00 PM</p>
                <p><strong>Actividades:</strong> Makis, Legos y Paseo Navideno</p>
              </div>
              
              <p class="signature">
                Con carino y esperando verte pronto,<br>
                <strong>Maycol</strong> ❤️
              </p>
            </div>
            <div class="footer">
              Este es un mensaje automatico de confirmacion.<br>
              Nos vemos el martes, bobita 💕
            </div>
          </div>
        </body>
        </html>
      `;

      console.log('Enviando correo a Mabel:', guestEmail);
      await transporter.sendMail({
        from: '"Maycol - Invitacion Especial" <' + EMAIL_USER + '>',
        to: guestEmail,
        subject: 'Tu Reserva esta Confirmada - Cita del Martes 23',
        html: emailParaMabel
      });
      console.log('Correo enviado a Mabel OK');

      // ========== CORREO 2: PARA TI MAYCOL ==========
      const emailParaMaycol = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Georgia, serif; background: #f4e4bc; margin: 0; padding: 20px; }
            .container { max-width: 500px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
            .header { background: linear-gradient(135deg, #2d7a2d, #1e5a1e); padding: 30px; text-align: center; }
            .header h1 { color: white; font-family: Georgia, serif; margin: 0; font-size: 26px; }
            .badge { background: #ffd700; color: #333; padding: 8px 20px; border-radius: 20px; display: inline-block; font-weight: bold; margin-top: 10px; }
            .content { padding: 30px; }
            .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
            .info-row:last-child { border-bottom: none; }
            .label { color: #666; font-size: 14px; }
            .value { color: #333; font-weight: bold; font-size: 14px; }
            .message-box { background: #f9f5eb; border-left: 4px solid #630d16; padding: 20px; margin: 20px 0; }
            .message-box h4 { color: #630d16; margin: 0 0 10px; }
            .message-box p { color: #444; margin: 0; font-style: italic; line-height: 1.6; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>MABEL HA ACEPTADO</h1>
              <div class="badge">CONFIRMADO</div>
            </div>
            <div class="content">
              <div class="info-row">
                <span class="label">Fecha</span>
                <span class="value">Martes, 23 de Diciembre</span>
              </div>
              <div class="info-row">
                <span class="label">Hora</span>
                <span class="value">4:00 PM - 6:00 PM</span>
              </div>
              <div class="info-row">
                <span class="label">Correo de Mabel</span>
                <span class="value">${guestEmail}</span>
              </div>
              <div class="info-row">
                <span class="label">Telefono de Mabel</span>
                <span class="value">${telefonoMabel || 'No proporcionado'}</span>
              </div>
              
              <div class="message-box">
                <h4>Mensaje de Mabel para ti:</h4>
                <p>"${mensaje || 'No dejo mensaje, pero ACEPTO! 🎉'}"</p>
              </div>
              
              <p style="text-align: center; color: #2d7a2d; font-size: 18px; margin-top: 20px;">
                <strong>Prepara todo para la cita!</strong>
              </p>
            </div>
            <div class="footer">
              Notificacion automatica - ${new Date().toLocaleString('es-PE')}
            </div>
          </div>
        </body>
        </html>
      `;

      console.log('Enviando correo a Maycol...');
      await transporter.sendMail({
        from: '"Sistema de Invitacion" <' + EMAIL_USER + '>',
        to: TU_EMAIL,
        subject: 'MABEL HA ACEPTADO LA INVITACION!',
        html: emailParaMaycol
      });
      console.log('Correo enviado a Maycol OK');

      // ========== SMS PARA TI ==========
      console.log('Enviando SMS a Maycol...');
      await twilioClient.messages.create({
        body: 'MABEL HA ACEPTADO! La cita del Martes 23 (4-6PM) esta confirmada. ' + (mensaje ? 'Mensaje: "' + mensaje + '"' : 'Sin mensaje adicional.'),
        messagingServiceSid: TWILIO_MESSAGING_SID,
        to: TU_NUMERO
      });
      console.log('SMS a Maycol OK');

      // ========== SMS PARA MABEL ==========
      console.log('Enviando SMS a Mabel:', NUMERO_MABEL);
      await twilioClient.messages.create({
        body: 'Hola Mabel! Tu reserva para el Martes 23 de Diciembre (4-6 PM) esta confirmada. Maycol te espera con makis, legos y mucho carino. Nos vemos! - Con amor, Maycol',
        messagingServiceSid: TWILIO_MESSAGING_SID,
        to: NUMERO_MABEL
      });
      console.log('SMS a Mabel OK');

    } else {
      // ========== DECLINAR ==========
      const emailDecline = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Georgia, serif; background: #f5f5f5; margin: 0; padding: 20px; }
            .container { max-width: 500px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #666, #444); padding: 30px; text-align: center; }
            .header h1 { color: #ddd; font-family: Georgia, serif; margin: 0; font-size: 24px; }
            .content { padding: 30px; text-align: center; }
            .message-box { background: #f9f9f9; border-left: 4px solid #888; padding: 20px; margin: 20px 0; text-align: left; }
            .footer { background: #444; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Mabel ha Declinado</h1>
            </div>
            <div class="content">
              <p>La invitacion para el Martes 23 de Diciembre ha sido declinada.</p>
              
              ${mensaje ? `
              <div class="message-box">
                <h4 style="color: #666; margin: 0 0 10px;">Su mensaje:</h4>
                <p style="color: #444; margin: 0; font-style: italic;">"${mensaje}"</p>
              </div>
              ` : '<p style="color: #888;">No dejo ningun mensaje.</p>'}
              
              <p style="color: #666; margin-top: 25px;">Animo, habra mas oportunidades...</p>
            </div>
            <div class="footer">
              ${new Date().toLocaleString('es-PE')}
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: '"Sistema de Invitacion" <' + EMAIL_USER + '>',
        to: TU_EMAIL,
        subject: 'Mabel ha declinado la invitacion',
        html: emailDecline
      });

      await twilioClient.messages.create({
        body: 'Mabel ha declinado la invitacion del Martes 23. ' + (mensaje ? 'Mensaje: "' + mensaje + '"' : 'Sin mensaje.'),
        messagingServiceSid: TWILIO_MESSAGING_SID,
        to: TU_NUMERO
      });
    }

    res.json({ success: true, mensaje: 'Correos y SMS enviados' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║     SERVIDOR DE INVITACION ACTIVO             ║
╠═══════════════════════════════════════════════╣
║  Abre en tu navegador:                        ║
║  http://localhost:${PORT}                        ║
╚═══════════════════════════════════════════════╝
  `);
});
