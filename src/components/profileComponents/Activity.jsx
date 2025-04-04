import { useState } from "react";
import right from "../../assets/right.png";
import left from "../../assets/left.png";
import { format, set } from "date-fns";
import { dateFormat } from "../../util/algo";

export default function Activity({ data }) {
  const [selectedYear, setSelectedYear] = useState(
    data.list[data.list.length - 1].year
  );
  const [ind, setInd] = useState(data.list.length - 1);
  const [selectedData, setSelectedData] = useState(
    data.list[data.list.length - 1].calendar
  );
  const [toolTip, setToolTip] = useState(null);

  console.log(data);

  function rightClick() {
    const newYear = selectedYear + 1;
    const newInd = ind + 1;
    setSelectedYear(newYear);
    setSelectedData(data.list[newInd].calendar);
    setInd(newInd);
  }

  function leftClick() {
    const newYear = selectedYear - 1;
    const newInd = ind - 1;
    setSelectedYear(newYear);
    setSelectedData(data.list[newInd].calendar);
    setInd(newInd);
  }

  function showToolTip(event, day) {
    console.log(event, day, event.target);
    const temp = event.target.getBoundingClientRect();
    const str = `.month${day.monthNo - 1}`;
    console.log(str);
    const temp2 = document.querySelector(str).getBoundingClientRect();
    console.log();
    const date = set(new Date(), {
      date: parseInt(day.date),
      month: parseInt(day.monthNo) - 1,
      year: parseInt(day.year),
    });
    const formattedDate = dateFormat(date);
    setToolTip({
      x: temp.x - temp2.x + 10,
      y: temp.y - temp2.y - 30,
      content: day.date,
      day: day,
      date: formattedDate,
    });
  }

  return (
    <div className="p-16 w-[90%] sm:w-[80%] px-6 tab:px-12 pt-6 tab:pt-4 bg-neutral-100 rounded-lg">
      <div className="flex flex-col-reverse tab:flex-row items-center tab:justify-between text-[11px]">
        <div className="tab:flex flex-col  mt-6 tab:mt-0 space-y-1 tab:space-y-0 tab:flex-row tab:space-x-6">
          <div className="flex justify-center space-x-3">
            <span>Total Active Days: </span>
            <span>{data.totalActiveDays}</span>
          </div>
          <div className="flex justify-center space-x-3">
            <span>
              Total Active Days in{" "}
              <span className="font-medium">{selectedYear}</span> :{" "}
            </span>
            <span>{data.list[ind].totalActiveDays}</span>
          </div>
          <div className="flex justify-center space-x-3">
            <span>Max Streak: </span>
            <span>{data.maxStreak}</span>
          </div>
        </div>
        <div className="text-xs flex items-center space-x-2 sm:space-x-3">
          <button
            className="disabled:pointer-events-none disabled:opacity-50"
            disabled={selectedYear === data.list[0].year}
            onClick={leftClick}
          >
            <img
              src={left}
              className="w-[17px] sm:w-[20px] h-[17px] sm:h-[20px] flex justify-center items-center"
              alt=""
            />
          </button>
          <span className="w-[30px] text-center">{selectedYear}</span>
          <button
            className="disabled:pointer-events-none disabled:opacity-50"
            disabled={selectedYear === data.list[data.list.length - 1].year}
            onClick={rightClick}
          >
            <img
              src={right}
              className="w-[17px] sm:w-[20px] h-[17px] sm:h-[20px] flex justify-center items-center"
              alt=""
            />
          </button>
        </div>
      </div>
      <div className="flex pt-16 sm:pt-20 tab:pt-24 justify-center flex-wrap gap-x-6 gap-y-14">
        <div className="sm:flex hidden relative flex-col items-start text-[9px] text-neutral-500 mr-1 rounded-sm h-[110px] gap-[3px]">
          <div className=" h-[12px]">Mon</div>
          <div className=" h-[12px]">Tue</div>
          <div className=" h-[12px]">Wed</div>
          <div className=" h-[12px]">Thu</div>
          <div className=" h-[12px]">Fri</div>
          <div className=" h-[12px]">Sat</div>
          <div className=" h-[12px]">Sun</div>
        </div>
        {selectedData.map((month, ind) => {
          return (
            <div className={`relative ${"month" + ind}`}>
              <div className="flex  flex-col flex-wrap h-[110px] gap-[3px]">
                {month.map((day) => {
                  if (day === null) {
                    return <div className="w-[12px] h-[12px]"></div>;
                  } else {
                    return (
                      <>
                        <div
                          style={{
                            backgroundColor:
                              new Date().toDateString() ===
                              set(new Date(), {
                                month: parseInt(day.monthNo) - 1,
                                date: parseInt(day.date),
                                year: parseInt(day.year),
                              }).toDateString()
                                ? "#dc93f6"
                                : day.active === true
                                ? "#9F21E3"
                                : "#d4d4d4",
                          }}
                          onMouseEnter={(event) => showToolTip(event, day)}
                          onMouseLeave={(event) => setToolTip(null)}
                          className="w-[12px]  h-[12px] hover:opacity-50 rounded-[3px] "
                        ></div>
                        {toolTip &&
                        toolTip.day.monthNo === day.monthNo &&
                        toolTip.day.year === day.year &&
                        toolTip.day.date === day.date ? (
                          <div
                            style={{
                              top: toolTip.y,
                              left: toolTip.x,
                            }}
                            className="absolute text-nowrap z-[1] h-[25px]  bg-white shadow-md text-xs rounded-md hidden sm:flex items-center p-1 px-3"
                          >
                            {toolTip.date}
                          </div>
                        ) : null}
                      </>
                    );
                  }
                })}
              </div>
              <span className="absolute top-[-30px] right-[50%] text-[11px] translate-x-[50%] text-neutral-500">
                {month[month.length - 1]?.monthName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
