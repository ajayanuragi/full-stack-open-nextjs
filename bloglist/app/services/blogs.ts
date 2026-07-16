const blogs = [
  {
    id: 1,
    title: "Simple App",
    author: "Ajay",
    url: "https://example.com/simple-app",
    likes: 12,
  },
  {
    id: 2,
    title: "Learning React",
    author: "Priya",
    url: "https://example.com/learning-react",
    likes: 25,
  },
  {
    id: 3,
    title: "Node.js Basics",
    author: "Rahul",
    url: "https://example.com/nodejs-basics",
    likes: 18,
  },
  {
    id: 4,
    title: "Understanding Express",
    author: "Neha",
    url: "https://example.com/understanding-express",
    likes: 30,
  },
  {
    id: 5,
    title: "JavaScript Tips",
    author: "Karan",
    url: "https://example.com/javascript-tips",
    likes: 9,
  },
];

let nextBlogId = 6;

export const getBlogs = () => {
  return blogs;
};
export const addBlog = (
  title: string,
  author: string,
  url: string,
  likes: number,
) => {
  blogs.push({
    id: nextBlogId++,
    title,
    author,
    url,
    likes,
  });
};
