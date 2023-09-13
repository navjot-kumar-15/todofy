import axios from "axios";

const URL = "https://todofy-eight.vercel.app/todo/v1";

// Create todo
export const createTodo = async (todoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(`${URL}/add`, todoData, config);
  return data;
};

// Get all todo
export const getTodo = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(`${URL}`, config);
  return data;
};

// Update the todo

export const updateTodo = async (update, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(`${URL}/${update._id}`, update, config);
  return data;
};

export const updatePatchTodo = async (updateTodo, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.patch(
    `${URL}/${updateTodo._id}`,
    updateTodo,
    config
  );
  return data;
};

// Delete the todo
export const deleteTodo = async (todoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.delete(`${URL}/${todoId}`, config);
  return data;
};
