import axios_instance from './axios_instance';

// get posts

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

export const getPost = async (id) => {
    return await axios_instance.get(`/posts/${id}`);
}
// {
//     "title": "设标酸养现色建",
//     "text": "id consequat",
//     "kind": 1,
//     "items": [
//         {
//             "name": "社社交",
//             "text": "dolore deserunt commodo voluptate",
//             "price": 1375,
//             "category": "手机"
//         },
//         {
//             "name": "眼与两个存",
//             "text": "in nulla id Excepteur",
//             "price": 4462,
//             "category": "笔记本"
//         }
//     ]
// }

//     "items": [
//         {
//             "name": "社社交",
//             "text": "dolore deserunt commodo voluptate",
//             "price": 1375,
//             "category": "手机"
//         },

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

export const replyPost = async () => {

}

export const getReplyList = async () => {

}