const { db } = require("../../firebase");

exports.getSinglePost = async function(req, res) {
    if (req.method === "GET") {
        try {
            const { postID } = req.params;
            if (!postID) {
                return res.status(400).json({ error: "postID is required" });
            }

            const postRef = db.collection('posts').doc(postID);
            const postDoc = await postRef.get();

            if (!postDoc.exists) {
                return res.status(404).json({ error: 'No post found with this id' });
            }

            const commentsRef = postRef.collection('comments');
            const commentsSnapshot = await commentsRef.get();
            const comments = commentsSnapshot.docs.map(doc => doc.data());

            const postWithComments = {
                post: postDoc.data(),
                comments: comments
            };

            return res.status(200).json(postWithComments);
        } catch (error) {
            return res.status(500).json({ "Error getting post with comments:": error });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
};