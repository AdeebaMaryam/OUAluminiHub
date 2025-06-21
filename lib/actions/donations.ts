"use server"

import { createClient } from "@/lib/supabase/server"
import { getCurrentUser } from "./auth"

export async function createDonation(formData: FormData) {
  const supabase = createClient()
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const data = {
    amount: Number.parseFloat(formData.get("amount") as string),
    purpose: formData.get("purpose") as string,
    college_id: (formData.get("college_id") as string) || null,
    donor_id: user.id,
    status: "pending",
  }

  const { data: donation, error } = await supabase.from("donations").insert(data).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return donation
}

export async function getDonations() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("donations")
    .select(`
      *,
      profiles(full_name),
      colleges(name)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getDonationStats() {
  const supabase = createClient()

  const { data, error } = await supabase.from("donations").select("amount, status").eq("status", "completed")

  if (error) {
    throw new Error(error.message)
  }

  const totalAmount = data.reduce((sum, donation) => sum + donation.amount, 0)
  const totalDonations = data.length

  return { totalAmount, totalDonations }
}
