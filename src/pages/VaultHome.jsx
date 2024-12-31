import vault from "../assets/vault.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import styles from "./VaultHome.module.css";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

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
      <div className="h-full w-full bg-white overflow-auto pb-[200px] text-stone-700 rounded-l-xl rounded-r-xl lg:rounded-r-none">
        <h2
          style={{ fontFamily: "Fredoka" }}
          className="flex justify-center  text-[35px] sm:text-[40px] xl:text-[50px] mt-12 p-4 font-bold capitalize "
        >
          VAULT
        </h2>
        <div className=" mt-8 flex flex-col space-y-[30px] sm:space-y-0 items-center sm:flex-row mx-[50px] md:mx-[100px] justify-center space-x-[20px] 2xl:space-x-[80px]">
          <div className="flex text-sm sm:text-xs lg:text-base xl:text-lg flex-col max-w-[900px] space-y-6  my-auto">
            <p className=" font-medium  text-center ">
              This is your personal digital archive for all your important
              Documents like Bills, Receipts, Invoices and Warranties. With{" "}
              <span className=" font-medium text-[#9d4edd]">VAULT</span>, you
              can effortlessly:
            </p>
            <ul className="flex flex-col list-disc mx-auto">
              <li className="list-item">ADD Text Details</li>

              <li className="list-item">
                ADD Images and PDFs of your Documents
              </li>
              <li className="list-item">
                ADD Tags for better identification and classification
              </li>
            </ul>
            <p className=" font-medium  text-center ">
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
            className="h-fit my-auto w-[200px]  sm:w-[300px] xl:w-[450px]"
            src={vault}
            alt=""
          />
        </div>
        <div id="menu">
          <div className="flex justify-center space-x-10 mt-[100px] sm:mt-[175px]">
            <Span className="text-base sm:text-xl border-b-2 sm:border-b-4 border-black">
              How to Use <span className=" ">VAULT</span>
            </Span>
          </div>
          <div id={`${styles.menuContent}`} className={``}>
            <div className="mt-16 flex flex-col space-y-2">
              <div className=" ">
                <div className="font-medium  pl-2 sm:w-1/3">
                  Create a New Receipt/Warranty{" "}
                </div>
                <div className="sm:w-2/3 flex  flex-col space-y-2">
                  <p>
                    Navigate to the Vault section below on this page and click
                    on the{" "}
                    <span className=" font-medium text-[#9d4edd]">ADD</span> to
                    create a new Receipt/Warranty.
                  </p>
                  <p>
                    Use the{" "}
                    <span className=" font-medium text-[#9d4edd]">
                      'Receipts'
                    </span>{" "}
                    for Bills, Receipts or Invoices.
                  </p>
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
                    <span className=" font-medium text-[#9d4edd]">SAVE</span> to
                    store your document in the Vault.
                  </p>
                </div>
              </div>
              <div className=" ">
                <div className="font-medium   pl-2 sm:w-1/3">
                  View and Manage Saved Documents
                </div>
                <div className="sm:w-2/3 flex flex-col space-y-2">
                  <p>
                    Access your saved documents anytime from the Vault section.
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
        <div className="flex flex-col mt-[150px]">
          <div className="flex justify-between items-center p-3 px-6 rounded-xl bg-slate-100 mx-[50px] sm:mx-[100px]">
            <span className="text-[25px] sm:text-[30px] lg:text-[40px] ml-[10px] sm:ml-[20px] font-bold">
              VAULT
            </span>
            <div className="flex space-x-4">
              {!userDetails ? null : (
                <>
                  <Link
                    className="p-1 uppercase sm:p-2 px-2 sm:px-4 h-fit text-sm sm:text-base rounded-lg font-semibold bg-[#9d4edd] border-2 border-[#9d4edd] text-[#f7ebfd] hover:bg-[#f7ebfd] duration-500 hover:text-[#9d4edd] hover:scale-105 hover:shadow-md"
                    to={"protected/create/receipt"}
                  >
                    Add Receipt
                  </Link>
                  <Link
                    className="p-1 uppercase sm:p-2 px-2 sm:px-4 h-fit text-sm sm:text-base rounded-lg font-semibold bg-[#9d4edd] border-2 border-[#9d4edd] text-[#f7ebfd] hover:bg-[#f7ebfd] duration-500 hover:text-[#9d4edd] hover:scale-105 hover:shadow-md"
                    to={"protected/create/warranty"}
                  >
                    Add Warranty
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex mt-[20px] p-8 rounded-xl pb-16 space-x-8 bg-slate-100 mx-[50px] sm:mx-[100px]">
            {!userDetails ? (
              <div className="flex flex-col flex-grow justify-center items-center">
                <img
                  src={
                    "https://res.cloudinary.com/dbittrdjs/image/upload/v1733135870/loginRequired_qglenr.gif"
                  }
                  className="w-[150px] h-[150px] flex mb-4  justify-center items-center"
                  alt=""
                />
                <h1 className="text-3xl font-bold mb-4">Login Required</h1>
                <p className="text-center">
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
              <>
                <Link
                  to={"protected/view/receipt"}
                  className="bg-black w-[200px] p-4 rounded-xl h-[200px] text-white group hover:text-black hover:bg-white border-2 border-black hover:scale-110 duration-500 hover:shadow-lg"
                >
                  <span className=" font-semibold text-2xl ">
                    Go To <br /> Receipts
                  </span>
                  <div className="mt-3 border border-white group-hover:border-black duration-500 rounded-full"></div>
                </Link>
                <Link
                  to={"protected/view/warranty"}
                  className="bg-black w-[200px] p-4 rounded-xl h-[200px] text-white group hover:text-black hover:bg-white border-2 border-black hover:scale-110 duration-500 hover:shadow-lg"
                >
                  <span className=" font-semibold text-2xl ">
                    Go To <br /> Warranties
                  </span>
                  <div className="mt-3 border border-white group-hover:border-black duration-500 rounded-full"></div>
                </Link>
                <Link
                  to={"protected/tags"}
                  className="bg-black w-[200px] p-4 rounded-xl h-[200px] text-white group hover:text-black hover:bg-white border-2 border-black hover:scale-110 duration-500 hover:shadow-lg"
                >
                  <span className=" font-semibold text-2xl ">
                    Manage <br /> Tags
                  </span>
                  <div className="mt-3 border border-white group-hover:border-black duration-500 rounded-full"></div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
