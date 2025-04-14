const BlogTag = ({ tag }) => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer">
      #{tag}
    </span>
  );
  
export default BlogTag;