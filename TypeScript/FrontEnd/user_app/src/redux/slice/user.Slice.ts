import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../../models/user.Model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = createAsyncThunk("auth/login", async (loginData: any) => {
    try {
        const res = await UserApi.login(loginData);
        if (res.data.is_Delete === 0) {
            localStorage.setItem("userLogin", JSON.stringify(res.data));
            localStorage.setItem("accessToken", res.accessToken);
            return res;
        }
        else
        {
            // eslint-disable-next-line no-global-assign
            return {msg:"Email lock"}
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        return {msg:error.response.statusText, codeStatus:error.response.status};
    }
});
const userSlice = createSlice({
    name: "user",
    initialState: {
        data: "",
        token: "",
        isLoggedIn: false,
        error: false,
    },
    reducers: {},
    extraReducers: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [login.fulfilled as any]: (state, action) => {
            state = action.payload;
            state.isLoggedIn = true;
        },
    },
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
