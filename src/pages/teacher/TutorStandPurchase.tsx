import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CreditCard, CheckCircle, Clock, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TutorStandPurchase = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [purchaseStatus, setPurchaseStatus] = useState<"not_started" | "pending" | "verified" | "rejected">("not_started");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    // Load purchase status from localStorage
    const status = localStorage.getItem("tutorStandPurchaseStatus") || "not_started";
    setPurchaseStatus(status as any);
    
    const savedScreenshot = localStorage.getItem("tutorStandScreenshot");
    if (savedScreenshot) {
      setPreviewUrl(savedScreenshot);
    }
  }, []);

  const handleRazorpayPayment = () => {
    // Mock Razorpay integration
    toast({
      title: "Payment Initiated",
      description: "Opening Razorpay checkout (demo mode)...",
    });

    // Simulate payment success after 2 seconds
    setTimeout(() => {
      const mockOrderId = `order_${Date.now()}`;
      const mockPaymentId = `pay_${Date.now()}`;
      
      localStorage.setItem("tutorStandPurchaseStatus", "pending");
      localStorage.setItem("razorpayOrderId", mockOrderId);
      localStorage.setItem("razorpayPaymentId", mockPaymentId);
      localStorage.setItem("purchaseDate", new Date().toISOString());
      
      setPurchaseStatus("pending");
      
      toast({
        title: "Payment Successful!",
        description: "Your purchase is pending verification by admin.",
      });
    }, 2000);
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitScreenshot = () => {
    if (!screenshot && !previewUrl) {
      toast({
        title: "Error",
        description: "Please upload a payment screenshot first.",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("tutorStandPurchaseStatus", "pending");
    localStorage.setItem("tutorStandScreenshot", previewUrl);
    localStorage.setItem("purchaseDate", new Date().toISOString());
    
    setPurchaseStatus("pending");
    
    toast({
      title: "Screenshot Submitted!",
      description: "Your purchase is pending verification by admin.",
    });
  };

  const getStatusBadge = () => {
    switch (purchaseStatus) {
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-700">
            <Clock className="h-3 w-3 mr-1" />
            Pending Verification
          </Badge>
        );
      case "verified":
        return (
          <Badge variant="outline" className="border-green-500 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="border-red-500 text-red-700">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 px-4 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/teacher/dashboard")}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Purchase Tutor Stand</h1>
            <p className="text-muted-foreground">
              Purchase the Tutor Stand to start uploading educational videos
            </p>
          </div>

          {/* Status Section */}
          {purchaseStatus !== "not_started" && (
            <Card className="mb-6 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Purchase Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Current Status</p>
                    {getStatusBadge()}
                  </div>
                  {purchaseStatus === "verified" && (
                    <Button onClick={() => navigate("/teacher/dashboard")}>
                      Go to Dashboard
                    </Button>
                  )}
                </div>
                {purchaseStatus === "pending" && (
                  <p className="text-sm text-muted-foreground mt-4">
                    Your purchase is under review. You'll be notified once verified.
                  </p>
                )}
                {purchaseStatus === "rejected" && (
                  <p className="text-sm text-muted-foreground mt-4">
                    Your purchase proof was rejected. Please contact support or try again.
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Product Section */}
          <Card className="mb-6 shadow-card">
            <CardHeader>
              <CardTitle>Easy Mount Tutor Stand</CardTitle>
              <CardDescription>Professional setup for quality video creation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-muted rounded-lg flex items-center justify-center h-64">
                  <div className="text-center text-muted-foreground">
                    <Upload className="h-16 w-16 mx-auto mb-2" />
                    <p>Product Image</p>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <p className="text-3xl font-bold text-primary">₹299</p>
                    <p className="text-sm text-muted-foreground">One-time purchase</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <h4 className="font-semibold">Description:</h4>
                    <p className="text-muted-foreground">
                      The Easy Mount Tutor Stand is a versatile and user-friendly stand designed to 
                      securely hold devices like tablets, phones, or learning machines, making it 
                      ideal for educational environments and online learning sessions. It features 
                      an adjustable, non-slip design that supports a range of device sizes and 
                      provides stable, hands-free access while studying, teaching, or attending 
                      virtual classes.
                    </p>
                  </div>
                  <div className="mt-6 space-y-2">
                    <h4 className="font-semibold text-sm">Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Adjustable viewing angles</li>
                      <li>Non-slip base for stability</li>
                      <li>Compatible with all phone sizes</li>
                      <li>Lightweight and portable</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Section */}
          {purchaseStatus === "not_started" || purchaseStatus === "rejected" ? (
            <>
              {/* Razorpay Payment */}
              <Card className="mb-6 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Pay with Razorpay
                  </CardTitle>
                  <CardDescription>Secure and instant payment verification</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleRazorpayPayment} 
                    size="lg" 
                    className="w-full"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pay ₹299 via Razorpay
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    (Demo mode - simulates payment)
                  </p>
                </CardContent>
              </Card>

              {/* UPI Payment Fallback */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Alternative: UPI Payment</CardTitle>
                  <CardDescription>Pay via UPI and upload payment screenshot</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">UPI ID:</Label>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-mono text-sm">edutech@upi</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Or scan QR Code:</Label>
                    <div className="bg-muted rounded-lg flex items-center justify-center h-48">
                      <p className="text-muted-foreground text-sm">QR Code Placeholder</p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="screenshot" className="text-sm font-semibold mb-2 block">
                      Upload Payment Screenshot:
                    </Label>
                    <Input
                      id="screenshot"
                      type="file"
                      accept="image/*"
                      onChange={handleScreenshotUpload}
                      className="cursor-pointer"
                    />
                    {previewUrl && (
                      <div className="mt-3">
                        <img 
                          src={previewUrl} 
                          alt="Payment screenshot preview" 
                          className="max-h-48 rounded-md border"
                        />
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={handleSubmitScreenshot} 
                    size="lg" 
                    className="w-full"
                    disabled={!screenshot && !previewUrl}
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Submit Screenshot
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TutorStandPurchase;
