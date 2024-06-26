import type { NextApiRequest, NextApiResponse } from 'next';
import transporter from '@/utils/nodemailer.config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, phoneNumber, shopList, comment, totalAmount, message } = req.body;

    try {
      const info = await transporter.sendMail({
        from: 'lesha1zmailov@yandex.ru',
        to: 'lesha1zmailov@yandex.ru',
        subject: 'Новое сообщение!',
        html: `<p>Email: ${email}</p><p>Phone Number: ${phoneNumber}</p><p>Message: ${shopList}</p><p>Mesage: ${message}<p>Comment: ${comment} </p><p>Total Amount: ${totalAmount}</p>`,
      });

      if (info.accepted.length > 0) {
        res.status(200).json({ success: true, message: 'Успешно' });
      } else {
        res.status(200).json({ success: true, message: 'Успешно отправлено, но не доставлено' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Провал' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
