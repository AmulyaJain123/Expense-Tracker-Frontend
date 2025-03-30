import vault from "../assets/vault.webp";
import { Link } from "react-router-dom";
import styled from "styled-components";
import styles from "./VaultHome.module.css";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import docImg from "../assets/doc.png";
import warImg from "../assets/war.png";
import recImg from "../assets/rec.png";

const Span = styled.span`
  font-weight: 600;
  transition: all 200ms;
  padding: 0 1px;
`;

export default function VaultHome() {
  const userDetails = useSelector((state) => state.universal.userInfo);

  return (
    <>
      <Helmet>
        <title> VAULT Home | BILLBUD</title>
        <meta name="description" content="Friends" />
      </Helmet>
      <div className="h-full w-full bg-white overflow-auto pb-[150px] text-stone-700 rounded-l-xl rounded-r-xl lg:rounded-r-none">
        <div className="flex flex-col max-w-[1200px] mx-auto">
          <h2
            style={{ fontFamily: "Fredoka" }}
            className="flex justify-center  text-[35px] sm:text-[40px] xl:text-[40px] mt-8 p-3 font-bold capitalize "
          >
            VAULT
          </h2>
          <div className=" mt-8 flex flex-col space-y-[30px] sm:space-y-0 items-center sm:flex-row mx-[35px] sm:mx-[50px] md:mx-[100px] justify-center sm:space-x-[20px] 2xl:space-x-[80px]">
            <div className="flex text-xs sm:text-xs lg:text-sm xl:text-sm flex-col max-w-[900px] space-y-4  my-auto">
              <p className=" font-medium  text-center sm:text-start ">
                This is your personal digital archive for all your important
                Documents like Bills, Receipts, Invoices and Warranties. With{" "}
                <span className=" font-medium text-[#9d4edd]">VAULT</span>, you
                can effortlessly:
              </p>
              <ul className="flex flex-col sm:list-disc text-center sm:text-start mx-auto">
                <li className="list-item">ADD Document Details</li>

                <li className="list-item">
                  ADD Images and PDFs of your Documents
                </li>
                <li className="list-item">
                  ADD Tags for better identification and classification
                </li>
              </ul>
              <p className=" font-medium  text-center sm:text-start ">
                Whether it's for tracking expenses or keeping records for future
                reference,{" "}
                <span className=" font-medium text-[#9d4edd]">VAULT</span> can
                ensures that all your critical documents are{" "}
                <span className=" font-medium text-green-500">
                  securely stored
                </span>{" "}
                and{" "}
                <span className=" font-medium text-green-500">
                  easily accessible
                </span>{" "}
                .
              </p>
            </div>
            <img
              className="h-fit my-auto w-[200px]  tab:w-[250px] lap:w-[300px]"
              src={vault}
              alt=""
            />
          </div>
          <div id="menu" className="flex flex-col items-center">
            <div className="flex justify-center space-x-10 mt-[80px] sm:mt-[125px]">
              <Span className="text-sm border-b-[1.5px] sm:border-b-2 border-black">
                How to Use <span className=" ">VAULT</span>
              </Span>
            </div>
            <div id={`${styles.menuContent}`} className="max-w-[900px] mx-auto">
              <div className="mt-2 flex flex-col space-y-2">
                <div className=" ">
                  <div className="font-medium  pl-2 sm:w-1/3">
                    Create a New Receipt/Warranty{" "}
                  </div>
                  <div className="sm:w-2/3 flex  flex-col space-y-2">
                    <p>
                      Navigate to the ACTIONS section below on this page and
                      click on the{" "}
                      <span className=" font-medium text-[#9d4edd]">ADD</span>{" "}
                      to create a new Receipt/Warranty/Doc.
                    </p>
                    <p>Use Doc for storing Regular Documents.</p>
                    <p>Fill in the required details.</p>
                  </div>
                </div>
                <div className=" ">
                  <div className="font-medium   pl-2 sm:w-1/3">
                    Upload Images/PDFs
                  </div>
                  <div className="sm:w-2/3 flex flex-col space-y-2">
                    <p>
                      You can upload up to four Images/PDFs of your document to
                      keep a visual record of your documents.
                    </p>
                  </div>
                </div>
                <div className=" ">
                  <div className="font-medium   pl-2 sm:w-1/3">Add Tags</div>
                  <div className="sm:w-2/3 flex flex-col space-y-2">
                    <p>
                      You can add Tags to your document that might be helpful in
                      searching and sorting them later.
                    </p>
                  </div>
                </div>
                <div className=" ">
                  <div className="font-medium   pl-2 sm:w-1/3">
                    Save Your Document
                  </div>
                  <div className="sm:w-2/3 flex flex-col space-y-2">
                    <p>
                      After entering all the necessary details and uploading
                      files, click{" "}
                      <span className=" font-medium text-[#9d4edd]">SAVE</span>{" "}
                      to store your document in the VAULT.
                    </p>
                  </div>
                </div>
                <div className=" ">
                  <div className="font-medium   pl-2 sm:w-1/3">
                    View and Manage Saved Documents
                  </div>
                  <div className="sm:w-2/3 flex flex-col space-y-2">
                    <p>
                      Access your saved documents anytime from the ACTIONS
                      section.
                    </p>
                    <p>
                      You can also download the files attached to each document
                      for your records.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-[80px] sm:mt-[100px]">
            <div className="flex justify-between items-center p-2 px-4 rounded-xl bg-slate-100 mx-[30px] sm:mx-[80px]">
              <span className="text-[25px] sm:text-[30px] lg:text-[30px] ml-[10px] sm:ml-[15px] font-bold">
                ACTIONS
              </span>
            </div>
            <div className="flex mt-[15px] p-6 rounded-xl pb-12 space-x-6 bg-slate-100 mx-[30px] sm:mx-[80px]">
              {!userDetails ? (
                <div className="flex flex-col flex-grow justify-center items-center">
                  <img
                    src={
                      "https://res.cloudinary.com/dbittrdjs/image/upload/v1733135870/loginRequired_qglenr.gif"
                    }
                    className="w-[100px] h-[100px] flex mb-2  justify-center items-center"
                    alt=""
                  />
                  <h1 className="text-xl font-bold mb-3">Login Required</h1>
                  <p className="text-center text-xs">
                    You must Login in order to view this content. <br />
                    Click{" "}
                    <Link
                      to="/auth"
                      className="mx-1 text-[#9d4edd] hover:text-blue-500 font-medium"
                    >
                      HERE
                    </Link>{" "}
                    to Login
                  </p>
                </div>
              ) : (
                <div className="flex flex-col flex-grow gap-y-4">
                  <Link
                    className="py-[6px] sm:py-2 px-2 sm:px-3 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] leading-tight group justify-center items-center rounded-lg sm:rounded-xl text-sm sm:text-lg text-[#fff] hover:text-[#000] hover:scale-110 hover:bg-[#fff] border-[1.5px] border-[#000] duration-500 font-semibold bg-[#000]"
                    to={"protected/tags"}
                  >
                    <span className=" font-semibold leading-tight  ">
                      Manage <br /> Tags
                    </span>
                    <div className="mt-2 border border-white group-hover:border-black duration-500 rounded-full"></div>
                  </Link>
                  <div className="flex flex-col flex-grow gap-y-3">
                    <div className="flex flex-col bg-slate-200 rounded-xl p-2 px-3">
                      <div className="flex gap-4 items-center">
                        <img
                          src={recImg}
                          className="w-[40px] h-[40px]"
                          alt=""
                        />
                        <span className="uppercase font-bold text-xl">
                          Receipts
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-grow pl-3 flex-wrap gap-6 justify-center sm:justify-start">
                      <Link
                        className="py-[6px] sm:py-2 px-2 sm:px-3 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]  group justify-center items-center rounded-lg sm:rounded-xl text-sm sm:text-lg  text-[#fff] hover:text-[#000] hover:scale-110 hover:bg-[#fff] border-[1.5px] border-[#000] duration-500 font-semibold bg-[#000]"
                        to={"protected/create/receipt"}
                      >
                        <p className="pb-[6px] border-b-[1.5px] leading-tight border-white group-hover:border-[#000] ">
                          <span className="flex items-center mr-3">
                            <i className="fi fi-br-plus flex justify-center mr-[6px] sm:mr-2 text-xs sm:text-base items-center"></i>
                            <span>Create</span>
                          </span>
                          <span className="flex items-center">Receipt</span>
                        </p>
                      </Link>
                      <Link
                        className="py-[6px] sm:py-2 px-2 sm:px-3 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] leading-tight group justify-center items-center rounded-lg sm:rounded-xl text-sm sm:text-lg text-[#fff] hover:text-[#000] hover:scale-110 hover:bg-[#fff] border-[1.5px] border-[#000] duration-500 font-semibold bg-[#000]"
                        to={"protected/view/receipt"}
                      >
                        <span className=" font-semibold leading-tight ">
                          Go To <br /> Receipts
                        </span>
                        <div className="mt-2 border border-white group-hover:border-black duration-500 rounded-full"></div>
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow gap-y-3">
                    <div className="flex flex-col bg-slate-200 rounded-xl p-2 px-3">
                      <div className="flex gap-4 items-center">
                        <img
                          src={warImg}
                          className="w-[40px] h-[40px]"
                          alt=""
                        />
                        <span className="uppercase font-bold text-xl">
                          Warranties
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-grow pl-3 flex-wrap gap-6 justify-center sm:justify-start">
                      <Link
                        className="py-[6px] sm:py-2 px-2 sm:px-3 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]  group justify-center items-center rounded-lg sm:rounded-xl text-sm sm:text-lg  text-[#fff] hover:text-[#000] hover:scale-110 hover:bg-[#fff] border-[1.5px] border-[#000] duration-500 font-semibold bg-[#000]"
                        to={"protected/create/warranty"}
                      >
                        <p className="pb-[6px] border-b-[1.5px] leading-tight border-white group-hover:border-[#000] ">
                          <span className="flex items-center mr-3">
                            <i className="fi fi-br-plus flex justify-center mr-[6px] sm:mr-2 text-xs sm:text-base items-center"></i>
                            <span>Create</span>
                          </span>
                          <span className="flex items-center">Warranty</span>
                        </p>
                      </Link>
                      <Link
                        className="py-[6px] sm:py-2 px-2 sm:px-3 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] leading-tight group justify-center items-center rounded-lg sm:rounded-xl text-sm sm:text-lg text-[#fff] hover:text-[#000] hover:scale-110 hover:bg-[#fff] border-[1.5px] border-[#000] duration-500 font-semibold bg-[#000]"
                        to={"protected/view/warranty"}
                      >
                        <span className=" font-semibold leading-tight  ">
                          Go To <br /> Warranties
                        </span>
                        <div className="mt-2 border border-white group-hover:border-black duration-500 rounded-full"></div>
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow gap-y-3">
                    <div className="flex flex-col bg-slate-200 rounded-xl p-2 px-3">
                      <div className="flex gap-4 items-center">
                        <img
                          src={docImg}
                          className="w-[40px] h-[40px]"
                          alt=""
                        />
                        <span className="uppercase font-bold text-xl">
                          docs
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-grow pl-3 flex-wrap gap-6 justify-center sm:justify-start">
                      <Link
                        className="py-[6px] sm:py-2 px-2 sm:px-3 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]  group justify-center items-center rounded-lg sm:rounded-xl text-sm sm:text-lg  text-[#fff] hover:text-[#000] hover:scale-110 hover:bg-[#fff] border-[1.5px] border-[#000] duration-500 font-semibold bg-[#000]"
                        to={"protected/create/doc"}
                      >
                        <p className="pb-[6px] border-b-[1.5px] leading-tight border-white group-hover:border-[#000] ">
                          <span className="flex items-center mr-3">
                            <i className="fi fi-br-plus flex justify-center mr-[6px] sm:mr-2 text-xs sm:text-base items-center"></i>
                            <span>Create</span>
                          </span>
                          <span className="flex items-center">A Doc</span>
                        </p>
                      </Link>

                      <Link
                        className="py-[6px] sm:py-2 px-2 sm:px-3 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] leading-tight group justify-center items-center rounded-lg sm:rounded-xl text-sm sm:text-lg text-[#fff] hover:text-[#000] hover:scale-110 hover:bg-[#fff] border-[1.5px] border-[#000] duration-500 font-semibold bg-[#000]"
                        to={"protected/view/doc"}
                      >
                        <span className=" font-semibold leading-tight  ">
                          Go To <br /> Docs
                        </span>
                        <div className="mt-2 border border-white group-hover:border-black duration-500 rounded-full"></div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
