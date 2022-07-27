// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Telegrams } from '../../model';

export default async (req, res) => {
  await Telegrams.sendImageWithText(
    '660375103',
    `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png`,
    'test'
  );
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
};
