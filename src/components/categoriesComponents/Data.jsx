import { useState, useEffect } from "react";
import cancel from "../../assets/cancel.png";
import load from "../../assets/loader.gif";
import tick from "../../assets/tick.png";
import cross from "../../assets/cross.png";
import side from "../../assets/side.png";
import exclamation from "../../assets/exclamation.png";
import OnlyXChars from "../../UIComponents/OnlyXChars";

export default function Data({ data, changeData, removeData, selected }) {
  const [inputBox, setInputBox] = useState([]);
  const [inputContent, setInputContent] = useState(
    data.map((i) => ({
      name: i.name,
      val: "",
      error: null,
      loading: false,
      confirm: null,
      error2: null,
      loading2: false,
    }))
  );
  const [mainAdd, setMainAdd] = useState(false);
  const [mainInput, setMainInput] = useState({
    loading: false,
    error: null,
    val: "",
  });

  function addCatClick(name) {
    setInputBox((preval) => {
      if (!preval.includes(name)) {
        return [...preval, name];
      } else {
        return preval;
      }
    });
  }

  function addMainCatClick() {
    setMainAdd(true);
  }

  useEffect(() => {
    setInputBox([]);
    setInputContent(
      data.map((i) => ({
        name: i.name,
        val: "",
        error: null,
        loading: false,
        confirm: null,
        error2: null,
        loading2: false,
      }))
    );
    setMainInput({
      loading: false,
      error: null,
      val: "",
    });
    setMainAdd(false);
  }, [selected]);

  useEffect(() => {
    setInputBox((preval) => {
      const newArr = preval.filter((i) => data.some((j) => j.name === i));
      return newArr;
    });
    setInputContent((preval) => {
      const newArr = preval.filter((i) => data.some((j) => j.name === i.name));
      if (data.length > 0 && !newArr.some((i) => i.name === data[0].name)) {
        newArr.unshift({
          name: data[0].name,
          val: "",
          error: null,
          loading: false,
          error2: null,
          loading2: false,
          confirm: null,
        });
      }
      return newArr;
    });
  }, [data]);

  function inputchange(event, name) {
    setInputContent((preval) => {
      const newArr = JSON.parse(JSON.stringify(preval));
      newArr.find((i) => i.name === name).val = event.target.value;
      return newArr;
    });
  }

  function Maininputchange(event) {
    setMainInput((preval) => {
      const newObj = { ...preval, val: event.target.value };
      return newObj;
    });
  }

  async function addCat(name) {
    const value = inputContent.find((i) => i.name === name).val.trim();
    if (value === "" || value.toLowerCase() === "null") {
      setInputContent((preval) => {
        const newArr = JSON.parse(JSON.stringify(preval));
        newArr.find((i) => i.name === name).error = "Invalid category value";
        return newArr;
      });
    } else if (
      data
        .find((i) => i.name === name)
        .categories.some((j) => j.toLowerCase() === value.toLowerCase())
    ) {
      setInputContent((preval) => {
        const newArr = JSON.parse(JSON.stringify(preval));
        newArr.find(
          (i) => i.name === name
        ).error = `Category already exists in '${name}'`;
        return newArr;
      });
    } else {
      setInputContent((preval) => {
        const newArr = JSON.parse(JSON.stringify(preval));
        const obj = newArr.find((i) => i.name === name);
        obj.error = null;
        obj.loading = true;
        return newArr;
      });

      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_API + "/track/addcategory",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              value: value,
              path: [selected === 0 ? "outgoing" : "incoming", name],
            }),
            credentials: "include",
          }
        );
        setInputContent((preval) => {
          const newArr = JSON.parse(JSON.stringify(preval));
          const obj = newArr.find((i) => i.name === name);
          obj.loading = false;
          return newArr;
        });
        if (!res.ok) {
          throw "failed";
        } else {
          changeData({
            value: value,
            path: [selected === 0 ? "outgoing" : "incoming", name],
          });
          cancelAddCatClick(name);
        }
      } catch (err) {
        console.log(err);
        setInputContent((preval) => {
          const newArr = JSON.parse(JSON.stringify(preval));
          const obj = newArr.find((i) => i.name === name);
          obj.loading = false;
          obj.error = "Something went wrong";
          return newArr;
        });
      }
    }
  }

  function scrollTop() {
    document
      .getElementById("categoryTop")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }

  async function addMainCat() {
    const value = mainInput.val.trim();
    if (value === "" || value.toLowerCase() === "null") {
      setMainInput((preval) => {
        return { ...preval, error: "Invalid group value" };
      });
    } else if (data.some((i) => i.name.toLowerCase() === value.toLowerCase())) {
      setMainInput((preval) => {
        return { ...preval, error: `Group already exists ` };
      });
    } else {
      setMainInput((preval) => {
        return { ...preval, error: null, loading: true };
      });

      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_API + "/track/addcategory",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              value: value,
              path: [selected === 0 ? "outgoing" : "incoming"],
            }),
            credentials: "include",
          }
        );
        setMainInput((preval) => {
          return { ...preval, loading: false };
        });
        if (!res.ok) {
          throw "failed";
        } else {
          changeData({
            value: value,
            path: [selected === 0 ? "outgoing" : "incoming"],
          });
          cancelAddMainCatClick();
          scrollTop();
        }
      } catch (err) {
        console.log(err);
        setMainInput((preval) => {
          return { ...preval, error: "Something went wrong", loading: false };
        });
      }
    }
  }

  async function confirmDelete(name) {
    const value = inputContent.find((i) => i.name === name).confirm;
    setInputContent((preval) => {
      const newArr = JSON.parse(JSON.stringify(preval));
      const obj = newArr.find((i) => i.name === name);
      obj.error2 = null;
      obj.loading2 = true;
      return newArr;
    });

    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/track/deletecategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: value,
          }),
          credentials: "include",
        }
      );
      setInputContent((preval) => {
        const newArr = JSON.parse(JSON.stringify(preval));
        const obj = newArr.find((i) => i.name === name);
        obj.loading2 = false;
        return newArr;
      });
      if (!res.ok) {
        throw "failed";
      } else {
        removeData(value);
        cancelDelete(name);
      }
    } catch (err) {
      console.log(err);
      setInputContent((preval) => {
        const newArr = JSON.parse(JSON.stringify(preval));
        const obj = newArr.find((i) => i.name === name);
        obj.loading2 = false;
        obj.error2 = "Something went wrong";
        return newArr;
      });
    }
  }

  function removeCatClick(grp, name) {
    setInputContent((preval) => {
      const newArr = JSON.parse(JSON.stringify(preval));
      const obj = newArr.find((i) => i.name === grp);
      obj.confirm = [selected === 0 ? "outgoing" : "incoming", grp, name];
      obj.error2 = null;
      return newArr;
    });
  }

  function removeGrpClick(grp) {
    setInputContent((preval) => {
      const newArr = JSON.parse(JSON.stringify(preval));
      const obj = newArr.find((i) => i.name === grp);
      obj.confirm = [selected === 0 ? "outgoing" : "incoming", grp];
      obj.error2 = null;
      return newArr;
    });
  }

  function cancelAddCatClick(name) {
    setInputContent((preval) => {
      const newArr = JSON.parse(JSON.stringify(preval));
      const obj = newArr.find((i) => i.name === name);
      obj.error = null;
      obj.val = "";
      obj.loading = false;
      return newArr;
    });
    setInputBox((preval) => {
      if (!preval.includes(name)) {
        return preval;
      } else {
        return preval.filter((i) => i != name);
      }
    });
  }

  function cancelAddMainCatClick() {
    setMainAdd(false);
    setMainInput({
      loading: false,
      error: null,
      val: "",
    });
  }

  function cancelDelete(name) {
    setInputContent((preval) => {
      const newArr = JSON.parse(JSON.stringify(preval));
      const obj = newArr.find((i) => i.name === name);
      obj.error2 = null;
      obj.confirm = null;
      obj.loading2 = false;
      return newArr;
    });
  }

  console.log(inputContent);

  return (
    <>
      {data.length != 0 &&
        data.map((i) => {
          return (
            <>
              <div className="flex flex-col">
                <div className="flex bg-white rounded-xl py-2 px-2 text-xl justify-between items-center pr-4 font-semibold ">
                  <div className="flex ">
                    <span className="rounded-lg py-1 px-4 capitalize">
                      {i.name}
                    </span>
                    {inputContent.find((j) => j.name === i.name)?.confirm !=
                    null ? (
                      <div className="flex space-x-4 ml-8 items-center">
                        <div className="flex space-x-2 items-center font-medium text-base">
                          <span>{`Are you sure you want to`}</span>{" "}
                          <span className="text-red-500">Delete</span>
                          <span>
                            {inputContent.find((j) => j.name === i.name).confirm
                              .length === 2
                              ? "Group"
                              : "Category"}
                          </span>{" "}
                          <span className="capitalize text-[#9d4edd]">
                            <OnlyXChars
                              x={10}
                              text={inputContent
                                .find((j) => j.name === i.name)
                                .confirm.at(-1)}
                            />
                          </span>
                          <span>?</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => confirmDelete(i.name)}
                            disabled={
                              inputContent.find((j) => j.name === i.name)
                                ?.loading2
                            }
                            className="rounded-lg bg-red-500 border-2 border-red-500 text-base text-white  px-2 font-medium hover:text-red-500 hover:bg-white duration-500 disabled:pointer-events-none disabled:opacity-50"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => cancelDelete(i.name)}
                            disabled={
                              inputContent.find((j) => j.name === i.name)
                                ?.loading2
                            }
                            className="rounded-lg bg-blue-500 border-2 border-blue-500 text-base text-white  px-2 font-medium hover:text-blue-500 hover:bg-white duration-500 disabled:pointer-events-none disabled:opacity-50"
                          >
                            No
                          </button>
                        </div>
                        <div className="flex items-center pl-4 space-x-3 text-base font-normal">
                          {inputContent.find((j) => j.name === i.name)
                            .loading2 ? (
                            <img
                              src={load}
                              className="w-[25px] h-[25px]"
                              alt=""
                            />
                          ) : inputContent.find((j) => j.name === i.name)
                              .error2 != null ? (
                            <>
                              <img
                                src={exclamation}
                                className="w-[20px] h-[20px] flex justify-center items-center"
                                alt=""
                              />
                              <span className="text-red-500">
                                {
                                  inputContent.find((j) => j.name === i.name)
                                    .error2
                                }
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <button
                    disabled={
                      inputContent.find((j) => j.name === i.name)?.loading2
                    }
                    onClick={() => removeGrpClick(i.name)}
                    className=""
                  >
                    <img
                      src={cancel}
                      className="w-[20px] h-[20px] flex items-center justify-center"
                      alt=""
                    />
                  </button>
                </div>
                <div className="flex mt-4 ">
                  <div className=" flex  pl-[100px] ">
                    <img
                      src={side}
                      className="w-[55px] h-[55px] flex items-center justify-center"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <div className=" bg-white flex-grow ml-4 rounded-xl flex p-4 gap-4 flex-wrap ">
                      {i.categories.length != 0 ? (
                        <>
                          {i.categories.map((j) => {
                            return (
                              <div className="rounded-lg py-[5px] h-fit flex items-center font-medium px-4 pr-2 border-2 border-[#dc93f6]  bg-[#dc93f6]">
                                <span className="mr-2 capitalize">{j}</span>
                                <button
                                  disabled={
                                    inputContent.find((j) => j.name === i.name)
                                      ?.loading2
                                  }
                                  onClick={() => removeCatClick(i.name, j)}
                                  className=""
                                >
                                  <img
                                    src={cancel}
                                    className="w-[20px] h-[20px] flex items-center justify-center"
                                    alt=""
                                  />
                                </button>
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        <span className="rounded-lg py-[5px] h-fit flex items-center font-medium px-4 pr-2 border-2 border-slate-100 bg-slate-100 text-slate-400">
                          No Categories
                        </span>
                      )}
                    </div>
                    <div className="  ml-4 pb-0 flex p-4 flex-grow  ">
                      {inputBox.includes(i.name) ? (
                        <div className="flex space-x-4">
                          <input
                            type="text"
                            onChange={(event) => inputchange(event, i.name)}
                            value={
                              inputContent.find((j) => j.name === i.name)?.val
                            }
                            className="py-1 px-3 w-[200px] bg-stone-50 rounded-lg border-2 border-stone-400 focus:outline-none "
                          />
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => addCat(i.name)}
                              disabled={
                                inputContent.find((j) => j.name === i.name)
                                  ?.loading
                              }
                              className="p-2 disabled:pointer-events-none disabled:opacity-50 rounded-md hover:bg-slate-200 duration-500"
                            >
                              <img
                                src={tick}
                                className="w-[20px] h-[20px] flex items-center justify-between"
                                alt=""
                              />
                            </button>
                            <button
                              onClick={() => cancelAddCatClick(i.name)}
                              disabled={
                                inputContent.find((j) => j.name === i.name)
                                  ?.loading
                              }
                              className="p-2 disabled:pointer-events-none disabled:opacity-50 rounded-md hover:bg-slate-200 duration-500"
                            >
                              <img
                                src={cross}
                                className="w-[20px] h-[20px] flex items-center justify-between"
                                alt=""
                              />
                            </button>
                          </div>
                          <div className="flex items-center pl-4 space-x-3">
                            {inputContent.find((j) => j.name === i.name)
                              ?.loading ? (
                              <img
                                src={load}
                                className="w-[25px] h-[25px]"
                                alt=""
                              />
                            ) : inputContent.find((j) => j.name === i.name)
                                ?.error != null ? (
                              <>
                                <img
                                  src={exclamation}
                                  className="w-[20px] h-[20px] flex justify-center items-center"
                                  alt=""
                                />
                                <span className="text-red-500">
                                  {
                                    inputContent.find((j) => j.name === i.name)
                                      ?.error
                                  }
                                </span>
                              </>
                            ) : null}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => addCatClick(i.name)}
                          className="rounded-lg py-[5px] h-fit flex items-center font-medium px-4  border-dashed border-2 border-stone-400 bg-stone-100"
                        >
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}

      {data.length === 0 ? (
        <div className="flex py-1 px-3 rounded-lg bg-slate-200 text-slate-500 font-medium">
          No Groups
        </div>
      ) : null}

      <hr className="border border-stone-300" />

      <div className="flex p-2">
        {mainAdd ? (
          <div className="flex space-x-4">
            <input
              type="text"
              onChange={(event) => Maininputchange(event)}
              value={mainInput.val}
              className="py-1 px-3 w-[200px] bg-stone-50 rounded-lg border-2 border-stone-400 focus:outline-none "
            />
            <div className="flex items-center space-x-2">
              <button
                onClick={() => addMainCat()}
                disabled={mainInput.loading}
                className="p-2 disabled:pointer-events-none disabled:opacity-50 rounded-md hover:bg-slate-200 duration-500"
              >
                <img
                  src={tick}
                  className="w-[20px] h-[20px] flex items-center justify-between"
                  alt=""
                />
              </button>
              <button
                onClick={() => cancelAddMainCatClick()}
                disabled={mainInput.loading}
                className="p-2 disabled:pointer-events-none disabled:opacity-50 rounded-md hover:bg-slate-200 duration-500"
              >
                <img
                  src={cross}
                  className="w-[20px] h-[20px] flex items-center justify-between"
                  alt=""
                />
              </button>
            </div>
            <div className="flex items-center pl-4 space-x-3">
              {mainInput.loading ? (
                <img src={load} className="w-[25px] h-[25px]" alt="" />
              ) : mainInput.error != null ? (
                <>
                  <img
                    src={exclamation}
                    className="w-[20px] h-[20px] flex justify-center items-center"
                    alt=""
                  />
                  <span className="text-red-500">{mainInput.error}</span>
                </>
              ) : null}
            </div>
          </div>
        ) : (
          <button
            onClick={addMainCatClick}
            className="rounded-lg py-[5px] w-fit h-fit flex items-center font-medium px-4  border-dashed border-2 border-stone-400 bg-stone-100"
          >
            ADD
          </button>
        )}
      </div>
    </>
  );
}
