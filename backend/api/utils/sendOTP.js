const {TWILIO, TWILIO_AUTH} = require('../../config/loadConfig');

const accountSid = TWILIO;
const authToken = TWILIO_AUTH;
const client = require('twilio')(accountSid, authToken);

module.exports = async (otp, phone) => {
    try {
        const message = client.messages.create({
            body:  `OTP to login to your account is ${otp}`,
            from: '+14439125480',
            to: `+91${phone}`
        });
        await message;
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}