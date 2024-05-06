import { Image } from '@nextui-org/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ecommerce Web about us page',
  description:
    'Ecommerce Website about us page is for describe about this website in more detail',
};
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">About Us</h1>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Our Mission</h2>
        <p className="mb-3">
          Our mission is to provide exceptional service and to follow through on
          our promises. We will strive to deliver individualized solutions to
          all our client printing needs and add value to our client businesses.
          Our team is focused on providing great service, great quality, and
          great value.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Our Story</h2>
        <p className="mb-3">
          Founded in 2010, Our Company has served over 5,000 small and
          medium-sized businesses with their printing needs. From business cards
          to corporate brochures, we strive to exceed your expectations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Meet the Team</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="mb-4">
            <Image
              src="https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1609081524998-a1163e2d44cb"
              alt="Team Member"
              width={80}
              height={80}
              className="h-auto w-full rounded-lg"
            />
            <h3 className="mt-2 font-semibold">John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="mb-4">
            <Image
              src="https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1609081524998-a1163e2d44cb"
              alt="Team Member"
              width={80}
              height={80}
              className="h-auto w-full rounded-lg"
            />
            <h3 className="mt-2 font-semibold">Jane Doe</h3>
            <p>Marketing Director</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>
    </div>
  );
}
