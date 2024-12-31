import { useState, useEffect } from "react";
import load from "../../assets/loader.gif";
import errorIcon from "../../assets/error.png";
import Data from "./Data";

export default function ManageCategories() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    fetchTags();
  }, []);

  async function fetchTags() {
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/track/getcategories",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw "failed";
      } else {
        const result = await res.json();
        setData(result);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  function changeData(obj) {
    const { value, path } = obj;
    if (path.length === 2) {
      setData((preval) => {
        const newObj = JSON.parse(JSON.stringify(preval));
        newObj[path[0]]
          .find((i) => i.name === path[1])
          .categories.unshift(value);
        return newObj;
      });
    } else {
      setData((preval) => {
        const newObj = JSON.parse(JSON.stringify(preval));
        newObj[path[0]].unshift({ name: value, categories: [] });
        return newObj;
      });
    }
  }

  function removeData(value) {
    if (value.length === 3) {
      setData((preval) => {
        const newObj = JSON.parse(JSON.stringify(preval));
        const obj = newObj[value[0]].find((i) => i.name === value[1]);
        obj.categories = obj.categories.filter((i) => i != value[2]);
        return newObj;
      });
    } else {
      setData((preval) => {
        const newObj = JSON.parse(JSON.stringify(preval));
        newObj[value[0]] = newObj[value[0]].filter((i) => i.name != value[1]);
        return newObj;
      });
    }
  }

  return (
    <>
      <div className="w-[90%] mt-16 flex flex-col mx-auto bg-white rounded-3xl p-4">
        <div
          id="categoryTop"
          className="w-full bg-slate-100 py-4 uppercase text-3xl text-center rounded-xl font-bold text-stone-700"
        >
          Manage Categories
        </div>

        <div className="flex w-full flex-col gap-y-4 flex-grow min-h-[800px] pb-[200px] bg-slate-100 rounded-xl p-6 mt-4">
          {loading ? (
            <div className="flex justify-center mt-44 flex-grow">
              <img src={load} className="w-[50px] h-[50%]" alt="" />
            </div>
          ) : data === null ? (
            <div className="flex flex-col space-y-4 items-center mt-44 flex-grow">
              <img src={errorIcon} className="w-[60px] h-[60%]" alt="" />
              <span>Something went wrong</span>
            </div>
          ) : (
            <>
              <div className="flex px-4 py-2 justify-end space-x-4">
                <button
                  style={{
                    backgroundColor: selected === 0 ? "#9d4edd" : "#dc93f6",
                    color: selected === 0 ? "white" : "black",
                  }}
                  disabled={loading || selected === 0}
                  onClick={() => setSelected(0)}
                  className="py-2 disabled:pointer-events-none px-4 font-medium rounded-lg duration-500  hover:scale-110 "
                >
                  Outgoing
                </button>
                <button
                  style={{
                    backgroundColor: selected === 1 ? "#9d4edd" : "#dc93f6",
                    color: selected === 1 ? "white" : "black",
                  }}
                  disabled={loading || selected === 1}
                  onClick={() => setSelected(1)}
                  className="py-2 disabled:pointer-events-none px-4 font-medium rounded-lg duration-500 hover:scale-110 "
                >
                  Incoming
                </button>
              </div>
              <Data
                data={selected === 0 ? data.outgoing : data.incoming}
                selected={selected}
                removeData={removeData}
                changeData={changeData}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
