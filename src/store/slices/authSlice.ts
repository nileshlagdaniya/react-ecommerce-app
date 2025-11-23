
// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import { type AppUser } from "../../firebase/auth";

// interface AuthState {
//     user: AppUser | null;
//     loading: boolean;
// }

// const initialState: AuthState = {
//     user: null,
//     loading: true, // when app loads, wait for firebase auth listener
// };


// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         setUser(state, action: PayloadAction<AppUser | null>) {
//             state.user = action.payload;
//             state.loading = false;
//         },
//         logout(state) {
//             state.user = null;
//             state.loading = false;
//         },
//     },
// });

// export const { setUser, logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type AppUser } from "../../firebase/auth";

interface AuthState {
    user: AppUser | null;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: true, // App start par auth listener ka wait
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<AppUser | null>) {
            state.user = action.payload;
            state.loading = false;
        },

        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

        clearUser(state) {
            state.user = null;
            state.loading = false;
        },

        logout(state) {
            state.user = null;
            state.loading = false;
        },
    },
});

export const { setUser, setLoading, clearUser, logout } = authSlice.actions;
export default authSlice.reducer;
