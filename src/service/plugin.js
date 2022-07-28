/* eslint-disable new-cap */
import Stream from 'stream';
import { uuid } from 'uuidv4';
import { storage } from './firebase';

const timeFields = ['createdAt', 'updatedAt', 'deletedAt', 'banDuration'];
export const convertTimeOf = (obj) => {
  const data = obj;
  timeFields.forEach((k) => {
    // TODO: dirty way to handle like this, should use _.get etc
    if (Array.isArray(k) && data[k[0]]?.[k[1]]?.toDate) {
      data[k[0]][k[1]] = data[k[0]][k[1]].toDate().getTime();
    } else if (k in data && data[k]?.toDate) {
      data[k] = data[k].toDate().getTime();
    }
  });
  return data;
};

export const toList = (snapshot) =>
  snapshot.docs.map((d) => convertTimeOf({ id: d.id, ...d.data() }));

export const uploadFile = async (file, fileName, fileType, filePath) => {
  const uuidv4 = uuid();
  const bufferStream = new Stream.PassThrough();
  const base64EncodedImageString = file.split(',')[1];
  bufferStream.end(new Buffer.from(base64EncodedImageString, 'base64'));

  const files = storage.file(`${filePath}/${fileName}`);
  await bufferStream
    .pipe(
      files.createWriteStream({
        metadata: {
          contentType: fileType,
          metadata: {
            firebaseStorageDownloadTokens: uuidv4,
          },
        },
        public: false,
        validation: 'md5',
      })
    )
    .on('error', function onError(err) {
      return err.message;
    })
    .on('finish', function onFinish() {
      return 'Feeds Added Successfully';
    });

  // return `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${encodeURIComponent(
  //   `${filePath}/${fileName}`
  // )}?alt=media&token=${uuidv4}`;

  return files
    .getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    })
    .then((signedUrls) => signedUrls[0]);
};
