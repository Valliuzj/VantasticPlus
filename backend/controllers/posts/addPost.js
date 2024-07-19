const {db} = require("../../firebase");

exports.addPost = async function(req, res) {
    if (req.method === "POST"){
        try {
            const {title, content} = req.body;
            if (!title || !content) {
                return res.status(400).json({ error: "title, content are required" });
            }

            const author = {
                email: req.user.email,
                name: req.user.name,
                photoURL: req.user.photoURL
            };  

            const postRef = await db.collection('posts').doc();
            await postRef.set({
                title: title,
                content: content,
                author: author,
                date: new Date(),
                likes: 0
            });

            return res.status(201).json({
                message: "Post added successfully",
                postID: postRef.id
            });
        } catch (error) {
            //console.error("Error adding post:", error);
            return res.status(500).json({ "Error adding post:": error });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
};
