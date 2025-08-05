import "dotenv/config";
import express from "express";
import sgMail from "@sendgrid/mail"; 
import cors from "cors";
import cron from "node-cron";

const app = express();
app.use(express.json()); // Parse JSON request body
app.use(cors())

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


app.post("/send-batch", async (req, res) => {
  // Recipients list with their names
  const recipients = [
    { email: "jason.le@institutedata.com", name: "Jason" },
    { email: "jobrbr7@gmail.com", name: "Joel" },
    { email: "Valeriet.design@gmail.com", name: "Valerie" }
  ];

  try {
    for (const recipient of recipients) {
      const msg = {
        to: recipient.email,
        from: process.env.FROM_EMAIL,
        templateId: process.env.WELCOME_TEMPLATE_ID,
        dynamicTemplateData: {
          name: recipient.name,
          email: recipient.email
        }
      };

      await sgMail.send(msg);
      console.log(`Sent email to ${recipient.email}`);
    }

    res.json({ success: true, message: "Batch emails sent successfully!" });
  } catch (error) {
    console.error("Error sending batch:", error);
    if (error.response) {
      console.error(error.response.body);
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

cron.schedule("*/1 * * * *", () => { // Cron job or job scheduler
  console.log("Scheduled job triggered: Sending emails...");
  sendBatchEmails();
});


app.post("/register", async (req, res) => {
  const { name, email} = req.body;

  try {
    const msg = {
      to: email,
      from: process.env.FROM_EMAIL,
      templateId: process.env.WELCOME_TEMPLATE_ID,
      dynamicTemplateData: {
        name: name,
        email: email
      }
    };

    await sgMail.send(msg);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    if (error.response) {
      console.error(error.response.body);
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});