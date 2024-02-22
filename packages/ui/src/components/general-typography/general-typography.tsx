export const Typography = () => {
  return (
    <div className="flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 gap-14">
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-8">
        <p className="large">large</p>
        <p className="large">Are you sure absolutely sure?</p>
      </div>

      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-8">
        <p className="small">small</p>
        <p className="small">Email address</p>
      </div>

      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-8">
        <p className="subtle">subtle</p>
        <p className="subtle">Enter your email address.</p>
      </div>

      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-8">
        <p className="tag">tag</p>
        <span className="tag">Link</span>
        <span className="tag">Link</span>
        <span className="tag">Link</span>
      </div>
    </div>
  );
};
