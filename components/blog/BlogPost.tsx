import BlogPost from '@/types/BlogPost';
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react';

interface BlogPostProps {
}

const FullBlogPost: React.FC<BlogPostProps> = () => {

    const postId = useParams()?.id;
    const [post, setPost] = useState<BlogPost>();

    const fetchBlogPosts = async () => {  
      const data = await fetchApiData();
      const matchedPost = findPostById(data?.posts, postId);
      setPost(matchedPost);
    };

    const findPostById = (posts: BlogPost[], id: any) => {
      return posts.find((post: BlogPost) => post.Posts_id === id);
    };

    useEffect(() => {
      fetchBlogPosts();
    }, []);
  
    const fetchApiData = async () => {
      try {
        // `/api/posts/` + postId
        const response = await fetch(`/api/posts/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("API response: not ok");
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching from API:", error);
        return null;
      }
    };

  return (
    <div className="blog-post-detail">
      {post && (
        <>
          {post.imageUrl && (
            <img src={post.imageUrl} alt={post.title} />
          )}
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </>
      )}
    </div>
  );
};

export default FullBlogPost;
