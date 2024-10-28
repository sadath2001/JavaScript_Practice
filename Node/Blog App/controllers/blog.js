const Blog = require("../models/blog");
const Comment = require("../models/comments");
async function createBlog(req, res) {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title: title,
    body: body,
    coverImageURL: `/uploads/${req.file.filename}`,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${blog._id}`);
}

async function getBlogById(req, res) {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
}

async function commentBlog(req, res) {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
}

module.exports = {
  createBlog,
  getBlogById,
  commentBlog,
};
