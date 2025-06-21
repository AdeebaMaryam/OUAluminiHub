"use server"

import { createClient } from "@/lib/supabase/server"
import { getCurrentUser } from "./auth"

export async function createEvent(formData: FormData) {
  const supabase = createClient()
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    event_date: formData.get("event_date") as string,
    location: formData.get("location") as string,
    college_id: (formData.get("college_id") as string) || null,
    created_by: user.id,
  }

  const { data: event, error } = await supabase.from("events").insert(data).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return event
}

export async function getEvents() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("events")
    .select(`
      *,
      colleges(name),
      profiles(full_name)
    `)
    .order("event_date", { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function registerForEvent(eventId: string) {
  const supabase = createClient()
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { error } = await supabase.from("event_registrations").insert({
    event_id: eventId,
    user_id: user.id,
  })

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}

export async function getEventRegistrations(eventId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("event_registrations")
    .select(`
      *,
      profiles(full_name, avatar_url)
    `)
    .eq("event_id", eventId)

  if (error) {
    throw new Error(error.message)
  }

  return data
}
