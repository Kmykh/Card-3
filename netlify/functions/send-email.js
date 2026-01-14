const nodemailer = require('nodemailer');
const twilio = require('twilio');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Metodo no permitido' })
    };
  }

  try {
    const { tipo, guestEmail, mensaje } = JSON.parse(event.body);

    const TU_EMAIL = 'maycoljhordan07@gmail.com';
    const TU_NUMERO = '+51932387692';
    const NUMERO_MABEL = '+51999234643';

    // Configurar Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Configurar Twilio
    const twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    if (tipo === 'aceptar') {
      
      // ========== CORREO 1: PARA MABEL (Confirmacion bonita) ==========
      const emailParaMabel = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Georgia', serif; background: linear-gradient(135deg, #ffeef2, #ffd4d8); margin: 0; padding: 20px; }
            .container { max-width: 520px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.15); }
            .header { background: linear-gradient(135deg, #f78ca2, #ff9fb2); padding: 40px 20px; text-align: center; }
            .header h1 { color: white; font-family: 'Pacifico', cursive; margin: 0; font-size: 36px; text-shadow: 2px 2px 4px rgba(0,0,0,0.2); }
            .header p { color: rgba(255,255,255,0.95); margin: 12px 0 0; font-style: italic; font-size: 16px; }
            .content { padding: 40px 30px; text-align: center; background: linear-gradient(180deg, #ffffff, #fff5f7); }
            .heart { font-size: 60px; margin-bottom: 20px; animation: pulse 1.5s ease-in-out infinite; }
            @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
            .message { font-size: 18px; color: #5a3d4a; line-height: 1.8; margin-bottom: 30px; font-family: 'Quicksand', sans-serif; }
            .info-box { background: #fff5f7; border: 3px solid #ff9fb2; border-radius: 15px; padding: 25px; margin: 25px 0; text-align: left; }
            .info-box h3 { color: #f78ca2; margin: 0 0 20px; font-size: 18px; text-align: center; font-family: 'Dancing Script', cursive; }
            .info-box p { margin: 12px 0; color: #5a3d4a; font-size: 16px; display: flex; align-items: center; gap: 10px; }
            .info-box p strong { color: #f78ca2; min-width: 80px; }
            .icon { font-size: 24px; }
            .user-message { background: #ffeef2; border-left: 4px solid #f78ca2; padding: 20px; margin: 25px 0; border-radius: 10px; }
            .user-message h4 { color: #f78ca2; margin: 0 0 12px; font-size: 16px; }
            .user-message p { color: #5a3d4a; margin: 0; font-style: italic; line-height: 1.6; font-size: 15px; }
            .signature { margin-top: 30px; font-style: italic; color: #f78ca2; font-size: 18px; font-family: 'Dancing Script', cursive; }
            .footer { background: linear-gradient(135deg, #f78ca2, #ff9fb2); color: white; padding: 25px; text-align: center; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Reserva Confirmada!</h1>
              <p>Tu cita especial está lista ✨</p>
            </div>
            <div class="content">
              <div class="heart">💕</div>
              <p class="message">
                ¡Hola hermosa! Tu reserva ha sido confirmada exitosamente.<br><br>
                Me emociona mucho poder compartir esta tarde tan especial contigo.
                Será una salida llena de risas, buena comida y momentos inolvidables.
              </p>
              
              <div class="info-box">
                <h3>✨ Detalles de Nuestra Cita ✨</h3>
                <p><span class="icon">📅</span> <strong>Fecha:</strong> Lunes, 19 de Enero 2026</p>
                <p><span class="icon">⏰</span> <strong>Hora:</strong> 1:00 PM - 7:00 PM</p>
                <p><span class="icon">🌮</span> <strong>Comida:</strong> Tacos Deliciosos</p>
                <p><span class="icon">🌳</span> <strong>Paseo:</strong> Caminata por el Parque</p>
              </div>
              
              ${mensaje ? `
              <div class="user-message">
                <h4>Tu mensaje para mí:</h4>
                <p>"${mensaje}"</p>
              </div>
              ` : ''}
              
              <p class="signature">
                Con mucho cariño y esperando verte pronto,<br>
                <strong>Tu persona favorita 💖</strong>
              </p>
            </div>
            <div class="footer">
              📧 Este es un mensaje automático de confirmación.<br>
              ¡Nos vemos el domingo, mi amor! 🌟
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: '"Invitación Especial 💕" <' + process.env.EMAIL_USER + '>',
        to: guestEmail,
        subject: '💕 Tu Reserva está Confirmada - Domingo 19 de Enero',
        html: emailParaMabel
      });

      // ========== CORREO 2: PARA TI MAYCOL (Notificacion con su respuesta) ==========
      const emailParaMaycol = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f0f2f5; margin: 0; padding: 20px; }
            .container { max-width: 500px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
            .header { background: linear-gradient(135deg, #2ecc71, #27ae60); padding: 35px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 28px; font-weight: bold; }
            .badge { background: #ffd700; color: #333; padding: 10px 25px; border-radius: 25px; display: inline-block; font-weight: bold; margin-top: 15px; font-size: 14px; }
            .content { padding: 35px; }
            .success-icon { font-size: 60px; text-align: center; margin-bottom: 20px; }
            .info-row { display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #eee; }
            .info-row:last-child { border-bottom: none; }
            .label { color: #666; font-size: 14px; font-weight: 500; }
            .value { color: #333; font-weight: bold; font-size: 14px; text-align: right; }
            .message-box { background: #f8f9fa; border-left: 5px solid #f78ca2; padding: 20px; margin: 25px 0; border-radius: 8px; }
            .message-box h4 { color: #f78ca2; margin: 0 0 12px; font-size: 16px; }
            .message-box p { color: #444; margin: 0; font-style: italic; line-height: 1.6; font-size: 15px; }
            .cta { background: linear-gradient(135deg, #f78ca2, #ff9fb2); color: white; padding: 15px; text-align: center; margin: 25px 0; border-radius: 10px; font-size: 16px; font-weight: bold; }
            .footer { background: #34495e; color: white; padding: 20px; text-align: center; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 ¡ELLA HA ACEPTADO! 🎉</h1>
              <div class="badge">✓ CONFIRMADO</div>
            </div>
            <div class="content">
              <div class="success-icon">💕</div>
              
              <div class="info-row">
                <span class="label">📅 Fecha</span>
                <span class="value">Domingo, 19 de Enero 2026</span>
              </div>
              <div class="info-row">
                <span class="label">⏰ Hora</span>
                <span class="value">1:00 PM - 7:00 PM</span>
              </div>
              <div class="info-row">
                <span class="label">🌮 Actividad</span>
                <span class="value">Tacos y Paseo por el Parque</span>
              </div>
              <div class="info-row">
                <span class="label">📧 Su correo</span>
                <span class="value">${guestEmail}</span>
              </div>
              
              ${mensaje ? `
              <div class="message-box">
                <h4>💌 Mensaje de ella para ti:</h4>
                <p>"${mensaje}"</p>
              </div>
              ` : '<p style="text-align: center; color: #666; margin: 20px 0;">No dejó mensaje adicional, ¡pero aceptó! 🎊</p>'}
              
              <div class="cta">
                ¡Prepárate para una cita increíble! 🌟
              </div>
            </div>
            <div class="footer">
              📧 Notificación automática - ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: '"Sistema de Invitación 💕" <' + process.env.EMAIL_USER + '>',
        to: TU_EMAIL,
        subject: '🎉 ¡ELLA HA ACEPTADO LA INVITACIÓN! - Domingo 19 Enero',
        html: emailParaMaycol
      });

      // ========== SMS PARA TI ==========
      await twilioClient.messages.create({
        body: `🎉 ¡ELLA HA ACEPTADO! La cita del Domingo 19 de Enero (1-7 PM) está confirmada. Tacos y paseo por el parque. ${mensaje ? 'Su mensaje: "' + mensaje + '"' : '¡Sin mensaje pero aceptó!'}`,
        messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
        to: TU_NUMERO
      });

      // ========== SMS PARA MABEL ==========
      await twilioClient.messages.create({
        body: '💕 ¡Hola! Tu reserva para el Domingo 19 de Enero (1:00-7:00 PM) está confirmada. Tacos deliciosos y paseo por el parque te esperan. ¡Nos vemos pronto! 🌮🌳',
        messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
        to: NUMERO_MABEL
      });

    } else {
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
        from: '"Sistema de Invitacion" <' + process.env.EMAIL_USER + '>',
        to: TU_EMAIL,
        subject: 'Mabel ha declinado la invitacion',
        html: emailDecline
      });

      // SMS para ti
      await twilioClient.messages.create({
        body: 'Mabel ha declinado la invitacion del Martes 23. ' + (mensaje ? 'Mensaje: "' + mensaje + '"' : 'Sin mensaje.'),
        messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
        to: TU_NUMERO
      });
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, mensaje: 'Correos y SMS enviados' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
