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
    const EMAIL_MABEL = 'mabelmiraval2019@gmail.com';

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
      
      // ========== CORREO 1: PARA MABEL (Mensaje bonito y romántico) ==========
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
            .signature { margin-top: 40px; font-style: italic; color: #ff4d6d; font-size: 22px; font-family: 'Dancing Script', cursive; font-weight: 700; }
            .footer { background: linear-gradient(135deg, #ff6b81, #ff9fb2); color: white; padding: 30px; text-align: center; font-size: 15px; line-height: 1.8; }
            .footer strong { font-size: 18px; display: block; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Para mi ratoncita hermosa 💝</h1>
              <p>Un mensaje hecho con todo mi corazón</p>
            </div>
            <div class="content">
              <div class="hearts-row">♥ ♥ ♥</div>
              <p class="love-message">
                <strong>Mi amor,</strong><br><br>
                Escribo estas palabras pensando en ti, en tu sonrisa, en tu forma de ser que me llena de alegría cada día.
                Quiero que sepas que aunque la distancia nos separe físicamente, mi corazón siempre está a tu lado.<br><br>
                Eres esa persona especial que hace que cada momento valga la pena, la que con su presencia ilumina mis días.
                Cada día descubro algo nuevo que me enamora de ti, y me siento el más afortunado de tenerte en mi vida.
                No importa lo que pase, siempre voy a estar aquí para ti, cuidándote y haciéndote sentir especial.
              </p>
              
              <div class="quote-box">
                <div class="quote-icon">❝</div>
                <p>
                  "Eres mi calma en medio de la tormenta, mi alegría en los días grises, y mi razón para sonreír sin motivo alguno.
                  Contigo aprendí que el amor verdadero se demuestra en los pequeños detalles, en pensar en ti todo el tiempo,
                  en querer verte feliz siempre. Gracias por existir, mi ratoncita hermosa, y por permitirme ser parte de tu vida.
                  Eres mi persona favorita en todo el mundo."
                </p>
              </div>
              
              <p class="signature">
                Con todo mi amor, siempre a tu lado,<br>
                Tu persona que te adora infinitamente ♥
              </p>
            </div>
            <div class="footer">
              Este mensaje fue creado con muchísimo amor especialmente para ti, mi ratoncita bella.<br>
              <strong>Siempre estaré aquí para ti, porque eres lo más importante para mí.</strong>
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: '"♥ Un mensaje especial para ti" <' + process.env.EMAIL_USER + '>',
        to: EMAIL_MABEL,
        subject: '💕 Para mi ratoncita - Un mensaje desde el corazón',
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
              <h1>💕 ¡ELLA RESPONDIÓ! 💕</h1>
              <div class="badge">✓ MENSAJE RECIBIDO</div>
            </div>
            <div class="content">
              <div class="success-icon">💌</div>
              
              ${mensaje ? `
              <div class="message-box">
                <h4>💌 Esto es lo que ella te escribió:</h4>
                <p>"${mensaje}"</p>
              </div>
              ` : '<p style="text-align: center; color: #666; margin: 20px 0;">Ella recibió tu detalle 💕</p>'}
              
              <div class="cta">
                ¡Tu detalle le llegó al corazón! 💝
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
        from: '"Sistema de Notificación 💕" <' + process.env.EMAIL_USER + '>',
        to: TU_EMAIL,
        subject: '💌 ¡Ella respondió! - Mira lo que te escribió',
        html: emailParaMaycol
      });

      // ========== SMS PARA TI ==========
      await twilioClient.messages.create({
        body: `💌 ¡Le llegó todo tu detalle! Ella lo recibió y respondió. ${mensaje ? 'Su mensaje: "' + mensaje + '"' : '¡Revisa tu email para más detalles!'} 💕`,
        messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
        to: TU_NUMERO
      });

      // ========== SMS PARA MABEL ==========
      await twilioClient.messages.create({
        body: '💕 Mi amor, acabas de recibir un mensaje muy especial en tu correo. Ábrelo cuando puedas, fue hecho con mucho amor para ti. Eres mi mundo entero 🌍✨',
        messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
        to: NUMERO_MABEL
      });

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
              <h1>Para mi ratoncita bella 💕</h1>
              <p>Siempre pensando en ti</p>
            </div>
            <div class="content">
              <div class="surprise-box">♥ ♥ ♥</div>
              <p class="message">
                <strong>Mi amor,</strong><br><br>
                Mientras escribo esto, solo pienso en ti y en cómo hacerte sentir especial.
                Aunque tú me extrañes y yo te extrañe, quiero que sepas que siempre estoy aquí, cuidando de ti desde la distancia.<br><br>
                La distancia física no cambia nada de lo que siento por ti. Cada día pienso en formas de hacerte sonreír,
                de demostrarte que eres lo más importante para mí, mi persona favorita en el mundo entero.
              </p>
              
              <div class="quote">
                "No importa cuántos kilómetros nos separen, mi corazón siempre estará cerca del tuyo.
                Siempre encontraré la manera de hacerte sentir amada, cuidada y especial.
                Tu felicidad es mi felicidad, tu sonrisa es mi motivación.
                Eres mi ratoncita hermosa y lo serás para siempre."
              </div>
              
              <p class="signature">
                Con todo mi amor infinito,<br>
                Tu persona que te cuida y te adora siempre ♥
              </p>
            </div>
            <div class="footer">
              Hecho con amor solo para ti, mi ratoncita preciosa<br>
              <strong>Siempre vas a ser mi prioridad, porque significas todo para mí</strong>
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: '"♥ Para mi ratoncita" <' + process.env.EMAIL_USER + '>',
        to: EMAIL_MABEL,
        subject: '💕 Pensando en ti - Un mensaje especial',
        html: emailParaMabelDecline
      });

      // ========== DECLINAR: CORREO PARA TI ==========
      const emailDecline = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f0f2f5; margin: 0; padding: 20px; }
            .container { max-width: 500px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
            .header { background: linear-gradient(135deg, #ff9fb2, #ffcce0); padding: 35px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 28px; font-weight: bold; }
            .content { padding: 35px; }
            .icon { font-size: 60px; text-align: center; margin-bottom: 20px; }
            .message-box { background: #f8f9fa; border-left: 5px solid #ff9fb2; padding: 20px; margin: 25px 0; border-radius: 8px; }
            .message-box h4 { color: #ff9fb2; margin: 0 0 12px; font-size: 16px; }
            .message-box p { color: #444; margin: 0; font-style: italic; line-height: 1.6; font-size: 15px; }
            .footer { background: #34495e; color: white; padding: 20px; text-align: center; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💕 Ella seleccionó: "Te extraño jsjs"</h1>
            </div>
            <div class="content">
              <div class="icon">💌</div>
              
              <p style="text-align: center; color: #666; margin-bottom: 20px;">Tu detalle le llegó y ella respondió</p>
              
              <div class="message-box">
                <h4>Lo que ella te escribió:</h4>
                <p>"${mensaje || 'No escribió mensaje adicional'}"</p>
              </div>
            </div>
            <div class="footer">
              📧 ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: '"Notificación 💕" <' + process.env.EMAIL_USER + '>',
        to: TU_EMAIL,
        subject: '💌 Ella respondió "Te extraño jsjs" - Mira su mensaje',
        html: emailDecline
      });

      // SMS para ti
      await twilioClient.messages.create({
        body: '💕 Ella recibió tu detalle y respondió: "Te extraño jsjs". Algo especial se acerca para ella. Revisa tu email 📧✨',
        messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
        to: TU_NUMERO
      });

      // SMS PARA MABEL (DECLINE)
      await twilioClient.messages.create({
        body: '💝 Mi amor, te he enviado algo especial. Revisa tu correo electrónico cuando puedas, hay un mensaje hecho con todo mi corazón para ti 💕✨',
        messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
        to: NUMERO_MABEL
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
