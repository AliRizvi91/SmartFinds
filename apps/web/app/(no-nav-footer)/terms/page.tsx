import { Container } from '@/components/ui/Container';
import TermsOfServicePage from '@/components/rules/TermsComponent';

export const metadata = {
  title: 'Terms of service',
  description: 'The terms that govern use of the smartfinds platform.',
};

export default function TermsPage() {
  return (
    <>
      <main className="md:py-24 py-12">
        <Container>
          <TermsOfServicePage />
        </Container>
      </main>
    </>
  );
}
