export default function ErrorElement({ error }) {
  return (
    <>
      {error != null ? (
        <div className="min-h-[20px] my-[6px] py-1 flex text-[11px] items-center px-3 rounded-sm mx-3 bg-red-200 text-black font-medium">
          <i className="fi fi-rs-exclamation mr-3 text-sm flex justify-center items-center"></i>
          <span className="pt-[0.5px]">{error}</span>
        </div>
      ) : (
        <div className="h-[25px] my-[6px] flex items-center px-3 rounded-sm mx-3 text-black font-medium"></div>
      )}
    </>
  );
}
