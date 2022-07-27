import { Telegrams } from '../../../../model';
import { uploadFile } from '../../../../service/plugin';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
  },
};

export default async (req, res) => {
  try {
    const { file, caption, filename, fileType } = req.body;

    // const chatId = '948817302'; // 948817302, 660375103

    const getAdmin = await Telegrams.getAdminFromDb();

    console.log(getAdmin)

    getAdmin.map(async (load) => {
      if (file) {
        const imgUrl = await uploadFile(file, filename, fileType, 'telegram');
        await Telegrams.sendImageWithText(load.id, imgUrl);
      }

      if (caption) {
        await Telegrams.sendMessage(load.id, caption);
      }
    });

    res.status(200).json({ status: 'ok', payload: req.body });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
