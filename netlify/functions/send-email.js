exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  let payload
  try {
    payload = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' }
  }

  const { email, name, subject, htmlContent } = payload
  if (!email || !name || !htmlContent) {
    return { statusCode: 400, body: 'Missing required fields' }
  }

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    return { statusCode: 500, body: 'Email service not configured' }
  }

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Desert Bloom Mobile Car Detailing', email: 'arizonamobilecardetailing@gmail.com' },
      to: [{ email, name }],
      subject: subject || 'Your Booking is Confirmed - Desert Bloom Mobile Car Detailing',
      htmlContent,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return { statusCode: 502, body: `Brevo error: ${err}` }
  }

  return { statusCode: 200, body: 'OK' }
}
