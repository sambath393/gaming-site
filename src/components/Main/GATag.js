const GATag = () => {
  const GAId = process.env.NEXT_PUBLIC_GA_ID;

  const GACode = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${GAId}');
  `;
  return (
    <>
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GAId}`} />
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: GACode }}
      />
    </>
  );
};

export default GATag;
