const { db } = require("../../firebase");

exports.addComment = async function(req, res) {
    if (req.method === "POST") {
        try {
            const { postID, comment } = req.body;
            if (!postID || !comment) {
                return res.status(400).json({ error: "postID and comment are required" });
            }

            const author = {
                email: req.user.email,
                name: req.user.name,
                photoURL: req.user.photoURL
            };

            const commentRef = await db.collection('posts').doc(postID).collection('comments').doc();
            if (!commentRef) {
                return res.status(404).json({ error: 'No post found with this id' });
            }

            await commentRef.set({
                comment: comment,
                author: author,
                date: new Date()
            });

            return res.status(201).json({
                message: "Comment added successfully",
            });
        } catch (error) {
            return res.status(500).json({ "Error adding comment:": error });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
};