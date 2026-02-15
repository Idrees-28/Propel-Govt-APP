import { useState } from "react";
import { addComplaint } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { MapPin, Upload } from "lucide-react";

const categories = ["Roads", "Water Supply", "Electricity", "Sanitation"] as const;

const RegisterComplaint = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", category: "", location: "", description: "", citizenName: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.location || !form.description || !form.citizenName) {
      toast.error("Please fill all required fields");
      return;
    }
    const id = `CMP-${String(Math.floor(Math.random() * 900) + 100)}`;
    addComplaint({
      id,
      title: form.title,
      description: form.description,
      category: form.category as any,
      location: form.location,
      status: "Registered",
      date: new Date().toISOString().split("T")[0],
      citizen: form.citizenName,
      department: form.category,
    });
    toast.success(`Complaint ${id} registered successfully!`);
    setTimeout(() => navigate("/track"), 1500);
  };

  return (
    <div className="container py-12 max-w-2xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-heading font-bold">Register a Complaint</h1>
        <p className="text-muted-foreground mt-2">Describe your civic issue and we'll ensure it reaches the right department.</p>
      </div>

      <Card className="animate-fade-in" style={{ animationDelay: "150ms" }}>
        <CardHeader>
          <CardTitle className="font-heading">Complaint Details</CardTitle>
          <CardDescription>Fields marked with * are required</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input id="name" placeholder="Full name" value={form.citizenName} onChange={(e) => setForm({ ...form, citizenName: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="10-digit number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Complaint Title *</Label>
              <Input id="title" placeholder="Brief title of the issue" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <Input id="location" placeholder="Area, street, landmark" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="pr-10" />
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">Description *</Label>
              <Textarea id="desc" rows={4} placeholder="Describe the issue in detail..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label>Attach Photo (optional)</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload or drag & drop</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full font-semibold">
              Submit Complaint
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterComplaint;
