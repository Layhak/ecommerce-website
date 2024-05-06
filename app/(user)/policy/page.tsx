import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cstad Ecommerce Web Policy Page',
  description:
    'Cstad Ecommerce Website contact page is the page that we explain abut our rule to our user and our client who visit our website  to make them know about our policy.',
};
export default function DocsPage() {
  return (
    <div>
      <div className="my-8 bg-white dark:bg-black">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>

          <p className="mb-4">Last updated:6 January 2024</p>

          <section className="mb-8">
            <h2 className="mb-2 text-xl font-semibold">Introduction</h2>
            <p className="mb-3">
              Our eCommerce website our values your privacy. This Privacy Policy
              explains how we collect, use, and share information about you when
              you visit our website
            </p>
          </section>

          {/* Repeat for each section of your Privacy Policy */}

          <section className="mb-8">
            <h2 className="mb-2 text-xl font-semibold">Contact Us</h2>
            <p className="mb-3">
              If you have any questions or concerns about our privacy practices,
              please contact us at: [Your Contact Information]
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
