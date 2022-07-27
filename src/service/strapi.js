import { BsCheckCircleFill, BsFillRecordFill, BsFillXCircleFill } from 'react-icons/bs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getCMSDomain } from '../utilities/dev';

const convertObjectToString = (obj) => {
  let newString = `?sites.domain=${process.env.NEXT_PUBLIC_API_URL || '/'}`; // ?sites.domain=${process.env.NEXT_PUBLIC_API_URL}
  const keys = Object.keys(obj);
  if (keys.length > 0) {
    keys.map((key) => {
      newString += `&${key}=${obj[key]}`;
      return null;
    });
  }

  return newString;
};

export const fetchDataByGet = (url, params = {}) => {
  const newParams = convertObjectToString(params);

  return `${getCMSDomain()}${url}${newParams}`;
};

export const fetchImage = (url) => {
  return `${getCMSDomain()}${url}`;
};

export const requestInit = (body, method = 'POST') => {
  return {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'fr-FR,fr;q=0.9,en;q=0.8',
      'content-type': 'application/json;charset=UTF-8',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    method,
    body: JSON.stringify(body),
    mode: 'cors',
  };
};

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const RichTextMarkdown = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
        ul: ({ node, ...props }) => {
          return (
            <ul>
              {props.children.map((load, idx) => {
                if (idx % 2 === 1) {
                  const checkTrue = load.props.children[0].includes('(true)');
                  const checkFalse = load.props.children[0].includes('(false)');
                  if (checkTrue && !checkFalse) {
                    return (
                      <li>
                        <span className='pl-2 flex items-start'>
                          <span className='w-[30px]'>
                            <BsCheckCircleFill className='text-green-600 mt-1' />
                          </span>
                          <span className='w-full'>
                            {load.props.children[0].replace('(true)', '')}
                          </span>
                        </span>
                      </li>
                    );
                  }
                  if (!checkTrue && checkFalse) {
                    return (
                      <li>
                        <span className='pl-2 flex items-start'>
                          <span className='w-[30px]'>
                            <BsFillXCircleFill className='text-red-600 mt-1' />
                          </span>
                          <span className='w-full'>
                            {load.props.children[0].replace('(true)', '')}
                          </span>
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li>
                      <span className='pl-2 flex items-start'>
                        <span className='w-[30px]'>
                          <BsFillRecordFill className='text-white mt-1' />
                        </span>
                        <span className='w-full'>
                          {load.props.children[0].replace('(true)', '')}
                        </span>
                      </span>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          );
        },
        a: ({ node, ...props }) => {
          return <a href={props.href}>{props.children}</a>;
        },
        img: ({ node, ...props }) => {
          return <img src={`${getCMSDomain()}${props.src}`} alt={props.alt} />;
        },
        blockquote: ({ node, ...props }) => {
          const subContent = props.children[1].props.children;
          return (
            <span className='w-full flex justify-center space-x-4 pb-5'>
              {subContent.map((load) => (
                <a className='button' href={load.props.href}>
                  {load.props.children[0]}
                </a>
              ))}
            </span>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
