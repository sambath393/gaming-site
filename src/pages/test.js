import axios from 'axios';
import { asCaption } from '../utilities/format';

export default function Home() {
  const gameId = '12312312312';
  const gameServer = '2322';
  const typeSelect = '250 / 3$';

  const onHandleChange = async (e) => {
    const { files } = e.target;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = async (event) => {
      await axios({
        method: 'POST',
        url: '/api/telegram/send/sendMessage',
        data: {
          filename: files[0].name,
          fileType: files[0].type,
          file: event.target.result,
          caption: asCaption(gameId, gameServer, typeSelect),
        },
      });
    };
  };

  const onGetData = async () => {
    await axios({
      method: 'POST',
      url: '/api/telegram/get/updates',
    });
  };

  return (
    <div>
      <input type='file' onChange={(e) => onHandleChange(e)} />
      <button type='button' onClick={onGetData}>
        Test
      </button>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
