import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const userNavigation = [{ name: "Sign out" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <motion.div
                      initial={0}
                      animate={{ scale: 1.2 }}
                      transition={{ delay: 0.5, ease: "easeIn" }}
                      className="flex-shrink-0 italic text-white text-2xl"
                    >
                      TodoFy
                    </motion.div>
                  </div>
                  <div className="hidden md:block ">
                    <div className="ml-4 flex items-center md:ml-6 ">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            {userInfo?.picture && (
                              <img
                                className="h-8 w-8 rounded-full mr-2"
                                src={userInfo?.picture}
                                alt=""
                              />
                            )}
                            <p className="text-white text-xl outline-none">
                              {" "}
                              {userInfo.name}{" "}
                            </p>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="break-words overflow-hidden absolute right-0 z-10 mt-2 w-48 xl:w-60 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <span className="pl-5">{userInfo.email}</span>
                            {userNavigation.map((item, index) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm  cursor-pointer bg-green-700 mt-3 text-white rounded-md m-1 hover:bg-green-600 transition-all ease-in-out text-center"
                                    )}
                                    onClick={() => {
                                      dispatch(logout());
                                      toast(
                                        "You have been successfully logged out"
                                      );
                                      navigate("/login");
                                    }}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      {userInfo?.picture && (
                        <img
                          className="h-8 w-8 rounded-full mr-2"
                          src={userInfo?.picture}
                          alt=""
                        />
                      )}
                      <p className="text-white text-xl max-sm:-ml-6">
                        {" "}
                        {userInfo.name}{" "}
                      </p>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm  font-medium leading-none text-gray-400">
                        {userInfo.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        onClick={() => {
                          dispatch(logout());
                          toast("You have been successfully logged out");
                          navigate("/login");
                        }}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default Navbar;
