export default function ErrorElement({ error }) {
  return (
    <>
      {error != null ? (
        <div className="min-h-[30px] my-2 py-1 flex text-sm items-center px-3 rounded-sm mx-4 bg-red-200 text-black font-medium">
          <i className="fi fi-rs-exclamation mr-4 text-lg flex justify-center items-center"></i>
          <span className="pt-[0.5px]">{error}</span>
        </div>
      ) : (
        <div className="h-[30px] my-2 flex items-center px-3 rounded-sm mx-4 text-black font-medium"></div>
      )}
    </>
  );
}
