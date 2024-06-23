import type { NextApiRequest, NextApiResponse } from 'next';
import transporter from '@/utils/nodemailer.config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, phoneNumber, shopList, comment, totalAmount } = req.body;

    try {
      const info = await transporter.sendMail({
        from: 'lesha1zmailov@yandex.ru',
        to: 'lesha1zmailov@yandex.ru',
        subject: 'Новое сообщение!',
        html: `<p>Email: ${email}</p><p>Phone Number: ${phoneNumber}</p><p>Message: ${shopList}</p><p>Comment: ${comment} </p><p>Total Amount: ${totalAmount}</p>`,
      });

      if (info.accepted.length > 0) {
        res.status(200).json({ success: true, message: 'Email sent successfully.' });
      } else {
        res.status(200).json({ success: true, message: 'Email sent, but not delivered.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
