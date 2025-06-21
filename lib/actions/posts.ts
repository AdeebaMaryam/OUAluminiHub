"use server"

import { createClient } from "@/lib/supabase/server"
import { getCurrentUser } from "./auth"

export async function createPost(formData: FormData) {
  const supabase = createClient()
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const data = {
    content: formData.get("content") as string,
    author_id: user.id,
  }

  const { data: post, error } = await supabase.from("posts").insert(data).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return post
}

export async function getPosts() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("posts")
    .select(`
      *,
      profiles(full_name, avatar_url),
      post_likes(count),
      post_comments(count)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function likePost(postId: string) {
  const supabase = createClient()
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { error } = await supabase.from("post_likes").insert({
    post_id: postId,
    user_id: user.id,
  })

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}

export async function addComment(formData: FormData) {
  const supabase = createClient()
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const data = {
    content: formData.get("content") as string,
    post_id: formData.get("post_id") as string,
    author_id: user.id,
  }

  const { error } = await supabase.from("post_comments").insert(data)

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}
