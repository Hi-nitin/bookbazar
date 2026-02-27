const bookModel = require('../models/bookModel');
const cloudinary = require('../config/cloudinary');
const streamifier = require("streamifier");
const catchAsync = require('../utilsfolder/catchAsync');
const AppError = require('../utilsfolder/apperror');


const uploadToCloudinary = (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};

exports.createBook = async (req, res) => {

    const { name, about, price, address } = req.body;


    try {

        if (!req.files?.mainImage) {

            return res.status(400).json({
                message: 'main image is required please.'
            })
        }

        const mainImageUpload = await uploadToCloudinary(
            req.files.mainImage[0].buffer,
            "books/main"
        );



        let additionalImages = [];

        if (req.files.additionalImages) {
            if (req.files.additionalImages.length > 3) {
                return res
                    .status(400)
                    .json({ message: "Maximum 3 additional images allowed" });
            }

            for (const file of req.files.additionalImages) {
                const upload = await uploadToCloudinary(
                    file.buffer,
                    "books/additional"
                );
                additionalImages.push(upload.secure_url);
            }
        }

        const book = new bookModel({
            userId: userId,
            name,
            about,
            price,
            address,
            mainImage: mainImageUpload.secure_url,
            additionalImages,
        });

        await book.save();

        res.status(200).json({
            message: "Congratilation!! Your book is now in sales."
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to keep your book in sales ! ",
            error: error,
        });
    }

}




const deleteBookfunction = async (req, res) => {
    const { bookid } = req.body;

    if (!bookid) {
        throw new AppError("Book ID is required", 400);
    }

    const deletebook = await bookModel.findByIdAndDelete(bookid);

    if (!deletebook) {

        if (!deletebook) {
            throw new AppError("Book not found.Failed to delete book.", 404);
        }
    }

    return res.status(200).json({
        message: "your book has been deleted."
    })

};


const getbookfunction = async (req, res) => {

    const { bookid } = req.body;

    if (!bookid) {
        throw new AppError("Book ID is required", 400);
    }

    const getBook = await bookModel.findById(bookid);

    if (!getBook) {
        throw new AppError("No books on sales", 400);
    }
    return res.status(200).json({
        data: getBook
    })

}

exports.deleteBook = catchAsync(deleteBookfunction);
exports.getBook = catchAsync(getbookfunction);
