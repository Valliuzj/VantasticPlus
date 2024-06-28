const { db } = require("../../firebase");

exports.deleteComment = async function(req, res) {
    if (req.method === "DELETE") {
        try {
            const { postID, commentID } = req.body; 
            if (!postID || !commentID) {
                return res.status(400).json({ error: "postID and commentID are required" });
            }

            const commentRef = db.collection('posts').doc(postID).collection('comments').doc(commentID);
            const commentDoc = await commentRef.get();

            if (!commentDoc.exists) {
                return res.status(404).json({ error: 'No comment found with this id' });
            }

            const commentData = commentDoc.data();
            if (commentData.author.email !== req.user.email) {
                // only the author can delete the comment
                return res.status(403).json({ error: "You are not authorized to delete this comment" });
            }

            await commentRef.delete();

            return res.status(200).json({message: "Comment deleted successfully"});
        } catch (error) {
            return res.status(500).json({ "Error deleting comment:": error });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
};