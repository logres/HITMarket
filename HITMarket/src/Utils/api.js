import axios_instance from './axios_instance';


export const getPostList = async ({
    kind,//num
    keywords,//list of string
    category,//string
    start,//string
    num,//num
}) => {
    return await axios_instance.post('/api/posts', {
        kind: kind === 'buy' ? 1 : 2,
        keywords: keywords,
        category: category,
        start: start,
        num: num,
    });
}

export const getPost = async (pid) => {
    return await axios_instance.get(`/api/post`, {
        params: { pid: pid },
    });
}

export const publishPost = async ({
    title,//string
    text,//string
    location,//string
    kind,//num
    pictures = [],//list of string
    items = [],//list of item
}) => {
    return await axios_instance.post('/api/publish', {
        title: title,
        text: text,
        kind: kind === 'buy' ? 1 : 2,
        items: items,
        pictures: pictures,
        location: location,
    });
}

// {
//   iid:string,
//   status:1/2, 
// }
// 
// 
export const editPost = async ({
    pid,
    items,
    status,
}) => {
    return await axios_instance.post('/api/editpost', {
        pid: pid,
        items: items,
        status: status,
    });;
}

// items:{
//     id:string,
//     price:num,
// }
export const publishReply = async ({
    pid,
    text,
    pictures,
    items,
}) => {
    return await axios_instance.post('/api/comment', {
        pid: pid,
        text: text,
        items: items,
        pictures: pictures,
    })
}

export const getReplyList = async () => {
    return await axios_instance.get('/api/replies');
}

export const editFavorite = async (pid, action) => {
    return await axios_instance.post('/api/editfavorite', {
        pid: pid,
        fav: action === 'add' ? 1 : 2,
    });
}


export const getFavoritePostList = async ({
    start,//string
    num,//num
}) => {
    return await axios_instance.post('/api/favorite', {
        start: start,
        num: num,
    });
}

export const getMyPostList = async ({
    start,//string
    num,//num
}) => {
    return await axios_instance.post('/api/myposts', {
        start: start,
        num: num,
    });
}


export const getPersonInfo = async (userTarget = -1) => {
    if (userTarget === -1) {
        return await axios_instance.get('/api/personal');
    }
    return await axios_instance.get('/api/personal',
        {
            params: { user: userTarget },

        });
}

export const editPersonInfo = async ({
    phone,
    QQ,
    weChat,
    signature,
}) => {
    return await axios_instance.post('/api/personal', {
        phone: phone,
        qq: QQ,
        wx: weChat,
        signature: signature,
        email: '',
    });
}
