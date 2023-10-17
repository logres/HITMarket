import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.fulfilled, (state, action) => {
                // 更新用户信息的状态
                return action.payload;
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                // 处理请求失败的情况
                console.error('Error fetching user info:', action.error);
            });
    },
});

export default userSlice.reducer;
