function emailTemplate(reservation, reviewLink) {
	return `
		<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Leave a Review</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f5f5; padding:20px 0;">
    <tr>
      <td align="center">

        <!-- Container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#111827; padding:20px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px;">🍽 Restaurant</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:30px; text-align:center;">
              <h2 style="margin:0 0 10px; color:#111827;">
                Hello ${reservation.fullName}
              </h2>

              <p style="margin:0 0 20px; color:#4b5563; font-size:16px;">
                Thank you so much for visiting us! Your feedback means a lot and helps us improve our service.
              </p>

              <!-- Button -->
              <a href="${reviewLink}" 
                 style="display:inline-block; padding:12px 24px; background-color:#f59e0b; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:bold;">
                ⭐ Leave a Review
              </a>

              <p style="margin-top:20px; color:#9ca3af; font-size:13px;">
                If the button doesn’t work, please use the link below:
              </p>

              <p style="word-break:break-all; font-size:12px; color:#6b7280;">
                ${reviewLink}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb; padding:20px; text-align:center;">
              <p style="margin:0; font-size:12px; color:#9ca3af;">
                © 2026 Restaurant. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
	`
}

export default emailTemplate
