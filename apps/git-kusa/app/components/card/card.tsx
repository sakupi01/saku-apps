export const Card = ({
  title,
  statNumber,
  details,
}: {
  title: string;
  statNumber: string;
  details?: string;
}) => {
  return (
    <div className="group block max-w-sm p-6 bg-primary-background text-primary-background-text border border-gray-200 rounded-lg hover:bg-primary-active hover:text-primary-active-text transition-all duration-300 ">
      <h5 className="mb-2 text-2xl font-bold tracking-tight whitespace-pre-wrap ">
        {`${title}`}{" "}
        <span className="text-primary group-hover:drop-shadow-[0_1px_rgba(0,0,0,0.3)]">
          {statNumber}
        </span>
      </h5>
      <p className="font-normal opacity-40 whitespace-pre-wrap">
        {`${details}`}
      </p>
    </div>
  );
};
