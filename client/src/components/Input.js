import React, { useEffect, useState } from "react";
import { TrashIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodoAsyn,
  deleteTodoAsync,
  getAllTodoAsyn,
  updateTodoAsync,
  updateTodoPatch,
} from "../features/todo/todoSlice";
import Done from "./Done";

const Input = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(-1);
  const [statusValue, setStatusValue] = useState("pending");
  const [changeValue, setChangeValue] = useState("");
  const [user, setUser] = useState("");
  const [id, setId] = useState("");

  const dispatch = useDispatch();
  const { todos, isLoading } = useSelector((state) => state.todo);

  const handleSubmitTodo = () => {
    dispatch(createTodoAsyn(changeValue));
    setChangeValue("");
  };

  const handleDelete = (e, dataValue) => {
    dispatch(deleteTodoAsync(dataValue._id));
  };

  const handleChange = (e, data, index) => {
    let updateData = { ...data, status: "done" };

    if (e?.target?.checked) {
      dispatch(updateTodoPatch(updateData));
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

  return (
    <>
      {isLoading && (
        <p className="text-center translate-y-[7rem]">Loading...</p>
      )}

      <div className=" h-full">
        <div className="flex justify-center gap-3 mt-10 ">
          <input
            className="p-2 outline-none shadow text-gray-500 border-none"
            placeholder="Enter your todo"
            name="text"
            onChange={(e) =>
              setChangeValue({
                ...changeValue,
                [e.target.name]: e.target.value,
              })
            }
          />
          <button
            className="border-none bg-green-500 text-white p-2"
            onClick={handleSubmitTodo}
          >
            Add task
          </button>
        </div>

        <div className="lists mt-8  flex flex-col gap-3 justify-center w-[100%] max-sm:p-2 overflow-hidden  ">
          {todos?.map((todo, index) => (
            <>
              <div
                className="flex w-[20rem] max-sm:w-[15rem] m-auto  max-sm:justify-start gap-2 items-center 
                max-sm:-ml-2 "
                key={todo._id}
              >
                <input
                  type="checkbox"
                  className="h-3 w-3 ml-4 max-sm:ml-0"
                  checked={todo.status === "done" ? true : false}
                  onChange={(e) => handleChange(e, todo, index)}
                />

                {openEdit === index && open ? (
                  <>
                    <input
                      type="text"
                      className="xl:w-[480px] max-lg:w-[350px] border-1 border-orange-300 bg-gray-200 p-1 max-md:w-[300px] max-md:text-md max-sm:text-sm"
                      value={user?.text}
                      name="text"
                      onChange={(e) => {
                        setUser({ ...user, [e.target.name]: e.target.value });
                      }}
                    />
                    <button
                      className="bg-green-500 pl-[.5rem] pr-[.5rem] pt-[.2rem] pb-[.2rem] text-white"
                      onClick={() => {
                        setOpen(!open);
                        dispatch(updateTodoAsync(user));
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
                        className="w-6 h-6"
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
                    className={`flex justify-between  max-lg:w-[350px] ${
                      todo.status === "done" ? "line-through line-clamp-3" : ""
                    }  max-md:w-[300px] max-sm:break-words max-md:text-md max-sm:text-sm`}
                  >
                    {todo.text}
                  </p>
                )}
                <span className="text-red-500 mt-1 ml-4">
                  {todo.status === "done" && <Done />}{" "}
                </span>
                {/* <input type="text" value={data.value} /> */}
                <TrashIcon
                  className="h-4 w-4 max-sm:h-7 max-sm:w-7 max-md:h-5  max-md:w-5 max-lg:h-7 max-lg:w-7  cursor-pointer"
                  onClick={(e) => handleDelete(e, todo)}
                />
                <PencilIcon
                  className="h-4 w-4 max-sm:h-7  max-md:h-5 max-md:w-5 max-lg:h-7 max-lg:w-7  max-sm:w-7 cursor-pointer"
                  onClick={() => {
                    setOpenEdit(index);
                    setOpen(!open);
                    setId(todo._id);
                  }}
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Input;
