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

    const { name, about, price, categoryId, address } = req.body;


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
            categoryId,
            address,
            mainImage: mainImageUpload.secure_url,
            additionalImages,
        });

        await book.save();

        res.status(200).json({
            message: "Congratilation!! Your book is now in sales."
        })

    } catch (error) {
        console.log(error);

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

    const getBook = await bookModel.findById(bookid).populate("userId").populate("categoryId");

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
    const limit = 10;

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
    console.log(userId);


    if (!getBook) {
        throw new AppError("No books on sales", 400);
    }
    return res.status(200).json({
        data: getBook
    })

}

const levenshtein = (a, b) => {
    const matrix = Array.from({ length: b.length + 1 }, () => []);

    for (let i = 0; i <= b.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b[i - 1] === a[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
};

const getScore = (query, title) => {
    const qWords = query.toLowerCase().split(" ");
    const tWords = title.toLowerCase().split(" ");

    let score = 0;

    for (const qWord of qWords) {
        for (const tWord of tWords) {

            // exact match
            if (tWord === qWord) {
                score += 10;
            }

            // starts with
            else if (tWord.startsWith(qWord)) {
                score += 6;
            }

            // contains
            else if (tWord.includes(qWord)) {
                score += 4;
            }

            // fuzzy match
            else if (levenshtein(qWord, tWord) <= 2) {
                score += 2;
            }
        }
    }

    return score;
};

const getSearchBooks = async (req, res) => {
    try {
        const q = req.query.q?.toLowerCase().trim();

        if (!q || q.length < 2) {
            return res.json({ data: [] });
        }

        const books = await bookModel.find().select("name");

        const scored = books.map(book => ({
            name: book.name,
            score: getScore(q, book.name)
        }));

        const uniqueNames = new Set();

        const suggestions = scored
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .filter(item => {
                const key = item.name.toLowerCase();

                if (uniqueNames.has(key)) {
                    return false;
                }

                uniqueNames.add(key);
                return true;
            })
            .slice(0, 10)
            .map(item => item.name);

        return res.json({
            data: suggestions
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
};

const getSearchResults = async (req, res) => {
    try {
        const q = req.query.q?.toLowerCase().trim();
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;

        if (!q || q.length < 1) {
            const books = await bookModel
                .find()
                .skip(skip)
                .limit(limit);

            const totalbooks = await bookModel.countDocuments();

            return res.json({
                data: books,
                totalbooks,
                totalpages: Math.ceil(totalbooks / limit),
            });
        }

        // ✅ fetch FULL data (not only name)
        const books = await bookModel.find().select(
            "name about price address mainImage additionalImages"
        );

        // --- YOUR EXISTING SCORING ---
        const scored = books.map(book => ({
            book,
            score: getScore(q, book.name)
        }));

        // filter + sort
        const sorted = scored
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score);

        const totalbooks = sorted.length;

        // pagination AFTER scoring (IMPORTANT)
        const paginated = sorted
            .slice(skip, skip + limit)
            .map(item => item.book);

        return res.json({
            data: paginated,
            totalbooks,
            totalpages: Math.ceil(totalbooks / limit),
            page
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
};



exports.SearchResults = catchAsync(getSearchResults);
exports.suggestBook = catchAsync(getSearchBooks);
exports.updateBook = catchAsync(updateBookfunction);
exports.deleteBook = catchAsync(deleteBookfunction);
exports.getthisBook = catchAsync(getthisbookfunction);
exports.getallBook = catchAsync(getallbookfunction);
exports.getmyBook = catchAsync(getmybookfunction);