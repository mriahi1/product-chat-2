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
      const USE_MOCK_DATA = false;
      if (USE_MOCK_DATA) {
  
        // Mock data with 800 word content
        const post: BlogPost = {
          Posts_id: 1,
          title: 'Post Title 1',
          summary: 'Post summary 1',
          content: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
          imageUrl: 'https://via.placeholder.com/600',
        }
        return post;
      }
  
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
