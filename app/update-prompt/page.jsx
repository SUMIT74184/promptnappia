'use client'
import React, { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
import { useRouter,useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  // const { data: session } = useSession();  // Retrieve session data
  const searchparams=useSearchParams();
  const promptId=searchparams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });
  useEffect(()=>{
    const getPromptDetails=async()=>{
      const response=await fetch(`/api/prompt/${promptId}`)
      const data=await response.json();

      setPost({
        prompt:data.prompt,
        tag:data.tag,
      })
    }
    if(promptId) getPromptDetails()

  },[promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

 if(!promptId) return alert('Prompt ID is not found');
 

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',  // Set content-type header
        },
        body: JSON.stringify({
          prompt: post.prompt,
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}  // Pass the handleSubmit function
    />
  );
};

export default EditPrompt;
