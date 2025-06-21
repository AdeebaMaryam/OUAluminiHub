"use server"

import { createClient } from "@/lib/supabase/server"
import { getCurrentUser } from "./auth"

export async function sendConnectionRequest(targetUserId: string) {
  const supabase = createClient()
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { error } = await supabase.from("connections").insert({
    requester_id: user.id,
    addressee_id: targetUserId,
    status: "pending",
  })

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}

export async function acceptConnectionRequest(connectionId: string) {
  const supabase = createClient()

  const { error } = await supabase.from("connections").update({ status: "accepted" }).eq("id", connectionId)

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}

export async function getConnections() {
  const supabase = createClient()
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { data, error } = await supabase
    .from("connections")
    .select(`
      *,
      requester:profiles!connections_requester_id_fkey(full_name, avatar_url),
      addressee:profiles!connections_addressee_id_fkey(full_name, avatar_url)
    `)
    .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`)
    .eq("status", "accepted")

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getPendingRequests() {
  const supabase = createClient()
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { data, error } = await supabase
    .from("connections")
    .select(`
      *,
      requester:profiles!connections_requester_id_fkey(full_name, avatar_url)
    `)
    .eq("addressee_id", user.id)
    .eq("status", "pending")

  if (error) {
    throw new Error(error.message)
  }

  return data
}
