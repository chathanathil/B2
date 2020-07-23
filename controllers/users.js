const nodemailer = require("nodemailer");

// Load input validation
const validateEmailInput = require("../validation/email");

exports.sendMail = async (req, res) => {
  try {
    const { errors, isValid } = validateEmailInput(req.body);

    // Check validation
    if (!isValid) {
      throw errors;
    }

    const mailData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      description: req.body.description,
    };

    // Create reusable transporter object using the default SMTP tranport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.ethereal.email",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.MAIL_PSWD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Setup email data with unicode symbols
    let mailOptions = {
      from: `${mailData.name}<${mailData.email}>`,
      to: process.env.EMAIL,
      subject: "Service",
      text: "",
      html: `<h4>Name: ${mailData.name}</h4><h4>Email: ${mailData.email} </h4> <h4> Phone: ${mailData.phone}</h4> <h4>Description:</h4><p>${mailData.description}</p>`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw error;
      }
      return res
        .status(200)
        .json({ success: true, message: "Mail sent successfully" });
    });
  } catch (err) {
    res.status(500).json({ success: false, err: err });
  }
};
