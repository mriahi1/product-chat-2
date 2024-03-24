import React from 'react';
import BlogPost from '@/types/BlogPost';
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';

interface BlogPostProps {
}

const FullBlogPost: React.FC<BlogPostProps> = () => {

    const searchParams = useSearchParams();
    const postId = searchParams?.get('id') ?? '';
    const [post, setPost] = useState<BlogPost>();

    useEffect(() => {
      const fetchBlogPosts = async () => {  
        fetchApiData().then((data) => setPost(data));
      };
  
      fetchBlogPosts();
    }, []);
  
    const fetchApiData = async () => {
      const USE_MOCK_DATA = true;
      if (USE_MOCK_DATA) {
  
        // Mock data with 800 word content
        const post: BlogPost = {
          id: 1,
          title: 'Post Title 1',
          summary: 'Post summary 1',
          content: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
          imageUrl: 'https://via.placeholder.com/600',
        }
        return post;
      }
  
      try {
        const response = await fetch(`/api/posts/` + postId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {}),
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
    <div className="blog-post">
      {post && (
        <>
          <img src={post.imageUrl} alt={post.title} />
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </>
      )}
    </div>
  );
};

export default FullBlogPost;
