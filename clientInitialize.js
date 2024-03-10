const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

async function startClient(clientId) {
  try {
    const client = new Client({
      clientId,
      puppeteer: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
        ],
      },
      authStrategy: new LocalAuth({
        clientId: clientId,
        // dataPath: ` .wwebjs_auth/session./${clientId}-session`
      }),
    });

    client.on('qr', (qr) => {
      console.log(clientId);
      qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
      console.log('READY');
    });

    client.on('message', msg => {
      if (msg.body == 'מה') {
        msg.reply('מותה');
      }
    });

    await client.initialize();
    return client;
  } catch (error) {
    console.error('Error initializing client:', error);
    throw error;
  }
}

module.exports = { startClient };
