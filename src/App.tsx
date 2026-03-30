import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Code, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Copy, 
  Check, 
  ChevronDown, 
  Menu, 
  X,
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  Star,
  Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeImage } from './lib/gemini';

// --- Types ---
interface AnalysisResult {
  subject: string;
  style: string;
  lighting: string;
  composition: string;
  color_palette: string[];
  tags: string[];
  prompt: string;
  metadata: {
    mood: string;
    setting: string;
  };
}

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Use Cases', href: '#use-cases' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-zinc-200 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-zinc-900 p-1.5 rounded-lg">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-zinc-900">SnapPrompt</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
              {link.name}
            </a>
          ))}
          <button className="bg-zinc-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-zinc-800 transition-all shadow-sm">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-900">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-zinc-200 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-zinc-600 hover:text-zinc-900"
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full bg-zinc-900 text-white py-3 rounded-xl font-semibold">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-200 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-100 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-600 mb-6">
            <Zap className="w-3 h-3 fill-zinc-600" />
            AI-Powered Image Analysis
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-6 leading-[1.1]">
            Turn Any Photo into a <br />
            <span className="text-zinc-400">Structured JSON Prompt</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload an image and instantly generate clean, editable JSON for AI prompting, metadata extraction, and workflow automation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#demo" className="w-full sm:w-auto bg-zinc-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200 flex items-center justify-center gap-2">
              Try It Free <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg text-zinc-600 hover:bg-zinc-50 transition-all flex items-center justify-center gap-2">
              See How It Works
            </a>
          </div>
          <p className="mt-6 text-sm text-zinc-400">No credit card required • Instant results</p>
        </motion.div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section className="py-12 border-y border-zinc-100 bg-zinc-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-8">
          Trusted by creators and developers at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
          {['Adobe', 'Figma', 'Midjourney', 'Canva', 'Shopify'].map((brand) => (
            <span key={brand} className="text-2xl font-bold text-zinc-900">{brand}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: 'Upload Photo',
      desc: 'Drag and drop any image file. We support JPG, PNG, and WebP.'
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'AI Analysis',
      desc: 'Our advanced models detect subjects, styles, lighting, and composition.'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Get JSON',
      desc: 'Instantly receive structured JSON ready for your AI prompts or API.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Simple 3-Step Workflow</h2>
          <p className="text-zinc-600 max-w-xl mx-auto">From raw pixels to structured data in under 5 seconds.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm group-hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-white mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">{step.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{step.desc}</p>
              </div>
              {idx < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-6 -translate-y-1/2 text-zinc-200">
                  <ArrowRight className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Demo = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      setImage(base64);
      setLoading(true);
      setResult(null);

      try {
        const base64Data = base64.split(',')[1];
        const mimeType = file.type;
        const data = await analyzeImage(base64Data, mimeType);
        setResult(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleImages = [
    { url: 'https://picsum.photos/seed/product1/800/600', label: 'Product' },
    { url: 'https://picsum.photos/seed/portrait1/800/600', label: 'Portrait' },
    { url: 'https://picsum.photos/seed/interior1/800/600', label: 'Interior' },
  ];

  const handleSampleClick = async (url: string) => {
    setImage(url);
    setLoading(true);
    setResult(null);
    
    try {
      // For demo purposes, we'll fetch the image and convert to base64
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(',')[1];
        const data = await analyzeImage(base64Data, blob.type);
        setResult(data);
        setLoading(false);
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-24 bg-zinc-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-bold mb-6">Try the Live Demo</h2>
            <p className="text-zinc-400 text-lg mb-10">
              Upload your own photo or choose a sample to see how our AI extracts structured data instantly.
            </p>

            <div className="space-y-8">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-zinc-700 rounded-3xl p-12 text-center cursor-pointer hover:border-zinc-500 transition-all bg-zinc-800/50 group"
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange}
                />
                <div className="w-16 h-16 bg-zinc-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-zinc-300" />
                </div>
                <p className="text-lg font-semibold mb-1">Click to upload or drag and drop</p>
                <p className="text-zinc-500 text-sm">PNG, JPG, WebP up to 10MB</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-4">Or try a sample</p>
                <div className="flex gap-4">
                  {sampleImages.map((sample, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleSampleClick(sample.url)}
                      className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-transparent hover:border-white transition-all"
                    >
                      <img src={sample.url} alt={sample.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] font-bold uppercase tracking-tighter">
                        {sample.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-zinc-800 rounded-3xl border border-zinc-700 overflow-hidden shadow-2xl min-h-[500px] flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-700 bg-zinc-800/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-xs font-mono text-zinc-500 ml-4">output.json</span>
                </div>
                {result && (
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy JSON'}
                  </button>
                )}
              </div>

              <div className="flex-1 p-6 font-mono text-sm overflow-auto custom-scrollbar">
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-8 h-8 border-2 border-zinc-700 border-t-zinc-300 rounded-full"
                    />
                    <p>Analyzing image pixels...</p>
                  </div>
                ) : result ? (
                  <pre className="text-zinc-300">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                ) : image ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
                    <ImageIcon className="w-12 h-12 opacity-20" />
                    <p>Select an image to see analysis</p>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
                    <Code className="w-12 h-12 opacity-20" />
                    <p>Upload a photo to generate JSON</p>
                  </div>
                )}
              </div>
            </div>

            {/* Preview floating image */}
            <AnimatePresence>
              {image && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute -top-10 -right-10 w-48 h-48 rounded-2xl border-4 border-zinc-800 shadow-2xl overflow-hidden hidden md:block"
                >
                  <img src={image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Benefits = () => {
  const benefits = [
    {
      title: 'Save Hours of Work',
      desc: 'Stop manually describing images. Get consistent, automation-ready outputs in seconds.',
      icon: <Zap className="text-amber-500" />
    },
    {
      title: 'Structured Consistency',
      desc: 'Every output follows your defined schema, ensuring your database stays clean and organized.',
      icon: <Database className="text-blue-500" />
    },
    {
      title: 'Developer Friendly',
      desc: 'Integrate via REST API or webhooks. Perfect for bulk processing and custom pipelines.',
      icon: <Code className="text-emerald-500" />
    },
    {
      title: 'Secure & Private',
      desc: 'Your images are encrypted and never used for training without your explicit permission.',
      icon: <ShieldCheck className="text-purple-500" />
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Why SnapPrompt?</h2>
          <p className="text-zinc-600 max-w-xl mx-auto">The most reliable way to bridge the gap between visual content and structured data.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 hover:border-zinc-200 transition-all">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                {b.icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">{b.title}</h3>
              <p className="text-zinc-600 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UseCases = () => {
  const cases = [
    {
      title: 'AI Prompt Engineering',
      desc: 'Turn reference images into detailed prompts for Midjourney, DALL-E, or Stable Diffusion.',
      img: 'https://picsum.photos/seed/ai-prompt/400/300'
    },
    {
      title: 'E-commerce Cataloging',
      desc: 'Automatically extract product attributes, colors, and materials from inventory photos.',
      img: 'https://picsum.photos/seed/ecommerce/400/300'
    },
    {
      title: 'Content Automation',
      desc: 'Tag and categorize massive image libraries for DAM systems and social media scheduling.',
      img: 'https://picsum.photos/seed/automation/400/300'
    }
  ];

  return (
    <section id="use-cases" className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Built for Every Workflow</h2>
          <p className="text-zinc-600 max-w-xl mx-auto">From creative agencies to enterprise data teams.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-zinc-200 overflow-hidden group hover:shadow-xl transition-all">
              <div className="h-48 overflow-hidden">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-zinc-900 mb-3">{c.title}</h3>
                <p className="text-zinc-600 mb-6">{c.desc}</p>
                <button className="text-zinc-900 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Comparison = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-900 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Manual vs. SnapPrompt</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="py-6 px-4 text-zinc-500 font-semibold uppercase tracking-widest text-xs">Feature</th>
                    <th className="py-6 px-4 text-zinc-500 font-semibold uppercase tracking-widest text-xs">Manual Process</th>
                    <th className="py-6 px-4 text-zinc-100 font-semibold uppercase tracking-widest text-xs bg-zinc-800/50 rounded-t-2xl">SnapPrompt</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Speed', '5-10 minutes per image', 'Under 5 seconds'],
                    ['Consistency', 'Varies by person', 'Schema-enforced'],
                    ['Scalability', 'Linear cost/time', 'Unlimited via API'],
                    ['Format', 'Freeform text', 'Structured JSON'],
                    ['Integration', 'Copy-paste only', 'Native API/Webhooks']
                  ].map(([feature, manual, snap], idx) => (
                    <tr key={idx} className="border-b border-zinc-800/50">
                      <td className="py-6 px-4 font-semibold text-zinc-400">{feature}</td>
                      <td className="py-6 px-4 text-zinc-500">{manual}</td>
                      <td className="py-6 px-4 text-zinc-100 bg-zinc-800/50 font-medium">{snap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Creative Director',
      company: 'PixelPerfect',
      content: 'SnapPrompt has completely changed how we organize our creative references. We can now search our library by style and lighting instantly.'
    },
    {
      name: 'Marcus Thorne',
      role: 'Lead Developer',
      company: 'ShopFlow',
      content: 'The API is incredibly robust. We use it to automatically tag thousands of product images every day with 99% accuracy.'
    }
  ];

  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 relative">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-zinc-100" />
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xl text-zinc-700 leading-relaxed mb-8 italic">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-200" />
                <div>
                  <h4 className="font-bold text-zinc-900">{t.name}</h4>
                  <p className="text-sm text-zinc-500">{t.role} @ {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      desc: 'Perfect for individuals and hobbyists.',
      features: ['10 uploads / month', 'Standard JSON output', 'Community support', 'No API access'],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      desc: 'For power users and creators.',
      features: ['500 uploads / month', 'Custom JSON schemas', 'Priority processing', 'API access (Beta)'],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Team',
      price: '$99',
      desc: 'For agencies and small teams.',
      features: ['Unlimited uploads', 'Shared workspace', 'Full API access', 'Dedicated support'],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-zinc-600">Choose the plan that fits your workflow.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className={`relative p-10 rounded-[2.5rem] border ${plan.popular ? 'border-zinc-900 shadow-xl scale-105 z-10 bg-zinc-900 text-white' : 'border-zinc-200 bg-white text-zinc-900'} transition-all`}>
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-zinc-700">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className={plan.popular ? 'text-zinc-400' : 'text-zinc-500'}>/month</span>
              </div>
              <p className={`mb-8 ${plan.popular ? 'text-zinc-400' : 'text-zinc-500'}`}>{plan.desc}</p>
              <ul className="space-y-4 mb-10">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-zinc-400' : 'text-zinc-900'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.popular ? 'bg-white text-zinc-900 hover:bg-zinc-100' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: 'How accurate is the JSON output?', a: 'Our models are trained on millions of images and achieve over 95% accuracy for subject and style detection. You can always edit the output manually if needed.' },
    { q: 'Can I customize the JSON schema?', a: 'Yes! Pro and Team users can define their own JSON structure to match their specific database or workflow requirements.' },
    { q: 'Do you store my uploaded photos?', a: 'We only store images temporarily for processing. Images are deleted from our servers within 24 hours unless you explicitly save them to your library.' },
    { q: 'Is there a bulk upload option?', a: 'Team users can upload up to 1,000 images at once via our web dashboard or use our API for unlimited batch processing.' }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-zinc-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-zinc-900 mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-8 py-6 flex items-center justify-between text-left font-bold text-zinc-900"
              >
                {faq.q}
                <ChevronDown className={`w-5 h-5 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-8 pb-6 text-zinc-600 leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-zinc-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-zinc-900 p-1.5 rounded-lg">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-zinc-900">SnapPrompt</span>
            </div>
            <p className="text-zinc-500 max-w-sm leading-relaxed">
              The fastest way to turn photos into structured JSON prompts for AI workflows, metadata extraction, and automation.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 mb-6">Product</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><a href="#how-it-works" className="hover:text-zinc-900 transition-colors">How It Works</a></li>
              <li><a href="#use-cases" className="hover:text-zinc-900 transition-colors">Use Cases</a></li>
              <li><a href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">API Docs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 mb-6">Company</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><a href="#" className="hover:text-zinc-900 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-medium">
          <p>© 2026 SnapPrompt AI. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-zinc-900 transition-colors">Twitter</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <Demo />
        <Benefits />
        <UseCases />
        <Comparison />
        <Testimonials />
        <Pricing />
        <FAQ />
        <section className="py-24 bg-zinc-900 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-500 via-transparent to-transparent" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to automate your visual workflow?</h2>
            <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-12">
              Join 10,000+ creators and developers turning photos into structured data every day.
            </p>
            <button className="bg-white text-zinc-900 px-10 py-5 rounded-full font-bold text-xl hover:bg-zinc-100 transition-all shadow-2xl shadow-white/10">
              Get Started for Free
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
