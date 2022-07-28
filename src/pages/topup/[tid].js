import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
// import { useRouter } from 'next/router';
import * as imageConversion from 'image-conversion';
import { Layout, Typography } from '../../components';
import { paymentDiamonds } from '../../constants/mock';
import { asCaption } from '../../utilities/format';
import { MainLayout } from '../../layout';

const SectionPart = ({ children, index, title }) => (
  <Layout.Section className='pt-5'>
    <div className='w-full bg-main-2 p-5 rounded-lg relative'>
      <div className='absolute -top-5 right-5 rounded-full bg-white w-14 h-14 border-8 border-main-2 flex justify-center items-center pb-1'>
        <Typography.Title level={2} className='text-main-2'>
          {index}
        </Typography.Title>
      </div>
      <Typography.Title level={2}>{title}</Typography.Title>
      {children}
    </div>
  </Layout.Section>
);

export default function Tid({ title }) {
  // const router = useRouter();

  const [dataSource] = useState(paymentDiamonds);
  const [selectOption, setSelectOption] = useState(paymentDiamonds[0]);
  const [loading, setLoading] = useState({
    main: false,
    file: false,
  });
  const resetData = {
    uid: '',
    zoneId: '',
    selectOption,
    tel: '',
    file: null,
    filename: '',
    fileType: '',
  };
  const [inputData, setInputData] = useState(resetData);

  const onHandleChange = (e) => {
    setInputData((el) => ({
      ...el,
      [e.target.id]: e.target.value,
    }));
  };

  const onHandleChangeFile = async (e) => {
    const { files } = e.target;
    // eslint-disable-next-line no-console
    console.log(files);
    setLoading((el) => ({
      ...el,
      main: true,
    }));
    const newFile = await imageConversion.compressAccurately(files[0], {
      size: 150,
      accuracy: 0.9,
      scale: 0.5,
    });
    const reader = new FileReader();
    await reader.readAsDataURL(newFile);
    reader.onload = async () => {
      setInputData((el) => ({
        ...el,
        filename: files[0].name,
        fileType: files[0].type,
        file: reader.result,
      }));
      setLoading((el) => ({
        ...el,
        main: false,
      }));
    };
  };

  const dataValidation = (data) => {
    let error = false;
    if (data.uid.trim() === '') {
      error = true;
    }
    if (data.zoneId.trim() === '') {
      error = true;
    }
    if (data.tel.trim() === '') {
      error = true;
    }
    if (data.file === null) {
      error = true;
    } else {
      error = false;
    }
    return error;
  };

  const onHandleClick = async () => {
    const error = dataValidation(inputData);

    const caption = asCaption(
      inputData.uid,
      inputData.zoneId,
      inputData.tel,
      inputData.selectOption
    );

    if (error) {
      // eslint-disable-next-line no-alert
      alert('Please fill input!');
    } else {
      setLoading((el) => ({
        ...el,
        main: true,
      }));

      const res = await axios({
        method: 'POST',
        url: '/api/telegram/send/sendMessage',
        data: {
          filename: inputData.filename,
          fileType: inputData.fileType,
          file: inputData.file,
          caption,
        },
      });

      if (res.data.status === 'ok') {
        // router.reload();
        setLoading((el) => ({
          ...el,
          main: false,
        }));
      }
    }
  };

  return (
    <MainLayout loading={loading.main}>
      {/* <Layout.Container level={2}>
        <Topup.TopBanner />
      </Layout.Container> */}
      <Layout.Container>
        <Layout.Section>
          <div className='p-2 border-b-[1px] border-white'>
            <Typography.Title level={1}>{`${title} Top up`}</Typography.Title>
          </div>
        </Layout.Section>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-4'>
            <SectionPart index='1' title='Enter User ID'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
                <input
                  id='uid'
                  type='number'
                  placeholder='Enter User ID'
                  className='text-xl px-5 py-2 text-black rounded-md'
                  value={inputData.uid}
                  onChange={(e) => {
                    if (
                      parseInt(e.target.value, 10) < 0 ||
                      parseInt(e.target.value, 10) > 99999999
                    ) {
                      return false;
                    }
                    return onHandleChange(e);
                  }}
                />
                <input
                  id='zoneId'
                  type='number'
                  placeholder='Zone ID'
                  className='text-xl px-5 py-2 text-black rounded-md'
                  size='20'
                  maxLength='4'
                  value={inputData.zoneId}
                  onChange={(e) => {
                    if (parseInt(e.target.value, 10) < 0 || parseInt(e.target.value, 10) > 9999) {
                      return false;
                    }
                    return onHandleChange(e);
                  }}
                />
              </div>
            </SectionPart>
            <SectionPart index='2' title='Choose payment'>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-2'>
                {dataSource.map((load, idx) => (
                  <button
                    key={load.id}
                    type='button'
                    onClick={() => setSelectOption(load)}
                    className={`p-2 rounded-lg border-4 ${
                      load.id === selectOption.id ? 'bg-gray-400' : 'bg-white'
                    }`}
                  >
                    <div>
                      <Image src={load.image} alt={`diamond-${idx}`} height={50} width={50} />
                    </div>
                    <Typography.Text className='text-black text-xs md:text-md font-bold'>
                      {load.title === ''
                        ? `${load.qty} Diamonds + ${load.offer} Bonus`
                        : `${load.title}`}
                      <br />
                      {`${load.price.toFixed(2)}$`}
                    </Typography.Text>
                  </button>
                ))}
              </div>
            </SectionPart>
          </div>

          {/* Right Panel */}

          <div className='space-y-4'>
            <SectionPart index='3' title=''>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div>
                  <Typography.Title level={2}>Telephone</Typography.Title>
                  <input
                    id='tel'
                    type='tel'
                    placeholder='Phone number'
                    className='text-xl px-5 py-2 text-black rounded-md mt-2 w-full'
                    value={inputData.tel}
                    onChange={onHandleChange}
                  />
                </div>
                <div>
                  <Typography.Title level={2}>Upload Receipt</Typography.Title>
                  <input
                    type='file'
                    onChange={onHandleChangeFile}
                    className='text-sm mt-3 text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium  file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700'
                  />
                </div>
              </div>
              <div className='mt-5'>
                <Typography.Text className='underline italic font-bold'>Noted:</Typography.Text>
                <ul>
                  <li className='flex space-x-4'>
                    <p>Account Nº:</p>
                    <p>0001515</p>
                  </li>
                  <li className='flex space-x-4'>
                    <p>Account Name:</p>
                    <p>ABC123</p>
                  </li>
                </ul>
              </div>
            </SectionPart>
            <SectionPart index='4' title=''>
              <button
                type='button'
                className='w-full pt-3 pb-4 bg-white text-main-2 font-bold text-2xl rounded-lg mt-2'
                onClick={onHandleClick}
              >
                Submit
              </button>
            </SectionPart>
          </div>
        </div>
      </Layout.Container>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { tid } = context.query;
  return {
    props: {
      tid,
      title: 'Mobile Legend',
    }, // will be passed to the page component as props
  };
}
