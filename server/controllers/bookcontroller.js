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
    console.log(req.body);
    


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

    const findbook = await bookModel.findById(bookid);

    if (!findbook) {
        throw new AppError("Book not found.Failed to delete book.", 404);

    }

    if (findbook.userId.toString() !== userId) {
        throw new AppError("You are not authorized to delete this book", 403);
    }

    await bookModel.findByIdAndDelete(bookid);

    return res.status(200).json({
        message: "your book has been deleted."
    })

};


const getthisbookfunction = async (req, res) => {

    const { bookid } = req.params;

    if (!bookid) {
        throw new AppError("Book ID is required", 400);
    }

    const getBook = await bookModel.findById(bookid).populate("userId");

    if (!getBook) {
        throw new AppError("No books on sales", 400);
    }
    return res.status(200).json({
        data: getBook
    })

}




const updateBookfunction = async (req, res) => {

    const { bookid } = req.body;

    if (!bookid) {
        throw new AppError("Book ID is required", 400);
    }

    const book = await bookModel.findById(bookid);

    if (!book) {
        throw new AppError("Book not found", 404);
    }


    if (book.userId.toString() !== userId) {
        throw new AppError("You are not authorized to update this book", 403);
    }

    const { name, about, price, address } = req.body;

    if (name) book.name = name;
    if (about) book.about = about;
    if (price) book.price = price;
    if (address) book.address = address;


    if (req.files?.mainImage) {

        const mainImageUpload = await uploadToCloudinary(
            req.files.mainImage[0].buffer,
            "books/main"
        );

        book.mainImage = mainImageUpload.secure_url;
    }


    if (req.files?.additionalImages) {

        let newImages = [];

        for (const file of req.files.additionalImages) {
            const upload = await uploadToCloudinary(
                file.buffer,
                "books/additional"
            );

            newImages.push(upload.secure_url);
        }

        book.additionalImages = newImages;
    }

    await book.save();

    res.status(200).json({
        message: "Book updated successfully",

    });

};




const getallbookfunction = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = 6;

    const skip = (page - 1) * limit;

    //filter hone fere 

    const { maxprice, minprice } = req.query;

    const pricefilter = {};

    if (minprice || maxprice) {
        pricefilter.price = {};

        if (minprice) {
            pricefilter.price.$gte = Number(minprice);
        }

        if (maxprice) {
            pricefilter.price.$lte = Number(maxprice);
        }
    }


    const getBook = await bookModel.find(pricefilter).select("-userId").skip(skip).limit(limit);
    const totalbooks = await bookModel.countDocuments(pricefilter);

    if (!getBook) {
        throw new AppError("No books found", 400);
    }
    return res.status(200).json({
        totalbooks,
        totalpages: Math.ceil(totalbooks / limit),
        data: getBook
    })

}





const getmybookfunction = async (req, res) => {


    const getBook = await bookModel.find({ userId: userId });

    if (!getBook) {
        throw new AppError("No books on sales", 400);
    }
    return res.status(200).json({
        data: getBook
    })

}


exports.updateBook = catchAsync(updateBookfunction);
exports.deleteBook = catchAsync(deleteBookfunction);
exports.getthisBook = catchAsync(getthisbookfunction);
exports.getallBook = catchAsync(getallbookfunction);
exports.getmyBook = catchAsync(getmybookfunction);