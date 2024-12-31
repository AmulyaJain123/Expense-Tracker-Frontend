import styles from "./TagView.module.css";

export default function TagView({ data }) {
  return (
    <>
      <div className={`zigzag ${styles.main} pt-1 mx-auto`}>
        <div className="bg-slate-100   m-4 rounded-lg flex text-black justify-center items-center uppercase font-bold">
          Tags Applied
        </div>

        <div className="flex h-[20px]">
          <div className="billCuts-stone h-[20px] w-[20px] rounded-r-full"></div>
          <div className="flex flex-col h-full flex-grow">
            <div className="h-1/2 w-full  border-b-[3px] border-dashed border-stone-200"></div>
            <div className="h-1/2 w-full  border-stone-300"></div>
          </div>
          <div className="billCuts-stone h-[20px] w-[20px] rounded-l-full"></div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 mx-8">
          {data.length === 0 ? (
            <p className="text-lg mx-auto">No Tags Applied</p>
          ) : (
            data.map((i) => {
              return (
                <div className="py-2 px-4 capitalize text-black text-lg rounded-xl font-medium bg-[#dc93f6]">
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
