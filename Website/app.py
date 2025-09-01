from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app)  # allow cross-origin (frontend ↔ backend)

# Gmail SMTP settings
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SENDER_EMAIL = "mann23shah@gmail.com"        # replace with your Gmail
APP_PASSWORD = "frwc zpoh cbmr pkvf"          # replace with Gmail app password
RECEIVER_EMAIL = "mannshah23itims@gmail.com"       # replace with where you want mails

@app.route("/send-message", methods=["POST"])
def send_message():
    try:
        data = request.json
        fname = data.get("fname")
        lname = data.get("lname")
        email = data.get("email")
        phone = data.get("phone")
        purpose = data.get("purpose")

        # Email content
        subject = f"New Contact Form Submission from {fname} {lname}"
        body = f"""
        You got a new message from your portfolio site:

        Name: {fname} {lname}
        Email: {email}
        Phone: {phone}

        Message:
        {purpose}
        """

        # Send mail
        msg = MIMEText(body)
        msg["Subject"] = subject
        msg["From"] = SENDER_EMAIL
        msg["To"] = RECEIVER_EMAIL

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SENDER_EMAIL, APP_PASSWORD)
        server.sendmail(SENDER_EMAIL, RECEIVER_EMAIL, msg.as_string())
        server.quit()

        return jsonify({"success": True, "message": "Email sent successfully!"}), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)