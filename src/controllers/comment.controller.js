const CommentModel = require('../model/comment.model');

const list = async (req, res) => {
    try {
        const comments = await CommentModel.find()
            .populate('user', 'name email')
            .populate('movie', 'title year genres image');
        
        if (!comments) {
            throw new Error();
        }
        
        return res.json(comments);
    } catch (err) {
        return res.status(400).json({
            error: '@comments/list',
            message: err.message || 'Failed to list comments',
        });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const comment = await CommentModel.findById(id)
            .populate('user', 'name email')
            .populate('movie', 'title year genres image');

        if (!comment) {
            throw new Error();
        }

        return res.json(comment);
    } catch (err) {
        return res.status(400).json({
            error: '@comments/getById',
            message: err.message || `Comment not found ${id}`,
        });
    }
};

const getByMovieId = async (req, res) => {
    const { id } = req.params;

    try {
        const query = { movie: id };

        const comments = await CommentModel.find(query)

        if (!comments) {
            throw new Error();
        }

        return res.json(comments);
    } catch (err) {
        return res.status(400).json({
            error: '@comments/getByMovieId',
            message: err.message || `Movie not found ${id}`,
        });
    }
};

const create = async (req, res) => {
    const { content, rating } = req.body;
    const { id } = req.params;

    try {
        const newComment = await CommentModel.create({
            user : req.user._id,
            movie : id,
            content,
            rating,
        });

        return res.status(201).json(newComment);
    } catch (err) {
        return res.status(400).json({
            error: '@comments/create',
            message: err.message || 'Failed to create comment',
        });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { content, rating } = req.body;

    try {
        const commentToUpdate = await CommentModel.findById(id);

        if (!commentToUpdate) {
            throw new Error();
        }

        console.log(req.user.role);
        console.log(commentToUpdate.user);

        if (req.user.role !== 'admin' && req.user._id !== commentToUpdate.user.toString()) {
            throw new Error('User not allowed to update this comment');
        }

        const commentUpdated = await CommentModel.findByIdAndUpdate(
            id,
            {
                content,
                rating,
            },
            { new: true, }
        );

        return res.json(commentUpdated);
    } catch (err) {
        return res.status(400).json({
            error: '@comments/update',
            message: err.message || `Comment not found ${id}`,
        });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        if (req.user.role !== 'admin') {
            throw new Error('User not allowed to remove this comment');
        }

        const commentDeleted = await CommentModel.findByIdAndDelete(id);

        if (!commentDeleted) {
            throw new Error();
        }

        return res.status(204).send();
    } catch (err) {
        return res.status(400).json({
            error: '@comments/remove',
            message: err.message || `Comment not found ${id}`,
        });
    }
};

module.exports = {
    list,
    getById,
    getByMovieId,
    create,
    update,
    remove,
};