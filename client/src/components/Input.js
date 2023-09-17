import React, { useEffect, useState } from "react";
import { TrashIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createTodoAsyn,
  deleteTodoAsync,
  updateTodoAsync,
  updateTodoPatch,
} from "../features/todo/todoSlice";
import Done from "./Done";
import Loader from "./Loader";
import { Navigate } from "react-router-dom";

const Input = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(-1);
  const [changeValue, setChangeValue] = useState("");
  const [user, setUser] = useState("");
  const [id, setId] = useState("");
  const [selectedChecked, setSelectedChecked] = useState(-1);

  const dispatch = useDispatch();
  const { todos, isLoading } = useSelector((state) => state.todo);

  const exitingUser = JSON.parse(localStorage.getItem("user"));

  const handleSubmitTodo = async () => {
    if (changeValue?.text?.length > 0) {
      dispatch(createTodoAsyn(changeValue));
      toast("Todo has been created😊");
      // changeValue.text = "";
      setChangeValue("");
    } else {
      toast("Please write something...");
    }
  };

  const handleDelete = (e, dataValue) => {
    dispatch(deleteTodoAsync(dataValue._id));
    toast(`"${dataValue.text}" has been deleted successfully.`);
  };

  const handleCheckbox = (e, data, index) => {
    let updateData = { ...data, status: "done" };
    if (e.target.checked) {
      dispatch(updateTodoPatch(updateData));
      toast("Hey!! congrats you have completed your goal🎊🎉.");
    } else {
      const updateData = { ...data, status: "pending" };
      dispatch(updateTodoPatch(updateData));
    }
  };

  useEffect(() => {
    if (id) {
      const singleTodo = todos.filter((ele) => ele._id === id);
      setUser(singleTodo[0]);
    }
  }, [todos, id]);

  useEffect(() => {
    if (!exitingUser) {
      return <Navigate to="/login" />;
    }
  }, [exitingUser]);

  return (
    <>
      {isLoading && (
        <p className="text-center translate-y-[7rem]">{<Loader />}</p>
      )}

      <div className=" h-full">
        <div className="flex justify-center gap-3 mt-10 mx-sm:p-2 ">
          {/* <input
            className="p-2 outline-none shadow text-gray-500 border-none"
            placeholder="Enter your todo"
            name="text"
            value={changeValue.text}
            onChange={(e) =>
              setChangeValue({
                ...changeValue,
                [e.target.name]: e.target.value,
              })
            }
          />
          <button
            className="border-none bg-green-500 shadow-3d text-white p-2"
            onClick={handleSubmitTodo}
          >
            Add task
          </button> */}
          <div
            id="search-bar"
            className="w-120 bg-white rounded-md shadow-lg z-10"
          >
            <form className="flex items-center justify-center p-2">
              <input
                type="text"
                placeholder="Enter your task..."
                className="w-full rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent placeholder:italic"
                name="text"
                value={changeValue.text}
                onChange={(e) =>
                  setChangeValue({
                    ...changeValue,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <button
                type="submit"
                className=" bg-gray-800 text-white rounded-md px-4 py-1 ml-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 "
                onClick={handleSubmitTodo}
              >
                Add
              </button>
            </form>
          </div>
        </div>

        <div className="lists mt-8  flex flex-col gap-3 justify-center w-[100%] max-sm:p-2 overflow-hidden  ">
          {todos.length === 0 && !isLoading && (
            <p className="text-center">Please add your today goal😊.</p>
          )}
          {todos?.map((todo, index) => (
            <>
              <div
                className="flex  w-[20rem] max-sm:w-[15rem] m-auto  max-sm:justify-start gap-2 items-center 
                max-sm:-ml-2  border-b-[.5px] border-b-gray-600 "
                key={todo._id}
              >
                <input
                  type="checkbox"
                  className="checkbox-wrapper h-3 w-3 ml-4 mb-1 max-sm:-ml-6 "
                  checked={todo.status === "done" ? true : false}
                  onChange={(e) => handleCheckbox(e, todo, index)}
                />

                {openEdit === index && open ? (
                  <>
                    <input
                      type="text"
                      className="xl:w-[480px] max-lg:w-[350px] border-none outline-none bg-gray-200 p-1 max-md:w-[300px] max-md:text-md max-sm:text-sm mb-1"
                      value={user?.text}
                      name="text"
                      onChange={(e) => {
                        setUser({ ...user, [e.target.name]: e.target.value });
                      }}
                    />
                    <button
                      className="bg-green-500 pl-[.5rem] pr-[.5rem] pt-[.2rem] pb-[.2rem] text-white mb-1"
                      onClick={() => {
                        setOpen(!open);
                        dispatch(updateTodoAsync(user));
                        toast("Todo updated successfully.");
                      }}
                    >
                      Edit
                    </button>
                    <span onClick={() => setOpen(false)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mb-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </>
                ) : (
                  <p
                    className={`flex -mt-[.2rem]  justify-between  max-lg:w-[350px] ${
                      todo.status === "done"
                        ? "line-through line-clamp-3 text-gray-400"
                        : ""
                    }  max-md:w-[300px] max-sm:break-words max-md:text-md max-sm:text-sm  mb-1`}
                  >
                    {todo.text}
                  </p>
                )}
                <div className="flex gap-2">
                  <span className="text-red-500 mt-1 ml-4">
                    {todo.status === "done" && !open && <Done />}{" "}
                  </span>
                  <TrashIcon
                    className="h-4 w-4 max-sm:h-5 mb-1 max-sm:w-5 max-md:h-5  max-md:w-5 max-lg:h-5 max-lg:w-5 mr-2 ml-2  cursor-pointer"
                    onClick={(e) => handleDelete(e, todo)}
                  />
                  <PencilIcon
                    className="h-4 w-4 max-sm:h-5 mb-1  max-md:h-5 max-md:w-5 max-lg:h-5 max-lg:w-5  max-sm:w-5 cursor-pointer"
                    onClick={() => {
                      setOpenEdit(index);
                      setOpen(!open);
                      setId(todo._id);
                    }}
                  />
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Input;
