import { Link } from "react-router-dom";
import { FileText, Search, BarChart3, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-city.jpg";

const features = [
  { icon: FileText, title: "Register Complaints", desc: "Submit civic issues like road damage, water supply problems, and more with just a few clicks." },
  { icon: Search, title: "Track Status", desc: "Monitor your complaint in real-time through every stage from registration to resolution." },
  { icon: BarChart3, title: "City Analytics", desc: "View department performance, resolution times, and complaint trends across the city." },
  { icon: Shield, title: "Transparent Governance", desc: "Ensuring accountability with a clear view of complaint handling and resolution." },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Smart city" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="container relative z-10 py-24 md:py-36">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground leading-tight">
              Smart City Complaint & Service Portal
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              A transparent, accountable platform connecting citizens with city authorities for faster issue resolution.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
                <Link to="/register">
                  Report an Issue <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/track">Track Complaint</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-card border-b">
        <div className="container py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Total Complaints", value: "0" },
            { label: "Resolved", value: "10" },
            { label: "In Progress", value: "0" },
            { label: "Avg. Resolution", value: "0" },
          ].map((s, i) => (
            <div key={i} className="text-center animate-count-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-2xl md:text-3xl font-heading font-bold text-primary">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">How It Works</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            A simple 4-step process to ensure every civic issue is heard, tracked, and resolved.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl bg-card border hover:border-primary/40 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="container py-16 text-center">
          <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">
            Ready to make your city better?
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Report civic issues, track progress, and help build a smarter, cleaner city for everyone.
          </p>
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
            <Link to="/register">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          © 2026 Smart City Portal. All rights reserved. | Government of India Initiative
        </div>
      </footer>
    </div>
  );
};

export default Index;
