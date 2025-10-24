export async function POST(req) {
  try {
    console.log('📨 Received contact form submission');
    
    const data = await req.json();
    const { name, email, message } = data;

    console.log('Form data:', { name, email, messageLength: message?.length });

    // Validate input
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ 
          status: 'error', 
          message: 'All fields are required' 
        }), 
        { status: 400 }
      );
    }

    const webhookURL = process.env.DISCORD_WEBHOOK;
    if (!webhookURL) {
      console.error('❌ DISCORD_WEBHOOK is not defined in .env.local');
      throw new Error('DISCORD_WEBHOOK is not configured');
    }

    console.log('🔗 Webhook URL configured');

    const embed = {
      title: '📬 New Contact Form Submission',
      color: 5814783, // cyan color
      fields: [
        { name: '👤 Name', value: name, inline: false },
        { name: '📧 Email', value: email, inline: false },
        { name: '💬 Message', value: message, inline: false },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Contact Form'
      }
    };

    console.log('📤 Sending to Discord...');

    const res = await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });

    console.log('Discord response status:', res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Discord webhook error:', errorText);
      throw new Error(`Webhook request failed with status ${res.status}: ${errorText}`);
    }

    console.log('✅ Message sent successfully');

    return new Response(
      JSON.stringify({ status: 'ok', message: 'Message sent successfully' }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err) {
    console.error('❌ Error sending webhook:', err);
    console.error('Error details:', err.message);
    
    return new Response(
      JSON.stringify({ 
        status: 'error', 
        message: 'Failed to send message',
        details: err.message 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}