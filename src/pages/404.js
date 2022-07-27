function NotFound() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div>
        <h1 className='text-3xl font-bold mb-5'>404</h1>
        <p>Sorry, the page you visited does not exist.</p>
        <a href='/' className='underline'>
          Back to home page
        </a>
      </div>
    </div>
  );
}

export default NotFound;
