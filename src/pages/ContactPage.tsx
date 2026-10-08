import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { BRAND_INFO } from '../data/mockData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Send, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialProject = searchParams.get('project');

  const { addNotification, openEmailModal } = useNotification();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Bengaluru');
  const [service, setService] = useState(
    initialProject ? `Inquiry regarding ${initialProject}` : 'Italian Stucco & Wall Finishes'
  );
  const [message, setMessage] = useState(
    initialProject ? `Hi, I am interested in getting work similar to "${initialProject}". Please contact me for details.` : ''
  );
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setError('Please fill out all contact fields.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }

    openEmailModal({
      recipientName: name,
      recipientEmail: email,
      subject: `[Received] Consultation Request – TruPaintz & Interiors`,
      previewText: `Thank you for contacting TruPaintz & Interiors. Our lead design associate has received your request and will reach out within 2 business hours.`,
      details: {
        'Client Name': name,
        'Phone Number': phone,
        'Project City/Area': location,
        'Service of Interest': service,
        'Client Brief': message,
        'Studio Address': BRAND_INFO.address,
        'Direct Desk': BRAND_INFO.phone,
      },
      sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    addNotification(
      'Inquiry Dispatched',
      `Thank you ${name}. Your message has been routed to our architectural desk. Automated confirmation sent to ${email}.`,
      'email'
    );

    setIsSent(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  const FAQS = [
    {
      q: 'How long does an Italian Stucco accent wall take to complete?',
      a: 'Typically 3 to 4 working days. This includes substrate preparation, primer application, 2 to 3 hand-troweled stucco layers, fine burnishing, and application of a natural beeswax protective seal.',
    },
    {
      q: 'Is mechanized painting truly 100% dustless?',
      a: 'Yes. We use German Festool auto-extracting sanders connected directly to HEPA dust extractors. This traps 99.9% of micro-chalk dust right at the wall head, so existing furniture and family members stay completely protected.',
    },
    {
      q: 'What is included in the complimentary site visit?',
      a: 'Our senior project engineer brings 50+ full-scale physical swatches of Italian stucco and mineral plasters, performs digital non-destructive moisture scans across all walls, and delivers an itemized square-foot quote within 24 hours.',
    },
    {
      q: 'What does the 10-Year Adhesion Warranty cover?',
      a: 'Our written warranty covers paint film peeling, flaking, and stucco bond failures under standard residential conditions. We provide complete remedial rectifications at zero cost to the homeowner.',
    },
  ];

  return (
    <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12 pt-6 sm:pt-8 lg:pt-9 pb-12 sm:pb-16 space-y-12 sm:space-y-16">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-500/30">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Connect With Our Studio</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">
          Schedule Consultation &amp; Studio Visit
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Reach out directly to our lead design desk for project inquiries, custom swatch requests, or to schedule an in-person walkthrough at our experience centre.
        </p>
      </div>

      {/* Main Grid: Details on Left, Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Contact Cards & Studio Info */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-7 shadow-sm space-y-5">
            <h2 className="font-display text-xl font-bold text-neutral-950">
              Studio Coordinates
            </h2>

            <div className="space-y-4 text-xs text-neutral-600">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block">Both Locations:</strong>
                  <span className="block">{BRAND_INFO.address}</span>
                  <span className="block mt-0.5">{BRAND_INFO.address2}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block">Direct Desk:</strong>
                  <a href={`tel:${BRAND_INFO.phone}`} className="font-mono text-amber-700 hover:underline">
                    {BRAND_INFO.phone}
                  </a>
                  <a href={`tel:${BRAND_INFO.phone2}`} className="font-mono text-amber-700 hover:underline block">
                    {BRAND_INFO.phone2}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block">Architectural Inquiries:</strong>
                  <a href={`mailto:${BRAND_INFO.email}`} className="text-amber-700 hover:underline">
                    {BRAND_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block">Working Hours:</strong>
                  <span>Monday – Saturday: 9:00 AM – 8:00 PM (By Appointment)</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/919677708535?text=${encodeURIComponent('Hi TruPaintz team, I would like to inquire about finishes for my home.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-xl bg-emerald-600 py-2.5 px-4 text-center text-xs font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
              >
                Direct WhatsApp
              </a>

              <a
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-xl border border-neutral-300 py-2.5 px-4 text-center text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <Instagram className="h-3.5 w-3.5 text-pink-600" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick FAQ Box */}
          <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-7 shadow-sm space-y-4">
            <h3 className="font-display text-lg font-bold text-neutral-950 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-amber-600" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="border-b border-neutral-100 pb-3 last:border-b-0 last:pb-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left text-xs font-semibold text-neutral-900 flex items-center justify-between gap-2 hover:text-amber-700 py-1"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-neutral-400 transition-transform ${
                        openFaq === i ? 'rotate-180 text-amber-600' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="mt-2 text-xs text-neutral-600 leading-relaxed pr-2">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7 rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm">
          <div className="pb-4 border-b border-neutral-100">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Send an Inquiry
            </span>
            <h2 className="font-display text-2xl font-bold text-neutral-950 mt-1">
              Start Your Project Conversation
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              We respond with preliminary technical feedback within 2 business hours.
            </p>
          </div>

          {isSent ? (
            <div className="py-10 text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-neutral-950">
                Inquiry Successfully Dispatched!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. A confirmation has been sent to your email. Our lead design associate will review your requirements and connect with you shortly.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="rounded-xl border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikram Sen"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98452 11000"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. vikram@sen.com"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    City / Neighborhood *
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Indiranagar, Bengaluru"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Primary Service of Interest
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                >
                  <option value="UPVC Windows & Doors">UPVC Windows &amp; Doors (EITI &amp; BADYEE)</option>
                  <option value="Painting">Painting (Interior &amp; Exterior Dustless)</option>
                  <option value="Curtains">Curtains &amp; Drapery</option>
                  <option value="Blinds">Blinds (Roller, Zebra, Bamboo, Venetian)</option>
                  <option value="Wallpapers">Wallpapers (European Textured Vinyl)</option>
                  <option value="Wooden Flooring">Wooden Flooring (Action Tesa &amp; Surya)</option>
                  <option value="False Ceiling">False Ceiling (Saint-Gobain &amp; USG Boral)</option>
                  <option value="Netlon / Mosquito Nets">Netlon / Mosquito Nets (Saint-Gobain)</option>
                  <option value="Louvers">Louvers (Shore &amp; Charcoal Fluted)</option>
                  <option value="Artificial Grass">Artificial Grass (25mm–50mm Turf)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Project Details / Requirements *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details such as property type (apartment/villa), approximate sq.ft, timeline, or preferred finishes..."
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-premium inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 py-3.5 text-xs font-semibold text-white shadow-md hover:bg-amber-500 transition-all cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Inquiry to Architectural Desk →</span>
              </button>

              <p className="text-[11px] text-center text-neutral-400">
                Your information is strictly kept confidential and never shared with third parties.
              </p>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
