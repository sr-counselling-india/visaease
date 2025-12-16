"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Globe2, ShieldCheck, Plane } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-textDark font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl opacity-50" />
        </div>
        
        <div className="container mx-auto px-6">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Powered by SR Counselling
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 text-textDark leading-[1.1]">
              Your Gateway to the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-accent">
                Global Experience
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg text-textLight mb-10 max-w-2xl mx-auto leading-relaxed">
              VisaEase simplifies the complexities of international travel. 
              Whether it's for education, tourism, or business, we streamline your visa process with expert guidance from SR Counselling.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/countries">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-14 group">
                  Start Process Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto h-14">
                Learn More
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-16 pt-8 border-t border-border flex flex-wrap justify-center gap-8 md:gap-16 text-textLight/80">
               <div className="flex items-center gap-2">
                 <ShieldCheck className="h-5 w-5 text-primary" />
                 <span className="font-medium">98% Success Rate</span>
               </div>
               <div className="flex items-center gap-2">
                 <Globe2 className="h-5 w-5 text-primary" />
                 <span className="font-medium">50+ Countries</span>
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="h-5 w-5 text-primary" />
                 <span className="font-medium">Fast Processing</span>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-3xl transform rotate-3 scale-95 opacity-10 blur-xl" />
              <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-border">
                <div className="bg-primary/10 h-12 w-12 rounded-xl flex items-center justify-center mb-6">
                  <Plane className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Why Choose SR Counselling?</h3>
                <p className="text-textLight mb-6 leading-relaxed">
                  With over a decade of experience, SR Counselling has been the trusted partner for thousands of travelers and students. 
                  VisaEase brings this expertise to your fingertips, offering a digital-first approach to visa applications without compromising on the personal touch.
                </p>
                <ul className="space-y-4">
                  {[
                    "Expert documentation review",
                    "Real-time application tracking",
                    "Personalized interview preparation",
                    "24/7 Support assistance"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-semibold tracking-wider text-sm uppercase">About VisaEase</span>
              <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-6 text-textDark">Making Borders <br /> Less Daunting</h2>
              <p className="text-textLight text-lg mb-8 leading-relaxed">
                We believe that travel should be about the destination, not the paperwork. 
                VisaEase is designed to strip away the confusion of government forms and requirements, 
                presenting you with a clear, guided path to your visa.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
                  <div className="text-4xl font-bold text-primary mb-2">10k+</div>
                  <div className="text-textLight font-medium">Visas Processed</div>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
                  <div className="text-4xl font-bold text-primary mb-2">99%</div>
                  <div className="text-textLight font-medium">Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">VisaEase</h3>
              <p className="max-w-xs text-gray-400">
                Simplifying your journey to the world. Powered by the expertise of SR Counselling.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-400">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-400">Contact Us</a></li>
                <li><a href="#" className="hover:text-indigo-400">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} VisaEase. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
