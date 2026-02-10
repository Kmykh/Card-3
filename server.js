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
const EMAIL_MABEL = process.env.EMAIL_MABEL;

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
      
      // ========== CORREO 1: PARA MABEL (Mensaje romántico especial) ==========
      const emailParaMabel = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Georgia', serif; background: linear-gradient(135deg, #ffeef2, #ffd4d8); margin: 0; padding: 20px; }
            .container { max-width: 550px; margin: 0 auto; background: white; border-radius: 25px; overflow: hidden; box-shadow: 0 20px 60px rgba(247, 140, 162, 0.4); }
            .header { background: linear-gradient(135deg, #ff6b81, #ff9fb2, #ff6b81); padding: 50px 20px; text-align: center; position: relative; overflow: hidden; }
            .header::before { content: '💕'; position: absolute; font-size: 120px; opacity: 0.1; top: -20px; right: -20px; }
            .header::after { content: '❤️'; position: absolute; font-size: 100px; opacity: 0.1; bottom: -30px; left: -30px; }
            .header h1 { color: white; font-family: 'Dancing Script', cursive; margin: 0; font-size: 42px; text-shadow: 3px 3px 6px rgba(0,0,0,0.3); position: relative; z-index: 1; }
            .header p { color: rgba(255,255,255,0.95); margin: 15px 0 0; font-style: italic; font-size: 18px; position: relative; z-index: 1; font-weight: 600; }
            .content { padding: 45px 35px; text-align: center; background: linear-gradient(180deg, #ffffff, #fff5f7); }
            .hearts-row { font-size: 40px; margin-bottom: 25px; letter-spacing: 15px; animation: float 3s ease-in-out infinite; }
            @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
            .love-message { font-size: 20px; color: #5a3d4a; line-height: 2; margin-bottom: 35px; font-family: 'Georgia', serif; font-weight: 500; }
            .love-message strong { color: #ff4d6d; font-size: 22px; }
            .quote-box { background: linear-gradient(135deg, #ffeef2, #fff5f7); border: 3px solid #ff9fb2; border-radius: 20px; padding: 30px; margin: 30px 0; box-shadow: 0 10px 30px rgba(247, 140, 162, 0.2); }
            .quote-box .quote-icon { font-size: 50px; color: #ff9fb2; margin-bottom: 15px; }
            .quote-box p { font-size: 18px; color: #5a3d4a; font-style: italic; line-height: 1.8; margin: 0; }
            .user-message { background: linear-gradient(135deg, #fff5f7, #ffeef2); border-left: 5px solid #ff4d6d; padding: 25px; margin: 30px 0; border-radius: 15px; box-shadow: 0 8px 20px rgba(255, 77, 109, 0.15); }
            .user-message h4 { color: #ff4d6d; margin: 0 0 15px; font-size: 18px; font-family: 'Dancing Script', cursive; }
            .user-message p { color: #5a3d4a; margin: 0; font-size: 16px; line-height: 1.8; }
            .signature { margin-top: 40px; font-style: italic; color: #ff4d6d; font-size: 22px; font-family: 'Dancing Script', cursive; font-weight: 700; }
            .footer { background: linear-gradient(135deg, #ff6b81, #ff9fb2); color: white; padding: 30px; text-align: center; font-size: 15px; line-height: 1.8; }
            .footer strong { font-size: 18px; display: block; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Eres mi todo 💝</h1>
              <p>Un mensaje desde el corazón</p>
            </div>
            <div class="content">
              <div class="hearts-row">♥ ♥ ♥</div>
              <p class="love-message">
                <strong>Mi querida ratoncita,</strong><br><br>
                Escribo estas palabras pensando en ti, en tu mirada, en tu forma de ser que me llena de alegría cada día.
                Quiero que sientas que estoy contigo, aunque la distancia nos separe físicamente, mi corazón siempre está a tu lado.<br><br>
                Eres esa persona especial que hace que cada momento valga la pena, la que con su presencia transforma lo ordinario en extraordinario.
                Cada día que pasa descubro algo nuevo que me enamora de ti, y me siento afortunado de tenerte en mi vida.
              </p>
              
              <div class="quote-box">
                <div class="quote-icon">❝</div>
                <p>
                  "Contigo aprendí que el amor no necesita grandes gestos, sino pequeños detalles que demuestran que siempre estás en mis pensamientos.
                  Eres mi calma en medio de la tormenta, mi alegría en los días grises, y mi razón para sonreír sin motivo aparente.
                  Gracias por existir, mi ratoncita hermosa, y por permitirme ser parte de tu vida."
                </p>
              </div>
              
              ${mensaje ? `
              <div class="user-message">
                <h4>💌 Tu mensaje me llegó al corazón:</h4>
                <p>"${mensaje}"</p>
              </div>
              ` : ''}
              
              <p class="signature">
                Con todo mi amor, siempre a tu lado,<br>
                Tu persona que te adora y te cuida ♥
              </p>
            </div>
            <div class="footer">
              Este mensaje fue creado con amor especialmente para ti, mi ratoncita.<br>
              <strong>Siempre estaré aquí para ti, en las buenas y en las malas, porque eres mi persona favorita en todo el universo.</strong>
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: '"♥ Un mensaje especial" <' + EMAIL_USER + '>',
        to: EMAIL_MABEL,
        subject: 'Para mi ratoncita - Un mensaje desde el corazón',
        html: emailParaMabel
      });

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
        body: `💌 ¡Le llegó todo tu detalle! Ella lo recibió y respondió. ${mensaje ? 'Su mensaje: "' + mensaje + '"' : '¡Revisa tu email para más detalles!'} 💕`,
        messagingServiceSid: TWILIO_MESSAGING_SID,
        to: TU_NUMERO
      });
      console.log('SMS a Maycol OK');

      // ========== SMS PARA MABEL ==========
      console.log('Enviando SMS a Mabel:', NUMERO_MABEL);
      await twilioClient.messages.create({
        body: '💕 Amor mío, hoy quise enviarte un pequeño pedacito de lo que siento por ti. Cuando lo leas, imagina mis brazos rodeándote y mi corazón hablándote bajito… porque todo lo que nace de mí, nace pensando en ti 🌷✨',
        messagingServiceSid: TWILIO_MESSAGING_SID,
        to: NUMERO_MABEL
      });
      console.log('SMS a Mabel OK');

    } else {
      // ========== DECLINAR: CORREO PARA MABEL ==========
      const emailParaMabelDecline = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Georgia', serif; background: linear-gradient(135deg, #ffeef2, #ffd4d8); margin: 0; padding: 20px; }
            .container { max-width: 550px; margin: 0 auto; background: white; border-radius: 25px; overflow: hidden; box-shadow: 0 20px 60px rgba(247, 140, 162, 0.4); }
            .header { background: linear-gradient(135deg, #ff9fb2, #ffcce0); padding: 50px 20px; text-align: center; }
            .header h1 { color: white; font-family: 'Dancing Script', cursive; margin: 0; font-size: 42px; text-shadow: 3px 3px 6px rgba(0,0,0,0.3); }
            .header p { color: rgba(255,255,255,0.95); margin: 15px 0 0; font-style: italic; font-size: 18px; font-weight: 600; }
            .content { padding: 45px 35px; text-align: center; background: linear-gradient(180deg, #ffffff, #fff5f7); }
            .surprise-box { font-size: 60px; margin-bottom: 25px; }
            .message { font-size: 20px; color: #5a3d4a; line-height: 2; margin-bottom: 35px; font-weight: 500; }
            .quote { background: linear-gradient(135deg, #fff5f7, #ffeef2); border-left: 5px solid #ff9fb2; padding: 25px; margin: 30px 0; border-radius: 15px; font-style: italic; color: #5a3d4a; font-size: 18px; line-height: 1.8; }
            .signature { margin-top: 40px; font-style: italic; color: #ff4d6d; font-size: 22px; font-family: 'Dancing Script', cursive; font-weight: 700; }
            .footer { background: linear-gradient(135deg, #ff9fb2, #ffcce0); color: white; padding: 30px; text-align: center; font-size: 15px; line-height: 1.8; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Algo especial se acerca 💫</h1>
              <p>Para la persona que ilumina mis días</p>
            </div>
            <div class="content">
              <div class="surprise-box">♥ ♥ ♥</div>
              <p class="message">
                <strong>Mi querida ratoncita,</strong><br><br>
                Sé que dijiste "te extraño jsjs", y quiero que sepas que yo también te extraño muchísimo.
                La distancia no cambia lo que siento por ti, y cada día pienso en formas de hacerte sentir especial y acompañada.<br><br>
                Tengo algo preparado para ti, algo que nace desde lo más profundo de mi corazón.
                Quiero que sientas que aunque no estemos físicamente juntos, siempre estoy contigo, cuidándote, pensando en ti y enviándote todo mi cariño.
              </p>
              
              <div class="quote">
                "La distancia es solo un número cuando el corazón está cerca.
                No importa cuántos kilómetros nos separen, siempre encontraré la manera de hacerte sentir amada, cuidada y especial.
                Tu felicidad es mi felicidad, tu sonrisa es mi motivación, y tu bienestar es mi prioridad.
                Eres mi ratoncita hermosa y siempre lo serás."
              </div>
              
              <p class="signature">
                Con todo mi amor y una sorpresa en camino,<br>
                Tu persona que te adora y te cuida siempre ♥
              </p>
            </div>
            <div class="footer">
              Mensaje creado con amor para mi ratoncita · Algo hermoso viene para ti<br>
              <strong>Espéralo con la misma ilusión con la que yo pienso en ti cada día</strong>
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: '"♥ Para mi ratoncita" <' + EMAIL_USER + '>',
        to: EMAIL_MABEL,
        subject: 'Algo especial para ti - También te extraño mucho',
        html: emailParaMabelDecline
      });

      // ========== DECLINAR: CORREO PARA TI ==========
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

      // SMS para ti
      await twilioClient.messages.create({
        body: '💕 Ella recibió tu detalle y respondió: "Te extraño jsjs". Algo especial se acerca para ella. Revisa tu email 📧✨',
        messagingServiceSid: TWILIO_MESSAGING_SID,
        to: TU_NUMERO
      });

      // SMS PARA MABEL (DECLINE)
      await twilioClient.messages.create({
        body: '💝 Mi amor, te he enviado algo especial. Revisa tu correo electrónico cuando puedas, hay un mensaje hecho con todo mi corazón para ti 💕✨',
        messagingServiceSid: TWILIO_MESSAGING_SID,
        to: NUMERO_MABEL
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
