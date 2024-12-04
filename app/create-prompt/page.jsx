'use client'
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();  // Retrieve session data

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Ensure session is available before proceeding
    if (!session) {
      alert('You must be logged in to create a prompt!');
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Set content-type header
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session.user.id,  // Use session user ID
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');  // Redirect to home on success
      } else {
        console.log('Error creating prompt:', response.statusText);
      }
    } catch (error) {
      console.error('Error during prompt creation:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}  // Pass the handleSubmit function
    />
  );
};

export default CreatePrompt;
