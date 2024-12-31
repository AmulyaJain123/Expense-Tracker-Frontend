export default function ({ name, date, bgPattern }) {
  const str =
    "text-black border-2 shadow-2xl  border-stone-600 flex flex-col space-y-4 text-xl font-semibold justify-center items-center rounded-xl w-[200px] h-[200px] scale-75 " +
    bgPattern;
  return (
    <div className={str}>
      <span className="rounded-full px-2 bg-white">{name}</span>
      <span className="text-lg font-medium rounded-full px-2 bg-white">
        {date}
      </span>
    </div>
  );
}
