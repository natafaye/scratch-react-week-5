import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// export const fetchAllTodos = () => (dispatch, state) => {
//     dispatch(loading thing)
//     const ourFunction = async () => {
//         // fetch the todos from the backend
//         const response = await fetch("/data/todos");
//         // unsquish them and return them
//         const data = await response.json();
//         // return the array of todos
//         return data.todos;
//     }
//     const result = await ourFunction();
//     if(it works)
//         dispatch(fullfilled with result)
//     else
//         dispatch(rejected with error)
// }


export const fetchAllTodos = createAsyncThunk(
    'todos/fetchAllTodos',
    async () => {
        // fetch the todos from the backend
        const response = await fetch("/data/todos");
        // unsquish them and return them
        const data = await response.json();
        // return the array of todos
        return data.todos;
    }
)

export const postDeleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (idToDelete, { dispatch }) => {
        const response = await fetch("/data/todos/" + idToDelete, { method: "DELETE" });
        //dispatch(deleteTodo(idToDelete))
        return idToDelete;
    }
)


export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    entities: [],
    loading: false,
    errorMessage: ""
  },
  reducers: {
    // deleteTodo: (state, action) => {
    //     return { entities: state.entities.filter(todo => todo.id !== action.payload) }
    // },
  },
  extraReducers: {
    [fetchAllTodos.pending]: (state, action) => {
        // Update the frontend data with the data from the backend
        state.loading = true;
    },
    [fetchAllTodos.fulfilled]: (state, action) => {
        // Update the frontend data with the data from the backend
        state.entities = action.payload
        state.loading = false;
        state.errorMessage = ""
    },
    [fetchAllTodos.rejected]: (state, action) => {
        // Update the frontend data with the data from the backend
        state.loading = false;
        state.errorMessage = "Something went wrong"
    },
    [postDeleteTodo.fulfilled]: (state, action) => {
        return { entities: state.entities.filter(todo => todo.id !== action.payload) } // kinda funky
    }
  }
});

export const { deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
