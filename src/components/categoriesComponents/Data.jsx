import { useState, useEffect } from "react";
import cancel from "../../assets/cancel.png";
import load from "../../assets/loader.gif";
import tick from "../../assets/tick.png";
import cross from "../../assets/cross.png";
import pencil from "../../assets/pencil.png";
import side from "../../assets/side.png";
import exclamation from "../../assets/exclamation.png";
import OnlyXChars from "../../UIComponents/OnlyXChars";

export default function Data({
  data,
  changeData,
  removeData,
  selected,
  reFetchData,
}) {
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

  const [error2, setError2] = useState(null);
  const [renaming, setRenaming] = useState(false);

  const [renameModal, setRenameModal] = useState(null);
  const [renameModal2, setRenameModal2] = useState(null);
  const [newName, setNewName] = useState("");
  const [newCat, setCat] = useState("");

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

  function closeHandle() {
    setNewName("");
    setRenameModal(null);
    setRenameModal2(null);
    setError2(null);
    setRenaming(false);
    setCat("");
  }

  // useEffect(() => {
  //   calcFilteredData(inputRef.current.value.trim().toLowerCase());
  // }, [fetchedData]);

  function openRenameCategoryModal(arr) {
    setRenameModal(arr);
    setNewName("");
    setCat(arr[0].name);
    setError2(null);
    setRenaming(false);
  }
  function openRenameGroupModal(str) {
    setRenameModal2(str);
    setNewName("");
    setError2(null);
    setRenaming(false);
  }

  async function renameConfirm() {
    setError2(null);
    setRenaming(true);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/track/editsubcat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            preVal: [
              selected === 0 ? "outgoing" : "incoming",
              renameModal[0].name,
              renameModal[1],
            ],
            newVal: [
              selected === 0 ? "outgoing" : "incoming",
              newCat.trim(),
              newName.trim(),
            ],
          }),
          credentials: "include",
        }
      );
      setRenaming(false);
      if (!res.ok) {
        const error = await res.json();
        setError2(error.error);
      } else {
        reFetchData();
        closeHandle();
      }
    } catch (err) {
      console.log(err);
      setRenaming(false);
      setError2("Something went wrong.");
    }
  }

  async function renameConfirm2() {
    setError2(null);
    setRenaming(true);
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_API + "/track/editcat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            preVal: [
              selected === 0 ? "outgoing" : "incoming",
              renameModal2.name,
            ],
            newVal: [selected === 0 ? "outgoing" : "incoming", newName.trim()],
          }),
          credentials: "include",
        }
      );
      setRenaming(false);
      if (!res.ok) {
        const error = await res.json();
        setError2(error.error);
      } else {
        reFetchData();
        closeHandle();
      }
    } catch (err) {
      console.log(err);
      setRenaming(false);
      setError2("Something went wrong.");
    }
  }

  return (
    <>
      {renameModal2 == null ? null : (
        <div className="bg-black/30 z-[9999] fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
          <div className="bg-white rounded-xl w-[550px] p-3 flex flex-col">
            <div className="p-2 rounded-lg bg-slate-100 flex justify-center font-bold uppercase text-xl">
              Rename Group
            </div>
            <div className="bg-slate-100 px-4 mt-3 rounded-lg p-2 flex flex-col">
              <div className="flex ">
                <div className="flex flex-col flex-1 items-center py-3 ">
                  <span className="uppercase mb-1 font-semibold text-sm text-neutral-500">
                    Old Group
                  </span>
                  <div className="py-1 px-3 pr-2 rounded-md h-fit flex items-center text-sm capitalize bg-[#dc93f6] text-black">
                    <span>
                      <OnlyXChars text={renameModal2.name} x={15} />
                    </span>
                    <div className="ml-2 hover:scale-110 duration-500">
                      <img
                        src={pencil}
                        className="w-[15px] h-[15px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                    <div className="ml-1 hover:scale-110 duration-500">
                      <img
                        src={cancel}
                        className="w-[15px] h-[15px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-center py-3 ">
                  <span className="uppercase mb-1 font-semibold text-sm text-neutral-500">
                    new Group
                  </span>
                  <div className="py-1 px-3 pr-2 rounded-md h-fit flex items-center text-sm capitalize bg-[#dc93f6] text-black">
                    <span>
                      <OnlyXChars
                        text={newName === "" ? "NULL" : newName}
                        x={15}
                      />
                    </span>
                    <div className="ml-2 hover:scale-110 duration-500">
                      <img
                        src={pencil}
                        className="w-[15px] h-[15px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                    <div className="ml-1 hover:scale-110 duration-500">
                      <img
                        src={cancel}
                        className="w-[15px] h-[15px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 mb-2 flex  gap-x-4 items-center">
                <span className="text-sm uppercase font-medium">
                  Enter group Name
                </span>
                <input
                  type="text"
                  onChange={(event) => setNewName(event.target.value)}
                  placeholder="Name"
                  className="rounded-md flex-grow text-xs p-1 px-2 outline-none"
                />
              </div>
            </div>

            <div className="flex mt-3 justify-center sm:justify-between gap-4">
              <div className="pl-3 flex items-center">
                {renaming ? (
                  <div className="sm:flex hidden items-center">
                    <img
                      src={load}
                      className="w-[20px] h-[20px] flex justify-center items-center"
                      alt=""
                    />
                  </div>
                ) : null}
                {error2 ? (
                  <div className="hidden sm:flex items-center space-x-[6px]">
                    <img
                      src={exclamation}
                      className="w-[14px] h-[14px] flex justify-center items-center"
                      alt=""
                    />{" "}
                    <span className="text-red-500 text-xs ">{error2}</span>
                  </div>
                ) : null}
              </div>
              <div className="flex text-sm gap-x-[10px]">
                <button
                  onClick={closeHandle}
                  className="p-1 px-3 mr-6 sm:mr-0 rounded-md bg-blue-500 text-white"
                >
                  Cancel
                </button>
                <button
                  className="p-1 px-3 rounded-md bg-red-500 text-white"
                  onClick={renameConfirm2}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {renameModal == null ? null : (
        <div className="bg-black/30 z-[9999] fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
          <div className="bg-white rounded-xl w-[550px] p-3 flex flex-col">
            <div className="p-2 rounded-lg bg-slate-100 flex justify-center font-bold uppercase text-xl">
              Edit Category
            </div>
            <div className="bg-slate-100 px-4 mt-3 rounded-lg p-2 flex flex-col">
              <span className="uppercase font-semibold text-center">
                migrate Category
              </span>
              <div className="flex ">
                <div className="flex flex-col flex-1 items-center py-3 ">
                  <span className="uppercase mb-1 font-semibold text-sm text-neutral-500">
                    Old Group
                  </span>
                  <div className="py-1 px-3  rounded-md h-fit flex items-center text-sm capitalize bg-white font-medium text-black">
                    <OnlyXChars text={renameModal[0].name} x={15} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-center py-3 ">
                  <span className="uppercase mb-1 font-semibold text-sm text-neutral-500">
                    new Group
                  </span>
                  <div className="py-1 px-3  rounded-md h-fit flex items-center text-sm capitalize bg-white font-medium text-black">
                    <OnlyXChars text={newCat === "" ? "NULL" : newCat} x={15} />
                  </div>
                </div>
              </div>
              <div className="mt-2 mb-1 flex  flex-col gap-y-1">
                <div className="mt-4 mb-2 flex  gap-x-4 items-center">
                  <span className="text-sm uppercase font-medium">
                    Enter group Name
                  </span>
                  <select
                    onChange={(event) => setCat(event.target.value)}
                    defaultValue={renameModal[0].name}
                    name=""
                    id=""
                    className="text-xs p-1 px-2 rounded-md flex-grow"
                  >
                    {data.map((k) => {
                      return (
                        <option value={k.name} className="capitalize">
                          {k.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 px-4 mt-3 rounded-lg p-2 flex flex-col">
              <span className="uppercase font-semibold text-center">
                Rename category
              </span>
              <div className="flex ">
                <div className="flex flex-col flex-1 items-center py-3 ">
                  <span className="uppercase mb-1 font-semibold text-sm text-neutral-500">
                    Old category
                  </span>
                  <div className="py-1 px-3 pr-2 rounded-md h-fit flex items-center text-sm capitalize bg-[#dc93f6] text-black">
                    <span>
                      <OnlyXChars text={renameModal[1]} x={15} />
                    </span>
                    <div className="ml-2 hover:scale-110 duration-500">
                      <img
                        src={pencil}
                        className="w-[15px] h-[15px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                    <div className="ml-1 hover:scale-110 duration-500">
                      <img
                        src={cancel}
                        className="w-[15px] h-[15px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-center py-3 ">
                  <span className="uppercase mb-1 font-semibold text-sm text-neutral-500">
                    new category
                  </span>
                  <div className="py-1 px-3 pr-2 rounded-md h-fit flex items-center text-sm capitalize bg-[#dc93f6] text-black">
                    <span>
                      <OnlyXChars
                        text={newName === "" ? "NULL" : newName}
                        x={15}
                      />
                    </span>
                    <div className="ml-2 hover:scale-110 duration-500">
                      <img
                        src={pencil}
                        className="w-[15px] h-[15px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                    <div className="ml-1 hover:scale-110 duration-500">
                      <img
                        src={cancel}
                        className="w-[15px] h-[15px] flex justify-center items-center"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 mb-2 flex  gap-x-4 items-center">
                <span className="text-sm uppercase font-medium">
                  Enter category Name
                </span>
                <input
                  type="text"
                  onChange={(event) => setNewName(event.target.value)}
                  placeholder="Name"
                  className="rounded-md flex-grow text-xs p-1 px-2 outline-none"
                />
              </div>
            </div>

            <div className="flex mt-3 justify-center sm:justify-between gap-4">
              <div className="pl-3 flex items-center">
                {renaming ? (
                  <div className="sm:flex hidden items-center">
                    <img
                      src={load}
                      className="w-[20px] h-[20px] flex justify-center items-center"
                      alt=""
                    />
                  </div>
                ) : null}
                {error2 ? (
                  <div className="hidden sm:flex items-center space-x-[6px]">
                    <img
                      src={exclamation}
                      className="w-[14px] h-[14px] flex justify-center items-center"
                      alt=""
                    />{" "}
                    <span className="text-red-500 text-xs ">{error2}</span>
                  </div>
                ) : null}
              </div>
              <div className="flex text-sm gap-x-[10px]">
                <button
                  onClick={closeHandle}
                  className="p-1 px-3 mr-6 sm:mr-0 rounded-md bg-blue-500 text-white"
                >
                  Cancel
                </button>
                <button
                  className="p-1 px-3 rounded-md bg-red-500 text-white"
                  onClick={renameConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {data.length != 0 &&
        data.map((i) => {
          return (
            <>
              <div className="flex flex-col">
                <div className="flex bg-white rounded-lg sm:rounded-xl py-[3px] sm:py-[4px] px-[3px] sm:px-[4px] text-sm sm:text-base justify-between items-center pr-2 sm:pr-3 font-semibold ">
                  <div className="flex ">
                    <span className="rounded-lg sm:rounded-lg py-1 px-3 sm:px-4 capitalize">
                      {i.name}
                    </span>
                    {inputContent.find((j) => j.name === i.name)?.confirm !=
                    null ? (
                      <>
                        <>
                          <div className="fixed inline lap:hidden top-0 right-0 left-0 bottom-0 bg-black/40 z-10"></div>
                          <div className="rounded-2xl inline lap:hidden  fixed top-[50%] translate-y-[-50%] right-[50%] z-10 translate-x-[50%] translate ">
                            <div className="rounded-xl p-4 w-[250px] sm:w-[370px] bg-stone-100">
                              <h1 className="p-4 pb-0  text-center text-xs sm:text-sm font-medium">
                                <span>{`Are you sure you want to`}</span>
                                <span className="text-red-500 ml-2">
                                  Delete
                                </span>
                                <span className="mx-2">
                                  {inputContent.find((j) => j.name === i.name)
                                    .confirm.length === 2
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
                              </h1>

                              <div className="h-[50px]  scale-75 flex-grow justify-center sm:my-2 flex">
                                {inputContent.find((j) => j.name === i.name)
                                  .loading2 ? (
                                  <div className="flex items-center">
                                    <img
                                      src={load}
                                      className="w-[25px] h-[25px] flex justify-center items-center"
                                      alt=""
                                    />
                                  </div>
                                ) : null}
                                {inputContent.find((j) => j.name === i.name)
                                  .error2 != null ? (
                                  <div className="flex items-center space-x-2">
                                    <img
                                      src={exclamation}
                                      className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] flex justify-center items-center"
                                      alt=""
                                    />{" "}
                                    <span className="text-red-500 font-medium text-sm sm:text-base ">
                                      {
                                        inputContent.find(
                                          (j) => j.name === i.name
                                        ).error2
                                      }
                                    </span>
                                  </div>
                                ) : null}
                              </div>
                              <div className="flex items-center justify-center space-x-4">
                                <button
                                  onClick={() => confirmDelete(i.name)}
                                  disabled={
                                    inputContent.find((j) => j.name === i.name)
                                      ?.loading2
                                  }
                                  className="rounded-md bg-red-500 border-[1.5px] border-red-500 text-xs sm:text-sm text-white  px-2  font-medium hover:text-red-500 hover:bg-white duration-500 disabled:pointer-events-none disabled:opacity-50"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => cancelDelete(i.name)}
                                  disabled={
                                    inputContent.find((j) => j.name === i.name)
                                      ?.loading2
                                  }
                                  className="rounded-md bg-blue-500 border-[1.5px] border-blue-500 text-xs sm:text-sm text-white  px-2  font-medium hover:text-blue-500 hover:bg-white duration-500 disabled:pointer-events-none disabled:opacity-50"
                                >
                                  No
                                </button>
                              </div>
                            </div>
                          </div>
                        </>

                        <div className="lap:flex hidden  space-x-3 sm:space-x-4 ml-4 sm:ml-6  items-center">
                          <div className="flex space-x-[6px] sm:space-x-2 items-center font-medium text-[11px] sm:text-xs">
                            <span>{`Are you sure you want to`}</span>{" "}
                            <span className="text-red-500">Delete</span>
                            <span>
                              {inputContent.find((j) => j.name === i.name)
                                .confirm.length === 2
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
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => confirmDelete(i.name)}
                              disabled={
                                inputContent.find((j) => j.name === i.name)
                                  ?.loading2
                              }
                              className="rounded-[4px] sm:rounded-md bg-red-500 border-[1.5px] border-red-500 text-[11px] sm:text-xs text-white  px-1 sm:px-[6px] font-medium hover:text-red-500 hover:bg-white duration-500 disabled:pointer-events-none disabled:opacity-50"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => cancelDelete(i.name)}
                              disabled={
                                inputContent.find((j) => j.name === i.name)
                                  ?.loading2
                              }
                              className="rounded-[4px] sm:rounded-md bg-blue-500 border-[1.5px] border-blue-500 text-[11px] sm:text-xs text-white  px-1 sm:px-[6px] font-medium hover:text-blue-500 hover:bg-white duration-500 disabled:pointer-events-none disabled:opacity-50"
                            >
                              No
                            </button>
                          </div>
                          <div className="flex items-center pl-[6px] sm:pl-2 space-x-[6px] sm:space-x-2 text-sm sm:text-base font-normal">
                            {inputContent.find((j) => j.name === i.name)
                              .loading2 ? (
                              <img
                                src={load}
                                className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                                alt=""
                              />
                            ) : inputContent.find((j) => j.name === i.name)
                                .error2 != null ? (
                              <>
                                <img
                                  src={exclamation}
                                  className="sm:w-[15px] sm:h-[15px] w-[12px] h-[12px] flex justify-center items-center"
                                  alt=""
                                />
                                <span className="text-red-500 text-[11px] sm:text-xs">
                                  {
                                    inputContent.find((j) => j.name === i.name)
                                      .error2
                                  }
                                </span>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className="flex gap-x-1">
                    <button
                      disabled={
                        inputContent.find((j) => j.name === i.name)?.loading2
                      }
                      onClick={() => openRenameGroupModal(i)}
                      className=" hover:scale-110 duration-500"
                    >
                      <img
                        src={pencil}
                        className="w-[15px] h-[15px] flex justify-center items-center"
                        alt=""
                      />
                    </button>
                    <button
                      disabled={
                        inputContent.find((j) => j.name === i.name)?.loading2
                      }
                      onClick={() => removeGrpClick(i.name)}
                      className="hover:scale-110 duration-500"
                    >
                      <img
                        src={cancel}
                        className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px] flex items-center justify-center"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
                <div className="flex mt-2 sm:mt-3 ">
                  <div className=" smMob:flex hidden  pl-[50px] sm:pl-[80px] ">
                    <img
                      src={side}
                      className="min-w-[30px] h-[30px] sm:min-w-[40px] sm:h-[40px] flex items-center justify-center"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <div className=" bg-white flex-grow ml-2 sm:ml-3 rounded-lg sm:rounded-xl flex p-2 sm:p-3 gap-[6px] sm:gap-2 flex-wrap ">
                      {i.categories.length != 0 ? (
                        <>
                          {i.categories.map((j) => {
                            return (
                              <div className="rounded-md text-[11px] sm:text-xs py-[3px] sm:py-[4px] h-fit flex items-center font-medium px-2 sm:px-3 pr-1 sm:pr-[6px] border-[1.5px] border-[#dc93f6]  bg-[#dc93f6]">
                                <span className="mr-[6px] capitalize">{j}</span>
                                <button
                                  disabled={
                                    inputContent.find((j) => j.name === i.name)
                                      ?.loading2
                                  }
                                  onClick={() =>
                                    openRenameCategoryModal([i, j])
                                  }
                                  className=" hover:scale-110 duration-500"
                                >
                                  <img
                                    src={pencil}
                                    className="w-[15px] h-[15px] flex justify-center items-center"
                                    alt=""
                                  />
                                </button>
                                <button
                                  disabled={
                                    inputContent.find((j) => j.name === i.name)
                                      ?.loading2
                                  }
                                  onClick={() => removeCatClick(i.name, j)}
                                  className="ml-1"
                                >
                                  <img
                                    src={cancel}
                                    className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px] flex items-center justify-center"
                                    alt=""
                                  />
                                </button>
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        <span className="rounded-[4px] sm:rounded-md py-[3px] sm:py-[4px] h-fit flex items-center font-medium px-2 sm:px-3 pr-1 sm:pr-[6px] text-[11px] sm:text-xs border-[1.5px] border-slate-100 bg-slate-100 text-slate-400">
                          No Categories
                        </span>
                      )}
                    </div>
                    <div className=" ml-2 sm:ml-3 pb-0 flex p-2 sm:p-3 flex-grow  ">
                      {inputBox.includes(i.name) ? (
                        <div className="flex space-x-3 sm:space-x-4">
                          <input
                            type="text"
                            onChange={(event) => inputchange(event, i.name)}
                            value={
                              inputContent.find((j) => j.name === i.name)?.val
                            }
                            className="py-[2px] px-[6px] sm:px-2 w-[90px] smMob:w-[120px] sm:w-[150px] bg-stone-50 rounded-[4px] sm:rounded-md text-[11px] sm:text-xs border-[1.5px] border-stone-400 focus:outline-none "
                          />
                          <div className="flex items-center space-x-1 sm:space-x-[6px]">
                            <button
                              onClick={() => addCat(i.name)}
                              disabled={
                                inputContent.find((j) => j.name === i.name)
                                  ?.loading
                              }
                              className="p-1 sm:p-[6px] disabled:pointer-events-none disabled:opacity-50 rounded-md hover:bg-slate-200 duration-500"
                            >
                              <img
                                src={tick}
                                className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px] flex items-center justify-between"
                                alt=""
                              />
                            </button>
                            <button
                              onClick={() => cancelAddCatClick(i.name)}
                              disabled={
                                inputContent.find((j) => j.name === i.name)
                                  ?.loading
                              }
                              className="p-1 sm:p-[6px] disabled:pointer-events-none disabled:opacity-50 rounded-md hover:bg-slate-200 duration-500"
                            >
                              <img
                                src={cross}
                                className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px] flex items-center justify-between"
                                alt=""
                              />
                            </button>
                          </div>
                          <div className="hidden tab:flex items-center pl-2 sm:pl-3 space-x-[6px] sm:space-x-2">
                            {inputContent.find((j) => j.name === i.name)
                              ?.loading ? (
                              <img
                                src={load}
                                className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                                alt=""
                              />
                            ) : inputContent.find((j) => j.name === i.name)
                                ?.error != null ? (
                              <>
                                <img
                                  src={exclamation}
                                  className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]  flex justify-center items-center"
                                  alt=""
                                />
                                <span className="text-red-500 text-[11px] sm:text-xs">
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
                          className="rounded-md py-[3px] sm:py-[4px] h-fit flex items-center font-medium px-2 sm:px-3  border-dashed border-[1.5px] text-[11px] sm:text-xs border-stone-400 bg-stone-100"
                        >
                          ADD
                        </button>
                      )}
                    </div>
                    <div className="flex tab:hidden pl-4 space-x-3 mt-2">
                      {inputContent.find((j) => j.name === i.name)?.loading ? (
                        <img
                          src={load}
                          className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                          alt=""
                        />
                      ) : inputContent.find((j) => j.name === i.name)?.error !=
                        null ? (
                        <div className="flex space-x-2 items-center">
                          <img
                            src={exclamation}
                            className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]  flex justify-center items-center"
                            alt=""
                          />
                          <span className="text-red-500 text-[11px] sm:text-xs">
                            {inputContent.find((j) => j.name === i.name)?.error}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}

      {data.length === 0 ? (
        <div className="flex py-1 px-2 sm:px-3 rounded-lg text-sm sm:text-base bg-slate-200 text-slate-500 font-medium">
          No Groups
        </div>
      ) : null}

      <hr className="border border-stone-300" />

      <div className="flex p-1 sm:p-[6px]  text-[11px] sm:text-xs">
        {mainAdd ? (
          <div className="flex space-x-2 sm:space-x-3">
            <input
              type="text"
              onChange={(event) => Maininputchange(event)}
              value={mainInput.val}
              className="py-[2px] sm:py-1 px-2 sm:px-3 w-[90px] smMob:w-[120px] sm:w-[150px]  bg-stone-50 rounded-[4px] sm:rounded-md border-[1.5px] border-stone-400 focus:outline-none "
            />
            <div className="flex items-center space-x-[6px] sm:space-x-2">
              <button
                onClick={() => addMainCat()}
                disabled={mainInput.loading}
                className="p-1 sm:p-[6px] disabled:pointer-events-none disabled:opacity-50 rounded-md hover:bg-slate-200 duration-500"
              >
                <img
                  src={tick}
                  className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px] flex items-center justify-between"
                  alt=""
                />
              </button>
              <button
                onClick={() => cancelAddMainCatClick()}
                disabled={mainInput.loading}
                className="p-1 sm:p-[6px] disabled:pointer-events-none disabled:opacity-50 rounded-md hover:bg-slate-200 duration-500"
              >
                <img
                  src={cross}
                  className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px] flex items-center justify-between"
                  alt=""
                />
              </button>
            </div>
            <div className="flex items-center pl-2 sm:pl-3 space-x-[6px] sm:space-x-2">
              {mainInput.loading ? (
                <img
                  src={load}
                  className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                  alt=""
                />
              ) : mainInput.error != null ? (
                <>
                  <img
                    src={exclamation}
                    className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px] flex justify-center items-center"
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
            className="rounded-md sm:rounded-lg py-[3px] sm:py-[4px] text-[11px] sm:text-xs w-fit h-fit flex items-center font-medium px-2 sm:px-3  border-dashed border-[1.5px] border-stone-400 bg-stone-100"
          >
            ADD
          </button>
        )}
      </div>
    </>
  );
}
