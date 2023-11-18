const nodemailer = require('nodemailer');
const user = require('../Modal/userModal');
const crypto = require('crypto');
const bcrypt = require("bcrypt");

function generateAuthCode() {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString();
}
async function sendAuthCode(req, res) {
    try {
        const { email } = req.body;
        const code = generateAuthCode();

        const updateResult = await user.updateOne({ email: email }, { code: code });
        const userDocument = await user.findOne({ email: email });
        if (updateResult.modifiedCount === 1 && userDocument) {
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                //   auth: {
                //     user: 'nguyenvietnc99@gmail.com',
                //     pass: 'yqsbcrwwdvvtôijrrtôi'
                //   }
                auth: {
                    user: 'mon01092003@gmail.com',
                    pass: 'lhrbzxysxpbmqxob'
                }
            });
            const date = new Date()
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            const formattedDate = `${day}/${month}/${year}`;

            const mailOptions = {
                from: 'mon01092003@gmail.com',
                to: email,
                subject: 'Mã xác thực',
                html: `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta http-equiv="X-UA-Compatible" content="ie=edge" />
              <title>Static Template</title>
          
              <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
                rel="stylesheet"
              />
            </head>
            <body
              style="
                margin: 0;
                font-family: 'Poppins', sans-serif;
                background: #ffffff;
                font-size: 14px;
              "
            >
              <div
                style="
                  max-width: 680px;
                  margin: 0 auto;
                  padding: 45px 30px 60px;
                  background: #f4f7ff;
                  background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
                  background-repeat: no-repeat;
                  background-size: 800px 452px;
                  background-position: top center;
                  font-size: 14px;
                  color: #434343;
                "
              >
                <header>
                  <table style="width: 100%;">
                    <tbody>
                      <tr style="height: 0;">
                        <td>
                          <img
                            alt=""
                            src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1663574980688_114990/archisketch-logo"
                            height="30px"
                          />
                        </td>
                        <td style="text-align: right;">
                          <span
                            style="font-size: 16px; line-height: 30px; color: #ffffff;"
                            >${formattedDate}</span
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </header>
          
                <main>
                  <div
                    style="
                      margin: 0;
                      margin-top: 70px;
                      padding: 92px 30px 115px;
                      background: #ffffff;
                      border-radius: 30px;
                      text-align: center;
                    "
                  >
                    <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                      <h1
                        style="
                          margin: 0;
                          font-size: 24px;
                          font-weight: 500;
                          color: #1f1f1f;
                        "
                      >
                        MÃ OTP
                      </h1>
                      <p
                        style="
                          margin: 0;
                          margin-top: 17px;
                          font-size: 16px;
                          font-weight: 500;
                        "
                      >
                        Chào Bạn,
                      </p>
                      <p
                        style="
                          margin: 0;
                          margin-top: 17px;
                          font-weight: 500;
                          letter-spacing: 0.56px;
                        "
                      >
                        Bạn đang thực hiện yêu cầu cấp lại mật khẩu từ email cho user 
                        <span style="font-weight: 600; color: red;">${userDocument.username}</span>, vui lòng không cung cấp mã otp cho bất cứ ai
                           <p> Mã của bạn là :</p>
                      </p>
                      <p
                        style="
                          margin: 0;
                          margin-top: 60px;
                          font-size: 40px;
                          font-weight: 600;
                          letter-spacing: 25px;
                          color: #ba3d4f;
                        "
                      >
                        ${code}
                      </p>
                    </div>
                  </div>
                </main>
              </div>
            </body>
          </html>
          `
            };

            const sendMailResult = await transporter.sendMail(mailOptions);

            if (sendMailResult.accepted.length > 0) {
                res.status(200).json(`Email sent: ${code}`);
            } else {
                throw new Error('Failed to send email');
            }
        } else {
            let message = updateResult.modifiedCount === 1 ? 'Email không chính xác' : 'Email không tồn tại';
            res.status(401).json(message);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json('Internal Server Error');
    }
}


async function changePassword(req, res) {
    const { username, code, newPassword } = req.body;
  
    try {
      const userPassword = await user.findOne({ $or: [{ username: username }, { email: username }], code: code });
        if (user) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        userPassword.password = hashedPassword;
        userPassword.code = null; 
        await userPassword.save();
        res.status(200).json({ message: 'Đổi mật khẩu thành công' });
      } else {
        res.status(401).json({ error: 'Thông tin người dùng hoặc mã code không chính xác' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi truy vấn cơ sở dữ liệu' });
    }
  }

  async function updateUser(req, res) {
    try {
        const existingUsername = await user.findOne({ username: req.body.username });

        if (existingUsername) {
            return res.status(200).json({ message: "Username đã tồn tại" });
        }

        const updatedUserData = {
            username: req.body.username,
            phone: req.body.phone,
        };

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            updatedUserData.password = hashedPassword;
        }

        if (req.file) {
            updatedUserData.image = req.file.path;
        }

        const updatedUser = await user.findOneAndUpdate(
            { _id: req.user.userId },
            updatedUserData,
            { new: true }
        );

        if (!updatedUser) {
            console.error(`User not found with ID: ${req.user.userId}`);
            return res.status(404).json({ message: "User not found" });
        }

        const data = await user.findOne({ _id: req.user.userId });
        res.status(200).json({ message: "Cập nhật thông tin người dùng thành công", data: data });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Lỗi khi cập nhật thông tin người dùng' });
    }
}





module.exports = { sendAuthCode, changePassword ,updateUser};
