import React from 'react';
import { Mail, Phone, ShieldCheck } from 'lucide-react';

const updatedDate = 'July 2, 2026';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-4">
    <h2 className="text-2xl font-black text-gray-900">{title}</h2>
    <div className="space-y-4 text-gray-700 leading-relaxed">{children}</div>
  </section>
);

export const PrivacyPolicy: React.FC = () => {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-secondary pt-32 pb-20 lg:pt-44 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-secondary to-indigo-950" aria-hidden="true"></div>
        <div className="absolute -top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-3xl" aria-hidden="true"></div>
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden="true"></div>
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-primary backdrop-blur">
              <ShieldCheck className="h-4 w-4" /> Privacy Policy
            </div>
            <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">Bruce Works Privacy Policy</h1>
            <p className="max-w-3xl text-xl leading-relaxed text-gray-100">
              Plain-English privacy practices for bruceworks.net, AI audit requests, calls, texts, and client communication with Bruce Works LLC.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6">
          <article className="mx-auto max-w-4xl space-y-12">
            <div className="rounded-xl border border-gray-100 bg-lightgrey p-6 text-gray-700">
              <p className="font-semibold text-gray-900">Last updated: {updatedDate}</p>
              <p className="mt-3 leading-relaxed">
                Bruce Works LLC (“Bruce Works,” “we,” “us,” or “our”) respects your privacy. This policy explains what information we collect, how we use it, and the choices you have when you visit this website or contact us by form, email, phone, or text message.
              </p>
            </div>

            <Section title="Information we collect">
              <p>We collect information you choose to share with us, such as:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Name, email address, phone number, and message details submitted through website forms.</li>
                <li>Information you provide during an AI Audit, consultation, support request, call, text, or email conversation.</li>
                <li>Basic business or project context you share so we can understand what you want help organizing or improving.</li>
                <li>Technical website data such as pages visited, approximate device/browser information, referring pages, and general usage patterns collected through analytics tools.</li>
              </ul>
              <p>Please do not submit passwords, account numbers, medical records, sensitive client data, or other confidential information through public website forms.</p>
            </Section>

            <Section title="How we use information">
              <p>We use information to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Respond to your questions, audit requests, messages, and service inquiries.</li>
                <li>Schedule, provide, improve, and support Bruce Works services.</li>
                <li>Prepare practical recommendations, proposals, follow-ups, or project materials you requested.</li>
                <li>Send service-related communications, including appointment reminders, follow-ups, and updates about your request or project.</li>
                <li>Understand how the website is used so we can improve clarity, performance, and usefulness.</li>
                <li>Protect our website, business, clients, and systems from spam, abuse, or security issues.</li>
              </ul>
            </Section>

            <Section title="Calls, texts, and phone numbers">
              <p>
                If you provide your phone number and opt in to text messaging, Bruce Works LLC may send text messages related to your inquiry, appointments, quotes, invoices, classes/events, and customer support. Message frequency varies. Message and data rates may apply. Consent is not required to purchase services.
              </p>
              <p>
                You can opt out of text messages at any time by replying <strong>STOP</strong>, reply <strong>HELP</strong> for help, or contact us at <a href="mailto:info@bruceworks.net" className="font-semibold text-secondary hover:underline">info@bruceworks.net</a>. We may still send one-time administrative or transactional messages when necessary to confirm an opt-out or complete a service-related communication.
              </p>
              <div className="rounded-xl border border-gray-100 bg-lightgrey p-6">
                <h3 className="mb-3 text-lg font-bold text-gray-900">Data Sharing</h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Customer data is not shared with third parties for promotional or marketing purposes.</li>
                  <li>Mobile opt-in and consent are never shared with anyone for any purpose. Any information sharing that may be mentioned elsewhere in this policy excludes mobile opt-in data.</li>
                </ul>
              </div>
              <p>
                We do not sell your phone number. We do not share mobile opt-in information or text messaging consent with third parties for their own marketing purposes.
              </p>
            </Section>

            <Section title="Bruce Works LLC Messaging Terms and Conditions">
              <ol className="list-decimal space-y-3 pl-6">
                <li>The messaging program consists of general conversational messaging to answer questions, provide support, coordinate appointments, share quotes/invoices, and send class/event or service-related updates.</li>
                <li>You can cancel the SMS service at any time. Text <strong>STOP</strong> to the phone number from which you received messages. After you send <strong>STOP</strong>, we will send a confirmation message that you have been unsubscribed. After this, you will no longer receive SMS messages from us. If you want to join again, you may opt in again through the same process used originally.</li>
                <li>If you are experiencing issues with the messaging program, reply with the keyword <strong>HELP</strong> for more assistance, or contact us directly at <a href="mailto:info@bruceworks.net" className="font-semibold text-secondary hover:underline">info@bruceworks.net</a>.</li>
                <li>Carriers are not liable for delayed or undelivered messages.</li>
                <li>Message and data rates may apply for messages sent to you from us and to us from you. Message frequency will vary based on communication needs. If you have questions about your text or data plan, contact your wireless provider.</li>
                <li>If you have questions regarding privacy, please review the rest of this Privacy Policy.</li>
              </ol>
            </Section>

            <Section title="Cookies and analytics">
              <p>
                This website may use basic analytics tools, such as Cloudflare Web Analytics, to understand traffic and site performance. These tools help us see general trends like page views and referrers. We use this information to improve the website and do not use it to build invasive personal profiles.
              </p>
              <p>
                Your browser may let you block or delete cookies, limit tracking, or use privacy controls. Some website features may not work exactly the same if you disable certain browser features.
              </p>
            </Section>

            <Section title="When we share information">
              <p>We only share information when it is reasonably needed to operate the business, provide services, or comply with the law. This may include:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Service providers that help with website hosting, forms, email, analytics, scheduling, phone service, text messaging, cloud storage, or business operations.</li>
                <li>Professional advisors, payment processors, or contractors when needed to provide or support services.</li>
                <li>Legal, safety, fraud-prevention, or compliance situations when required or appropriate.</li>
              </ul>
              <p>We do not sell your personal information.</p>
            </Section>

            <Section title="How long we keep information">
              <p>
                We keep information for as long as reasonably needed to respond to you, provide services, maintain business records, comply with legal obligations, resolve disputes, and improve our systems. If you want us to delete or update information you provided, contact us and we will review the request.
              </p>
            </Section>

            <Section title="Security">
              <p>
                We use reasonable administrative, technical, and organizational safeguards to protect information. No website, email, phone, text, or internet-connected system can be guaranteed 100% secure, so please avoid sending highly sensitive information through public forms or unencrypted messages.
              </p>
            </Section>

            <Section title="Your choices and privacy rights">
              <p>Depending on where you live, you may have rights to request access to, correction of, deletion of, or information about the personal information we maintain about you. You may also ask us to stop certain communications.</p>
              <p>
                To make a privacy request, email <a href="mailto:info@bruceworks.net" className="font-semibold text-secondary hover:underline">info@bruceworks.net</a>. We may need to verify your identity before acting on certain requests.
              </p>
              <p>
                California residents may request information about personal information collected, used, disclosed, or retained by Bruce Works. Bruce Works does not sell personal information.
              </p>
            </Section>

            <Section title="Children’s privacy">
              <p>
                Bruce Works services are intended for adults and businesses. We do not knowingly collect personal information from children under 13. If you believe a child provided us personal information, contact us so we can review and delete it if appropriate.
              </p>
            </Section>

            <Section title="Links to other websites">
              <p>
                This website may link to third-party services such as social media pages, scheduling tools, payment tools, or other websites. Their privacy practices are governed by their own policies, not this one.
              </p>
            </Section>

            <Section title="Changes to this policy">
              <p>
                We may update this Privacy Policy as our website, services, tools, or legal requirements change. The “Last updated” date above shows when the current version took effect.
              </p>
            </Section>

            <Section title="Contact Bruce Works">
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="font-semibold text-gray-900">Bruce Works LLC</p>
                <div className="mt-4 space-y-3">
                  <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /> <a href="mailto:info@bruceworks.net" className="text-secondary hover:underline">info@bruceworks.net</a></p>
                  <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-primary" /> <a href="tel:+18668296757" className="text-secondary hover:underline">(866) 829-6757</a></p>
                </div>
              </div>
            </Section>
          </article>
        </div>
      </section>
    </main>
  );
};
