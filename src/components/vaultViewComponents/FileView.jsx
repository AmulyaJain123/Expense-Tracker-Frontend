import { useState } from "react";
import styled from "styled-components";
import Preview from "./Preview";

const Button = styled.button`
  background-color: ${(props) =>
    props.$status === "true" ? "#9d4edd" : "#e7e5e4"};
  border: ${(props) =>
    props.$status === "true" ? "solid 1.5px #9d4edd" : "solid 1.5px #a8a29e"};
  color: ${(props) => (props.$status === "true" ? "white" : "#57534e")};

  &:hover {
    scale: ${(props) => (props.$status === "true" ? "100%" : "105%")};
  }
`;

export default function FileView({ data }) {
  const [currFile, setcurrFile] = useState(null);

  function clickThumb(file) {
    setcurrFile(file);
  }
  // min-h-[800px] flex flex-col w-full sm:max-w-[600px] md:w-[600px] xl:w-[500px] 2xl:w-[750px] pb-[100px]

  return (
    <div className="bg-white zigzag min-h-[700px] flex flex-col  w-[600px] ">
      <div className="bg-slate-100 m-[10px] rounded-md flex text-black justify-center items-center h-[40px] text-xl uppercase font-bold">
        Files
      </div>
      <div className="flex h-[15px]">
        <div className="bg-stone-200 h-[15px] w-[15px] rounded-r-full"></div>
        <div className="flex flex-col h-full flex-grow">
          <div className="h-[10px] w-full  border-b-[2.5px] border-dashed border-stone-200"></div>
          <div className=" w-full "></div>
        </div>
        <div className="bg-stone-200 h-[15px] w-[15px] rounded-l-full"></div>
      </div>
      <div className="flex mt-4 mx-3 items-center flex-wrap gap-y-2 gap-x-2 p-2">
        {data.files.map((file, index) => {
          return (
            <Button
              key={file.fakeName}
              disabled={currFile && file.fakeName === currFile.fakeName}
              $status={
                currFile && file.fakeName === currFile.fakeName
                  ? "true"
                  : "false"
              }
              onClick={() => clickThumb(file)}
              className="p-1 px-2 sm:text-xs rounded-md duration-500"
            >
              {"File " + file.fakeName.at(-1)}
            </Button>
          );
        })}
      </div>
      <div className="flex  justify-center">
        {currFile != null ? (
          <a
            className="text-base sm:text-sm p-1 h-fit mt-[20px] hover:scale-110 hover:shadow-xl mx-auto px-2 m-4 rounded-md bg-black text-white duration-500 hover:bg-white hover:text-black border-[1.5px] border-black"
            href={currFile.uploadUrl}
            target="_blank"
            download={currFile.metaData.name}
          >
            Download
          </a>
        ) : null}
      </div>
      <div className=" overflow-auto px-10 mx-2 customScroll">
        <Preview file={currFile} />
      </div>
    </div>
  );
}
