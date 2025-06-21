"use server"

import { createClient } from "@/lib/supabase/server"
import { getCurrentUser } from "./auth"

export async function createChatGroup(formData: FormData) {
  const supabase = createClient()
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    type: formData.get("type") as string,
    college_id: (formData.get("college_id") as string) || null,
    created_by: user.id,
  }

  const { data: group, error } = await supabase.from("chat_groups").insert(data).select().single()

  if (error) {
    throw new Error(error.message)
  }

  // Add creator as member
  await supabase.from("group_members").insert({
    group_id: group.id,
    user_id: user.id,
    role: "admin",
  })

  return group
}

export async function joinChatGroup(groupId: string) {
  const supabase = createClient()
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { error } = await supabase.from("group_members").insert({
    group_id: groupId,
    user_id: user.id,
    role: "member",
  })

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}

export async function sendMessage(formData: FormData) {
  const supabase = createClient()
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const data = {
    content: formData.get("content") as string,
    group_id: formData.get("group_id") as string,
    sender_id: user.id,
  }

  const { error } = await supabase.from("messages").insert(data)

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}

export async function getChatGroups() {
  const supabase = createClient()
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { data, error } = await supabase
    .from("chat_groups")
    .select(`
      *,
      group_members!inner(user_id),
      colleges(name)
    `)
    .eq("group_members.user_id", user.id)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getGroupMessages(groupId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("messages")
    .select(`
      *,
      profiles(full_name, avatar_url)
    `)
    .eq("group_id", groupId)
    .order("created_at", { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
