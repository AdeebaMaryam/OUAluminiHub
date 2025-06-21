"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Building2, Users, MapPin, Calendar, Search, GraduationCap } from "lucide-react"
import { useState } from "react"
import Navigation from "@/components/navigation"

export default function CampusCollegesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const campusColleges = [
    {
      id: "uce",
      name: "University College of Engineering",
      shortName: "UCE",
      established: 1929,
      location: "OU Campus, Hyderabad - 500007",
      departments: [
        "Computer Science & Engineering",
        "Electronics & Communication",
        "Mechanical Engineering",
        "Civil Engineering",
        "Chemical Engineering",
        "Electrical & Electronics Engineering",
      ],
      alumni: 50000,
      description: "Premier engineering college within OU campus, known for producing top engineers globally.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["First engineering college in Hyderabad", "NAAC A+ accredited", "Alumni in Fortune 500 companies"],
      naacGrade: "A+",
      website: "https://www.uceou.edu",
    },
    {
      id: "uct",
      name: "University College of Technology",
      shortName: "UCT",
      established: 1969,
      location: "OU Campus, Hyderabad - 500007",
      departments: ["Biotechnology", "Food Technology", "Pharmaceutical Technology", "Information Technology"],
      alumni: 25000,
      description: "Leading technology college focusing on emerging technologies and innovation.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["NAAC A+ accredited", "Pioneer in biotechnology education", "Strong industry partnerships"],
      naacGrade: "A+",
      website: "https://www.ouct.ac.in",
    },
    {
      id: "ucl",
      name: "University College of Law",
      shortName: "UCL",
      established: 1922,
      location: "OU Campus, Hyderabad - 500007",
      departments: ["Constitutional Law", "Criminal Law", "Corporate Law", "International Law"],
      alumni: 18000,
      description: "One of the oldest law colleges in India, producing distinguished lawyers and judges.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["Historic legal education legacy", "Alumni in Supreme Court", "Century-old institution"],
      naacGrade: "A",
      website: "https://www.osmania.ac.in",
    },
    {
      id: "ucc",
      name: "University College of Commerce & Business Management",
      shortName: "UCC",
      established: 1918,
      location: "OU Campus, Hyderabad - 500007",
      departments: ["Commerce", "Business Administration", "Management Studies", "Economics"],
      alumni: 35000,
      description: "Premier commerce college fostering business leaders and entrepreneurs.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["Oldest commerce college in Telangana", "Strong alumni network in business", "Century of excellence"],
      naacGrade: "A",
      website: "https://www.osmania.ac.in",
    },
    {
      id: "ucas",
      name: "University College of Arts & Social Sciences",
      shortName: "UCAS",
      established: 1918,
      location: "OU Campus, Hyderabad - 500007",
      departments: ["History", "Political Science", "Sociology", "Psychology", "English Literature", "Urdu"],
      alumni: 28000,
      description: "Hub for humanities and social sciences education with rich academic tradition.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["Rich literary tradition", "Alumni in civil services", "Cultural heritage center"],
      naacGrade: "A",
      website: "https://www.osmania.ac.in",
    },
    {
      id: "ucs",
      name: "University College of Science",
      shortName: "UCS",
      established: 1920,
      location: "OU Campus, Hyderabad - 500007",
      departments: ["Physics", "Chemistry", "Mathematics", "Botany", "Zoology", "Geology"],
      alumni: 22000,
      description: "Leading science college with strong research focus and laboratory facilities.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["Research excellence", "Alumni in ISRO and DRDO", "State-of-the-art labs"],
      naacGrade: "A",
      website: "https://www.osmania.ac.in",
    },
    {
      id: "ucps",
      name: "University College of Pharmaceutical Sciences",
      shortName: "UCPS",
      established: 1951,
      location: "OU Campus, Hyderabad - 500007",
      departments: ["Pharmacy", "Pharmaceutical Chemistry", "Pharmacology", "Pharmaceutics"],
      alumni: 15000,
      description: "Premier pharmacy college contributing to healthcare and pharmaceutical industry.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["Leading pharmacy education", "Industry partnerships", "Healthcare innovation"],
      naacGrade: "A",
      website: "https://www.osmania.ac.in",
    },
  ]

  const filteredColleges = campusColleges.filter((college) => {
    if (searchTerm === "") return true

    const searchLower = searchTerm.toLowerCase()
    return (
      college.name.toLowerCase().includes(searchLower) ||
      college.shortName.toLowerCase().includes(searchLower) ||
      college.departments.some((dept) => dept.toLowerCase().includes(searchLower)) ||
      college.description.toLowerCase().includes(searchLower) ||
      college.notable.some((item) => item.toLowerCase().includes(searchLower))
    )
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/#colleges" className="hover:text-blue-600">
            Colleges
          </Link>
          <span>/</span>
          <span className="text-blue-600 font-medium">Campus Colleges</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Campus Colleges</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Colleges within the main Osmania University campus - the heart of academic excellence since 1918
          </p>
          <div className="flex items-center justify-center space-x-8 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">15+</div>
              <div className="text-sm text-gray-600">Colleges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1,88,000+</div>
              <div className="text-sm text-gray-600">Alumni</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1600</div>
              <div className="text-sm text-gray-600">Acres Campus</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search colleges, departments, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setSearchTerm("")}
              >
                ×
              </Button>
            )}
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              Showing {filteredColleges.length} results for "{searchTerm}"
            </p>
          )}
        </div>

        {/* Colleges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={college.image || "/placeholder.svg"}
                  alt={college.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 text-white hover:bg-blue-600">{college.shortName}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    Est. {college.established}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                  {college.name}
                </CardTitle>
                <p className="text-gray-600 text-sm">{college.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {college.location}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {college.alumni.toLocaleString()} Alumni
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Established {college.established}
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-gray-800 mb-2">Departments:</h4>
                  <div className="flex flex-wrap gap-1">
                    {college.departments.slice(0, 3).map((dept, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {dept}
                      </Badge>
                    ))}
                    {college.departments.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{college.departments.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-gray-800 mb-2">Notable:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {college.notable.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <Link href={`/colleges/campus/${college.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      View College Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Campus Heritage */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Historic OU Campus</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              The main campus of Osmania University, spread across 1600 acres, houses these prestigious colleges that
              have been the cornerstone of higher education in the Deccan region for over a century.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">Academic Excellence</h4>
                <p className="text-sm text-blue-100">Rigorous academic programs with distinguished faculty</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">Research Focus</h4>
                <p className="text-sm text-blue-100">Cutting-edge research facilities and innovation centers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">Global Alumni</h4>
                <p className="text-sm text-blue-100">Alumni leading organizations worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
