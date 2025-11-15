import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Video, Star, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 px-4 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Manage your videos and track your performance</p>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Purchase Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Status</p>
                    <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Pending Verification
                    </Badge>
                  </div>
                  <Link to="/teacher/upload-proof">
                    <Button size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Proof
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Upload your mobile stand purchase proof to start creating videos
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Referral Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Status</p>
                    <Badge variant="outline" className="border-green-500 text-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Your referral has been verified
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Info Alert */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  <strong>Note:</strong> You can upload videos only after your mobile-stand purchase is verified. 
                  Please upload your purchase proof to get started.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/teacher/upload-proof" className="block">
              <Card className="shadow-card hover:shadow-soft transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6 text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Upload Proof</h3>
                  <p className="text-sm text-muted-foreground">
                    Submit purchase verification
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Card className="shadow-card opacity-60 cursor-not-allowed">
              <CardContent className="pt-6 text-center">
                <div className="bg-muted w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Video className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Upload Video</h3>
                <p className="text-sm text-muted-foreground">
                  Available after verification
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card opacity-60 cursor-not-allowed">
              <CardContent className="pt-6 text-center">
                <div className="bg-muted w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Video className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">My Videos</h3>
                <p className="text-sm text-muted-foreground">
                  View all your videos
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card opacity-60 cursor-not-allowed">
              <CardContent className="pt-6 text-center">
                <div className="bg-muted w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">My Reviews</h3>
                <p className="text-sm text-muted-foreground">
                  Check your ratings
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeacherDashboard;
