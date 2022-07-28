import { Telegrams } from '../../../../model';
import { uploadFile } from '../../../../service/plugin';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '14mb',
    },
  },
};

export default async (req, res) => {
  try {
    const { file, caption, filename, fileType } = req.body;

    const getAdmin = await Telegrams.getAdminFromDb();

    getAdmin.map(async (load) => {
      if (file !== '') {
        const imgUrl = await uploadFile(file, filename, fileType, 'telegram');
        await Telegrams.sendImageWithText(load.id, imgUrl, caption);
      }
    });

    res.status(200).json({ status: 'ok', payload: req.body });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
