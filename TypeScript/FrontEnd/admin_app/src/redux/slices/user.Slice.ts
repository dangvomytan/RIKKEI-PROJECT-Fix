import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
// import { IUserList, UserApi } from "../../models/User/User.Model";

// get all
export const handleGetAllUser = createAsyncThunk<IUserList[]>("user/Get all", async () => {
  const responce = await UserApi.getAllUser();
  return responce;
});

// register 
export const handleRegisterUser = createAsyncThunk<IUserList[]>(
  "user/ add user",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (payload:any) => {
    const responce = await UserApi.registerUser(payload);
    return responce;
  }
);
//login
// export const handleLoginUser = createAsyncThunk(
//   "loginUser",
//   async (payload) => {
//     const responce = await UserApi.loginUser(payload);
//     const user ={name:responce.data.fullName, r:responce.data.role, s:responce.data.status}
//     responce &&
//       localStorage.setItem("User", JSON.stringify(user));
//     responce &&
//       localStorage.setItem("AccessToken", JSON.stringify(responce.accessToken));
//     return responce;
//   }
// );
//update
export const handleUpdateUser = createAsyncThunk(
  "updateuser",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (payload:any) => {
    const responce = await UserApi.updateUser(payload);
    return responce;
  }
);
//delete
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleDeleteUser = createAsyncThunk<IUserList[]>("user/delete user",async (data:any) => 
{
    const responce = await UserApi.deleteUser(data);
    return responce;
  }
);

const UserSlice = createSlice({
  name: "user_slice",
  initialState: [],
  reducers:{
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //  handelLogoutUser:(state:any)=>{
    //    localStorage.removeItem("Users");
    //    localStorage.removeItem("AccessToken");
    //    return state=[];
    //  }
   },
  extraReducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [handleGetAllUser.fulfilled as any]: (state:any[], action: PayloadAction<IUserList[]>):any => {
      return state.concat(action.payload)

    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [handleRegisterUser.fulfilled as any]:(state:any, action:PayloadAction<IUserList[]>)  => {
      state = action.payload;
      return state;
    },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [handleUpdateUser.fulfilled as any]: (state:any, action:PayloadAction<IUserList[]>)  => {
      state = action.payload;
      return state;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [handleDeleteUser.fulfilled as any]: (state:any, action:PayloadAction<IUserList[]>) => {
      console.log(action.payload);
      state = action.payload;
      return state;
    },
  },
});
const { actions, reducer } = UserSlice;

// export const { handelLogoutUser } = actions;

export default reducer;
