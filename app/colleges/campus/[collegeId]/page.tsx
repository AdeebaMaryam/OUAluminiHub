"use client"

import { use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  Network,
  TrendingUp,
  Globe,
  Heart,
  MessageCircle,
} from "lucide-react"
import Navigation from "@/components/navigation"

interface PageProps {
  params: Promise<{ collegeId: string }>
}

export default function CollegeDetailPage({ params }: PageProps) {
  const { collegeId } = use(params)

  // College data
  const collegeData: Record<string, any> = {
    uce: {
      name: "University College of Engineering",
      shortName: "UCE",
      established: 1929,
      location: "OU Campus, Hyderabad - 500007",
      description: "Premier engineering college within OU campus, known for producing top engineers globally.",
      image: "/placeholder.svg?height=400&width=600",
      alumni: 50000,
      departments: [
        { name: "Computer Science & Engineering", alumni: 15000, established: 1980 },
        { name: "Electronics & Communication Engineering", alumni: 12000, established: 1960 },
        { name: "Mechanical Engineering", alumni: 8000, established: 1929 },
        { name: "Civil Engineering", alumni: 7000, established: 1929 },
        { name: "Chemical Engineering", alumni: 4000, established: 1965 },
        { name: "Electrical & Electronics Engineering", alumni: 4000, established: 1950 },
      ],
      achievements: [
        "First engineering college in Hyderabad",
        "NAAC A+ accredited",
        "NBA accredited programs",
        "Alumni in Fortune 500 companies",
        "Strong industry partnerships",
      ],
      notableAlumni: [
        { name: "Satya Nadella", position: "CEO, Microsoft", batch: "1988", department: "Electrical Engineering" },
        { name: "Rajeev Suri", position: "Former CEO, Nokia", batch: "1989", department: "Electronics Engineering" },
        { name: "Shantanu Narayen", position: "CEO, Adobe", batch: "1986", department: "Computer Science" },
      ],
      stats: {
        totalAlumni: 50000,
        countries: 45,
        companies: 2500,
        startups: 450,
      },
      activeCampaigns: [
        {
          id: 1,
          title: "UCE Lab Modernization Fund",
          description: "Upgrade laboratory equipment and infrastructure for better learning experiences",
          target: 5000000,
          raised: 3250000,
          donors: 245,
          daysLeft: 45,
        },
        {
          id: 2,
          title: "UCE Student Scholarship Fund",
          description: "Support deserving UCE students with financial assistance",
          target: 2000000,
          raised: 1650000,
          donors: 189,
          daysLeft: 60,
        },
      ],
      recentAlumni: [
        { name: "Rajesh Kumar", batch: "2015", department: "CSE", company: "Google", location: "Bangalore" },
        { name: "Priya Sharma", batch: "2018", department: "ECE", company: "Microsoft", location: "Hyderabad" },
        { name: "Arjun Reddy", batch: "2020", department: "Mechanical", company: "Tesla", location: "USA" },
        { name: "Kavitha Rao", batch: "2017", department: "Civil", company: "L&T", location: "Chennai" },
      ],
    },
  }

  const college = collegeData[collegeId]

  if (!college) {
    return <div>College not found</div>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

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
          <Link href="/colleges/campus" className="hover:text-blue-600">
            Campus Colleges
          </Link>
          <span>/</span>
          <span className="text-blue-600 font-medium">{college.shortName}</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <img
            src={college.image || "/placeholder.svg"}
            alt={college.name}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 flex items-center">
            <div className="container mx-auto px-8">
              <div className="max-w-2xl text-white">
                <Badge className="mb-4 bg-white/20 text-white hover:bg-white/20">Est. {college.established}</Badge>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">{college.name}</h1>
                <p className="text-xl text-blue-100 mb-6">{college.description}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={`/directory?college=${collegeId}`}>
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                      <Network className="h-4 w-4 mr-2" />
                      Find {college.shortName} Alumni
                    </Button>
                  </Link>
                  <Link href={`/colleges/campus/${collegeId}/donate`}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-blue-600"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Support {college.shortName}
                    </Button>
                  </Link>
                  <Link href={`/chat/groups/${collegeId}`}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-blue-600"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Join {college.shortName} Chat
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{college.stats.totalAlumni.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Alumni</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{college.stats.countries}</div>
              <div className="text-sm text-gray-600">Countries</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{college.stats.companies.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Companies</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{college.stats.startups}</div>
              <div className="text-sm text-gray-600">Startups Founded</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="alumni" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="alumni">Find Alumni</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="notable">Notable Alumni</TabsTrigger>
            <TabsTrigger value="donate">Donate</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
          </TabsList>

          <TabsContent value="alumni" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Network className="h-5 w-5 text-blue-600 mr-2" />
                      Recent {college.shortName} Alumni
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {college.recentAlumni.map((alumni: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {alumni.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{alumni.name}</h3>
                            <p className="text-sm text-gray-600">
                              {alumni.department} • Class of {alumni.batch}
                            </p>
                            <p className="text-sm text-gray-500">
                              {alumni.company} • {alumni.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Connect
                          </Button>
                          <Button size="sm" variant="outline">
                            Message
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Search Alumni</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Link href={`/directory?college=${collegeId}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Network className="h-4 w-4 mr-2" />
                        Browse All {college.shortName} Alumni
                      </Button>
                    </Link>
                    <Link href={`/directory?college=${collegeId}&department=Computer Science`}>
                      <Button variant="outline" className="w-full">
                        Find CSE Alumni
                      </Button>
                    </Link>
                    <Link href={`/directory?college=${collegeId}&batch=2020`}>
                      <Button variant="outline" className="w-full">
                        Find Recent Graduates
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {college.departments.map((dept: any, index: number) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                      {dept.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Alumni Count:</span>
                        <span className="font-semibold">{dept.alumni.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Established:</span>
                        <span className="font-semibold">{dept.established}</span>
                      </div>
                      <Link href={`/directory?college=${collegeId}&department=${dept.name}`}>
                        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                          <Network className="h-4 w-4 mr-2" />
                          Find Alumni
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notable" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {college.notableAlumni.map((alumni: any, index: number) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {alumni.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{alumni.name}</h3>
                        <p className="text-sm text-gray-600">{alumni.position}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Batch:</span>
                        <span className="font-medium">{alumni.batch}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Department:</span>
                        <span className="font-medium">{alumni.department}</span>
                      </div>
                    </div>
                    <Badge className="mt-3 bg-blue-100 text-blue-800 hover:bg-blue-100">Global Leader</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="donate" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {college.activeCampaigns.map((campaign: any) => (
                <Card key={campaign.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                      <p className="text-gray-600 mb-3">{campaign.description}</p>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          {formatCurrency(campaign.raised)} raised of {formatCurrency(campaign.target)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {Math.round((campaign.raised / campaign.target) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${(campaign.raised / campaign.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                      <span>{campaign.donors} donors</span>
                      <span>{campaign.daysLeft} days left</span>
                    </div>

                    <Link href={`/colleges/campus/${collegeId}/donate?campaign=${campaign.id}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Heart className="h-4 w-4 mr-2" />
                        Donate Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-8 text-center">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Support Your Alma Mater</h4>
                <p className="text-gray-600 mb-6">
                  Your contribution helps build a brighter future for current and future {college.shortName} students.
                </p>
                <Link href={`/colleges/campus/${collegeId}/donate`}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Heart className="h-4 w-4 mr-2" />
                    View All Campaigns
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Network className="h-5 w-5 text-blue-600 mr-2" />
                    Alumni Directory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Search and connect with {college.stats.totalAlumni.toLocaleString()} {college.shortName} alumni by
                    graduation year, department, location, or industry.
                  </p>
                  <Link href={`/directory?college=${collegeId}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Browse Alumni Directory</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 text-green-600 mr-2" />
                    Join Alumni Groups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Join department-specific or batch-specific groups to stay connected with your {college.shortName}{" "}
                    peers.
                  </p>
                  <Link href={`/chat/groups/${collegeId}`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Join Chat Groups</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-8 text-center">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Ready to Connect?</h4>
                <p className="text-gray-600 mb-6">
                  Start networking with your fellow {college.shortName} alumni today and unlock new opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={`/directory?college=${collegeId}`}>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      <Network className="h-4 w-4 mr-2" />
                      Start Networking
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button size="lg" variant="outline">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Update Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
