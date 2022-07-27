import { Telegrams } from '../../../../model';

export default async (req, res) => {
  try {
    const newData = await Telegrams.addAdmin();
    res.status(200).json({ status: 'ok', payload: newData });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
