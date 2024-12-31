import { useState } from "react";

export default function Heirarchy() {
  const [status, setStatus] = useState("0");

  function changeHandle(event) {
    setStatus(event.target.value);
  }

  return (
    <>
      <section className="flex mt-4 relative flex-grow">
        <select
          name=""
          className="absolute top-[-10px] right-[20px] bg-white rounded-lg text-base p-1 px-3"
          id=""
          value={status}
          onChange={(event) => changeHandle(event)}
        >
          <option value="0">Outgoing</option>
          <option value="1">Incoming</option>
        </select>
        {status === "0" ? (
          <div className="flex flex-col   h-[300px] flex-grow">
            <span className="flex w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
              Total Transactions
            </span>
            <div className="flex   flex-grow">
              <div className="flex  w-[70px]  "></div>
              <div className="flex flex-col   flex-grow">
                <div className="flex  ">
                  <div className="flex flex-col h-fit w-[60px]  ">
                    <div className="flex  text-transparent  border-l-2 border-b border-black ">
                      h
                    </div>
                    <div className="flex  text-transparent  flex-grow border-t border-black">
                      h
                    </div>
                  </div>

                  <div className="flex flex-col pt-[20px] mr-3">
                    <div className="bg-black h-[10px] w-[10px] rounded-full"></div>
                  </div>

                  <div className="flex flex-grow  ">
                    <div className="flex flex-col   pt-2 h-[200px] flex-grow">
                      <span className="flex w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                        Outgoing
                      </span>
                      <div className="flex   flex-grow">
                        <div className="flex  w-[40px]  "></div>
                        <div className="flex flex-col   flex-grow">
                          <div className="flex  ">
                            <div className="flex flex-col h-fit w-[30px]  ">
                              <div className="flex text-transparent  border-l-2 border-b border-black ">
                                h
                              </div>
                              <div className="flex  text-transparent  flex-grow border-t border-black">
                                h
                              </div>
                            </div>

                            <div className="flex flex-col pt-[20px] mr-3  ">
                              <div className="bg-black h-[10px] w-[10px] rounded-full"></div>
                            </div>

                            <div className="flex flex-col space-y-1  ">
                              <div className="flex flex-col   pt-2 h-fit flex-grow">
                                <span className="flex w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                  Essentials
                                </span>
                                <div className="flex   flex-grow">
                                  <div className="flex  w-[50px]  "></div>
                                  <div className="flex flex-col   flex-grow">
                                    <div className="flex  ">
                                      <div className="flex flex-col  w-[40px]  ">
                                        <div className="flex text-transparent  flex-grow border-l-2 border-b border-black ">
                                          h
                                        </div>
                                        <div className="flex text-transparent   flex-grow border-t border-black">
                                          h
                                        </div>
                                      </div>

                                      <div className="flex flex-col justify-center mr-3  ">
                                        <div className="bg-black h-[10px] w-[10px] rounded-full"></div>
                                      </div>

                                      <div className="flex gap-1 pt-1 flex-wrap items-center  ">
                                        <div className="  bg-red-20 mb-1 h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Housing
                                          </span>
                                        </div>
                                        <div className="  bg-red-20  h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Transportation
                                          </span>
                                        </div>
                                        <div className="  bg-red-20  h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Utility & Bills
                                          </span>
                                        </div>
                                        <div className="  bg-red-20  h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Health & Fitness
                                          </span>
                                        </div>
                                        <div className="  bg-red-20  h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Education
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col   pt-1 h-fit flex-grow">
                                <span className="flex w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                  Lifestyle & Leisure
                                </span>
                                <div className="flex   flex-grow">
                                  <div className="flex  w-[40px]  "></div>
                                  <div className="flex flex-col   flex-grow">
                                    <div className="flex  ">
                                      <div className="flex flex-col  w-[30px]  ">
                                        <div className="flex  text-transparent flex-grow border-l-2 border-b border-black ">
                                          h
                                        </div>
                                        <div className="flex  text-transparent  flex-grow border-t border-black">
                                          h
                                        </div>
                                      </div>

                                      <div className="flex flex-col justify-center mr-3  ">
                                        <div className="bg-black h-[10px] w-[10px] rounded-full"></div>
                                      </div>

                                      <div className="flex gap-1 pt-1 flex-wrap items-center  ">
                                        <div className="  bg-red-20 mb-1 h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Food & Dining
                                          </span>
                                        </div>
                                        <div className="  bg-red-20  h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Personal Care
                                          </span>
                                        </div>
                                        <div className="  bg-red-20  h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Entertainment
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col   pt-1 h-fit flex-grow">
                                <span className="flex w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                  Financial Planning
                                </span>
                                <div className="flex   flex-grow">
                                  <div className="flex  w-[40px]  "></div>
                                  <div className="flex flex-col   flex-grow">
                                    <div className="flex  ">
                                      <div className="flex flex-col  w-[30px]  ">
                                        <div className="flex text-transparent  flex-grow border-l-2 border-b border-black ">
                                          h
                                        </div>
                                        <div className="flex  text-transparent  flex-grow border-t border-black">
                                          h
                                        </div>
                                      </div>

                                      <div className="flex flex-col justify-center mr-3  ">
                                        <div className="bg-black h-[10px] w-[10px] rounded-full"></div>
                                      </div>

                                      <div className="flex gap-1 pt-1 flex-wrap items-center  ">
                                        <div className="  bg-red-20 mb-1 h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Insurance
                                          </span>
                                        </div>
                                        <div className="  bg-red-20  h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Debt Payment
                                          </span>
                                        </div>
                                        <div className="  bg-red-20  h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Savings & Investments
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col   pt-1 h-fit flex-grow">
                                <span className="flex w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                  Miscellaneous
                                </span>
                                <div className="flex   flex-grow">
                                  <div className="flex  w-[40px]  "></div>
                                  <div className="flex flex-col   flex-grow">
                                    <div className="flex  ">
                                      <div className="flex flex-col  w-[30px]  ">
                                        <div className="flex  text-transparent flex-grow border-l-2 border-b border-black ">
                                          h
                                        </div>
                                        <div className="flex  text-transparent  flex-grow border-t border-black">
                                          h
                                        </div>
                                      </div>

                                      <div className="flex flex-col justify-center mr-3  ">
                                        <div className="bg-black h-[10px] w-[10px] rounded-full"></div>
                                      </div>

                                      <div className="flex gap-1 pt-1 flex-wrap items-center  ">
                                        <div className="  bg-red-20 mb-1 h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Gifts & Donations
                                          </span>
                                        </div>
                                        <div className="  bg-red-20  h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Misc-Out
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col   h-[300px] flex-grow">
            <span className="flex w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
              Total Transactions
            </span>
            <div className="flex   flex-grow">
              <div className="flex  w-[70px]  "></div>
              <div className="flex flex-col   flex-grow">
                <div className="flex  ">
                  <div className="flex flex-col h-fit w-[60px]  ">
                    <div className="flex  text-transparent  border-l-2 border-b border-black ">
                      h
                    </div>
                    <div className="flex  text-transparent  flex-grow border-t border-black">
                      h
                    </div>
                  </div>

                  <div className="flex flex-col pt-[20px] mr-3">
                    <div className="bg-black h-[10px] w-[10px] rounded-full"></div>
                  </div>

                  <div className="flex flex-grow  ">
                    <div className="flex flex-col   pt-2 h-[200px] flex-grow">
                      <span className="flex w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                        Incoming
                      </span>
                      <div className="flex   flex-grow">
                        <div className="flex  w-[40px]  "></div>
                        <div className="flex flex-col   flex-grow">
                          <div className="flex  ">
                            <div className="flex flex-col h-fit w-[30px]  ">
                              <div className="flex text-transparent  border-l-2 border-b border-black ">
                                h
                              </div>
                              <div className="flex  text-transparent  flex-grow border-t border-black">
                                h
                              </div>
                            </div>

                            <div className="flex flex-col pt-[20px] mr-3  ">
                              <div className="bg-black h-[10px] w-[10px] rounded-full"></div>
                            </div>

                            <div className="flex flex-col space-y-1  ">
                              <div className="flex flex-col   pt-2 h-fit flex-grow">
                                <span className="flex w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                  Major Earnings
                                </span>
                                <div className="flex   flex-grow">
                                  <div className="flex  w-[50px]  "></div>
                                  <div className="flex flex-col   flex-grow">
                                    <div className="flex  ">
                                      <div className="flex flex-col  w-[40px]  ">
                                        <div className="flex text-transparent  flex-grow border-l-2 border-b border-black ">
                                          h
                                        </div>
                                        <div className="flex text-transparent   flex-grow border-t border-black">
                                          h
                                        </div>
                                      </div>

                                      <div className="flex flex-col justify-center mr-3  ">
                                        <div className="bg-black h-[10px] w-[10px] rounded-full"></div>
                                      </div>

                                      <div className="flex gap-1 pt-1 flex-wrap items-center  ">
                                        <div className="  bg-red-20 mb-1 h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Salary & Wage
                                          </span>
                                        </div>
                                        <div className="  bg-red-20  h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Business Income
                                          </span>
                                        </div>
                                        <div className="  bg-red-20  h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Government Payments
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col   pt-1 h-fit flex-grow">
                                <span className="flex w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                  Other Income
                                </span>
                                <div className="flex   flex-grow">
                                  <div className="flex  w-[70px]  "></div>
                                  <div className="flex flex-col   flex-grow">
                                    <div className="flex  ">
                                      <div className="flex flex-col  w-[60px]  ">
                                        <div className="flex  text-transparent flex-grow border-l-2 border-b border-black ">
                                          h
                                        </div>
                                        <div className="flex  text-transparent  flex-grow border-t border-black">
                                          h
                                        </div>
                                      </div>

                                      <div className="flex flex-col justify-center mr-3  ">
                                        <div className="bg-black h-[10px] w-[10px] rounded-full"></div>
                                      </div>

                                      <div className="flex gap-1 pt-1 flex-wrap items-center  ">
                                        <div className="  bg-red-20 mb-1 h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Refund & Reimbursement
                                          </span>
                                        </div>
                                        <div className="  bg-red-20  h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Investment Returns
                                          </span>
                                        </div>
                                        <div className="  bg-red-20  h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Saving Withdrawals
                                          </span>
                                        </div>
                                        <div className="  bg-red-20  h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Debt Taken
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col   pt-1 h-fit flex-grow">
                                <span className="flex w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                  Miscellaneous
                                </span>
                                <div className="flex   flex-grow">
                                  <div className="flex  w-[50px]  "></div>
                                  <div className="flex flex-col   flex-grow">
                                    <div className="flex  ">
                                      <div className="flex flex-col  w-[50px]  ">
                                        <div className="flex  text-transparent flex-grow border-l-2 border-b border-black ">
                                          h
                                        </div>
                                        <div className="flex  text-transparent  flex-grow border-t border-black">
                                          h
                                        </div>
                                      </div>

                                      <div className="flex flex-col justify-center mr-3  ">
                                        <div className="bg-black h-[10px] w-[10px] rounded-full"></div>
                                      </div>

                                      <div className="flex gap-1 pt-1 flex-wrap items-center  ">
                                        <div className="  bg-red-20 mb-1 h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Gifts
                                          </span>
                                        </div>
                                        <div className="  bg-red-20  h-fit ">
                                          <span className=" w-fit rounded-lg text-sm  bg-[#9f21e3] text-white font-medium p-1 px-2">
                                            Misc-In
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
