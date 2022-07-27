import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <div>
      <div>{`Home, ${t('title')}`}</div>
      <div>
        <a href='/?lng=zh'>View zh-lang</a>
        <br />
        <a href='/?lng=en'>View en-lang</a>
      </div>
    </div>
  );
}
