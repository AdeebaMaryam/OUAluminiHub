"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Building2, Users, MapPin, Calendar, Search, GraduationCap, Award } from "lucide-react"
import { useState } from "react"
import Navigation from "@/components/navigation"

export default function AutonomousCollegesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const autonomousColleges = [
    {
      id: "vasavi-college",
      name: "Vasavi College Of Engineering",
      shortName: "VCE",
      established: 1981,
      location: "9-5-81, Near Taramati Baradari, Ibrahimbagh, Hyderabad - 500 031",
      departments: ["BE", "M Tech"],
      alumni: 45000,
      description: "Premier engineering college with NAAC A++ accreditation and excellent industry connections.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["NAAC A++ accredited", "Top placements", "Research excellence"],
      naacGrade: "A++",
      website: "https://www.vce.ac.in",
      principal: "Prof. S.V. Ramana",
      contact: "9848044843",
    },
    {
      id: "cbit",
      name: "Chaitanya Bharathi Institute of Technology",
      shortName: "CBIT",
      established: 1979,
      location: "Chaitanya Bharathi Post, Kokapet (V), Gandipet (M), Ranga Reddy (Dist), Hyderabad - 500075",
      departments: ["BE/B Tech", "MBA", "MCA", "M Tech", "M.E."],
      alumni: 35000,
      description: "Autonomous engineering institute with NAAC A++ grade, known for quality education and placements.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["NAAC A++ accredited", "Autonomous status", "Industry collaborations"],
      naacGrade: "A++",
      website: "https://www.cbit.ac.in",
      principal: "Dr. C. V. Narsimhulu",
      contact: "9866672744",
    },
    {
      id: "st-francis-women",
      name: "St. Francis College for Women",
      shortName: "SFCW",
      established: 1959,
      location: "Street #6, Uma Nagar, Begumpet, Hyderabad 500016",
      departments: ["BA", "B.Com", "BSc", "MA", "M Com", "MSc", "MBA", "BMS", "B Voc (RM&IT)"],
      alumni: 75000,
      description:
        "Premier women's college with NAAC A accreditation, known for academic excellence and holistic development.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["Women empowerment", "NAAC A accredited", "Strong alumni network"],
      naacGrade: "A",
      website: "https://www.sfc.ac.in",
      principal: "Sr. Sherly",
      contact: "9789002918",
    },
    {
      id: "stanley-college",
      name: "Stanley College of Engineering & Technology for Women",
      shortName: "SCET",
      established: 1980,
      location: "Chapel Road, Abids, Hyderabad",
      departments: ["BE", "MBA", "M E"],
      alumni: 25000,
      description: "Leading women's engineering college with NAAC A accreditation and focus on technical education.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["Women in engineering", "NAAC A accredited", "Technical excellence"],
      naacGrade: "A",
      website: "https://www.stanley.edu.in",
      principal: "Dr. Sathya Prasad",
      contact: "8790001992",
    },
    {
      id: "loyola-academy",
      name: "Loyola Academy (Degree & PG College)",
      shortName: "LA",
      established: 1979,
      location: "Old Alwal, Secunderabad",
      departments: ["BA", "B.Com", "BSC", "BBA", "BCA", "MSC", "MBA", "MCA"],
      alumni: 40000,
      description: "Jesuit institution with NAAC A accreditation, known for value-based education and social service.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["Value-based education", "NAAC A accredited", "Social service"],
      naacGrade: "A",
      website: "https://loyolaacademy.edu.in",
      principal: "Prof. Dr. N. Babu",
      contact: "9392496034",
    },
    {
      id: "methodist-college",
      name: "Methodist College of Engineering and Technology",
      shortName: "MCET",
      established: 1982,
      location: "Kingkoti road, Abids Hyderabad-500001",
      departments: ["B.E", "M.E", "MBA"],
      alumni: 22000,
      description: "Engineering college with NAAC A+ accreditation, emphasis on practical learning and innovation.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["NAAC A+ accredited", "Practical learning", "Industry exposure"],
      naacGrade: "A+",
      website: "https://methodist.edu.in",
      principal: "Dr. G. Prabhu Benkop",
      contact: "9866666651",
    },
    {
      id: "matrusri-engineering",
      name: "Matrusri Engineering College",
      shortName: "MEC",
      established: 1998,
      location: "Saidabad, Hyderabad",
      departments: ["BE", "ME"],
      alumni: 18000,
      description: "Engineering college with NAAC A+ accreditation and modern infrastructure.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["NAAC A+ accredited", "Modern infrastructure", "Industry ready curriculum"],
      naacGrade: "A+",
      website: "https://matrusri.edu.in",
      principal: "Dr. D. Hanumantha Rao",
      contact: "9703230136",
    },
    {
      id: "anwar-ul-uloom",
      name: "Anwar Ul Uloom College",
      shortName: "AUC",
      established: 1956,
      location: "New Mallepally, Hyderabad",
      departments: ["BA", "B.Com", "BSc", "BBA", "MA", "M Com", "MSc"],
      alumni: 35000,
      description: "Historic college with NAAC A+ accreditation, serving the community for decades.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["Historic legacy", "NAAC A+ accredited", "Community service"],
      naacGrade: "A+",
      website: "https://anwarululoom.in",
      principal: "Dr. Shaik Shafeeuddin",
      contact: "9849166230",
    },
  ]

  const filteredColleges = autonomousColleges.filter((college) => {
    if (searchTerm === "") return true

    const searchLower = searchTerm.toLowerCase()
    return (
      college.name.toLowerCase().includes(searchLower) ||
      college.shortName.toLowerCase().includes(searchLower) ||
      college.departments.some((dept) => dept.toLowerCase().includes(searchLower)) ||
      college.description.toLowerCase().includes(searchLower) ||
      college.notable.some((item) => item.toLowerCase().includes(searchLower)) ||
      college.naacGrade?.toLowerCase().includes(searchLower) ||
      college.website?.toLowerCase().includes(searchLower) ||
      college.principal?.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/#colleges" className="hover:text-orange-600">
            Colleges
          </Link>
          <span>/</span>
          <span className="text-orange-600 font-medium">Autonomous Colleges</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Autonomous Colleges</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Self-governing institutions under the OU umbrella, leading innovation in higher education with academic
            freedom and excellence
          </p>
          <div className="flex items-center justify-center space-x-8 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">50+</div>
              <div className="text-sm text-gray-600">Institutions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">5,62,000+</div>
              <div className="text-sm text-gray-600">Alumni</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">Global</div>
              <div className="text-sm text-gray-600">Recognition</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search institutions, departments, or keywords..."
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
                  <Badge className="bg-orange-600 text-white hover:bg-orange-600">{college.shortName}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    {college.naacGrade}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    Est. {college.established}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-gray-900 group-hover:text-orange-600 transition-colors">
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
                  <div className="flex flex-wrap gap-1">
                    {college.notable.map((item, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        <Award className="h-2 w-2 mr-1" />
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <Link href={`/colleges/autonomous/${college.id}`}>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      View Institution Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Autonomous Excellence */}
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Autonomous Excellence</h3>
            <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
              These institutions enjoy academic freedom and self-governance while maintaining the highest standards of
              education, research, and innovation.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">Academic Freedom</h4>
                <p className="text-sm text-orange-100">Self-designed curricula and innovative teaching methods</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">Research Leadership</h4>
                <p className="text-sm text-orange-100">Cutting-edge research and development initiatives</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">Global Standards</h4>
                <p className="text-sm text-orange-100">International collaborations and world-class facilities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
