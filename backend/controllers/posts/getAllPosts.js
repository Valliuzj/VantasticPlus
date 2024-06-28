const { db } = require("../../firebase");

exports.getAllPosts = async function(req, res) {
    if (req.method === "GET") {
        try {
            const postsRef = db.collection('posts');
            const postsSnapshot = await postsRef.get();
            const posts = await Promise.all(postsSnapshot.docs.map(async doc => {
                let postData = doc.data();
                postData.id = doc.id;

                const commentsRef = postsRef.doc(doc.id).collection('comments');
                const commentsSnapshot = await commentsRef.get();
                postData.comments = commentsSnapshot.docs.map(commentDoc => {
                    let commentData = commentDoc.data();
                    commentData.id = commentDoc.id;
                    return commentData;
                });

                return postData;
            }));

            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({ "Error getting all posts:": error });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
};