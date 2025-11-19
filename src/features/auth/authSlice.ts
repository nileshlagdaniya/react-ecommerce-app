import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";


interface AppUser {
    uid: string;
    email: string | null;
    role: "admin" | "user" | null
}

interface AuthState {
    user: AppUser | null;
    loading: boolean;
    initialized: boolean
}

const initialState: AuthState = {
    user: null,
    loading: true,
    initialized: false
}

// Step 1 : Fetch Role From Firebase

export const fetchUserProfile = createAsyncThunk(
    "auth/fetchUserProfile",
    async (user: FirebaseUser) => {
        const ref = doc(db, "users", user.uid)
        const snap = await getDoc(ref)


        if (!snap.exists()) {
            return {
                uid: user.uid,
                email: user.email,
                role: null
            }
        }

        const data = snap.data()
        return {
            uid: user.uid,
            email: user.email,
            role: data.role
        }
    }
)

export const initAuthListener = createAsyncThunk(
    "auth/initAuthListener",
    async (__, { dispatch }) => {
        return new Promise<void>((resolve) => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    await dispatch(fetchUserProfile(user)) //role fetch
                } else {
                    dispatch(authSlice.actions.clearUser())
                }
                resolve()
            })
        })
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signInSuccess: (state, action: PayloadAction<AppUser>) => {
            state.user = action.payload;
            state.loading = false;
            state.initialized = true;
        },
        clearUser: (state) => { state.user = null }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initAuthListener.pending, (state) => {
                state.loading = true
            })
            .addCase(initAuthListener.fulfilled, (state) => {
                state.loading = false;
                state.initialized = true;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload
            })
    }
})

export const { clearUser, signInSuccess } = authSlice.actions
export default authSlice.reducer