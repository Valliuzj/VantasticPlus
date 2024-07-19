const { db } = require("../../firebase");
const multer = require("multer");
const admin = require("firebase-admin");

// Set up multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024
    },
});

exports.changePhoto = async function(req, res, next) {
    // Check for the correct Content-Type header
    if (!req.headers["content-type"] ||
        !req.headers["content-type"].includes("multipart/form-data")
    ) {
        res.status(400).json({
            error: "Invalid Content-Type header. Use 'multipart/form-data' for file uploads",
        });
        return;
    }

    if (req.method === "POST") {
        try {
            upload.single("image")(req, res, async function(err) {
                if (err instanceof multer.MulterError) {
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        return res.status(400).json({
                            error: 'File size exceeds the allowed limit: 1MB.',
                        });
                    }
                    // A Multer error occurred when uploading
                    return res.status(400).json({
                        error: "File upload error. Please upload key 'image' with a image file.",
                    });
                }

                if (err || !req.file) {
                    // An unknown error occurred when uploading
                    return res.status(500).json({ error: "Invalid file upload" });
                }

                //File type guard
                if (!req.file.originalname.match(/\.(png|jpeg|jpg)$/)) {
                    return res
                        .status(400)
                        .json({ error: "Invalid file format. Please upload a png or jpeg file." });
                }

                // Handle file upload
                try {
                    const imageName = req.file.originalname.replace('/', '_');
                    const db = admin.firestore();

                    const bucket = admin.storage().bucket("gs://vantasticplus.appspot.com");
                    const imageBuffer = req.file.buffer;
                    const file = bucket.file('userPhoto/' + imageName);
                    await file.save(imageBuffer, { contentType: 'image/jpeg' });
                    const [ImageURL] = await file.getSignedUrl({ action: 'read', expires: '03-01-2500' });

                    // Add image url to user document in Firestore
                    try {
                        // Get email of the user who is adding the media file
                        const email = req.user.email;
                        const userSnapshot = await db.collection("users").doc(email).get();
                        if (userSnapshot.empty) {
                            return res.status(404).json({ error: 'No user found with this email' });
                        }
                        
                        // Add image url to user document
                        userSnapshot.ref.update({
                            photoURL: ImageURL,
                        });
                    } catch (error) {
                        console.error('Error adding image to user:', error);
                        // If there was an error, delete the file from Firebase Storage
                        try {
                            await bucket.file('userPhoto/' + imageName).delete();
                        } catch (deleteError) {
                            console.error('Failed to delete file:', deleteError);
                        }
                        return res.status(500).send('Error adding image metadata to Firestore.');
                    }
                  } catch (error) {
                    console.error('Error uploading image:', error);
                    return res.status(500).send('Error uploading image. error message: ' + error.message);
                  }

                return res.status(200).json({
                    message: "File uploaded and processed successfully",
                });
            });
        } catch (error) {
            return res.status(500).json({ error: "Error uploading media file" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
