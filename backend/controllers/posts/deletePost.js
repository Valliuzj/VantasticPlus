const { db } = require("../../firebase");

exports.deletePost = async function(req, res) {
    if (req.method === "DELETE") {
        try {
            const { postID } = req.body; 
            if (!postID ) {
                return res.status(400).json({ error: "postID is required" });
            }

            const postRef = db.collection('posts').doc(postID);
            const postDoc = await postRef.get();

            if (!postDoc.exists) {
                return res.status(404).json({ error: 'No post found with this id' });
            }

            const postData = postDoc.data();
            if (postData.author.email !== req.user.email) {
                // only the author can delete the post
                return res.status(403).json({ error: "You are not authorized to delete this post" });
            }

            await postRef.delete();

            return res.status(200).json({message: "Post deleted successfully"});
        } catch (error) {
            return res.status(500).json({ "Error deleting post:": error });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
};