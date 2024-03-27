import React, { useState, useEffect } from 'react';
import BlogPost from '@/types/BlogPost';
import { useTranslation } from "@/contexts/TranslationsContext";
import Link from 'next/link';

const FeaturedPosts = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);


  useEffect(() => {
    const fetchBlogPosts = async () => {  
      fetchApiData().then((data) => setPosts(data?.posts));
    };

    fetchBlogPosts();
  }, []);

  const fetchApiData = async () => {
    const USE_MOCK_DATA = false;
    if (USE_MOCK_DATA) {

      // Mock data with 800 word content
      const blogPosts: BlogPost[] = [
        {
          Posts_id: 1,
          title: 'Post Title 1',
          summary: 'Post summary 1',
          content: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
          imageUrl: 'https://via.placeholder.com/600',
        },
        {
          Posts_id: 2,
          title: 'Post Title 2',
          summary: 'Post summary 2',
          content: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
          imageUrl: 'https://via.placeholder.com/600',
        },
      ];
      return blogPosts;
    }

    try {
      const response = await fetch(`/api/posts`, {
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
    <>
      <h2 className="section-header">{t?.('featured_stories')}</h2>
      <div className="featured-posts">
        {posts?.map((post) => (
          <div key={post.Posts_id} className="post">
            {post.imageUrl && (
              <img src={post.imageUrl} alt={post.title} className="post-image" />
            )}
            <div className="post-details">
              <h2 className="title">{post.title}</h2>
              <p className="intro-text">
                {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
              </p>
              <Link href={`/blog/${post.Posts_id}`} className="read-more">
                {t?.('read_more')}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedPosts;
