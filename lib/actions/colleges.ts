"use server"

import { createClient } from "@/lib/supabase/server"

export async function getColleges() {
  const supabase = createClient()

  const { data, error } = await supabase.from("colleges").select("*").order("name")

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getCollegesByType(type: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("colleges").select("*").eq("type", type).order("name")

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getCollegeById(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("colleges").select("*").eq("id", id).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getCollegeAlumni(collegeId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("college_id", collegeId)
    .order("graduation_year", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
