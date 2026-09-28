
import { Container } from '@/components/ui/Container';
import CookiePolicy from '@/components/rules/CookieSection';

export const metadata = {
  title: 'Cookie policy',
  description: 'How smartfinds uses cookies for attribution and tracking.',
};

export default function CookiePolicyPage() {
  return (
    <>
      <main className="md:py-24 py-12">
        <Container>
          <CookiePolicy/>
        </Container>
      </main>
    </>
  );
}
