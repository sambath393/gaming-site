import { col } from '../service/firebase';
import { toList } from '../service/plugin';
import { getTelegramApi } from '../service/telegram';
import { getDifferenceByChatId, removeDuplicate } from '../utilities/filter';

const isSameUser = (a, b) => a.id === b.id;
const isSameChatId = (t, value) => t.id === value.id;

export class Telegrams {
  static getUpdates = async () => {
    const resData = await getTelegramApi('/getUpdates');
    return resData.data.result;
  };

  static getAdminFromDb = async () => {
    const userList = await col
      .collection('admin')
      .get()
      .then((doc) => toList(doc));

    return userList;
  };

  static addAdminDb = (user) => {
    return col.collection('admin').doc(`${user.id}`).set(user, { merge: true });
  };

  static addAdmin = async () => {
    const getUpdates = await this.getUpdates();
    let newData = [];
    getUpdates.map((load) => {
      if (load.message.text === '/start') {
        newData.push(load.message.chat);
      }
      return null;
    });

    newData = removeDuplicate(newData, isSameChatId);

    let userList = await this.getAdminFromDb();
    userList = getDifferenceByChatId(newData, userList, isSameUser);

    userList.map((load) => {
      return this.addAdminDb(load);
    });

    return getUpdates;
  };

  static sendMessage = async (chatId, text) => {
    await getTelegramApi('/sendMessage', {
      chat_id: `${chatId}`,
      text,
    });
  };

  static sendImageWithText = async (chatId, imgUrl, caption) => {
    await getTelegramApi('/sendPhoto', {
      chat_id: `${chatId}`,
      photo: imgUrl,
      caption,
    });
  };
}
