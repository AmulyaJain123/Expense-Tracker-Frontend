import styles from "./TagView.module.css";

export default function TagView({ data }) {
  return (
    <>
      <div className={`zigzag ${styles.main} pt-1 mx-auto`}>
        <div className="bg-slate-100 m-[10px] rounded-md flex text-black justify-center items-center uppercase font-bold">
          Tags Applied
        </div>

        <div className="flex h-[15px]">
          <div className="bg-stone-200 h-[15px] w-[15px] rounded-r-full"></div>
          <div className="flex flex-col h-full flex-grow">
            <div className="h-[10px] w-full  border-b-[2.5px] border-dashed border-stone-200"></div>
            <div className=" w-full "></div>
          </div>
          <div className="bg-stone-200 h-[15px] w-[15px] rounded-l-full"></div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 mx-6">
          {data.length === 0 ? (
            <p className="text-xs mx-auto">No Tags Applied</p>
          ) : (
            data.map((i) => {
              return (
                <div className="py-1 px-3 capitalize text-black text-sm rounded-lg font-medium bg-[#dc93f6]">
                  {i}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
